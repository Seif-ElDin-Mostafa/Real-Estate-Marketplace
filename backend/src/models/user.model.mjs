import {Schema, model} from "mongoose"

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      required: true
    },
    email: { type: String, required: true },
    phone: { type: String }
})

export default model("User", userSchema);