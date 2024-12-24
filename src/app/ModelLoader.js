"use client";

import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const ModelLoader = ({ setModel }) => {
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
 }, [setModel]);

 return null;
};

export default ModelLoader;
