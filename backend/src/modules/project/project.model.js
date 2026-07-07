import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["pending", "reviewed"],
        default: "pending",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
},
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;