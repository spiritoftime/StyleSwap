import { openUploadWidget } from "@/utils/CloudinaryService";
import { Button } from "./ui/button";

const ImageUpload = (props) => {
  const uploadImageWidget = () => {
    const myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        tags: ["myname"],
        maxImageWidth: 600,
        sources: ["local", "url", "camera"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          props.onImageUpload(result.info.public_id);
        }
      }
    );
    console.log(myUploadWidget, "myUploadWidget");
    myUploadWidget.open();
  };

  return <Button onClick={uploadImageWidget}>Upload Image</Button>;
};

export default ImageUpload;
