import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required field" })
    .email({ message: "Enter valid email" }),
  password: z
    .string()
    .min(6, { message: "Required field" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: "Password should atleast have 1 uppercase and 1 number",
    }),
});
