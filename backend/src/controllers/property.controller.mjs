import Properties from '../models/property.model.mjs'

export const createProperty = async (req, res) => {
    try {
        const {body} = req;
        await Properties.create(body);
        return res.status(204).send("Property Created")
    } catch (error) {
        console.error('Error creating property', error);
        return res.status(400).send(error.errors);
    }
}

export const findProperty = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(200).send(await Properties.find({}));
        const property = await Properties.findById(id);
        if(!property) return res.sendStatus(404);
        return res.status(200).send(property);
    } catch (error) {
        console.error('Error finding property', error);
        return res.status(400).send(error.errors);
    }
}

export const updateProperty = async (req, res) => {
    try {
        const {id, body} = req.params;
        const result = await Properties.findByIdAndUpdate(id, body);
        if(!result) return res.sendStatus(404);
        return res.status(200).send({message: 'Property Updated Successfuly'});
    } catch (error) {
        console.error(error);
        return res.status(400).send(error.errors);
    }
}

export const deleteProperty =  async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Properties.findByIdAndDelete(id);
        if(!result) return res.sendStatus(404);
        return res.status(201).send('Property Deleted');
    } catch (error) {
        console.error('Error deleting property', error);
        return res.status(400).send(error.errors);
    }
}