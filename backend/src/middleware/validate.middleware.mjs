export const validate = (schema) => async (req, res, next) => {
    try{
        const {body} = req;
        await schema.validate(body);

        next();
    } catch(error) {

        next(error);
    }

}