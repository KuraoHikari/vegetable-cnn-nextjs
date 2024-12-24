"use client";

import { useRef, useEffect, useState } from "react";

const Camera = ({ isUsingCamera, setImage }) => {
 const videoRef = useRef(null);
 const canvasRef = useRef(null);
 const [isVideoLoaded, setIsVideoLoaded] = useState(false);

 useEffect(() => {
  if (isUsingCamera) {
   const setupCamera = async () => {
    try {
     const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
     });
     videoRef.current.srcObject = stream;

     // Listen for the loadeddata event to ensure the video is ready
     videoRef.current.addEventListener("loadeddata", () => {
      setIsVideoLoaded(true);
     });

     await videoRef.current.play();
    } catch (error) {
     console.error("Error accessing the camera:", error);
    }
   };
   setupCamera();
  } else {
   if (videoRef.current && videoRef.current.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsVideoLoaded(false);
   }
  }
 }, [isUsingCamera]);

 const handleCapturePicture = () => {
  if (videoRef.current && canvasRef.current && isVideoLoaded) {
   const canvas = canvasRef.current;
   const context = canvas.getContext("2d");
   const video = videoRef.current;

   canvas.width = video.videoWidth;
   canvas.height = video.videoHeight;
   context.drawImage(video, 0, 0, canvas.width, canvas.height);

   const imageDataUrl = canvas.toDataURL("image/png");
   setImage(imageDataUrl);
  } else {
   console.error("Video is not loaded yet.");
  }
 };

 return isUsingCamera ? (
  <div>
   <video ref={videoRef} style={{ display: "block", maxWidth: "100%" }} />
   <canvas ref={canvasRef} style={{ display: "none" }} />
   <button onClick={handleCapturePicture}>Take Picture</button>
  </div>
 ) : null;
};

export default Camera;
