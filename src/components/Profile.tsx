import { useEffect, useRef, useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {
  getDatabase,
  ref as dbRef,
  child,
  remove,
  get,
} from "firebase/database";
import { SubmitHandler } from "react-hook-form";

import { storage } from "../firebase";
import { useAppContext } from "@/context/appContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { updateProfile } from "firebase/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Edit, Loader2 } from "lucide-react";
import dummyPhoto from "@/assets/dummy.jpg";
import { profileZod } from "@/utils/profileZod";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { deleteData, deleteImages } from "./services/upload";
import { Toaster } from "./ui/toaster";
interface UploadedImage {
  extension: string;
  fileName: string;
  photoURL: string;
  publicId: string;
}
const Profile = () => {
  const { authDetails } = useAppContext();
  const form = useForm({
    resolver: zodResolver(profileZod),
    defaultValues: {
      email: "",
      displayName: "",
      photo: null,
      photoURL: null,
    },
    mode: "onChange",
  });
  const { toast } = useToast();
  const DB = getDatabase();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoPreviewLink, setPhotoPreviewLink] = useState(
    authDetails && authDetails.photoURL
  );

  const navigate = useNavigate();
  const handleInputClick = () => {
    inputRef.current && inputRef.current.click();
  };
  useEffect(() => {
    if (authDetails && authDetails.uid) {
      form.reset({
        email: authDetails.email!,
        displayName: authDetails.displayName!,
      });
      setPhotoPreviewLink(authDetails.photoURL);
    }
  }, [authDetails, form]);
  const handlePhotoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Create a preview of the file before uploading it onto database
    if (event.target.files && event.target.files[0])
      setPhotoPreviewLink(URL.createObjectURL(event.target.files[0]));
  };
  type submitData = {
    email: string;
    displayName: string;
    photo?: File | Blob | Uint8Array | ArrayBuffer | null;
    photoURL: string | null;
  };

  const onSubmit: SubmitHandler<submitData> = async (data: submitData) => {
    setIsLoading(true);
    if (data.photo) {
      const storageRef = ref(
        storage,
        `photos/${authDetails?.uid}-profilephoto.png`
      );

      // Upload the photo onto Firebase storage with uploadBytes
      const snapshot = await uploadBytes(storageRef, data.photo);

      // Get the download url for the uploaded photo
      const photoUrl = await getDownloadURL(snapshot.ref);

      data.photoURL = photoUrl;
      delete data.photo;
    } else if (authDetails) {
      data.photoURL = authDetails?.photoURL ?? null;
      updateProfile(authDetails, data)
        .then(() => {
          // console.log("success");
          setIsLoading(false);
          navigate("/");
          toast({
            description: "Profile Information Updated",
          });
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error, "error");
        });
    }
  };
  //   sample deletecloudinary response - https://cloudinary.com/documentation/admin_api#delete_resources
  // {
  //     "deleted": {
  //         "image1": "deleted",
  //         "image2": "deleted"
  //     },
  //     "partial": false
  // }
  type CloudinaryData = {
    deleted: Record<string, string>;
    partial: boolean;
  };
  const { mutate: deleteCloudinaryMutation } = useMutation(
    (data: deleteData): Promise<CloudinaryData> => {
      // console.log("mutation data", data);
      if (authDetails) return deleteImages(authDetails.uid, data);
      else {
        return Promise.reject(
          new Error("Authentication details are not available.")
        );
      }
    },
    {
      onSuccess: (cloudinaryData: CloudinaryData) => {
        console.log(cloudinaryData, "delete cloudinaryData");
        // delete firebase records
        const userRef = dbRef(DB, "uploadedImages/" + authDetails?.uid);
        remove(userRef)
          .then(() => {
            // console.log("Data removed successfully.");
            toast({
              description: "Your photos have been removed",
            });
          })
          .catch((error) => {
            console.error("Error removing data:", error);
          });
        setIsLoading(false);
      },
    }
  );
  const deletePictureHandler = () => {
    console.log("delete running");
    // fetch public ids from firebase
    if (authDetails) {
      const DBRef = dbRef(DB);

      get(child(DBRef, `uploadedImages/${authDetails.uid}`)).then(
        (snapshot) => {
          // console.log(snapshot, "snapshot");
          if (snapshot.exists()) {
            const data = snapshot.val() as { [key: string]: UploadedImage };
            console.log(data, "data snapshot");
            const publicIds = Object.values(data).map((item) => item.publicId);
            deleteCloudinaryMutation({ publicId: publicIds });
          } else {
            console.log("No data available");
          }
        }
      );
      // const uploadedImageRef = dbRef(db, "uploadedImages/" + authDetails.uid);
      // uploadedImageRef.once("value").then((snapshot) => {
      //   const userData = snapshot.val();
      //   console.log("userData", userData);
      // });
    }
  };
  return (
    <div className="w-[60%] mx-auto  ">
      <button type="button" onClick={handleInputClick} className="mt-10">
        <div className="relative">
          <img
            src={photoPreviewLink ? photoPreviewLink : dummyPhoto}
            alt="user photo"
            width="120px"
            className="rounded-lg shadow-lg"
          />
          <Edit className="absolute bottom-[-9px] right-[-15px] text-[#0D05F2] shadow-lg" />
        </div>
      </button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    ref={inputRef}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selectedFiles = e.target.files;
                      if (selectedFiles && selectedFiles.length > 0) {
                        field.onChange(selectedFiles[0]);
                        handlePhotoInput(e);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap justify-between gap-y-6 gap-x-0.5 mt-4">
            <div className="w-[80%]">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="displayName">Display Name:</FormLabel>
                    <FormControl>
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Display Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* email */}
            <div className="w-[80%]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className="bg-[#0D05F2] text-white font-semibold hover:bg-[#3D35FF] mt-5"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Profile Information"
            )}
          </Button>
        </form>
      </Form>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="mt-6" variant="destructive">
            Delete Pictures
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              your uploaded images (except profile image) and remove your data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deletePictureHandler}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </div>
  );
};

export default Profile;
