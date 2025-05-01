import vine from "@vinejs/vine"

const propertyValidator = vine.object({
    name: vine.string().minLength(5).maxLength(40).trim(),
    price: vine.number(),
    address: vine.string().trim(),
    beds: vine.number(),
    description: vine.string().trim(),
    owner: vine.string().trim(),
    isSold: vine.boolean(),
    image: vine.string().trim(),
})

export default vine.compile(propertyValidator);