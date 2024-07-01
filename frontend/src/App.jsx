// https://reactrouter.com/en/main/start/tutorial
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from './routes/root';
import Fetch from './routes/fetch';


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
]);

function App() {
    return (
        <>
        <h2>App.jsx</h2>
        <RouterProvider router={router} />
        </>
    )
}
export default App;