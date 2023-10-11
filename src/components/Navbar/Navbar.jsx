import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <div className="nav-logo">
        <h3 className="logo">
            LOGONAME
        </h3>
    </div>
    <div className='Nav-menu'>
        <NavLink to="/" exact >Home</NavLink>
        <NavLink to="/shop" exact >Shop</NavLink>
        <NavLink to="/contact" exact >Contact</NavLink>
    </div>
    <div className="callsupport">
        <small>Call support <br /></small>
    </div>
    </>
  )
}

export default Navbar