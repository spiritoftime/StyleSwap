import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileIcon({ imageURL }) {
  return (
    <Avatar>
      <AvatarImage className="object-cover" src={imageURL} alt="user image" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
