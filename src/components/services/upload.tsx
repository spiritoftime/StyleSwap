import { makeRequest } from "./makeRequest";
type userId = string;
export type uploadData = {
  file: string;
};
type deleteData = {
  public_id: string;
};
export function uploadImage(userId: userId, data: uploadData) {
  return makeRequest(`/uploads/${userId}`, {
    method: "POST",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function deleteImage(userId: userId, data: deleteData) {
  return makeRequest(`/uploads/${userId}`, {
    method: "DELETE",
    data: data,
  });
}
