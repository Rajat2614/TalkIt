import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import axios from "axios";
import { Buffer } from "buffer";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import toastOptions from "../components/toastOptions";
import "../index.css";

function SetAvatar() {

    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    useEffect(() => {
        if(!localStorage.getItem("TalkIt-user")){
            navigate("/login");
        }
    },[]);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please Select an Avatar!", toastOptions);
        }
        else{
            const user = await JSON.parse(localStorage.getItem("TalkIt-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image:avatars[selectedAvatar],
            });

            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("TalkIt-user",JSON.stringify(user));
                navigate("/");
            }else{
                toast.error("Error in setting avatar! Please try again.",toastOptions);
            }
        }
    };

    function refreshPage() {
        window.location.reload(false);
      }

    useEffect(() => {
        (async () => {
            const data = [];

            for (let i = 0; i < 5; i++) {
                const image = await axios.get(`${api}/${Math.floor(Math.random() * 1000)}/?apikey=Ax8MRZGNifb1Hk`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        })();
    }, []);


    return (<>
        {
            isLoading ? <Container>
                <img src={loader} alt="loading" className="loader" />
            </Container> : <Container>
                <div className="title-container">
                    <h1 >Pick an Avatar as your Profile Picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar image" onClick={() => setSelectedAvatar(index)} />
                            </div>
                        )
                    })
                    }
                </div>
                <button className="fa fa-refresh fa-spin" onClick={refreshPage} ></button>
                <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
            </Container>
        }
        <ToastContainer />
    </>);
}

const Container = styled.div`
    height : 100vh;
    width : 100vw;
    display : flex;
    flex-direction : column;
    justify-content : center;
    gap: 3rem;
    align-items: center;
    background-color: #191919;

    .loader{
        max-inline-size:100%;
    }

    .title-container{
        h1{
            color: white;
        }
    }

    .avatars{
        gap: 2rem;
        display : flex;
        .avatar{
            border: 0.4rem solid transparent;
            padding : 0.4rem;
            border-radius: 5rem
            display: flex;
            justify-content: center;
            aligns-items:center;
            transition: 0.5 ease-in-out;
            img{
                height: 6rem;                
            }
        }

        .selected{
            border: 0.4rem solid #4e0eff;
            border-radius : 5rem
        }
    }
    
    .fa{
        font-size:24px;
        border-radius: 3rem;
    }

    button{
        background-color : #997af0;
        color: white;
        padding: 1rem;
        border-radius: 0.4rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        transition : 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
`;

export default SetAvatar;
