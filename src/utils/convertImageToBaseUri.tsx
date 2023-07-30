export const convertImageToBaseUri = (file: File): Promise<string> => {
  const reader = new FileReader();
  // Create a Promise to make the function asynchronous
  const readAsDataURLPromise = new Promise((resolve, reject) => {
    // Read the file as a Data URL (Base64)
    reader.readAsDataURL(file);

    // When the file reading is completed, resolve the Promise with the base64URI
    reader.onloadend = function () {
      const base64URI = reader.result;
      resolve(base64URI);
    };

    // If there's an error during reading, reject the Promise
    reader.onerror = function () {
      reject(reader.error);
    };
  });

  // Return the Promise so that we can use async/await or .then() outside the function
  return readAsDataURLPromise;
};
