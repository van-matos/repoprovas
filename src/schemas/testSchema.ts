import joi from "joi";

export const newTestSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().required().strict(),
    disciplineId: joi.number().required().strict(),
    teacherId: joi.number().required().strict()
});