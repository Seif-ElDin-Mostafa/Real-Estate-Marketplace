export const exceptionHandler = (error, req, res, next) => {
    switch (error.name) {
        case 'ValidationError':
            res.status(400).send(error.message);
            break;
        case 'CastError':
            res.status(404).send(error.message);
            break;
        default:
            res.status(500).send(error.message);
            break;
    }
}