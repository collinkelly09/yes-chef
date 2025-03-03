import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    username: z
      .string()
      .min(3, "Username cannot be less than 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .regex(/^[A-Za-z0-9-_]+$/, {
        message:
          "Username can only contain letters, numbers, underscores, and hyphens",
      })
      .refine((value) => !["admin", "root"].includes(value.toLowerCase()), {
        message: "Reserved words are not allowed",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]+$/,
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
        }
      ),
    confirmPassword: z.string().min(1, "Please confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  username: z
    .string()
    .min(3, "Username cannot be less than 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[A-Za-z0-9-_]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and hyphens",
    })
    .refine((value) => !["admin", "root"].includes(value.toLowerCase()), {
      message: "Reserved words are not allowed",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]+$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      }
    ),
});

export const recipeSchema = z.object({
  name: z.string().max(256, "Name too long"),
  rating: z.number().min(1).max(5),
  photo_url: z.string().optional(),
  time: z.string(),
});

export const ingredientSchema = z.object({
  name: z.string().min(2, "Must include ingredient name").max(256),
  quantity: z.string().max(256).optional(),
});

export const stepSchema = z.object({
  name: z.string().min(2, "Must include step name").max(256),
  step_number: z.number(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Must include category title").max(256),
});
