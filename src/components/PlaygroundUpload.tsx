import React, { useState } from "react";
import dummy from "@/assets/dummy.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import CustomSeparator from "./CustomSeparator";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "./services/upload";
import { useAppContext } from "@/context/appContext";
import { getDatabase, ref, set } from "firebase/database";
import { Loader2 } from "lucide-react";

const PlaygroundUpload = ({ setEnableTransform, setTab, setFileName }) => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const db = getDatabase();

  const {
    authDetails: { uid: userId },
  } = useAppContext();
  const [error, setError] = useState("");
  const {  mutate: uploadCloudinaryMutation } =
    useMutation({
      mutationFn: ({ userId, formData }) => {
        return uploadImage(userId, formData);
      },
      onSuccess: (cloudinaryData) => {
        const { secure_url, public_id, format } = cloudinaryData;
        // console.log(cloudinaryData, "cloudinaryData");
        const fileName = `${
          secure_url.split("/")[secure_url.split("/").length - 1]
        }`;
        const extension = "." + format;
        set(ref(db, `uploadedImages/${public_id}`), {
          fileName: fileName,
          photoURL: secure_url,
          publicId: public_id,
          extension: extension,
        });
        setEnableTransform(true);
        setTab("transform-image");
        setIsLoading(false);
        setFileName(public_id + extension);
      },
    });
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!image && !url) setError("Please upload an image or enter an url");
    if (image && url)
      setError(
        "Either upload by file or url.Refresh the app if you want to remove the uploaded image or clear the url input if you want to remove it."
      );
    // upload file to cloudinary
    const formData = new FormData();
    if (image) {
      formData.append("file", image);
      // const imageuri = await convertImageToBaseUri(image);
    } else if (url) {
      formData.append("file", url);
    }

    uploadCloudinaryMutation({
      userId,
      formData,
    });
  };
  return (
    <div className="flex flex-col items-center justify-between gap-8 sm:flex-row ablublu">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 ">
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
            <div className="flex flex-col gap-4 ">
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
          <Button type="submit">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>

      <div className="flex-col gap-4">
        <p className="text-sm font-semibold text-muted-foreground">Preview</p>
        {image && (
          <figure>
            <a
              href={URL.createObjectURL(image)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={URL.createObjectURL(image)}
                className="w-[250px] h-[250px] object-cover	"
                alt="Your uploaded Image"
              />
            </a>
          </figure>
        )}
        {url && (
          <figure>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={url}
                className="w-[250px] h-[250px] object-cover	"
                alt="Your uploaded Image"
              />
            </a>
          </figure>
        )}

        {!url && !image && (
          <img className="w-[250px] h-[250px] object-cover	" src={dummy} />
        )}
      </div>
    </div>
  );
};

export default PlaygroundUpload;
