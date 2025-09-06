import { Schema, model, Document } from "mongoose";
import { productInput } from "common-service";

export interface ProductDocument extends productInput, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, minlength: 2 },
    description: { type: String, maxlength: 255 },
    price: { type: Number, required: true, min: 1 },
    category_id: { type: Number },
    type: { type: String, enum: ["drink", "food"] },
  },
  { timestamps: true }
);

export const Product = model<ProductDocument>("Product", productSchema);
