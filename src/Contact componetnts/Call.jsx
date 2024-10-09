import React from "react";
import "../Contact componetnts/call.css"
const Call = () => {
  return (
    <div>
      <div id="call">
        <h1>Call: +234 805 835 8897</h1>
        <h2>We Can’t Wait to Make Your Ideas a Reality</h2>
      </div>
      <div className="far">
        <form className="form">
          <div className="mails">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <div id="mails">
            <input type="text" placeholder="Message" />
            <button>Send message</button>
          </div>
              </form>
              <div>
                  map
              </div>
      </div>
    </div>
  );
};

export default Call;
