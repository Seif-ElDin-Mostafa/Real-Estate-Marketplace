import vine from "@vinejs/vine"

const userValidator = vine.object({
    username: vine.string().trim().minLength(1).maxLength(15),
    password: vine.string().trim().minLength(8),
    role: vine.enum(["admin", "user"]),
    email: vine.string().email(),
    phone: vine.string().optional()
  })
export default vine.compile(userValidator);