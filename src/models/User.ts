import * as mongoose from "mongoose";

const setup = new mongoose.Schema({
    keyboard: {
        name: {
            type: String,
        },
        layout: {
            type: String,
            enum: ["k2", "k3", "k4", "k60", "k75", "ktkl", "kfull", ""],
        },
        keys: {
            type: [String],
        },
    },
    tablet: {
        name: {
            type: String,
        },
        area: {
            type: {
                w: {
                    type: Number,
                },
                h: {
                    type: Number,
                }
            },
        },
        position: {
            type: {
                x: {
                    type: Number,
                },
                y: {
                    type: Number,
                },
                r: {
                    type: Number,
                }
            },
        },
        size: {
            type: {
                w: {
                    type: Number,
                },
                h: {
                    type: Number,
                }
            },
        },
    },
    mouse: {
        name: String,
        dpi: String,
    },
    peripherals: {
        monitor: String,
        headphones: String,
        microphone: String,
        tablet: String,
        mouse: String,
        keyboard: String,
        keypad: String,
        mousepad: String,
        chair: String,
        camera: String,
        audio: String,
    },
    computer: {
        os: String,
        cpu: String,
        gpu: String,
        ram: String,
        psu: String,
        storage: String,
        motherboard: String,
        case: String,
    }
}, { _id: false })


const rank = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    }
}, { _id: false })

const modeRanks = new mongoose.Schema({
    global_ranks: {
        type: [rank],
        required: true,
    },
    country_ranks: {
        type: [rank],
        required: true,
    },
}, { _id: false })

const modes = new mongoose.Schema({
    osu: modeRanks,
    taiko: modeRanks,
    fruits: modeRanks,
    mania: modeRanks,
}, { _id: false })

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        immutable: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    modes: {
        type: modes,
        required: true,
    },
    skins: [String],
    setup: setup,
});

userSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject();
    return user;
};

export type Rank = mongoose.InferSchemaType<typeof rank>;
export type ModeRanks = mongoose.InferSchemaType<typeof modeRanks>;
export type Setup = mongoose.InferSchemaType<typeof setup>;
export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model('User', userSchema);
