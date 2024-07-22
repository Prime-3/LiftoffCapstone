import { useState } from "react";


const UploadImage = ({ shop }) => {
   const [fileToUpload, setFileToUpload] = useState(null)
   const handleChange = (e) => {
      const image = e.target.files[0]
      const src = window.URL.createObjectURL(image)
      setFileToUpload(src)
      console.log(image)
   }
   const handleSubmit = () => {
      fetch("/api/photos/albums/media", {
         method: "POST",
         header: {
            "Content-Type": "multipart/form-data"
         },
         body: JSON.stringify({
            shopId: shop.id,
            filePath: fileToUpload,
            description: "TEST"
         })
      })
   }
   return (
      <>
         <input
            type="file"
            id="gallery-upload"
            name="gallery-upload"
            accept="image/*"
            onChange={handleChange}
         />
         <button onClick={handleSubmit}>Add</button>
      </>
   )
}

export default UploadImage;
