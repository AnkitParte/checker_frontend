import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "./users/users";


export default function Login() {
    const [creds, setCreds] = useState({});
    const { data,loading, error, isAuth } = useSelector((store) => store.login);
    console.log(data);
    //const token = data.token.split(":")
    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreds({ ...creds, [name]: value });
    }
    const handleLogin = (creds) => {
        console.log(creds)
        
        dispatch(login(creds))

    }
    return (
        <>
            <input type="text" onChange={handleChange} name="email" placeholder="enter email" />
            <br />
            {/* <input type="text" onChange={handleChange} name="name" placeholder="enter password"/>
            <br /> */}
            <input type="text" onChange={handleChange} name="password" placeholder="enter password" />
            <br />
            <button onClick={() => handleLogin(creds)}>Login</button>
            {loading && <h4>Loading...</h4>}
            {isAuth && <h4>Successfull</h4>}
            {error && <h4>Error...</h4>}

        </>
    )
}