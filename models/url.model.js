import mongoose, {Schema} from "mongoose";

const urlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: {type: Number}
    }],
    generatedBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true});

export const URL = mongoose.model('URL', urlSchema);