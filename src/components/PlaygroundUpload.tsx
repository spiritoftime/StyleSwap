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

import { convertImageToBaseUri } from "@/utils/convertImageToBaseUri";

const PlaygroundUpload = () => {
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
        set(ref(db, "uploadedImages/" + userId + public_id), {
          fileName: `${
            secure_url.split("/")[secure_url.split("/").length - 1]
          }`,
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
    <div className="flex items-center gap-8">
      <div className="flex flex-col gap-6">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-4">
            <Label className="whitespace-nowrap" htmlFor="upload-url">
              Upload By URL:
            </Label>
            <Input
              onChange={(e) => setUrl(e.target.value)}
              id="upload-url"
              type="text"
            />
          </div>
          <CustomSeparator />
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap" htmlFor="upload-img">
                Upload By File:
              </Label>
              <Input
                onChange={(e) => setImage(e.target.files[0])}
                id="upload-img"
                accept="image/jpeg, image/jpg, image/png, image/webp"
                type="file"
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>

      <div className="flex-col gap-4">
        <p className="text-sm font-semibold text-muted-foreground">Preview</p>
        <img
          className="max-w-[250px] max-h-[250px]"
          src={(image && URL.createObjectURL(image)) || url || dummy}
        />
      </div>
    </div>
  );
};

export default PlaygroundUpload;
