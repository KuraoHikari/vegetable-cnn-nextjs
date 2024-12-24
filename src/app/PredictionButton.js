"use client";

import * as tf from "@tensorflow/tfjs";
import { useState } from "react";
import nutritionData from "./nutrionData";

const PredictionButton = ({ model, image, setPrediction, prediction }) => {
 const [nutritionInfo, setNutritionInfo] = useState(null);

 const handleImagePrediction = async () => {
  if (model && image) {
   const imgElement = document.createElement("img");
   imgElement.src = image;

   imgElement.onload = async () => {
    const imageTensor = tf.browser
     .fromPixels(imgElement)
     .resizeBilinear([150, 150])
     .expandDims(0)
     .toFloat()
     .div(255.0);

    const predictions = await model.predict(imageTensor).data();
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
    const maxIndex = predictions.indexOf(Math.max(...predictions));
    const predictedLabel = labels[maxIndex];
    setPrediction(predictedLabel);

    setNutritionInfo(nutritionData[predictedLabel]);
    imageTensor.dispose();
   };
  }
 };

 return (
  <div>
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
 );
};

export default PredictionButton;
