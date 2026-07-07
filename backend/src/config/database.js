import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected successfully!");
    } catch (error) {
        console.error("MongoDB Connection failed.");
        console.error(error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDatabase;