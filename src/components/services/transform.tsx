import { makeRequest } from "./makeRequest";

export function transformImage(userId, fileName, effect) {
  return makeRequest(`/transform/${userId}`, {
    method: "POST",
    data: { fileName, effect },
  });
}
