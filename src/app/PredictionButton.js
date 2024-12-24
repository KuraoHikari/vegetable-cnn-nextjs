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
  <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
   <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
    onClick={handleImagePrediction}
    disabled={!image || !model}>
    Predict
   </button>
   <h2 className="text-lg font-semibold text-gray-800"> Prediction: <span className="text-blue-500">{prediction || "N/A"}</span>
   </h2>
   {nutritionInfo && (
    <div className="mt-4 bg-gray-50 p-4 rounded-md shadow-inner">
     <h3 className="text-xl font-semibold text-green-600 mb-2"> Nutrition Information </h3>
     <p className="text-sm text-gray-700">
      <strong>Serving Size:</strong> {nutritionInfo.serving_size}
     </p>
     <p className="text-sm text-gray-700">
      <strong>Calories:</strong> {nutritionInfo.calories} kcal
     </p>
     <h4 className="text-md font-semibold text-gray-800 mt-3">Macronutrients:</h4>
     <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
      <li>Protein: {nutritionInfo.macronutrients.protein}g</li>
      <li>Carbohydrates: {nutritionInfo.macronutrients.carbohydrates}g</li>
      <li>Fat: {nutritionInfo.macronutrients.fat}g</li>
      <li>Fiber: {nutritionInfo.macronutrients.fiber}g</li>
     </ul>
     <h4 className="text-md font-semibold text-gray-800 mt-3">Vitamins:</h4>
     <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
      {Object.entries(nutritionInfo.vitamins).map(([key, value]) => (
       <li key={key}>
        {key.replace("_", " ")}: {value}
       </li>
      ))}
     </ul>
     <h4 className="text-md font-semibold text-gray-800 mt-3">Minerals:</h4>
     <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
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
