import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
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
                        <FaFacebookF className="text-gray-400 hover:text-gray-500" />
                        <FaTwitter className="text-gray-400 hover:text-gray-500" />
                        <FaInstagram className="text-gray-400 hover:text-gray-500" />
                        <FaLinkedinIn className="text-gray-400 hover:text-gray-500" />
                    </div>
                </div>

                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        {["About company", "Company services", "Job opportunities", "Contact us"].map(text => (
                            <li key={text}><p  className="hover:text-gray-900">{text}</p></li>
                        ))}
                        <Link className="hover:text-gray-900" to="/terms"><li>Terms and Condition</li></Link>
                    </ul>
                </div>

                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Customer</h3>
                    <ul className="space-y-2 text-sm">
                        {["Client support", "Latest news", "Company story", "Pricing packages", "Who we are"].map(text => (
                            <li key={text}><p className="hover:text-gray-900">{text}</p></li>
                        ))}
                        <Link className="hover:text-gray-900" to="/use"><li>Terms Of Use</li></Link>
                    </ul>
                </div>

                
            </div>
    );
}

export default Footer

