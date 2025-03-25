
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about" className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-navy-300 flex items-center justify-center text-white font-bold text-lg">
                LG
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LegalGenius</span>
            </div>
            <p className="text-navy-200 mb-4">
              Accessible legal assistance powered by AI, designed to help everyone understand and navigate legal matters with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-navy-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-navy-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-navy-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">Cookies Policy</a></li>
              <li><a href="#" className="text-navy-200 hover:text-white transition-colors">Data Processing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-teal-400" />
                <a href="mailto:info@legalgenius.com" className="text-navy-200 hover:text-white transition-colors">
                  info@legalgenius.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-teal-400" />
                <a href="tel:+911234567890" className="text-navy-200 hover:text-white transition-colors">
                  +91 1234 567 890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-teal-400" />
                <span className="text-navy-200">
                  123 Legal Street, New Delhi, 110001, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-12 pt-8 text-center text-navy-300 text-sm">
          <p>&copy; {new Date().getFullYear()} LegalGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
