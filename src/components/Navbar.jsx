import React,{useState} from "react";
import "./Navbar.css";
import {Link, NavLink} from "react-router-dom"
export const Navbar=()=>{
    const [menuOpen,setMenuOpen] = useState(false)
    return(
        <nav>
            <Link to="/" className="title">Home</Link>
            <div className="menu" onClick={()=>{
                setMenuOpen(!menuOpen);
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'open' : ""}>
                <li className="abt">
                    <NavLink to="/about">About</NavLink>
                </li>
                <li className="srv">
                    <NavLink to="/services">Services</NavLink>
                </li>
                <li className="cont">
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li className="cont">
                    <NavLink to="/calender">Fullcalender</NavLink>
                </li>
                <li>
                    <NavLink to="/wheather">Wheather</NavLink>
                </li>
                <li>
                    <NavLink to="/news">News</NavLink>
                </li>
            </ul>
        </nav>
    );
};