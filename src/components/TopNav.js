import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const TopNav = () => {
  return (
    <nav className='topNav'>
      <ul className='navMenu'>
        <li><NavLink to='/games' activeClassName='active'>All Games</NavLink></li>
        <li><NavLink to='/' activeClassName='active'>Log-out</NavLink></li>
      </ul>
      <h2>Not-Pictionary Online</h2>
    </nav>
  )
}

export default TopNav;
