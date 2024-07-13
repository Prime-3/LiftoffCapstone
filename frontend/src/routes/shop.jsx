// https://reactrouter.com/en/main/start/tutorial
import {useLoaderData, Link} from "react-router-dom";
import {getVendor} from "../utils/vendors";

export async function loader({params}) {
    const vendor = await getVendor(params.vendorId);
    return {vendor};
}

export default function Vendor () {
    const {vendor} = useLoaderData();

    return (
        <>
            <p>{vendor.shopName}</p>
            <p>{vendor.ownerName}</p>
            <p>{vendor.phoneNumber}</p>
            <p>{vendor.address}</p>
            <p>{vendor.description}</p>
            <p>{vendor.website}</p>
        </>
    );
}