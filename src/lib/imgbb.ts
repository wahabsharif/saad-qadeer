// src/lib/imgbb.ts
import axios from "axios";

const API_KEY =
  "https://api.imgbb.com/1/upload/e26a4b5adcd19b6d91738b832b26e687"; // Replace with your imgbb API key

export const uploadImageToImgbb = async (
  image: Buffer | string
): Promise<string> => {
  const formData = new FormData();

  // Convert Buffer to Blob if necessary
  let blob;
  if (typeof image === "string") {
    // If it's already a string (e.g., base64 encoded), use it directly
    blob = new Blob([image], { type: "image/jpeg" }); // Adjust the MIME type accordingly
  } else {
    // If it's a Buffer, convert it to a Blob
    blob = new Blob([image], { type: "image/jpeg" }); // Adjust the MIME type accordingly
  }

  formData.append("image", blob);

  try {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload/e26a4b5adcd19b6d91738b832b26e687",
      formData,
      {
        params: {
          key: API_KEY,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    throw new Error(`Image upload failed`);
  }
};
