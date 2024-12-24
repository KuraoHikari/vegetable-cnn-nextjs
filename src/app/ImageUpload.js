"use client";

import { useState } from "react";

const ImageUpload = ({ setImage }) => {
 const [fileName, setFileName] = useState("");

 const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
   setFileName(file.name);
   const reader = new FileReader();
   reader.onload = () => setImage(reader.result);
   reader.readAsDataURL(file);
  }
 };

 return (
  <div className="flex flex-col items-center justify-center mt-4 space-y-2">
   <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">Choose an Image</label>
   <input id="file-upload" type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="hidden"/>
   {fileName && (
    <p className="text-sm text-gray-700 mt-2">Selected File: <span className="font-medium text-gray-900">{fileName}</span></p>
   )}
  </div>
 );
};

export default ImageUpload;
