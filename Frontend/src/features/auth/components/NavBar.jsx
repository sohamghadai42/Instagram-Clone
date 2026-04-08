import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/nav.scss'

const NavBar = () => {
  return (
    <nav>
        <div className="left">
            <h1>InstSocials</h1>
        </div>
        <div className="right">
      <Link to="/createpost">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
            <button>
            Create Post
            </button>
        </Link>
        </div>
    </nav>
  )
}

export default NavBar