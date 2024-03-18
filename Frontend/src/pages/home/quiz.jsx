import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon from react-icons library

const Quiz = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    setLoading(true); // Set loading to true while waiting for prediction
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/extract_text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setExtractedText(data.extracted_text);
      setImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after prediction is complete
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="quiz-container bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6 relative text-center h-80 flex flex-col justify-center">
        {loading && (
          <div className="flex flex-col justify-center items-center h-full">
            <FaSpinner className="animate-spin text-cyan text-6xl" style={{ background: "none" }} /> {/* Using React Icons spinner */}
          </div>
        )}
        {image && (
          <div className="flex flex-col justify-center items-center h-full">
            <img src={image} alt="Uploaded Prescription" className="w-96 h-auto mr-4 rounded-lg" />
            {extractedText && (
              <div className="text-left mt-4">
                <h2 className="text-lg font-semibold mb-2">Extracted Text:</h2>
                <p className="text-lg">{extractedText}</p>
              </div>
            )}
          </div>
        )}
        {!image && !loading && (
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">ScriptScan</h1>
            <p className="text-xl mb-6">Upload a clear image of the doctor's prescription</p>
            <label htmlFor="upload" className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
              Upload Image
            </label>
            <input type="file" id="upload" className="hidden" onChange={handleImageUpload} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
