import React from 'react'
import { SearchIcon } from '../svgs'

 const NavBar = () => {
  return (
  <>
  <div>
    <nav>
      <div>{/* name */}
      <p>
        Dash<span>Board</span>
      </p>
      </div>
      <div>{/* search */}
      <div>
      <input type="text" />
      <div className='bg-red-300'>
        <SearchIcon />

      </div>
      </div>
      </div>
      <div>{/* side icons */}

      </div>
    </nav>
  </div>
  
  </>
  )
}
export default NavBar
