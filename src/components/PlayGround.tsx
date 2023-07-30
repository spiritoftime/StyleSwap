import { Info } from "lucide-react";
import { Toaster } from "./ui/toaster";
import { Cloudinary } from "@cloudinary/url-gen";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PlaygroundUpload from "./PlaygroundUpload";
import PlaygroundTransform from "./PlaygroundTransform";
const PlayGround = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [enableTransform, setEnableTransform] = useState(false);
  const [tab, setTab] = useState("transform-image");
  const [fileName, setFileName] = useState("mgpiwnzdi1dup3w6h61b.png");
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {},
    mode: "onChange",
  });
  const {
    control,
    watch,
    getValues,
    unregister,
    formState: { errors, isValid },
  } = form;
  const onSubmit = (data) => {};
  const cld = new Cloudinary({
    cloud: {
      cloud_name: import.meta.env.VITE_CLOUD_NAME, //Your cloud name
      upload_preset: import.meta.env.VITE_UPLOAD_PRESET, //Create an unsigned upload preset and update this
    },
  });
  return (
    <div className="flex flex-col gap-8 mx-12">
      <div className="flex items-center gap-4">
        <h2 className=" font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Playground
        </h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex gap-4" variant="outline">
              <Info />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Instructions for Playground</DialogTitle>
              <DialogDescription>How to get started</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {
                  "1) Upload an image - you can choose to upload an image or paste a url link containing the image"
                }
              </div>
              <div className="flex flex-col gap-2">
                {"2) Apply your transformation to see the magic!"}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setOpenDialog(false)} variant="outline">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="lg:w-[800px]  mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload-image">Upload Image</TabsTrigger>
          <TabsTrigger disabled={!enableTransform} value="transform-image">
            Transform Image
          </TabsTrigger>
        </TabsList>
        <TabsContent className="lg:w-[800px]" value="upload-image">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Upload an image first before you can play around with the
                transform playground.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <PlaygroundUpload
                setFileName={setFileName}
                setTab={setTab}
                setEnableTransform={setEnableTransform}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="lg:w-[800px]" value="transform-image">
          <Card>
            <CardHeader>
              <CardTitle>Transform</CardTitle>
              <CardDescription>
                Make your custom image! Click the info icon for instructions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <PlaygroundTransform />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* upload image */}
      <pre>{JSON.stringify(watch(), null, 2)}</pre>

      <Toaster />
    </div>
  );
};

export default PlayGround;
