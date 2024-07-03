// https://reactrouter.com/en/main/start/tutorial
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Fetch from './routes/fetch';
import Vendors, {
    loader as vendorsLoader
} from "./routes/vendors";
import ErrorPage from "./pages/error.jsx";
import "./App.css";


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
        path: "/vendors",
        element: <Vendors />,
        errorElement: <ErrorPage />,
        loader: vendorsLoader,
    },
]);

function App() {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default App;
