"use client";

import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const nutritionData = {
 Bean: {
  name: "Bean",
  serving_size: "100g",
  calories: 31,
  macronutrients: {
   protein: 2.1,
   carbohydrates: 7,
   fat: 0.2,
   fiber: 2.7,
  },
  vitamins: {
   vitamin_C: "16mg",
   vitamin_K: "14.4µg",
   folate: "33µg",
  },
  minerals: {
   potassium: "211mg",
   magnesium: "25mg",
   iron: "0.7mg",
  },
 },
 Bitter_Gourd: {
  name: "Bitter_Gourd",
  serving_size: "100g",
  calories: 17,
  macronutrients: {
   protein: 1,
   carbohydrates: 3.7,
   fat: 0.2,
   fiber: 2.8,
  },
  vitamins: {
   vitamin_C: "84mg",
   folate: "72µg",
  },
  minerals: {
   potassium: "296mg",
   magnesium: "17mg",
   zinc: "0.8mg",
  },
 },
 Bottle_Gourd: {
  name: "Bottle_Gourd",
  serving_size: "100g",
  calories: 14,
  macronutrients: {
   protein: 0.6,
   carbohydrates: 3.4,
   fat: 0.2,
   fiber: 0.5,
  },
  vitamins: {
   vitamin_C: "10.1mg",
   folate: "6µg",
  },
  minerals: {
   potassium: "150mg",
   magnesium: "11mg",
   calcium: "20mg",
  },
 },
 Brinjal: {
  name: "Brinjal",
  serving_size: "100g",
  calories: 25,
  macronutrients: {
   protein: 1,
   carbohydrates: 6,
   fat: 0.2,
   fiber: 3,
  },
  vitamins: {
   vitamin_C: "2.2mg",
   vitamin_K: "3.5µg",
   folate: "22µg",
  },
  minerals: {
   potassium: "229mg",
   manganese: "0.23mg",
  },
 },
 Broccoli: {
  name: "Broccoli",
  serving_size: "100g",
  calories: 34,
  macronutrients: {
   protein: 2.8,
   carbohydrates: 6.6,
   fat: 0.4,
   fiber: 2.6,
  },
  vitamins: {
   vitamin_C: "89.2mg",
   vitamin_K: "101.6µg",
   folate: "63µg",
  },
  minerals: {
   potassium: "316mg",
   phosphorus: "66mg",
   calcium: "47mg",
  },
 },
 Cabbage: {
  name: "Cabbage",
  serving_size: "100g",
  calories: 25,
  macronutrients: {
   protein: 1.3,
   carbohydrates: 6,
   fat: 0.1,
   fiber: 2.5,
  },
  vitamins: {
   vitamin_C: "36.6mg",
   vitamin_K: "76µg",
   folate: "43µg",
  },
  minerals: {
   potassium: "170mg",
   calcium: "40mg",
   manganese: "0.16mg",
  },
 },
 Capsicum: {
  name: "Capsicum",
  serving_size: "100g",
  calories: 31,
  macronutrients: {
   protein: 1,
   carbohydrates: 6,
   fat: 0.3,
   fiber: 2.1,
  },
  vitamins: {
   vitamin_C: "127.7mg",
   vitamin_A: "3131IU",
   vitamin_B6: "0.29mg",
  },
  minerals: {
   potassium: "211mg",
  },
 },
 Carrot: {
  name: "Carrot",
  serving_size: "100g",
  calories: 41,
  macronutrients: {
   protein: 0.9,
   carbohydrates: 10,
   fat: 0.2,
   fiber: 2.8,
  },
  vitamins: {
   vitamin_A: "16706IU",
   vitamin_K: "13.2µg",
   vitamin_C: "5.9mg",
  },
  minerals: {
   potassium: "320mg",
   sodium: "69mg",
  },
 },
 Cauliflower: {
  name: "Cauliflower",
  serving_size: "100g",
  calories: 25,
  macronutrients: {
   protein: 1.9,
   carbohydrates: 5,
   fat: 0.3,
   fiber: 2,
  },
  vitamins: {
   vitamin_C: "48.2mg",
   vitamin_K: "15.5µg",
   folate: "57µg",
  },
  minerals: {
   potassium: "299mg",
   sodium: "30mg",
  },
 },
 Cucumber: {
  name: "Cucumber",
  serving_size: "100g",
  calories: 15,
  macronutrients: {
   protein: 0.7,
   carbohydrates: 3.6,
   fat: 0.1,
   fiber: 0.5,
  },
  vitamins: {
   vitamin_K: "16.4µg",
   vitamin_C: "2.8mg",
  },
  minerals: {
   potassium: "147mg",
   magnesium: "13mg",
  },
 },
 Papaya: {
  name: "Papaya",
  serving_size: "100g",
  calories: 43,
  macronutrients: {
   protein: 0.5,
   carbohydrates: 11,
   fat: 0.3,
   fiber: 1.7,
  },
  vitamins: {
   vitamin_C: "60.9mg",
   vitamin_A: "950IU",
   folate: "37µg",
  },
  minerals: {
   potassium: "182mg",
   calcium: "20mg",
  },
 },
 Potato: {
  name: "Potato",
  serving_size: "100g",
  calories: 77,
  macronutrients: {
   protein: 2,
   carbohydrates: 17,
   fat: 0.1,
   fiber: 2.2,
  },
  vitamins: {
   vitamin_C: "19.7mg",
   vitamin_B6: "0.3mg",
   folate: "16µg",
  },
  minerals: {
   potassium: "421mg",
   phosphorus: "57mg",
  },
 },
 Pumpkin: {
  name: "Pumpkin",
  serving_size: "100g",
  calories: 26,
  macronutrients: {
   protein: 1,
   carbohydrates: 7,
   fat: 0.1,
   fiber: 0.5,
  },
  vitamins: {
   vitamin_A: "8513IU",
   vitamin_C: "9mg",
   vitamin_E: "1.06mg",
  },
  minerals: {
   potassium: "340mg",
   phosphorus: "44mg",
  },
 },
 Radish: {
  name: "Radish",
  serving_size: "100g",
  calories: 16,
  macronutrients: {
   protein: 0.7,
   carbohydrates: 3.4,
   fat: 0.1,
   fiber: 1.6,
  },
  vitamins: {
   vitamin_C: "14.8mg",
   folate: "25µg",
  },
  minerals: {
   potassium: "233mg",
   calcium: "25mg",
  },
 },
 Tomato: {
  name: "Tomato",
  serving_size: "100g",
  calories: 18,
  macronutrients: {
   protein: 0.9,
   carbohydrates: 3.9,
   fat: 0.2,
   fiber: 1.2,
  },
  vitamins: {
   vitamin_C: "13.7mg",
   vitamin_A: "833IU",
   vitamin_K: "7.9µg",
  },
  minerals: {
   potassium: "237mg",
  },
 },
};

