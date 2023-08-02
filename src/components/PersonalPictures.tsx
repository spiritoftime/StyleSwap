import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User as FirebaseUser } from "firebase/auth";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/appContext";
import MasonryGrid from "./MasonryGrid";
type SnapshotCallback = (snapshot: DataSnapshot) => void;
interface UploadedImage {
  extension: string;
  fileName: string;
  photoURL: string;
  publicId: string;
}
interface TransformedImage {
  photoURL: string;
}
const PersonalPictures = () => {
  const [tab, setTab] = useState("uploaded-images");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[] | null>(
    null
  );
  const [transformedImages, setTransformedImages] = useState<
    TransformedImage[] | null
  >(null);

  const {
    authDetails: { uid: userId },
  }: { authDetails: FirebaseUser | object } = useAppContext();

  useEffect(() => {
    const db = getDatabase();
    const uploadedImagesRef = ref(db, "uploadedImages/" + userId);
    const transformedImagesRef = ref(db, "transformedImages/" + userId);
    const handleDataChange: SnapshotCallback = (snapshot) => {
      const data = snapshot.val();
      setUploadedImages(Object.values(data));
    };

    const handleTransformedChange: SnapshotCallback = (snapshot) => {
      const data = snapshot.val();
      setTransformedImages(Object.values(data));
    };
    const unsubscribe = onValue(uploadedImagesRef, handleDataChange);
    const unsubscribeTransformed = onValue(
      transformedImagesRef,
      handleTransformedChange
    );

    // Clean up the event listener when the component unmounts
    return () => {
      unsubscribe();
      unsubscribeTransformed();
    };
  }, [userId]); // Run the effect whenever the userId changes

  return (
    <div className="flex flex-col gap-8 m-12">
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
                View all your transformed images. Click any of them to open it
                in a new tab for downloading.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {transformedImages && (
                <MasonryGrid uploadedImages={transformedImages} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalPictures;
