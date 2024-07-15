import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from "react-router-dom";


function EditButtonComponent(args) {
  //This is for the modal
  const [modal, setModal] = useState(false);
  const { vendorId } = useParams();
  const [userId, setUserId] = useState("");

  const [shopName, setShopName] = useState(null)
  const [logo, setLogo] = useState(null)
  const [website, setWebsite] = useState(null)
  const [description, setDescription] = useState(null)

  //Open/Close Modal
  const toggle = () => setModal(!modal);
  
  // get userId
  useEffect(() => {
    fetch("/pingauth")
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      else {
        return null;
      }
    })
    .then((data) => {
          console.log(data);
          setUserId(data.userId);
    })
  }, []);

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
    fetch(`/api/shops/${vendorId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shopName: shopName,
        logo: logo,
        website: website,
        description: description,
        applicationUserId: userId,
      })
    })
    .then((resp) => {
      console.log(resp);
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
                <Button color="success" onClick={handleFormSubmit}>Save</Button>{' '}
            </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div> 
  );

}
export default EditButtonComponent;