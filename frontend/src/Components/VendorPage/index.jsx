import React from "react";
import FavoriteButton from "../Favorite/FavoriteButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const VendorDetailsPage = () => {
    let { vendorId } = useParams();
    const [selectedVendor, setSelectedVendor] = useState({});
    useEffect(() => {
        fetch(`/api/vendors/${vendorId}`)
        .then((resp) => {
            return resp.json();
        }
        )
        .then((data) => {
            console.log(data);
            setSelectedVendor(data);
        })
    }, []);



//   const allVendors = []; //! fetch vendor data here

    //Filter through all vendors to find the requested vendor with vendorId
//    selectedVendor = allVendors.find((vendor) => vendor.id === vendorId);
  
    return (
    <div>
      <div><h2>{selectedVendor.shopName}</h2><FavoriteButton /></div>
      <div><img src={selectedVendor.logo} /></div>
      {/* <div><p>Owner: {selectedVendor.ApplicationUser.FirstName} {selectedVendor.ApplicationUser.LastName}</p></div> */}
      <div><h4>{selectedVendor.description}</h4></div>
      <div>{/*Reviews*/}</div> 
      <div>{/*Schedule*/}</div> 
    </div>
  );
};

export default VendorDetailsPage;