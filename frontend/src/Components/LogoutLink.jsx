// https://www.youtube.com/watch?v=eYiLt2gQuME
import { useNavigate, Link } from "react-router-dom";

// children is a React.ReactNode
export default function LogoutLink({ children }) {

    const navigate = useNavigate();
    // event is a React.FormEvent<HTMLAnchorElement>
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""
        }).then((data) => {
            if (data.ok) {
                navigate(0);
            }
            else { }
        }).catch((error) => {
            console.error(error);
        })
    };
    return (
        <>
            <Link to="/" onClick={handleSubmit}>{children}</Link>
        </>
    );
}
