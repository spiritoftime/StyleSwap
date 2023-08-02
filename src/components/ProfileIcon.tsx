import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileIcon({ imageURL }: { imageURL: string }) {
  return (
    <Avatar>
      <AvatarImage className="object-cover " src={imageURL} alt="user image" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
