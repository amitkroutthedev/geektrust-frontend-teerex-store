import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Cart from "./screens/Cart";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
