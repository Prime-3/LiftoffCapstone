// https://reactrouter.com/en/main/start/tutorial
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Fetch from './routes/fetch';

import Vendors, {
    loader as vendorsLoader
} from "./routes/vendors";

import Vendor, {
    loader as vendorLoader
} from "./routes/vendor";
import ErrorPage from "./pages/error";
import Login from "./pages/Login";
import AuthorizeView, { AuthorizedUser } from "./Components/AuthorizeView";
import LogoutLink from "./Components/LogoutLink";
import "./App.css";
import Favorited from './Components/Favorite';
import VendorDetailsPage from './Components/VendorPage';

import Header from './Components/Header';
import BrowsePage from './Components/BrowsePage';


const router = createBrowserRouter([
    {
        path: "/helloworld",
        element: <div>Hello world!</div>,
    },
    {
        path: "/",
        element: <Root />,
    },
    // - https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
    // - different ways of getting data
    //  - fetch() + useState() + useEffect() [JS + React]
    //  - SWR [React, requires 'npm i']
    //  - React Query [React, requires 'npm i @']
    //  - Axios [JS, requires 'npm i']
    //  - useFetch [React, requires 'npm i']
    {
        path: "/test-fetch",
        element: <Fetch />
    },
    {
        path: "/outbacks",
        element: <Vendors />,
        errorElement: <ErrorPage />,
        loader: vendorsLoader,
    },
    {
        path: "/outbacks/:vendorId",
        element: (
            // https://www.youtube.com/watch?v=eYiLt2gQuME
            <AuthorizeView>
                <LogoutLink>Logout<AuthorizedUser value="email" /></LogoutLink>
                <Vendor />
            </AuthorizeView>
        ),
        errorElement: <ErrorPage />,
        loader: vendorLoader,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/favorites",
        element: <Favorited />
    },
    {
        path: "/vendorpage/:vendorId",
        element: <VendorDetailsPage />
    },
    {
        path: "/browse",
        element: <BrowsePage />
    }
]);

function App() {

    return (
        <div id='app'>
            <Header />
            <RouterProvider router={router} />
        </div>
    )
}
export default App;
