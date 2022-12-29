import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [tempContent, setTempContent] = useState("");
    const updateContent = async (e) => {
        e.preventDefault();
        const req = await fetch("http://localhost:5000/api/v1/auth/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ content: tempContent }),
        });
        const data = await req.json();
        if (data.success) {
          console.log(tempContent);
          setContent(tempContent);
          setTempContent("");
        } else {
          alert(data.msg);
        }
      };
      const getContent = async () => {
        const req = await fetch("http://localhost:5000/api/v1/auth/content", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        const data = await req.json();
        console.log(data);
        if (data.success) {
          setContent(data.content);
        } else {
          alert(data.msg);
        }
      };
      useEffect(() =>{
        const token = localStorage.getItem("token");
        if(token){
          const user = jwtDecode(token);
          console.log(user);
          if(!user){
            //navigate to login page
          }
          else{
            getContent();
          }
        }
        
      },[]);
    return(
        <div>
            <h1>Dashboard Page</h1>
            <h2>Your Mesasage : {content || "No Message Found"}</h2>
            <form onSubmit={updateContent}>
                <div>
                    <input type="text" placeholder = "Enter the content" value={tempContent} onChange={(e) =>setTempContent(e.target.value)}></input>
                </div>
                <br/>
                <div>
                    <input type="submit" value = "Update"></input>
                </div>
                <br/>
               
                <div>
                 <button onClick={() => { localStorage.removeItem("token");
                   navigate("/login");
                }}>
                   Logout
                 </button>
                </div>
            </form>
        </div>
    )
}

export default Dashboard;