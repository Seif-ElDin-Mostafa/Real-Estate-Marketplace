import Properties from "../models/property.model.mjs";

export const createProperty = async (req, res) => {
  try {
    const { body } = req;
    const property = await Properties.create(body);
    return res.status(201).send({ success: true, data: property, message:"Property Created", error:null});
  } catch (error) {
    console.error("Error creating property", error);
    return res.status(400).send({ success: false, data: null, message:"Error Occured", error:error.message});
  }
};

export const findProperty = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    if (!id) return res.status(200).send(await Properties.find({}));
    const property = await Properties.findById(id);
    if (!property) return res.sendStatus(404);
    return res.status(200).send({ success: true, data: property, message:"Property Found", error:null});
  } catch (error) {
    console.error("Error finding property", error);
    return res.status(400).send({ success: false, data: null, message:"Error Occured", error:error.message});
  }
};

export const updateProperty = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const result = await Properties.findByIdAndUpdate(id, body, {new :true});
    if (!result) return res.sendStatus(404);
    return res.status(200).send({ success: true, data: result, message:"Property Updated", error:null});
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, data: null, message:"Error Occured", error:error.message});
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const result = await Properties.findByIdAndDelete(id);
    if (!result) return res.sendStatus(404);
    return res.status(200).send({ success: true, data: null, message:"Property Deleted", error:null});
  } catch (error) {
    console.error("Error deleting property", error);
    return res.status(400).send({ success: false, data: null, message:"Error Occured", error:error.message});
  }
};
