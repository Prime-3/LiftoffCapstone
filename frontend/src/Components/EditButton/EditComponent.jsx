import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from "react-router-dom";
import './styleEdit.css'

function EditButtonComponent(args) {
  //This is for the modal
  const [modal, setModal] = useState(false);
  const { vendorId } = useParams();
  const [userId, setUserId] = useState("");
  const [isShopPageUpdated, setIsShopPageUpdated] = useState(false); //This is for the user feedback message when updating

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
        // console.log(data);
        setUserId(data.userId);
      })
  }, []);

  //Fetch updated data
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "shopName") setShopName(value);
    if (name === "logo") setLogo(value);
    if (name === "website") setWebsite(value);
    if (name === "description") setDescription(value);
  }

  //Form submission for updating profile
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("HIT handlesubmit")

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
        // console.log(resp);
        if (resp.ok) {
          setIsShopPageUpdated(true);
        }
      })
  }


  return (
    //This is updated vendor page
    <div>
      <Button color="danger" onClick={toggle} className='update'>Update Profile</Button>
      <Modal isOpen={modal} toggle={toggle} {...args} unmountOnClose={false} className='modal'>
        <ModalHeader className='header'>Edit Content</ModalHeader>
        <ModalBody className='body'>
          {/* Form for Vendor to update profile */}
          <form onSubmit={handleFormSubmit} className='form'>
            <input type="text" name="shopName" placeholder="Shop Name" onChange={handleChange} className='shop'></input> <br />
            <input type="url" name="logo" placeholder="Logo URL" onChange={handleChange} className='lo'></input> <br />
            <input type="url" name="website" placeholder="Website URL" onChange={handleChange} className='web'></input> <br />
            <textarea type="text" name="description" placeholder="Enter your description here..." rows={7} cols={32} onChange={handleChange} className='area'></textarea> <br />
            <div className='buttons'><Button onClick={handleFormSubmit} className='save'>{' '}Save{' '}</Button> {'   '}
              <Button onClick={toggle} className='close' >{' '}Close{' '}</Button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter className='footer'>
          {isShopPageUpdated ? <p className='success'>Shop page successfully updated!<br /> Refresh the page to see your changes.</p> : <p className='no-changes'>No changes made to this shop.</p>}
        </ModalFooter>
      </Modal>
    </div>
  );

}
export default EditButtonComponent;
