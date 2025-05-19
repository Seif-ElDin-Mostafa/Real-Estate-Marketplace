import vine from "@vinejs/vine"

const propertyValidator = vine.object({
    price: vine.number(),
    address: vine.string().trim(),
    beds: vine.number(),
    baths: vine.number(),
    sellerId: vine.string().trim(),
    isSold: vine.boolean(),
    image: vine.string().trim(),
})

export default vine.compile(propertyValidator);