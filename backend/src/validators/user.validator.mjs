import vine from "@vinejs/vine"

const userValidator = vine.object({
    username: vine.string().trim().minLength(1).required(),
    password: vine.string().trim().minLength(1).required(),
    role: vine.enum(["admin", "buyer", "seller"]).required(),
    email: vine.string().email().required(),
    phone: vine.string().optional()
  })
export default vine.compile(userValidator);