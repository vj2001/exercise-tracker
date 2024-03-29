import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props)
{
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/exerciselist" className="navbar-brand">Excercise Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/exerciselist" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
}
