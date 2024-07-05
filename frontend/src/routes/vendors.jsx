// https://reactrouter.com/en/main/start/tutorial
// https://reactrouter.com/en/main/components/link
// -> <Link to>... resolves relative to parent route
import {useLoaderData, Link} from "react-router-dom";
import {getVendors} from "../utils/vendors";

export async function loader() {
    const vendors = await getVendors();
    return {vendors};
}

export default function Vendors () {
    const {vendors} = useLoaderData();

    const vendorsJSX = vendors.map(vendor => {
        return (
            <Link to={`${vendor.id}`} key={vendor.id}>
                <p>{vendor.shopName}</p>
            </Link>
        );
    });
    return (
        <>
        {vendorsJSX}
        </>
    );
}