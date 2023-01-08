import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { sendContactDetail } from "../../services/firebase";
import "react-toastify/dist/ReactToastify.css";
import "./ContactPage.scss";
import Header from "../../components/header/Header";
import background from "../../images/contactBackground.png";

function ContactPage() {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, subject, message } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please provide value in each input field");
    } else {
      sendContactDetail(name, email, subject, message);
      setState({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        width: "100vw",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Header />
      <section className="contact-section">
        <div className="container">
          <ToastContainer position="top-center" />
          <div className="sideBySide">
            <div className="formDiv leftDiv">
              <div className="contact-wrap p-lg-5 p-4">
                <h3 className="mb-4 headingLeftDiv">Send us a message</h3>
                <form
                  id="contactForm"
                  className="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Name"
                          onChange={handleInputChange}
                          value={name}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          onChange={handleInputChange}
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Subject"
                          onChange={handleInputChange}
                          value={subject}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          type="text"
                          className="form-control formMessage"
                          name="message"
                          placeholder="Message"
                          cols="30"
                          rows="6"
                          onChange={handleInputChange}
                          value={message}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group buttonDiv">
                        <input
                          type="submit"
                          value="Send Message"
                          className="btn btn-primary"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-stretch formDiv contactUs">
              <div className="info-wrap w-100 p-lg-5 p-4 img">
                <h3 className="lowerDivHeading">Contact us</h3>
                <p className="rightDivPara">
                  We're open for any suggestion or just to have a chat
                </p>

                <p className="rightDivPara">
                  <span>Address:</span> LNMIIT
                </p>

                <p className="rightDivPara">
                  <span>Phone:</span>
                  <a href="tel://123456789">+1235 2355 98</a>
                </p>

                <p className="rightDivPara">
                  <span>Email:</span>
                  <a href="mailto:info@yoursite.com">info@happycommunity.com</a>
                </p>

                <p>
                  <span>Website:</span>
                  <a href="https://happycommunity.vercel.app/">
                    {" "}
                    happycommunity.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
