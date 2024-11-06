import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PPTGen from "./components/PPTGenerator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PPTGen/>
    </>
  );
}

export default App;
