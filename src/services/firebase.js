import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const firebaseConfig = {
//     // TODO: Add your Firebase configuration here
//     apiKey: "AIzaSyB1_zpD2nSVPVsss0jeM6NDxe6pyjx3-44",
//     authDomain: "chatting-44507.firebaseapp.com",
//     projectId: "chatting-44507",
//     storageBucket: "chatting-44507.appspot.com",
//     messagingSenderId: "630467665784",
//     appId: "1:630467665784:web:b6f70634790eecb46cf28d",
//     measurementId: "G-LQXB9SJ2RK"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDdaCH-_G3GzakFPLjfTFKQPQCc927GfL8",
  authDomain: "happy-community-40e8f.firebaseapp.com",
  projectId: "happy-communityn-40e8f",
  storageBucket: "happy-community-40e8f.appspot.com",
  messagingSenderId: "816114995447",
  appId: "1:816114995447:web:fbd14c1357ee5b9591c3f2",
  measurementId: "G-T1BSZMG43Z",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName, email: user.email };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
      console.log("ERRORHUB!!!!!!!!!!!1");
    }
    return null;
  }
}

async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

async function addToMyCommunity(community, user) {
  try {
    console.log("clicked");
    await addDoc(collection(db, "user", user.uid, "myCommunities"), {
      id: community.id,
      title: community.title,
      tags: community.tags,
    });
    toast.success("Joined Successfully");
  } catch (error) {
    console.log(error);
    toast.error("Joining Failed. Try Again !");
  }
}

async function deleteMyCommunity(docid, user) {
  try {
    console.log(docid);
    await deleteDoc(doc(db, "user", user.uid, "myCommunities", docid));
    toast.info("Left Successfully");
  } catch (error) {
    toast.error("product delete failed");
  }
}

async function addToMyTag(interest, user) {
  try {
    console.log("clicked");
    await addDoc(collection(db, "user", user.uid, "myInterests"), {
      tag: interest,
    });
    console.log("added");
  } catch (error) {
    console.log(error);
    toast.error("Joining Failed. Try Again !");
  }
}
async function deleteMyTag(interest, user) {
  try {
    await deleteDoc(doc(db, "user", user.uid, "myInterests", interest));
    console.log("deleted");
  } catch (error) {
    console.error("product delete failed");
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));

      callback(messages);
    }
  );
}

async function sendContactDetail(name, email, subject, message) {
  try {
    console.log("clicked");
    await addDoc(collection(db, "ContactUS"), {
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
    toast.success("SEND");
  } catch (error) {
    console.log(error);
    toast.error("Joining Failed. Try Again !");
  }
}

export {
  loginWithGoogle,
  sendMessage,
  getMessages,
  deleteMyCommunity,
  sendContactDetail,
  addToMyCommunity,
  addToMyTag,
  deleteMyTag,
  db,
};
