// https://www.youtube.com/watch?v=eYiLt2gQuME
import React, {useState, useEffect, createContext} from 'react';
import {Navigate} from 'react-router-dom';

const UserContext = createContext({});

class User {
    email = "";
    constructor(email) {
        this.email = email;
    }
}

// Component that wraps other components (i.e. 'children')
// - if logged in: show 'children' component,
// - if not logged in: redirect to login page.
// children is a React.ReactNode'.
export default function AuthorizeView({children}) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    let emptyuser = new User("");

    const [user, setUser] = useState(emptyuser);

    // Get the cookie value
    useEffect(() => {
        let retryCount = 0; // initialize retry count
        let maxRetries = 10; // max number of retries
        let delay = 1000; // 1s delay between retries

        // delay function that returns a promise
        function wait(delay) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }

        // fetch function that retries until status 200 or 401
        async function fetchWithRetry(url, options) {
            try {
                // make fetch request
                let response = await fetch(url, options);
                // check status code
                if (response.status == 200) {
                    console.log("Authorized");
                    let j = await response.json();
                    setUser(new User(j.email)); // 'user' -> User obj with email
                    setAuthorized(true);
                    return response;
                } else if (response.status == 401) {
                    console.log("Unauthorized");
                    return response;
                } else {
                    // throw error to trigger catch block
                    throw new Error(""+ response.status);
                }
            } catch (error) {
                retryCount++;
                if (retryCount > maxRetries) {
                    throw error;
                } else {
                    await wait(delay);
                    return fetchWithRetry(url, options);
                }
            }
        }

        // Check if user is logged in
        fetchWithRetry("/pingauth", {
            method: "GET"
        }).catch((error) => {
            // 'final' error (if user is not logged in?)
            // TODO: Currently server returns an ASP.NET login page. Probably
            //  good return something a little more use friendly?
            console.log(error.message);
        }).finally(() => {
            setLoading(false); // page done loading
        });
    }, []);

    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    } else {
        if (authorized && !loading) {
            return (
                <>
                    <UserContext.Provider value={user}>{children}</UserContext.Provider>
                </>
            );
        } else {
            return (
                <>
                    <Navigate to="/login" />
                </>
            )
        }
    }
}

export function AuthorizedUser(key) {
    const user = React.useContext(UserContext);
    if (key == "email")
        return <>{user.email}</>
    else
        return <></>
}
