import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Services from "./components/pages/Services";  
import Wheather from "./components/WheatherApi/Wheather.jsx";
import News from "./components/newsapi/News.jsx";
import Calender from "./components/CalenderApp/Calender.jsx";
function App(){
  return (
  <div className="App">
    <Navbar/>
    
     <Routes>

     <Route path="/" element={<Home />}/>
     <Route path="/calender" element={<Calender/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/wheather" element={<Wheather/>}/>
      <Route path="/news" element={<News/>}/>
    


     </Routes>
  
  </div>
  )
}
export default App;