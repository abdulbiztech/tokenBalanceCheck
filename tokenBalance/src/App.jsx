import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TokenBalanceChecker from "./components/TokenBalanceChecker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>My React App</h1>
        <TokenBalanceChecker />
      </div>
    </>
  );
}

export default App;
