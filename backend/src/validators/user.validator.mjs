import vine from "@vinejs/vine"

const userValidator = vine.object({
    username: vine.string().minLength(5).maxLength(40).trim(),
    password: vine.string().minLength(5).maxLength(40).trim(),
})

export default vine.compile(userValidator);