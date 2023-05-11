import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.png";
import Network from "../assets/network.gif";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import design from "../components/pageDesign";
import toastOptions from "../components/toastOptions";

function Login() {
    const navigate = useNavigate(); 

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if(localStorage.getItem("TalkIt-user")){
            navigate("/");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            // console.log("In validation", loginRoute);

            const { username, password} = values;
            // console.log(username,password);
            const { data } = await axios.post(loginRoute,{
                username, 
                password,
            });

            if(data.status === false){
                toast.error(data.msg , toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('TalkIt-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    };


    const handleValidation = () => {
        const { username, password} = values;
        //console.log(username, password);

        if (username === "") {
            toast.error("Username is required!", toastOptions);
            return false;
        }else if (password === "") {
            toast.error("Password is required!", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="loginPage">

            <FormContainer>
                <img src={Network} alt="Network" />
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>TalkIt</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={e => { handleChange(e) }} min="3" />
                    <input type="password" placeholder="Password" name="password" onChange={e => { handleChange(e) }} />
                    <button type="submit">Login</button>
                    <span>Don't have an account ? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </div>
    )
}

const FormContainer = design;

export default Login;