import React, { useState } from "react";
import dummy from "@/assets/dummy.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import CustomSeparator from "./CustomSeparator";
import { Button } from "./ui/button";
import { uploadData } from "./services/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "./services/upload";
import { useAppContext } from "@/context/appContext";
import { child, get, getDatabase, ref, set } from "firebase/database";

const PlaygroundTransform = () => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const db = getDatabase();

  const {
    authDetails: { uid: userId },
  } = useAppContext();
  const [error, setError] = useState("");
  const { data: cloudinaryData, mutate: uploadCloudinaryMutation } =
    useMutation({
      mutationFn: ({ userId, formData }) => {
        return uploadImage(userId, formData);
      },
      onSuccess: (cloudinaryData) => {
        const { secure_url, public_id } = cloudinaryData;
        console.log(cloudinaryData, "cloudinaryData");
        const fileName = `${
          secure_url.split("/")[secure_url.split("/").length - 1]
        }`;
        set(ref(db, "uploadedImages/" + userId + public_id), {
          fileName: fileName,
          photoURL: secure_url,
          publicId: public_id,
        });
      },
    });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image && !url) setError("Please upload an image or enter an url");
    if (image && url)
      setError(
        "Either upload by file or url.Refresh the app if you want to remove the uploaded image or clear the url input if you want to remove it."
      );
    // upload file to cloudinary
    const formData = new FormData();
    if (image) {
      console.log(image, "image");
      formData.append("file", image);
      // const imageuri = await convertImageToBaseUri(image);
    } else if (url) {
      formData.append("file", url);
    }
    const obj = { userId, formData };
    uploadCloudinaryMutation({
      userId,
      formData,
    });
  };
  return (
    <div className="flex justify-between items-center gap-8">
      <form className="w-[60%]" onSubmit={submitHandler}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Label className="whitespace-nowrap" htmlFor="target">
              What To Replace:
            </Label>
            <Input
              onChange={(e) => setUrl(e.target.value)}
              id="target"
              type="text"
            />
          </div>
          <div className="flex  items-center gap-4">
            <Label className="whitespace-nowrap" htmlFor="replace">
              To Replace With:
            </Label>
            <Input
              onChange={(e) => setUrl(e.target.value)}
              id="replace"
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
          src={(image && URL.createObjectURL(image)) || url || dummy}
        />
      </div>
    </div>
  );
};

export default PlaygroundTransform;
