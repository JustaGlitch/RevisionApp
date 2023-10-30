import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../../assets/img/pokeball.png";
import StudyDex from "../../assets/img/logo.png";

export default function Header() {
  return (
    <header className='bg-body-tertiary'>
    <div className='container'>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand me-auto" href="/">
            <img src={Logo} alt="Logo" width="30" height="30" class="d-inline-block align-text-top me-2"/>
            <img src={StudyDex} alt="SttudyDex" width="90"  class="d-inline-block align-text-top"/>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNav">
          <div class="navbar ms-auto" >
            <NavLink className="nav-link" to="/">All Tasks</NavLink>
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
