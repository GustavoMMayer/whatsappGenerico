import React from "react";
import Api from "../../Api";
import './style.css';


export default ({onReceive}) => {
    const handleFacebbokLogin = async ()=>{
        let result = await Api.fbPopup();

        if(result){
            onReceive(result.user)
            console.log(result.user)

        }else{
            alert('Erro');
        }

    }
    return (
        <div className="login">
            <button onClick={handleFacebbokLogin}>Logar com Facebook</button>
        </div>    
    );
};