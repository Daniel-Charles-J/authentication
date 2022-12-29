import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () =>{
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    console.log(name);

    const registerUser = async(e) =>{
        e.preventDefault();
        console.log(name);
        const response = await fetch("http://localhost:5000/api/v1/auth/register",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name : name,
                email : email,
                password : password
            }),
        });
        const data = await response.json();
        if(data.success === true){
            //navigate to login page
            navigate("/login");
            console.log(data);
        }
    }
    return(
        <div>
            <h1>Register page</h1>
            <form onSubmit={registerUser}>
                <div>
                    <input type="text" value={name} placeholder = "Enter your name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <input type="email" value={email} placeholder = "Enter EmailID" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <input type="password" value={password} placeholder = "Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <br/>
                <div>
                <input type="submit" value="Register" />
                </div>
                <br/>
                <div>
                  Already Registered? <Link to="/login">Click Here to Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;