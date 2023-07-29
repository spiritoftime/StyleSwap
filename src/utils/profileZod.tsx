// email: "",
// password: "",
// displayName: "",
// photoURL: "",
import * as z from "zod";
// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];
// const profilePhotoZod = z.object({});

export const profileZod = z.object({
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
  photo: z.any(),
  displayName: z.string().nonempty("Required"),
});
// need intersection so that the endtime refine will fire.
// for more info, check out https://github.com/colinhacks/zod/issues/479
// export const profileZod = z.intersection(profileRestZod, profilePhotoZod);
