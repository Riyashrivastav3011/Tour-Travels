import React from 'react'
import Logo from '../../images/logo.png'   

function Footer() {
  return (
    <>
    <footer className="footer sm:footer-horizontal bg-gray-200 text-base-content p-10">
  <aside>
    <img src={Logo} />
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Book Trip</a>
    <a className="link link-hover">Plan Destinations</a>
    <a className="link link-hover">Holidays Packages</a>
    <a className="link link-hover">Travel Insurance</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Login</a>
    <a className="link link-hover">Membership</a>
    <a className="link link-hover">Best places</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
<footer className="footer sm:footer-horizontal footer-center bg-gray-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All rights are reserved </p>
  </aside>
</footer>
    </>
  )
}

export default Footer