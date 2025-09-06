import { z } from "zod";

export const productSchema = z.object({
    name : z.string().min(2),
    description : z.string().max(255),
    price: z.number().positive(),
    category_id : z.number().optional(),
    type : z.enum(['drink','food']).optional()
}).refine((data)=>data.price < 1,{
    message : 'price canno be less than 1',
    path: ["price"],
}).superRefine((data,ctx) => {
    if(!data.category_id && !data.type){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message : 'at least ctaegory id or type need to attched',
            path : ['type']
        })
    }
})

export type productInput = z.infer<typeof productSchema>

