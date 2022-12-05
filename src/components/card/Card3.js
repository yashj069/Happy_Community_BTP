// @flow 
import * as React from 'react';
import "../card/Card3.css";
import { useAuth } from '../../hooks/useAuth';
import { deleteMyTag,addToMyTag } from '../../services/firebase';


const Card3 = (props) => {
    const {user}= useAuth();
    const handleTag=()=>{
        if(props.isSelected){
            deleteMyTag(props.docid,user);
             props.callFunc()
            }
        else{
            addToMyTag(props.interest,user) ; props.callFunc()
        }
    }
    return (
        <div onClick={handleTag} >
            <div class="card border" className={props.isSelected?"showRed":"showGreen"} 
            style={{ 
            padding: "10px 20px",
            width : "200px",
            height:"fit-content",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "20px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "20px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            cursor:"pointer",
            }}
            >
                    {/* <span className='card3InnerBox'> */}
                        <h5 class="card-title" className={props.isSelected?'card3InnerBoxHeading2':'card3InnerBoxHeading1'}>{props.interest}</h5>
                        {/* <p class="card-text" className='cardInnerBoxText1'>{props.desc}</p> */}
                        {
                            // props.isSelected && <button type="button" onClick={()=>{deleteMyTag(props.docid,user) ; props.callFunc()}} className="card3JoinButton2">DELETE</button>
                        }
                        {
                            // (!props.isSelected) && <button type="button" onClick={()=>{addToMyTag(props.interest,user) ; props.callFunc()}} className="card3JoinButton1">ADD</button>
                        }
                    {/* </span> */}
            </div>
 
        </div>
    );
};

export default Card3;