import React, { useState } from "react";
import EditComponent from './EditComponent'; 

export default function EditButton() {
    const [isEditing, setIsEditing] = useState(true);
  
    return (
        <div>
            <button
                className="edit-button"
                onClick={() => {
                    setIsEditing(!isEditing);
                }}
                aria-label="edit"
            >
                {isEditing ? <i className="fa-solid fa-pen"> Edit </i> : <i className="fa-thin fa-check"> Save </i>}
            </button>
            <EditComponent onClick={() => setIsEditing(!isEditing)} />
           
        </div>
    );
}