import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMailBulk, FaWhatsapp } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (

        <div className="mx-auto mt-3 bg-white text-gray-400   px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">

            <div>
                <p className="text-blue-500 text-sm">
                    Lets Build Our Careers Together.
                </p>
                <div className="flex space-x-4 mt-6">
                    <a href="mailto:https://hirescript.work@gmail.com"><FaMessage className="text-gray-400 hover:text-gray-500" /></a>
                    <a href="https://chat.whatsapp.com/JhXYXasBWB2FJailZ6JFqH?mode=r_c" target="_blank"><FaWhatsapp className="text-gray-400 hover:text-gray-500" /></a>
                    <a href="https://www.instagram.com/hellohirescript/" target="_blank"><FaInstagram className="text-gray-400 hover:text-gray-500" /></a>
                    <a href="https://www.linkedin.com/company/hirescript-app/" target="_blank"><FaLinkedinIn className="text-gray-400 hover:text-gray-500" /></a>
                </div>
            </div>

            <div>
                <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                    
                    <li>
                        <a href="https://www.linkedin.com/company/hirescript-app/" target="_blank">
                        <p className="hover:text-gray-900">About company</p>
                        </a>
                    </li>
                    
                
                    <li>
                        <a href="mailto:hirescript.work@gmail.com" target="_blank">
                        <p className="hover:text-gray-900">Career @HireScript</p>
                        </a>
                    </li>
                    

                    <li>
                        <a href="mailto:hirescript.work@gmail.com" target="_blank">
                        <p className="hover:text-gray-900">Contact us</p>
                        </a>
                    </li>

                    <li>
                        <Link className="hover:text-gray-900" to="/terms">Terms and Condition</Link>
                    </li>
                </ul>

            </div>

            <div>
                <h3 className="text-gray-900 font-semibold mb-4">Customer</h3>
                <ul className="space-y-2 text-sm">
                    <li>
                        <a href="mailto:hirescript.work@gmail.com" target="_blank"><p className="hover:text-gray-900">Client Support</p></a>
                    </li>

                    

                    <li>
                        <a href="https://www.linkedin.com/company/hirescript-app/" target="_blank"><p 
                    className="hover:text-gray-900">Who are we!</p></a>
                    </li>

                    <Link className="hover:text-gray-900" to="/use"><li>Terms Of Use</li></Link>
                </ul>
            </div>


        </div>
    );
}

export default Footer

