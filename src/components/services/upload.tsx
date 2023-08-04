import { makeRequest } from "./makeRequest";
type userId = string;

export type deleteData = {
  publicId: string[];
};
type CloudinaryData = {
  deleted: Record<string, string>;
  partial: boolean;
};
export function uploadImage(userId: userId, data: FormData) {
  return makeRequest(`/uploads/${userId}`, {
    method: "POST",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function deleteImages(
  userId: userId,
  data: deleteData
): Promise<CloudinaryData> {
  return makeRequest(`/uploads/${userId}`, {
    method: "DELETE",
    data: data,
  });
}
