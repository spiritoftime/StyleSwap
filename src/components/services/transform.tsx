import { makeRequest } from "./makeRequest";

export function transformImage(
  userId: string | null,
  fileName: string,
  effect: string
) {
  return makeRequest(`/transform/${userId}`, {
    method: "POST",
    data: { fileName, effect },
  });
}
