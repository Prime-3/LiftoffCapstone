import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // TODO:
  // - https://reactrouter.com/en/main/route/error-element
  // - https://reactrouter.com/en/main/utils/is-route-error-response
  // - probably need a little styling
  const error = useRouteError(); // get error that was thrown

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}