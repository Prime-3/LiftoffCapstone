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
                     <button onClick={handleUploadSel}>Close</button>
                     <iframe id="upload-view"
                        title="upload-view"
                        src="/api/photos/upload">
                     </iframe>
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
