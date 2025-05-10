import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  propertyId: String,
  buyerId: String,
  sellerId: String,
  timestamp: String,
});

export default model("Transactions", transactionSchema);
