"use client";

import { useState } from "react";
import ModelLoader from "./ModelLoader";
import Camera from "./Camera";
import ImageUpload from "./ImageUpload";
import PredictionButton from "./PredictionButton";

export default function Home() {
 const [model, setModel] = useState(null);
 const [image, setImage] = useState(null);
 const [isUsingCamera, setIsUsingCamera] = useState(false);
 const [prediction, setPrediction] = useState("");

 return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
   <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">VEGETABLE DETECTOR</h1>
    <ModelLoader setModel={setModel} />
    <div className="flex justify-center space-x-4 my-4">
     <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => setIsUsingCamera(false)} >
      Upload Image
     </button>
     <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400" onClick={() => setIsUsingCamera(true)}>
      Use Camera
     </button>
    </div>
    {isUsingCamera ? (
     <Camera isUsingCamera={isUsingCamera} setImage={setImage} /> ) : ( <ImageUpload setImage={setImage} />)}
    {image && (
     <img src={image} alt="Uploaded" className="mt-4 rounded-lg border border-gray-300 mx-auto max-w-full h-auto" style={{ maxWidth: "300px" }}/>
    )}
    <PredictionButton
     model={model}
     image={image}
     setPrediction={setPrediction}
     prediction={prediction}
    />
    {prediction && (
     <p className="text-center text-sm text-gray-700 mt-4">
      Prediction: <span className="font-bold">{prediction}</span>
     </p>
    )}
   </div>
  </div>
 );
}
