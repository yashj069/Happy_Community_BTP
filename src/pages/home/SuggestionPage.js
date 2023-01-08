import React from "react";
import Header from "../../components/header/Header";
import { chatRooms } from "../../data/chatRooms";

import { useState, useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import Card from "../../components/card/Card";
import "./SuggestionPage.css";

const SuggestionPage = (props) => {
  const [myInterest, setMyInterest] = useState([]);
  const [myCommunity, setMyCommunity] = useState([]);

  let arrayOfScore = [{ id: "ss", title: "ff", score: 0 }];
  const { user } = useAuth();

  async function getMyInterest(userid) {
    try {
      const interest = await getDocs(
        collection(db, "user", userid, "myInterests")
      );
      // console.log(interest);
      const interestArray = []; // we will store all data in a array
      interest.forEach((doc) => {
        interestArray.push(doc.data().tag);
      });
      // console.log(interestArray);
      setMyInterest(interestArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyInterest(user.uid);
  }, []);

  function count(tags, myInterest) {
    let count = 0;
    for (let i = 0; i < tags.length; i++) {
      if (myInterest.includes(tags[i])) {
        count = count + 1;
      }
    }

    return count / tags.length;
  }

  function compare(a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  }

  function topSix(arr) {
    let temp = [{ id: "ss", title: "ff", score: 0 }];
    for (let i = 0; i < Math.min(6, arr.length); i++) {
      if (arr[i].score === 0) break;
      temp.push(arr[i]);
    }
    arrayOfScore = temp;
  }

  async function getMyCommunity(userid) {
    try {
      // console.log("LANDEDD ON PAGE");

      const community = await getDocs(
        collection(db, "user", userid, "myCommunities")
      );
      // console.log(community);
      const communityArray = []; // we will store all data in a array
      community.forEach((doc) => {
        const obj = {
          docid: doc.id,
          id: doc.data().id,
        };
        communityArray.push(obj);
      });
      // console.log(communityArray);
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
    <div className="suggestionBackgroundBody ">
      <Header />
      <div className="styleSuggestionCardDiv">
        {chatRooms.map((room) => {
          const obj = {
            id: room.id,
            title: room.title,
            tags: room.tags,
            score: count(room.tags, myInterest),
          };
          arrayOfScore.push(obj);
          arrayOfScore.sort(compare);
        })}
        {topSix(arrayOfScore)}
        {arrayOfScore.map((room) => {
          if (room.score > 0) {
            console.log(room.score);
            console.log(myCommunity);
            let x = checker(room.id, myCommunity);
            console.log(x);
            if (x !== -1) {
              console.log(myCommunity[x].docid);
              return (
                <div className="suggestionCardsStyle">
                  <Card
                    room={room}
                    docid={myCommunity[x].docid}
                    isJoin={true}
                    callFunc={callCommunity}
                    desc="you can talk about healthy things here."
                  />
                </div>
              );
            } else {
              return (
                <div className="suggestionCardsStyle">
                  <Card
                    room={room}
                    isJoin={false}
                    callFunc={callCommunity}
                    desc="you can talk about healthy things here."
                  />
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default SuggestionPage;
