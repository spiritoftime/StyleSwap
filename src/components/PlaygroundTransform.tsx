import React, { useState } from "react";
import dummy from "@/assets/dummy.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import CustomSeparator from "./CustomSeparator";
import { Button } from "./ui/button";
import { uploadData } from "./services/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/context/appContext";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { transformImage } from "./services/transform";

const PlaygroundTransform = ({ fileName }) => {
  const [replaceWith, setReplaceWith] = useState("");
  const [toReplace, setToReplace] = useState("");
  const [preview, setPreview] = useState(null);
  const db = getDatabase();
  console.log(preview, "preview");
  const {
    authDetails: { uid: userId },
  } = useAppContext();
  const [error, setError] = useState("");
  const { data: cloudinaryData, mutate: transformCloudinaryMutation } =
    useMutation({
      mutationFn: ({ fileName, prompt }) => {
        return transformImage(userId, fileName, prompt);
      },
      onSuccess: (cloudinaryData) => {
        console.log("cloudinary", cloudinaryData, typeof cloudinaryData);
        const getImageUrlFromImageElementString = (imageElementString) => {
          const srcRegex = /<img\s+src=['"](.*?)['"].*\/?>/i;
          const match = srcRegex.exec(imageElementString);
          return match ? match[1] : null;
        };
        const url = getImageUrlFromImageElementString(cloudinaryData);
        setPreview(url);
        // const { secure_url, public_id } = cloudinaryData;
        // console.log(cloudinaryData, "cloudinaryData");
        // const fileName = `${
        //   secure_url.split("/")[secure_url.split("/").length - 1]
        // }`;
        // set(ref(db, "uploadedImages/" + userId + public_id), {
        //   fileName: fileName,
        //   photoURL: secure_url,
        //   publicId: public_id,
        // });
      },
    });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!toReplace || !replaceWith) setError("Please fill in both fields");
    // "gen_replace:from_shirt;to_suit_jacket"
    const prompt = `gen_replace:from_${toReplace};to_${replaceWith}`;
    transformCloudinaryMutation({
      fileName,
      prompt,
    });
  };
  return (
    <div className="flex justify-between items-center gap-8">
      <form className="w-[60%]" onSubmit={submitHandler}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Label className="whitespace-nowrap" htmlFor="what-to-replace">
              What To Replace:
            </Label>
            <Input
              onChange={(e) => setToReplace(e.target.value)}
              id="what-to-replace"
              type="text"
            />
          </div>
          <div className="flex  items-center gap-4">
            <Label className="whitespace-nowrap" htmlFor="replace-with">
              To Replace With:
            </Label>
            <Input
              onChange={(e) => setReplaceWith(e.target.value)}
              id="replace-with"
              type="text"
            />
          </div>
          <Button type="submit">Generate Image</Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>

      <div className="flex  flex-col gap-4">
        <p className="text-sm font-semibold text-muted-foreground">
          Your Image
        </p>
        <img
          className="w-[250px] h-[250px] object-cover	"
          src={preview || dummy}
        />
      </div>
    </div>
  );
};

export default PlaygroundTransform;
