import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import HomePage from "../../pages/home/HomePage";
import InterestPage from "../../pages/home/InterestPage";
import SuggestionPage from "../../pages/home/SuggestionPage";
import ContactPage from "../../pages/home/ContactPage";
import Header from "../header/Header";
import { Fragment } from "react";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myCommunities" element={<Landing />} />
        <Route path="/myInterests" element={<InterestPage />} />
        <Route path="/suggestion" element={<SuggestionPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/room/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
