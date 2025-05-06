
export const validate = (schema) => async (req, res, next) => {
    try {
        const {body} = req;
        await schema.validate(body);
        return next();
    } catch (error) {
        console.error(error);

        if(error.name == "ValidationError"){
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).send(error.errors);
        }
    }

    next();
}