import React, { useState, useEffect }from "react";
import './style.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Api from "../../Api";



 function NewChat ({user, chatList,show, setShow}) {
    const [list, setList] = useState([]);

    useEffect(()=>{
        const getList =async()=>{
            if(user!==null){
                let results = await Api.getContactList(user.id);
                setList(results)
                
            }
        }
        getList();
        
    },[user])

    const addNewChat= async (user2) => {
        
        await Api.addNewChat(user, user2);

        handleClose();
        
    };

    const handleClose =()=>{
        setShow(false);
           }

    return (
        <div className="newChat" style={{left: show? 0:-415}} >
            <div className="newChat--head" >
                <div className="newChat--backbutton" >
                    <ArrowBackIcon 
                    style={{color:'#fff'}}
                    onClick={handleClose}
                    />
                                </div>
                <div className="newChat--headtitle" >Nova Conversa </div>
            </div>
            <div className="newChat--list" >
                {list.map((item,key)=>(
                    <div onClick={()=>addNewChat(item)} className='newchat--item'  key={key}>
                        <img className='newchat--itemavatar' src={item.avatar} alt =''/>
                        <div className='newchat--itemname'>{item.name}</div>            
                    </div>
                ))}
            
        </div>
        </div>
    );
};
export default NewChat;