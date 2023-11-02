import React from 'react'

function Footer({bgColor, textColor}) {
  return (
    <footer style={{backgroundColor: bgColor, color: textColor}} className='w-100 d-flex py-3 justify-content-center'>2023 © Git Sematary</footer>
  )
}

export default Footer
