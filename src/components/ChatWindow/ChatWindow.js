import React, {useState, useEffect, useRef} from "react";
import EmojiPicker from "emoji-picker-react";
import './style.css';

import MessageItem from "../MessageItem/MessageItem";
import Api from "../../Api";

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';



export default ({user, data}) => {
    const body = useRef();

    let recognition = null;
    let SpeechReconition =window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;
    if (SpeechReconition !== undefined){
        recognition = new SpeechReconition();
    }
    
    

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] =useState([]);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);

        return unsub;
    },[data.chatId]);

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    },[list]);

    const handleEmojiClick =(e,emojiObject)=>{
        setText(text + e.emoji)

    }

    const handleSendClick =()=>{
        if(text !==""){
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false)
            
        }
    };
    const handleInputKeyUP =(e)=>{
        if(e.keyCode == 13){
            handleSendClick();
        }
    }

    const handleMicClick =()=>{
              

       if(recognition !== null){
           
            recognition.onstart=()=>{
                setListening(true);
                
            }
            recognition.onend = ()=>{
                setListening(false);
            }
            recognition.onresult=(e)=>{
                setText(e.results[0][0].transcript )
               
            }
            recognition.start();
        }        
    };

   

    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--header--info">
                    <img className="chatwindow--avatar" src={data.image} alt=''/>
                    <div className="chatwindow--name">{data.title}</div>
                </div>
                <div className="chatInfo--HeaderButtons">
                    <div className="chatWindow--btn">
                        <SearchIcon style={{color:'#919191'}}/>
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{color:'#919191'}}/>
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{color:'#919191'}}/>
                    </div>
                </div>

            </div>
            <div ref={body} className="chatWindow--body">

                {list.map((item, key)=>(
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />    
                ))}

            </div>
            <div className="chatWindow--emojiarea"style={{height: emojiOpen? "250px":"0px" }}>
                <EmojiPicker
                    width={'100%'}
                    className='emojiPiker'
                    onEmojiClick={handleEmojiClick}
                    skinTonesDisabled
                    searchDisabled
                                         
                />
            </div>

            <div className="chatWindow--footer">

                <div className="chatwindow--pre">
                <div className="chatWindow--btn" onClick={()=>setEmojiOpen(false)} style={{display: emojiOpen? "flex":"none"}}>
                        <CloseIcon  style={{color:'#919191'}}/>
                    </div>
                    <div className="chatWindow--btn" onClick={()=>setEmojiOpen(true)} >
                        <InsertEmoticonIcon  style={{color: emojiOpen? "#009688":'#919191'}}/>
                    </div>
                </div>
                <div className="chatwindow--inputarea">
                    <input 
                    className="chatWindow--input" 
                    type='text'
                    placeholder={listening? "Fale sua mensagem ":"Digite uma mensagem"}
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    onKeyUp = {handleInputKeyUP}
                    />
                    
                </div>

                <div className="chatwindow--pos">
                    {text !== ''&&
                        <div onClick={handleSendClick} className="chatWindow--btn">
                            <SendIcon style={{color:'#919191'}}/>
                        </div>
                    }
                    {text === '' &&
                        <div onClick={handleMicClick} className="chatWindow--btn">
                            <MicIcon style={{color: listening? '#126ece': '#919191'}}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};