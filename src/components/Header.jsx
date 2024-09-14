import React from 'react'
import '../styles/Header.css'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export const Header = () => {
  return (
    <div className='headerMainContainer'>
      <h1><BusinessCenterIcon sx={{ mr: 2 }}/>Finance folio</h1>
      <a href="https://www.buymeacoffee.com/jpmontero"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=jpmontero&button_colour=5F7FFF&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" alt='Buy me a pizza'/></a>
    </div>
  )
}
export default Header
