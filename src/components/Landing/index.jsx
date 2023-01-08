import { Link } from "react-router-dom";
// import { chatRooms } from '../../data/chatRooms';
import { useAuth } from "../../hooks/useAuth";
import "./styles.css";
import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import Card2 from "../../components/card/Card2";
import Header from "../header/Header";

function Landing() {
  const [myCommunity, setMyCommunity] = useState([]);
  const { user } = useAuth();

  async function getMyCommunity(userid) {
    try {
      console.log("LANDEDD ON PAGE");

      const community = await getDocs(
        collection(db, "user", userid, "myCommunities")
      );
      console.log(community);
      const communityArray = []; // we will store all data in a array
      community.forEach((doc) => {
        communityArray.push(doc.data());
      });
      setMyCommunity(communityArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyCommunity(user.uid);
  }, []);

  return (
    <div className="backgroundAllChatRooms makeCenter">
      <Header />
      <h1 className="allChatRoomsHeading1">Welcome to your communities!</h1>
      <div className="chat-room-list">
        {myCommunity.map((room) => (
          <div className="divideRow">
            <Card2 room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Landing };
