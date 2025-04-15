import {Schema, model} from "mongoose"

const propertySchema = new Schema({
    name: String,
    price: Number,
    address: String,
    beds: Number,
    description: String,
    owner: String,
    isSold: Boolean,
    image: String
})

export default model("Property", propertySchema)