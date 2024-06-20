type Props = {
    name: string;
    code: string;
}

const Flag = ({ name, code }: Props) => {

    const url = `https://flagcdn.com/h40/${code.toLowerCase()}.jpg`;

    return (
        <div class="tooltip" data-tip={name}>
            <img src={url} class="h-5 w-7 rounded-sm outline outline-1 outline-base-300" />
        </div>
    );
}

export default Flag;
