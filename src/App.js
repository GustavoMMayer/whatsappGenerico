import React,{useState, useEffect} from "react";
import './App.css';
import ChatlistItem from "./components/ChatListItem/ChatlistItem";
import ChatIntro from "./components/ChatIntro/ChatIntro";
import ChatWindow from './components/ChatWindow/ChatWindow';
import NewChat from "./components/newChat/NewChat";
import Login from "./components/Login/Login";

import Api from "./Api";

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';





export default ()=>{

    const [chatList, setChatList] = useState([]);
    const [activeChat, setActiveChat] = useState ({});
    const [user, setUser]=useState(null)
    const [showNewChat, setShowNewChat]= useState(false);

    useEffect(()=>{
        if(user !== null){
            let unsub = Api.onChatList(user.id, setChatList);  

            return unsub
        }
    },[user])

    const handleOpen =()=>{
        setShowNewChat(true)
    }

    const handleLoginData = async (u) =>{
        let newUser ={
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        };
        await Api.addUser(newUser);
        setUser(newUser);
    }

    if(user === null){
        return (<Login onReceive={handleLoginData}/>);
    }

   
  return (
    <div className="app-window">
        <NewChat 
            chatlis = {chatList}
            user = {user}
            show={showNewChat}
            setShow={setShowNewChat} />
        <div className="sidebar">
            <header>
                <img className="header--avatar" src={user.avatar} alt=''/>
                <div className="header--buttons">
                    <div className="header--btn">
                        <DonutLargeIcon style={{color:'#919191'}}/>
                    </div>
                    <div className="header--btn"
                    onClick={handleOpen}>
                        <ChatIcon style={{color:'#919191'}}/>
                    </div>
                    <div className="header--btn">
                        <MoreVertIcon style={{color:'#919191'}}/>
                    </div>

                </div>
            </header>
            <div className="search">
                <div className="search--input">
                    <SearchIcon fontSize='small' style={{color:'#919191'}}/>
                    <input type='search' placeholder="Procurar ou começar um nova conversa"/>
                </div>
            </div>
            <div className="chatlist">
                {chatList.map((item, key)=>(
                    <ChatlistItem
                    key={key}
                    active ={activeChat.chatId === chatList[key].chatId}
                    data={item}
                    propOnClick={()=>setActiveChat(chatList[key])}/>
                ))};
               
            </div>
        </div>
        <div className="contentarea">
            {activeChat.chatId !== undefined &&
                <ChatWindow
                user={user}
                data={activeChat}
                />  
                          
            }
            
            {activeChat.chatId === undefined &&
                <ChatIntro/>
            }
        </div>
    </div>
  )
}