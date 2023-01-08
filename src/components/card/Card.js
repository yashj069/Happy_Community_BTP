// @flow
import * as React from "react";
import "../card/Card.css";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { addToMyCommunity, deleteMyCommunity } from "../../services/firebase";

const Card = (props) => {
  const { user } = useAuth();
  return (
    <div>
      <div
        class="card border"
        style={{ padding: "10px", width: "50vh", minHeight: "250px" }}
      >
        <div class="card-body d-flex flex-column" style={{ marginTop: "30px" }}>
          <span className="cardInnerBox">
            <h5 class="card-title" className="cardInnerBoxHeading1">
              {props.room.title}
            </h5>
            <p class="card-text" className="cardInnerBoxText1">
              {props.room.desc}
            </p>
            {props.isJoin && (
              <button
                type="button"
                onClick={() => {
                  deleteMyCommunity(props.docid, user);
                  props.callFunc();
                }}
                className="cardJoinButton2"
              >
                LEAVE
              </button>
            )}
            {!props.isJoin && (
              <button
                type="button"
                onClick={() => {
                  addToMyCommunity(props.room, user);
                  props.callFunc();
                }}
                className="cardJoinButton1"
              >
                JOIN
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
