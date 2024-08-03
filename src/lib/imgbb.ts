import axios from "axios";
import FormData from "form-data";

const API_KEY = "e26a4b5adcd19b6d91738b832b26e687"; // Your imgbb API key

export const uploadImageToImgbb = async (
  image: Buffer | string
): Promise<string> => {
  const formData = new FormData();

  // Convert image to FormData
  if (typeof image === "string") {
    formData.append("image", image);
  } else {
    formData.append("image", image, { filename: "image.jpg" }); // Adjust filename as necessary
  }

  try {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        params: {
          key: API_KEY,
        },
        headers: formData.getHeaders(),
      }
    );

    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Image upload failed: ${error.message}`);
    } else {
      throw new Error("Image upload failed");
    }
  }
};
