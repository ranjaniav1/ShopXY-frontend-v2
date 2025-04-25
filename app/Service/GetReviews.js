import { httpAxios } from "../httpAxios";

export async function GetSpecificProductReview({ id }) {
  try {
    const response = await httpAxios.get(`/user/review/product/${id}`);
    console.log("product review", response.data);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}


export async function GetSpecificBrandReview({ id }) {
  try {
    const response = await httpAxios.get(`/user/review/brand/${id}`);
    console.log("brand review", response.data);
    return response.data;
  } catch (error) {
    console.log("error in category", error);
  }
}


export async function SubmitBrandReview({ id, userId, rating, review, mediaFiles }) {
  try {
    const formData = new FormData();
    formData.append("id", id);       // Brand ID
    formData.append("userId", userId); // User ID
    formData.append("rating", rating); // Review rating
    formData.append("review", review); // Review text

    // Append all media files to the FormData
    if (mediaFiles && mediaFiles.length > 0) {
      mediaFiles.forEach((file) => formData.append("media", file));
    }

    const response = await httpAxios.post(`/user/review/brand`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the header for file uploads
      },
    });
    console.log("Review submitted successfully", response.data);
    return response.data; // Return success response
  } catch (error) {
    console.error("Error submitting brand review", error);
    throw error;
  }
}


export async function SubmitProductReview({ id, userId, rating, review, mediaFiles }) {
  try {
    const formData = new FormData();
    formData.append("id", id);       // Brand ID
    formData.append("userId", userId); // User ID
    formData.append("rating", rating); // Review rating
    formData.append("review", review); // Review text

    // Append all media files to the FormData
    if (mediaFiles && mediaFiles.length > 0) {
      mediaFiles.forEach((file) => formData.append("media", file));
    }

    const response = await httpAxios.post(`/user/review/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the header for file uploads
      },
    });

    console.log("Review submitted successfully", response.data);
    await GetSpecificProductReview(id)

    return response.data; // Return success response
  } catch (error) {
    console.error("Error submitting brand review", error);
    throw error;
  }
}