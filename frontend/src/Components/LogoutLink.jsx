// https://www.youtube.com/watch?v=eYiLt2gQuME
// import { useNavigate } from "react-router-dom";

// children is a React.ReactNode
export default function LogoutLink({ children }) {

    // const navigate = useNavigate();
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
                window.location.href = '/';
            }
            else { }
        }).catch((error) => {
            console.error(error);
        })
    };
    return (
        <>
            <a href="#" onClick={handleSubmit}>{children}</a>
        </>
    );
}
