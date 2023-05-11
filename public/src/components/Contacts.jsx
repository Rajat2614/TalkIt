import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo1.png";
import Logout from "./Logout";

function Contacts({contacts , currentUser , changeChat}) {
    const navigate = useNavigate();
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    
    useEffect(() => {
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    const changeAvatar = () => {
        navigate("/setAvatar");
    }

    return <>{
        currentUserName && currentUserImage && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="Logo" ></img>
                    <h3>TalkIt</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact,index) => {
                            return (
                                <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index,contact)}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar image"/>
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar image" onClick={changeAvatar}/>
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                    <Logout />
                </div>
            </Container>
        ) 
    }</>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color : #080420;
    border-radius: 1rem 0 0 1rem;
    .brand{
        position: relative;
        display : flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        img{
            height: 2rem;
        }
        h3{
            color: white;
        }
    }
    .contacts{
        display : flex;
        flex-direction : column;
        align-items: center;
        overflow : auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color : #ffffff39;
                width: 0.1rem;
                border-radius : 1rem;
            }
        }
        .contact{
            background-color: #ffffff39;
            min-height: 4rem;
            width: 90%;
            cursor: pointer;
            border-radius : 1rem;
            padding : 0.4rem;
            gap : 1rem;
            display : flex;
            align-items : center;
            transition : 0.5s ease-in-out;
            .avatar{
                img{
                    height : 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
        .selected{
            background-color : #9186f3;
        }
    }
    .current-user{
        background-color : #0d0d30;
        display: flex;
        justify-content : center;
        align-items : center;
        gap : 2rem;
        .avatar{
            img{
                height : 4rem;
                max-inline-size: 100%;
                cursor: pointer;
            }
        }
        .username {
            h2{
                color: white;
                cursor: default;
            }
        }
        @media screen and (min-width: 720px) and (max-width:1080px){
            gap: 0.5rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default Contacts;