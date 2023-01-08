// @flow
import * as React from "react";
import "../card/Card2.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Card2 = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/room/${props.room.id}`)}
    >
      <div class="card border2" style={{ width: "200px", height: "200px" }}>
        <div class="card-body d-flex flex-column cardMessage1">
          <div className="cardMessagePara1">
            <p>{props.room.title}</p>
          </div>
        </div>
        <div className="cardMessage2">
          <div className="cardMessagePara2">
            <p>Message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;
