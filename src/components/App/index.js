import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../../App.css";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../welcome";
import Login from "../Login";
import Signup from "../Signup";
import ErrorPage from "../ErrorPage";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
