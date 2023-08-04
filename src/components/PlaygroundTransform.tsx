import { useState } from "react";
import dummy from "../assets/dummy.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/context/appContext";
import { getDatabase, push, ref, set } from "firebase/database";
import { transformImage } from "./services/transform";
import { Loader2 } from "lucide-react";

const PlaygroundTransform = ({ fileName }: { fileName: string }) => {
  const [replaceWith, setReplaceWith] = useState("");
  const [toReplace, setToReplace] = useState("");
  const [preview, setPreview] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const db = getDatabase();
  // console.log(preview, "preview");
  const { authDetails } = useAppContext();

  let userId: string | null = null;
  if (authDetails) userId = authDetails.uid;
  const [error, setError] = useState("");

  const { mutate: transformCloudinaryMutation } = useMutation(
    ({
      fileName,
      prompt,
    }: {
      fileName: string;
      prompt: string;
    }): Promise<string> => {
      return transformImage(userId, fileName, prompt);
    },
    {
      onSuccess: (cloudinaryData: string) => {
        const getImageUrlFromImageElementString = (
          imageElementString: string
        ) => {
          const srcRegex = /<img\s+src=['"](.*?)['"].*\/?>/i;
          const match = srcRegex.exec(imageElementString);
          return match ? match[1] : null;
        };
        const url = getImageUrlFromImageElementString(cloudinaryData);
        setPreview(url);
        const transformedImageRef = push(
          ref(db, `transformedImages/${userId}`)
        );
        set(transformedImageRef, { photoURL: url });

        setIsLoading(false);
      },
    }
  );
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!toReplace || !replaceWith) setError("Please fill in both fields");
    // "gen_replace:from_shirt;to_suit_jacket"
    const prompt = `gen_replace:from_${toReplace};to_${replaceWith}`;
    transformCloudinaryMutation({
      fileName,
      prompt,
    });
  };
  return (
    <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
      <form className="" onSubmit={submitHandler}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 ">
            <Label className="whitespace-nowrap" htmlFor="what-to-replace">
              What To Replace:
            </Label>
            <Input
              onChange={(e) => setToReplace(e.target.value)}
              id="what-to-replace"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-4 ">
            <Label className="whitespace-nowrap" htmlFor="replace-with">
              To Replace With:
            </Label>
            <Input
              onChange={(e) => setReplaceWith(e.target.value)}
              id="replace-with"
              type="text"
            />
          </div>
          <Button type="submit">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-muted-foreground">
          Your Image
        </p>
        {preview ? (
          <figure>
            <a href={preview} target="_blank" rel="noopener noreferrer">
              <img
                src={preview}
                className="w-[250px] h-[250px] object-cover	"
                alt="Your uploaded Image"
              />
            </a>
          </figure>
        ) : (
          <img className="w-[250px] h-[250px] object-cover" src={dummy} />
        )}
      </div>
    </div>
  );
};

export default PlaygroundTransform;
