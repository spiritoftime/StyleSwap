import React, { useState } from "react";
import { Toaster } from "./ui/toaster";
import ImageUpload from "./ImageUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import CldGallery from "./CldGallery";

const PlayGround = () => {
  const [imagesUploadedList, setImagesUploadedList] = useState([]);
  const cld = new Cloudinary({
    cloud: {
      cloud_name: "dprzyus1o", //Your cloud name
      upload_preset: "jjn5wxax", //Create an unsigned upload preset and update this
    },
  });
  const onImageUploadHandler = (publicId) => {
    setImagesUploadedList((prevState) => [...prevState, publicId]);
  };
  return (
    <div>
      <ImageUpload
        cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
        upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
        onImageUpload={(publicId) => onImageUploadHandler(publicId)}
      />
      <CldGallery
        imagesUploaded={imagesUploadedList}
        {...cld}
        cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
      />
      <Toaster />
    </div>
  );
};

export default PlayGround;
