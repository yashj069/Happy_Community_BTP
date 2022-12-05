// @flow 
import React from 'react';
import "./Sidebar.css";

const Sidebar = (props) => {
    return (
        <div>
            <ul className="stylingList">
                {
                    props.items.map((item)=>
                        <li className="stylingListItem">{item}</li>
                    )
                }
            </ul>
        </div>
    );
};

export default Sidebar;