import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e){
        e.preventDefault();
        console.log(email);
        console.log(password);

        const response = await fetch("http://localhost:5000/api/v1/auth/login",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : email,
                password : password
            }),
        });
        const data = await response.json();
        if(data.success){
            localStorage.setItem("token",data.token);
            alert("User Login Successfully");
            navigate("/Dashboard");

        }
    }
    return(
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input type="email" placeholder="Enter Email ID" onChange={(e) =>setEmail(e.target.value)} value={email}></input>
                </div>
                <br/>
                <div>
                    <input type="password" placeholder="Enter Password" onChange={(e) =>setPassword(e.target.value)} value={password}></input>
                </div>
                <br/>
                <div>
                    <input type="submit" value="Login"/>
                </div>
                <br/>
                <div>
                  Not Registered? <Link to="/">Click Here to Register</Link>
                </div>
            </form>
        </div>
    )
}
export default Login;