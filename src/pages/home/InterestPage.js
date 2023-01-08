import React from "react";
import Header from "../../components/header/Header";
import "./InterestPage.css";
import Card3 from "../../components/card/Card3";
import { allInterests } from "../../data/allInterests";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const InterestPage = (props) => {
  console.log(allInterests);

  const [myInterest, setMyInterest] = useState([]);
  const { user } = useAuth();
  console.log(user);

  async function getMyInterest(userid) {
    try {
      const interest = await getDocs(
        collection(db, "user", userid, "myInterests")
      );
      console.log(interest);
      const interestArray = []; // we will store all data in a array
      interest.forEach((doc) => {
        const obj = {
          docid: doc.id,
          tag: doc.data().tag,
        };
        interestArray.push(obj);
      });
      console.log(interestArray);
      setMyInterest(interestArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyInterest(user.uid);
  }, []);

  const callInterest = () => {
    getMyInterest(user.uid);
  };

  function checker(ids, comm) {
    for (let i = 0; i < comm.length; i++) {
      if (comm[i].tag === ids) {
        return i;
      }
    }
    return -1;
  }

  return (
    <div className="interestBackgroundBody ">
      <Header />
      <div>
        <div className="interestStyleCardDiv">
          {allInterests.map((interest) => {
            let x = checker(interest, myInterest);
            const val = x !== -1 ? myInterest[x].docid : -1;
            console.log(myInterest);
            return (
              <div className="interestCardsStyle">
                <Card3
                  interest={interest}
                  docid={val}
                  isSelected={x !== -1 ? true : false}
                  callFunc={callInterest}
                  desc="you can talk about healthy things here."
                />
              </div>
            );
          })}
        </div>
        <NavLink
          className="navbar-item suggestionButton"
          activeClassName="is-active"
          to="/suggestion"
          exact
        >
          Suggested Communities
        </NavLink>
        {/* iss button pe click krte hi wo suggestion page pe pahuch jaaye */}
      </div>
    </div>
  );
};

export default InterestPage;
