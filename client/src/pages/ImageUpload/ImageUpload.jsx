import React, { useState } from "react";
import axios from "axios";
import baseUrl from "../../data/baseUrl";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null); // URL of the uploaded image

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      const result = await axios.post(baseUrl + "/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("akif: ", result.data.imagePath);
      // Assuming the backend returns the URL of the uploaded image
      setImageUrl(result.data.imagePath);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        />
        <input onChange={(e) => setDescription(e.target.value)} type="text" />
        <button type="submit">Submit</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}{" "}
      {/* Display the uploaded image */}
    </div>
  );
}
