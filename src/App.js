import React, { useState, Fragment } from "react";

import "tachyons";

const App = () => {
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/.netlify/functions/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoading(false);
        setName("");
        setMessage(`See ya soon addy is in the url :) ps. BYOB, ${json.data}! `);
      });
  };

  const renderInput = () => {
    return (
      <Fragment>
        <input value={name} placeholder="your name" onChange={(e) => setName(e.target.value)} />
        <button onClick={(e) => handlePost(e)} className="br3 ml1">
          {loading ? "Loading" : "send rsvp"}
        </button>
      </Fragment>
    );
  };

  return (
    <div className="bg-pink vh-100 pa1">
      <h1>hey you</h1>
      <h2>I'm havin a party</h2>
      <h3>This Friday</h3>
      {!message ? (
        <Fragment>
          <h4>Let me know you're coming</h4>
          {renderInput()}
        </Fragment>
      ) : null}
      <h1>{message}</h1>
    </div>
  );
};

export default App;
