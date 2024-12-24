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
  <div className="">
   <h1>Vegetable Detector</h1>
   <ModelLoader setModel={setModel} />
   <div>
    <button onClick={() => setIsUsingCamera(false)}>Upload Image</button>
    <button onClick={() => setIsUsingCamera(true)}>Use Camera</button>
   </div>
   {isUsingCamera ? (
    <Camera isUsingCamera={isUsingCamera} setImage={setImage} />
   ) : (
    <ImageUpload setImage={setImage} />
   )}
   {image && <img src={image} alt="Uploaded" style={{ maxWidth: "300px" }} />}
   <PredictionButton
    model={model}
    image={image}
    setPrediction={setPrediction}
    prediction={prediction}
   />
  </div>
 );
}
