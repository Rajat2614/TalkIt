import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.png";
import Network from "../assets/network.gif";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import design from "../components/pageDesign";
import toastOptions from "../components/toastOptions";


function Register() {
    const navigate = useNavigate(); 

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if(localStorage.getItem("TalkIt-user")){
            navigate("/");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            // console.log("In validation", registerRoute);

            const { password, username, email } = values;
            // console.log(username,email,password);
            const { data } = await axios.post(registerRoute,{
                username, 
                email, 
                password,
            });

            if(data.status === false){
                toast.error(data.msg , toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('TalkIt-user', JSON.stringify(data.user));
                navigate("/setAvatar");
            }
        }
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;

        if (password !== confirmPassword) {
            toast.error("Password do not match!", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be atleast 5 characters!", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be atleast 8 characters!", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email is required!", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="registerPage">

            <FormContainer>
                <img src={Network} alt="Network" />
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>TalkIt</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={e => { handleChange(e) }} />
                    {/* <input type="text" placeholder="Full Name" name="fullName" onChange={e => { handleChange(e) }} /> */}
                    <input type="email" placeholder="Email" name="email" onChange={e => { handleChange(e) }} />
                    <input type="password" placeholder="Password" name="password" onChange={e => { handleChange(e) }} />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={e => { handleChange(e) }} />
                    <button type="submit">Create User</button>
                    <span>Already have an account ? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </div>
    )
}

const FormContainer = design;

export default Register;