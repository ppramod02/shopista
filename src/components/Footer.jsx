
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-40">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Logo and About Section */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0 mr-auto">
                        <h2 className="text-2xl font-bold mb-2">Shopista</h2>
                        <p className="text-gray-400">
                            Shopista is dedicated to providing top-notch products and services. We value quality, innovation, and customer satisfaction.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400">
                            1234 Street, City, Country
                        </p>
                        <p className="text-gray-400">
                            Email: contact@shopista.com
                        </p>
                        <p className="text-gray-400">
                            Phone: +91 123 456 7890
                        </p>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2024 Shopista. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
