import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Main from "./pages/main";
import { Navbar } from "./components/Navbar";
import CreatePost from "./pages/create-post/create-post";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
