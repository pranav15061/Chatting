import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        {/* <Login /> */}
        {/* <Signup/> */}
        <Home/>
      </div>
    </>
  );
}

export default App;
