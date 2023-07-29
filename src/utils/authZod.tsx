// contains zod auth code for login or register
import * as z from "zod";
export const authZod = z.object({
  email: z
    .string()
    .email()
    .nonempty("Required")
    .regex(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
      "Please type in a valid email"
    ),
  password: z.string().nonempty("Required"),
});
