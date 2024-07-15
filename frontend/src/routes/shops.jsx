// https://reactrouter.com/en/main/start/tutorial
// https://reactrouter.com/en/main/components/link
// -> <Link to>... resolves relative to parent route
import {useLoaderData, Link} from "react-router-dom";
import {getShops} from "../utils/shops";

export async function loader() {
    const shops = await getShops();
    return {shops};
}

export default function Shops () {
    const {shops} = useLoaderData();

    const shopsJSX = shops.map(shop => {
        return (
            <Link to={`${shop.id}`} key={shop.id}>
                <p>{shop.shopName}</p>
            </Link>
        );
    });
    return (
        <>
        {shopsJSX}
        </>
    );
}