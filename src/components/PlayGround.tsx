import React, { useState } from "react";
import { Toaster } from "./ui/toaster";
import ImageUpload from "./ImageUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import CldGallery from "./CldGallery";

const PlayGround = () => {
  const [imagesUploadedList, setImagesUploadedList] = useState([]);
  const cld = new Cloudinary({
    cloud: {
      cloud_name: import.meta.env.VITE_CLOUD_NAME, //Your cloud name
      upload_preset: import.meta.env.VITE_UPLOAD_PRESET, //Create an unsigned upload preset and update this
    },
  });
  return (
    <div>
      <Toaster />
    </div>
  );
};

export default PlayGround;
