import { useState } from "react";
import { createPortal } from "react-dom";


const UploadImage = ({ shop }) => {
   const [isUploading, setIsUploading] = useState()

   const handleUploadSel = () => {
      setIsUploading(!isUploading)
   }

   return (
      <>
         {isUploading ? (
            createPortal(
               <div className="modal">
                  <div className="modal-content">
                     <iframe id="upload-view"
                        title="upload-view"
                        src="/api/photos/upload">
                     </iframe>
                     <button onClick={handleUploadSel}>Close</button>
                  </div>
               </div>
               ,
               document.body
            )
         )
            :
            (
               <button onClick={handleUploadSel}>Upload Photos</button>
            )}
      </>
   )
}

export default UploadImage;
