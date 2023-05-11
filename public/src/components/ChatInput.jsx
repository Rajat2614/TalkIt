import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({handleSendMsg}) {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const previewOptions = {
        showPreview: false,
    }

    const sendChat = (event) =>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                {showEmojiPicker && <Picker 
                    onEmojiClick={(emojiObject)=> setMsg((msg)=> msg + emojiObject.emoji)}
                    previewConfig={previewOptions} />
                }
            </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder="Type your message" value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button className="submit">
                <IoMdSend />
            </button>
        </form>
    </Container>
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items : center;
    border-radius : 0 0 1rem 0;
    background-color : #080420;
    padding: 0.3rem 2rem;
    @media screen and (min-width: 720px) and (max-width:1080px){
        padding : 0 1rem;
        gap : 1rem;
    }
    .button-container{
        display : flex;
        align-items: center;
        color: white;
        gap : 1rem;
        .emoji{ 
            position : relative;
            svg{
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact{
                background-color : #080420;
                border:none;
                box-shadow : 0 5px 10px #9a86f3;
                position : absolute;
                font-size: 0.8rem;
                top : -470px;
                left : -20px;
                .epr-emoji-category-label, input{
                    background-color : transparent;
                    border : none;
                    color : white;
                }

            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display : flex;
        align-content : center;
        gap: 2rem;
        background-color : #ffffff34;
        input{
            width : 100%;
            heihgt : 60%;
            background-color : transparent;
            color : white;
            border : none;
            padding-left : 1rem;
            font-size: 1.2rem;
            &&::selection{
                background-color: #9a86f3;
                outline: none; 
            }
            &:focus{
                outline:none;
            }
        }
        button{
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display : flex;
            justify-content : center;
            align-items: center;
            background-color : #9a86f3;
            border: none;
            @media screen and (min-width: 720px) and (max-width:1080px){
                padding : 0.3rem 1rem;
                svg{
                    font-size : 0.5rem;
                }
            }
            svg{
                font-size: 2rem;
                color: white;

            }
        }
    }
`;