import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../../assets/img/pokeball.png";
import StudyDex from "../../assets/img/logo.png";

export default function Header() {
  return (
    <header className='bg-body-tertiary z-3 shadow-sm'>
    <div className='container'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand me-auto" href="/">
            <img src={Logo} alt="Logo" width="42" height="42" className="d-inline-block align-text-top me-3"/>
            <img src={StudyDex} alt="StudyDex" width="150"  className="d-inline-block align-text-top"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav ms-auto" >
              <NavLink className="ms-5 nav-link" to="/">All Tasks</NavLink>
              <NavLink className="ms-5 nav-link" to="/account">Account</NavLink>
              <NavLink className="ms-5 nav-link" to="/login">Login</NavLink>
              <NavLink className="ms-5 nav-link" to="/register">Register</NavLink>
            </div>
          </div>
      </div>
      </nav>
    </div>
    </header>
  )
}
