import { makeRequest } from "./makeRequest";

export function transformImage(
  userId: number,
  fileName: string,
  effect: string
) {
  return makeRequest(`/transform/${userId}`, {
    method: "POST",
    data: { fileName, effect },
  });
}
