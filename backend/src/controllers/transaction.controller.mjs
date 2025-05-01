import Transactions from "../models/transaction.model.mjs"
import Properties from "../models/property.model.mjs"
import { updateProperty } from "../controllers/property.controller.mjs";

export const getTransaction = async (request, response) => {
    try {
      const { params: { id } } = req;
      if (!id) return res.status(200).send(await Transactions.find({}));
      const transaction = await Transaction.findById(id);
      if (!transaction) return res.sendStatus(404);
      return res.status(200).send({
          success: true,
          data: transaction,
          message: "transaction Found",
          error: null,
        });
    } catch (error) {
      console.error("Error finding transaction", error);
      return res.status(400).send({
          success: false,
          data: null,
          message: "Error Occured",
          error: error.message,
        });
    }
    
}
export const createTransaction = async (req, res) => {
    try {
      const { body } = req;
      const transaction = await Transactions.create(body);
      const result = await Properties.findByIdAndUpdate(body.propertyId, {isSold: true});
      return res.status(201).send({ success: true, data: transaction, message:"Transaction Created", error:null});
    } catch (error) {
      console.error("Error creating transaction", error);
      return res.status(400).send({ success: false, data: null, message:"Error Occured", error:error.message});
    }
}

export const deleteTransaction = async (req, res) => {
    try {
      const { params: { id } } = req;
      const result = await Transactions.findByIdAndDelete(id);
      if (!result) return res.sendStatus(404);
      return res.status(200).send({ success: true, data: null, message:"Transaction Deleted", error:null});
    } catch (error) {
      console.error("Error deleting transaction", error);
      return res.status(400).send({ success: false, data: null, message:"Error Occured", error:error.message});
    }
}