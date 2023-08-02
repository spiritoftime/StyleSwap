import { Info } from "lucide-react";
import { Toaster } from "./ui/toaster";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/appContext";
import MasonryGrid from "./MasonryGrid";

const PersonalPictures = () => {
  const [tab, setTab] = useState("uploaded-images");
  const [uploadedImages, setUploadedImages] = useState(null);
  const [transformedImages, setTransformedImages] = useState(null);
  const {
    authDetails: { uid: userId },
  } = useAppContext();
  useEffect(() => {
    const db = getDatabase();
    const uploadedImagesRef = ref(db, "uploadedImages/" + userId);

    const handleDataChange = (snapshot) => {
      const data = snapshot.val();
      setUploadedImages(Object.values(data));
      console.log(data);
    };

    const unsubscribe = onValue(uploadedImagesRef, handleDataChange);

    // Clean up the event listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [userId]); // Run the effect whenever the userId changes

  return (
    <div className="flex flex-col gap-8 mx-12">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="lg:w-[800px]  mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="uploaded-images">Uploaded Images</TabsTrigger>
          <TabsTrigger value="transformed-images">
            Transformed Images
          </TabsTrigger>
        </TabsList>
        <TabsContent className="lg:w-[800px]" value="uploaded-images">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Images</CardTitle>
              <CardDescription>
                View all your uploaded images. Click any of them to open it in a
                new tab for downloading.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {uploadedImages && (
                <MasonryGrid uploadedImages={uploadedImages} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="lg:w-[800px]" value="transformed-images">
          <Card>
            <CardHeader>
              <CardTitle>Transformed Images</CardTitle>
              <CardDescription>
                Make your custom image! Type what you want to replace and what
                to replace with. Click the info icon at playground header for
                more info.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">Hii </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalPictures;
