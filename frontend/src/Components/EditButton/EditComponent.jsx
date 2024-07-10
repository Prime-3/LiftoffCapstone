import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from "react-router-dom";


function EditButtonComponent(args) {
  //This is for the modal
  const [modal, setModal] = useState(false);
  const { vendorId } = useParams();

  const [shopName, setShopName] = useState(null)
  const [logo, setLogo] = useState(null)
  const [website, setWebsite] = useState(null)
  const [description, setDescription] = useState(null)

  //Open/Close Modal
  const toggle = () => setModal(!modal);
  
//Fetch updated data
const handleChange = (e) => {
  const { name, value} = e.target;
  if(name === "shopName") setShopName(value);
  if(name === "logo") setLogo(value);
  if(name === "website") setWebsite(value);
  if(name === "description") setDescription(value);
}

//Form submission for updating profile
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("HIT handlesubmit")
 
    //PATCH request 
    fetch(`/api/vendors/${vendorId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shopName: shopName,
        logo: logo,
        website: website,
        description: description
      })
    })
    .then((resp) => {
      console.log(resp)
    })
  }

  return (
    //This is updated vendor page
    <div>
      <Button color="danger" onClick={toggle}>
        Update Profile Page
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args} unmountOnClose={false}>
        <ModalHeader toggle={toggle}>Edit Content</ModalHeader>
        <ModalBody>
            {/* Form for Vendor to update profile */}
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="shopName" placeholder="Shop Name" onChange={handleChange}></input>
                <input type="url" name="logo" placeholder="Logo"onChange={handleChange}></input>
                <input type="url" name="website" placeholder="Website"onChange={handleChange}></input>
                <input type="text" name="description" placeholder="Description"onChange={handleChange}></input>
            </form>
        </ModalBody>
        <ModalFooter>
        <Button color="success" onClick={handleFormSubmit}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div> 
  );

}
export default EditButtonComponent;