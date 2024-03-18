import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/my_profile/index";
import Quiz from "./pages/home/quiz";
import Contact from "./pages/contact";
// import ColorRingSpinner from "./pages/home/ColorRingSpinner";
// import ColorRingSpinner from "./pages/home/colorringspinner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/spinner" element={<ColorRingSpinner/>} /> */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
