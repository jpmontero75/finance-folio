import React from 'react'
import '../../styles/Mobile/MobileStyles.css'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export const Header = () => {
  return (
    <div className='mobileHeaderMainContainer'>
      <h1><BusinessCenterIcon sx={{ mr: 2 }}/>Finance folio</h1>
    </div>
  )
}
export default Header
