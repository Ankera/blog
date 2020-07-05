const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    name: String,
    token: String,
    expires_in: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

TokenSchema.pre("save", function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

const Token = mongoose.model("Token", TokenSchema);

TokenSchema.static = {
    async getAccessToken() {
        const token = await this.findOne({
            name: "access_token"
        });

        if (token && token.token) {
            token.access_token = token.token;
        }

        return token;
    },

    async saveAccessToken(data) {
        const token = await this.findOne({
            name: "access_token"
        });

        if (token) {
            token.token = data.token;
            token.expires_in = data.expires_in;
        } else {
            token = new Token({
                name: "access_token",
                token: data.token,
                expires_in: data.expires_in
            });
        }

        await token.save();
        return token;
    },
}