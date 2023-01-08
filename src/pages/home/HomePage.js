import React from "react";
import Header from "../../components/header/Header";
import "./HomePage.css";
import Card from "../../components/card/Card";
import { chatRooms } from "../../data/chatRooms";

//yebhi extra add kr rha hu
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = (props) => {
  const [myCommunity, setMyCommunity] = useState([]);
  const { user } = useAuth();

  async function getMyCommunity(userid) {
    try {
      const community = await getDocs(
        collection(db, "user", userid, "myCommunities")
      );
      const communityArray = [];
      community.forEach((doc) => {
        const obj = {
          docid: doc.id,
          id: doc.data().id,
        };
        communityArray.push(obj);
      });
      setMyCommunity(communityArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyCommunity(user.uid);
  }, []);

  const callCommunity = () => {
    getMyCommunity(user.uid);
  };

  function checker(ids, comm) {
    for (let i = 0; i < comm.length; i++) {
      if (comm[i].id === ids) {
        return i;
      }
    }
    return -1;
  }

  return (
    <div className="backgroundBody ">
      <Header />
      <ToastContainer />
      <div>
        <div className="styleCardDiv">
          {chatRooms.map((room) => {
            let x = checker(room.id, myCommunity);
            const val = x !== -1 ? myCommunity[x].docid : -1;
            return (
              <div className="cardsStyle">
                <Card
                  room={room}
                  docid={val}
                  isJoin={x !== -1 ? true : false}
                  callFunc={callCommunity}
                  desc="you can talk about healthy things here."
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
