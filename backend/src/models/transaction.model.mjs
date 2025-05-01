import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  propertyId: String,
  userId: String,
  timestamp: String,
});

export default model("Transactions", transactionSchema);
