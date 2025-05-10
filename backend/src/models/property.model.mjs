import {Schema, model} from "mongoose"

const propertySchema = new Schema({
    price: Number,
    address: String,
    beds: Number,
    baths: Number,
    sellerId: String,
    isSold: Boolean,
    image: String
})

export default model("Property", propertySchema)