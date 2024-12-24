"use client";

const ImageUpload = ({ setImage }) => {
 const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
   const reader = new FileReader();
   reader.onload = () => setImage(reader.result);
   reader.readAsDataURL(file);
  }
 };

 return (
  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
 );
};

export default ImageUpload;
