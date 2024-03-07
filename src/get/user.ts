import { v2 } from "osu-api-extended";
import { updateUser } from "@/src/db/users";
import { catalans } from "@/src/resources/constants";
import type { Category, Mode } from "@/src/types/osu";
import type { User, UserList } from "@/src/types/users";

export async function getUser(id: string, mode: Mode): Promise<User | null> {
    const user: User = (await v2.user.details(id, mode) as User);

    if ("error" in user) return null;

    const m = user.rank_history?.mode as Mode || "osu";

    user.db_ranks = await updateUser(
        user.id,
        user.username,
        user?.rank_history?.data || [],
        user?.statistics?.country_rank,
        m
    );

    if (catalans.includes(user.id)) {
        console.log("Bon dia tu!");
        user.country.code = "CAT";
        user.country.name = "Catalunya";
    }

    return user;
}

export async function getRankings(mode: Mode, category: Category, page: number): Promise<UserList> {

    const res: UserList = await v2.site.ranking.details(
        mode, category,
        {
            "cursor[page]": page,
            filter: "all",
        }
    );

    return res;

}