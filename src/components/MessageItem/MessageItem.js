import React, {useState, useEffect} from "react";
import './style.css';


export default ({data, user}) => {

    const [time, setTime] = useState('');

    useEffect(()=>{
        if(data.date > 0){
            let d = new Date(data.date.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10? `0${hours}`: hours;
            minutes = minutes < 10? `0${minutes}`: minutes;

            setTime(`${hours}: ${minutes}`)
        }
    },[data]);
    return (
        <div className="messageLine" 
        style={{justifyContent: data.authror === user.id? "flex-end": "flex-start"}}>   
          
             
            <div className="messageItem"
                style={{backgroundColor: data.authror === user.id? '#dcf8c6':'#FFF'}}>
                <div className="messageText">{data.body}</div>
                    <div className="mesageDate">{time}</div>
                
            </div>         
        </div>
    );
};