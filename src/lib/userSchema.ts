import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a full name"],
        minLength: [4, "Please provide a name with at least 4 characters"],
        maxLength: [30, "Please provide a name with at most 50 characters"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Please provide a password with at least 6 characters"],
        maxLength: [60, "Please provide a password with at most 50 characters"]
    },
})

const User = models.User || model("User", UserSchema);
export default User;