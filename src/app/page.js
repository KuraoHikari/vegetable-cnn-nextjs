"use client";

import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function Home() {
 const videoRef = useRef(null);
 const canvasRef = useRef(null);
 const [model, setModel] = useState(null);
 const [prediction, setPrediction] = useState("");
 const [image, setImage] = useState(null); // For the uploaded image or captured snapshot
 const [isUsingCamera, setIsUsingCamera] = useState(false); // To toggle between image upload and camera

 // Load the TensorFlow.js model
 useEffect(() => {
  const loadModel = async () => {
   try {
    const loadedModel = await tf.loadLayersModel("/web_model/model.json");
    setModel(loadedModel);
    console.log("Model loaded successfully");
   } catch (error) {
    console.error("Error loading model:", error);
   }
  };
  loadModel();
 }, []);

 // Initialize the camera
 useEffect(() => {
  if (isUsingCamera) {
   const setupCamera = async () => {
    try {
     const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
     });
     videoRef.current.srcObject = stream;
     videoRef.current.play();
    } catch (error) {
     console.error("Error accessing the camera:", error);
    }
   };
   setupCamera();
  } else {
   // Stop the camera when not in use
   if (videoRef.current && videoRef.current.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
   }
  }
 }, [isUsingCamera]);

 // Handle capturing a picture from the camera
 const handleCapturePicture = () => {
  if (videoRef.current && canvasRef.current) {
   const canvas = canvasRef.current;
   const context = canvas.getContext("2d");
   const video = videoRef.current;

   // Draw the current video frame to the canvas
   canvas.width = video.videoWidth;
   canvas.height = video.videoHeight;
   context.drawImage(video, 0, 0, canvas.width, canvas.height);

   // Convert the canvas content to a data URL for display
   const imageDataUrl = canvas.toDataURL("image/png");
   setImage(imageDataUrl);

   // Stop the camera after taking the picture
   const tracks = video.srcObject.getTracks();
   tracks.forEach((track) => track.stop());
  }
 };

 // Handle image prediction
 const handleImagePrediction = async () => {
  if (model && image) {
   const imgElement = document.createElement("img");
   imgElement.src = image;

   imgElement.onload = async () => {
    const imageTensor = tf.browser
     .fromPixels(imgElement)
     .resizeBilinear([150, 150]) // Resize to match model input size
     .expandDims(0) // Add batch dimension
     .toFloat()
     .div(255.0); // Normalize the image

    const predictions = await model.predict(imageTensor).data();
    const maxIndex = predictions.indexOf(Math.max(...predictions));

    // Update prediction state with the class label
    const labels = [
     "Bean",
     "Bitter_Gourd",
     "Bottle_Gourd",
     "Brinjal",
     "Broccoli",
     "Cabbage",
     "Capsicum",
     "Carrot",
     "Cauliflower",
     "Cucumber",
     "Papaya",
     "Potato",
     "Pumpkin",
     "Radish",
     "Tomato",
    ];
    setPrediction(labels[maxIndex]);

    imageTensor.dispose(); // Clean up memory after use
   };
  }
 };

 return (
  <div>
   <h1>Vegetable Detector</h1>

   {/* Toggle between Image Upload and Camera */}
   <div>
    <button onClick={() => setIsUsingCamera(false)}>Upload Image</button>
    <button onClick={() => setIsUsingCamera(true)}>Use Camera</button>
   </div>

   {/* Camera Mode */}
   {isUsingCamera && (
    <div>
     <video ref={videoRef} style={{ display: "block", maxWidth: "100%" }} />
     <canvas ref={canvasRef} style={{ display: "none" }} />
     <button onClick={handleCapturePicture}>Take Picture</button>
     {image && (
      <div>
       <img src={image} alt="Captured" style={{ maxWidth: "300px" }} />
       <button onClick={handleImagePrediction} disabled={!model}>
        Predict
       </button>
      </div>
     )}
     <h2>Prediction: {prediction}</h2>
    </div>
   )}

   {/* Image Upload Mode */}
   {!isUsingCamera && (
    <div>
     <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e)}
     />
     {image && <img src={image} alt="Uploaded" style={{ maxWidth: "300px" }} />}
     <button onClick={handleImagePrediction} disabled={!image || !model}>
      Predict
     </button>
     <h2>Prediction: {prediction}</h2>
    </div>
   )}
  </div>
 );
}
