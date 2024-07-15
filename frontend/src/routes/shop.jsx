// https://reactrouter.com/en/main/start/tutorial
import {useLoaderData, Link} from "react-router-dom";
import {getShop} from "../utils/shops";

export async function loader({params}) {
    const shop = await getShop(params.shopId);
    return {shop};
}

export default function Shop () {
    const {shop} = useLoaderData();

    return (
        <>
            <p>{shop.shopName}</p>
            <p>{shop.ownerName}</p>
            <p>{shop.phoneNumber}</p>
            <p>{shop.address}</p>
            <p>{shop.description}</p>
            <p>{shop.website}</p>
        </>
    );
}