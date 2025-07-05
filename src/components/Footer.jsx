import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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
                        {["About company", "Company services", "Job opportunities", "Creative people", "Contact us"].map(text => (
                            <li key={text}><p  className="hover:text-gray-900">{text}</p></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Customer</h3>
                    <ul className="space-y-2 text-sm">
                        {["Client support", "Latest news", "Company story", "Pricing packages", "Who we are"].map(text => (
                            <li key={text}><p className="hover:text-gray-900">{text}</p></li>
                        ))}
                    </ul>
                </div>

                <div className="">
                    <h3 className="text-gray-900 font-semibold mb-4 ">Subscribe To Newsletter</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Enter your email address for receiving valuable newsletters.
                    </p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-grow w-full sm:w-auto max-w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.94 6.94L10 10.7l7.06-3.76A2 2 0 0016 6H4a2 2 0 00-1.06.94z" />
                                <path d="M18 8.24l-8 4.27-8-4.27V14a2 2 0 002 2h12a2 2 0 002-2V8.24z" />
                            </svg>
                        </button>
                    </form>
                    <p className="text-blue-500 text-xs mt-6">© {currentYear} Lets Work</p>
                </div>
            </div>
    );
}

export default Footer

