import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validator =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.reduce((acc, issue) => {
        const field = issue.path[0] as string || "root";
        acc[field] = issue.message;
        return acc;
      }, {} as Record<string, string>);

      return res.status(400).json({ errors });
    }

    req.body = result.data;
    next();
};
