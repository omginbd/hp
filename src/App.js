import React, { useState } from "react";
import { SpeechBubble } from "react-kawaii";
import "./App.css";

function App() {
  const [house, setHouse] = useState("");
  const [classmates, setClassmates] = useState(false);
  const [loading, setLoading] = useState("");

  const handleClick = async () => {
    setLoading(true);
    const resp = await fetch("https://mpc-harrypotter.builtwithdark.com/sort");
    const body = await resp.json();
    console.log(body);
    setHouse(body.house);
    setClassmates(body.classmates);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className={loading ? "shaking" : ""} onClick={handleClick}>
          <SpeechBubble mood={loading ? "sad" : house ? "shocked" : "happy"} />
        </div>
        {house && <h1>{house}</h1>}
        {classmates && (
          <p>
            <h2>You're in good company:</h2>
            {classmates.map((classmate) => (
              <div key={classmate.name}>{classmate.name}</div>
            ))}
          </p>
        )}
        {!house && <p>Click me to be sorted!</p>}
      </header>
    </div>
  );
}

export default App;
