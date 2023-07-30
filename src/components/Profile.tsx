import React, { useEffect, useRef, useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Edit, Loader2 } from "lucide-react";
import dummyPhoto from "@/assets/dummy.jpg";
import { profileZod } from "@/utils/profileZod";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router";
const Profile = () => {
  const { authDetails } = useAppContext();
  const { toast } = useToast();
  const inputRef = useRef(null);
  const [photoPreviewLink, setPhotoPreviewLink] = useState(
    authDetails && authDetails.photoURL
  );
  const navigate = useNavigate();
  const isLoading = false;
  const handleInputClick = () => {
    inputRef.current.click();
  };
  useEffect(() => {
    if (authDetails.uid) {
      form.reset({
        email: authDetails.email,
        displayName: authDetails.displayName,
      });
      setPhotoPreviewLink(authDetails.photoURL);
    }
  }, [authDetails]);
  const handlePhotoInput = (event) => {
    // Create a preview of the file before uploading it onto database
    setPhotoPreviewLink(URL.createObjectURL(event.target.files[0]));
  };
  const form = useForm({
    resolver: zodResolver(profileZod),
    defaultValues: {
      email: "",
      displayName: "",
    },
    mode: "onChange",
  });
  const {
    control,
    watch,
    getValues,
    unregister,
    formState: { errors, isValid },
  } = form;
  const onSubmit = async (data) => {
    console.log(data, "data");
    if (data.photo !== "") {
      const storageRef = ref(
        storage,
        `photos/${authDetails.uid}-profilephoto.png`
      );

      // Upload the photo onto Firebase storage with uploadBytes
      const snapshot = await uploadBytes(storageRef, data.photo);

      // Get the download url for the uploaded photo
      const photoUrl = await getDownloadURL(snapshot.ref);

      data.photoURL = photoUrl;
      delete data.photo;
    }

    updateProfile(authDetails, data)
      .then(() => {
        navigate("/");
        toast({
          description: "Profile Information Updated",
        });
      })
      .catch((error) => {
        console.log(error, "error");
      });
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
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                      handlePhotoInput(e);
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
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </div>
  );
};

export default Profile;
