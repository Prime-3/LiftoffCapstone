import { useRef, useState } from "react";


const UploadImage = ({ shop }) => {
   const [fileToUpload, setFileToUpload] = useState(null)
   const inputRef = useRef()


   const handleChange = (e) => {
      const image = inputRef.current.files[0]
      const src = window.URL.createObjectURL(image)
      setFileToUpload(src)
      console.log(src)

   }
   const handleSubmit = () => {
      fetch("/api/photos/albums/media", {
         method: "POST",
         header: {
            "Content-Type": "application/json"
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
         <img src={fileToUpload} />
         <input
            type="file"
            id="gallery-upload"
            name="gallery-upload"
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
         />
         <button onClick={handleSubmit}>Upload</button>
      </>
   )
}

export default UploadImage;
