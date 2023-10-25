import "./index.css";
import Admin from "./components/AdminUserInterface";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <div className="Main">
        <Admin />
        <ToastContainer autoClose={1000} />
      </div>
    </div>
  );
}

export default App;