export default function Home() {
 const videoRef = useRef(null);
 const canvasRef = useRef(null);
 const [model, setModel] = useState(null);
 const [prediction, setPrediction] = useState("");
 const [image, setImage] = useState(null); // For the uploaded image or captured snapshot
 const [isUsingCamera, setIsUsingCamera] = useState(false); // To toggle between image upload and camera
 const [nutritionInfo, setNutritionInfo] = useState(null);

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

 // Initialize or stop the camera
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
   // Stop the camera when toggling away from camera mode
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

   // The camera feed remains active; no need to stop tracks here
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
    console.log("🚀 ~ imgElement.onload= ~ predictions:", predictions);
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

    if (predictions.length === labels.length) {
     const maxIndex = predictions.indexOf(Math.max(...predictions));
     const predictedLabel = labels[maxIndex];
     setPrediction(predictedLabel);
     console.log("Prediction:", predictedLabel);

     // Set nutrition info based on prediction
     setNutritionInfo(nutritionData[predictedLabel]);
    } else {
     console.error("Mismatch between prediction count and label count.");
    }

    imageTensor.dispose(); // Clean up memory after use
   };
  }
 };

 // Handle image upload
 const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
   const reader = new FileReader();
   reader.onload = () => setImage(reader.result);
   reader.readAsDataURL(file);
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
     {nutritionInfo && (
      <div>
       <h3>Nutrition Information:</h3>
       <p>
        <strong>Serving Size:</strong> {nutritionInfo.serving_size}
       </p>
       <p>
        <strong>Calories:</strong> {nutritionInfo.calories} kcal
       </p>
       <h4>Macronutrients:</h4>
       <ul>
        <li>Protein: {nutritionInfo.macronutrients.protein}g</li>
        <li>Carbohydrates: {nutritionInfo.macronutrients.carbohydrates}g</li>
        <li>Fat: {nutritionInfo.macronutrients.fat}g</li>
        <li>Fiber: {nutritionInfo.macronutrients.fiber}g</li>
       </ul>
       <h4>Vitamins:</h4>
       <ul>
        {Object.entries(nutritionInfo.vitamins).map(([key, value]) => (
         <li key={key}>
          {key.replace("_", " ")}: {value}
         </li>
        ))}
       </ul>
       <h4>Minerals:</h4>
       <ul>
        {Object.entries(nutritionInfo.minerals).map(([key, value]) => (
         <li key={key}>
          {key.replace("_", " ")}: {value}
         </li>
        ))}
       </ul>
      </div>
     )}
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
     {nutritionInfo && (
      <div>
       <h3>Nutrition Information:</h3>
       <p>
        <strong>Serving Size:</strong> {nutritionInfo.serving_size}
       </p>
       <p>
        <strong>Calories:</strong> {nutritionInfo.calories} kcal
       </p>
       <h4>Macronutrients:</h4>
       <ul>
        <li>Protein: {nutritionInfo.macronutrients.protein}g</li>
        <li>Carbohydrates: {nutritionInfo.macronutrients.carbohydrates}g</li>
        <li>Fat: {nutritionInfo.macronutrients.fat}g</li>
        <li>Fiber: {nutritionInfo.macronutrients.fiber}g</li>
       </ul>
       <h4>Vitamins:</h4>
       <ul>
        {Object.entries(nutritionInfo.vitamins).map(([key, value]) => (
         <li key={key}>
          {key.replace("_", " ")}: {value}
         </li>
        ))}
       </ul>
       <h4>Minerals:</h4>
       <ul>
        {Object.entries(nutritionInfo.minerals).map(([key, value]) => (
         <li key={key}>
          {key.replace("_", " ")}: {value}
         </li>
        ))}
       </ul>
      </div>
     )}
    </div>
   )}
  </div>
 );
}
