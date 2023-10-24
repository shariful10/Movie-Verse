import React from 'react'

const Footer = () => {
  return (
    <div className='text-center font-light text-white pt-4 text-[13px] md:text-[16px]'>
      ©️ MovieVerse | All Right Reserved {new Date().getFullYear()}
      <p>Made with 💖 by Shariful Islam.</p>
    </div>
  )
}

export default Footer