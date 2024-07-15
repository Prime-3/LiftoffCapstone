// https://reactrouter.com/en/main/start/tutorial
import { createBrowserRouter } from 'react-router-dom';
import App from "./App.jsx";
// import Shops, {
//     loader as shopsLoader
// } from "./routes/shops";
// import Shop, {
//     loader as shopLoader
// } from "./routes/shop";
// import Login from "./pages/Login";
// import AuthorizeView, { AuthorizedUser } from "./Components/AuthorizeView";
// import LogoutLink from "./Components/LogoutLink";
import Root from "./routes/root";
import ErrorPage from "./pages/error";
import BrowsePage, {
    loader as shopsLoader
} from './Components/BrowsePage';
import Favorited from './Components/Favorite';
import VendorDetailsPage from './Components/VendorPage';
import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Root />
            },
            {
                path: "/browse/:searchTerm?",
                element: <BrowsePage />,
                loader: shopsLoader,
            },
            {
                path: "/favorites",
                element: <Favorited />
            },
            {
                path: "/vendorpage/:vendorId",
                element: <VendorDetailsPage />
            }
        ]
    },
    // {
    //     path: "/outbacks",
    //     element: <Shops />,
    //     errorElement: <ErrorPage />,
    //     loader: shopsLoader,
    // },
    // {
    //     path: "/outbacks/:shopId",
    //     element: (
    //         // https://www.youtube.com/watch?v=eYiLt2gQuME
    //         <AuthorizeView>
    //             <LogoutLink>Logout<AuthorizedUser value="email" /></LogoutLink>
    //             <Shop />
    //         </AuthorizeView>
    //     ),
    //     errorElement: <ErrorPage />,
    //     loader: shopLoader,
    // },
    // {
    //     path: "/login",
    //     element: <Login />
    // }
]);

export default router;