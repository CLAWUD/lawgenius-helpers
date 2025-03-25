
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
            LG
          </div>
          <span className="text-xl font-bold tracking-tight text-navy-700">LegalGenius</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-navy-700 hover:text-navy-500 font-medium transition-colors">
            Home
          </Link>
          <a href="#features" className="text-navy-700 hover:text-navy-500 font-medium transition-colors">
            Features
          </a>
          <a href="#chat" className="text-navy-700 hover:text-navy-500 font-medium transition-colors">
            Legal Assistant
          </a>
          <a href="#about" className="text-navy-700 hover:text-navy-500 font-medium transition-colors">
            About
          </a>
          
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-navy-600">
                Hello, {user?.firstName || 'User'}
              </span>
              <SignOutButton>
                <Button variant="outline" className="border-navy-300 text-navy-700 hover:bg-navy-50">
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button className="bg-navy-500 hover:bg-navy-600 text-white">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-navy-700" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 animate-slide-in">
          <Link 
            to="/" 
            className="text-navy-700 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a 
            href="#features" 
            className="text-navy-700 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#chat" 
            className="text-navy-700 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Legal Assistant
          </a>
          <a 
            href="#about" 
            className="text-navy-700 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          
          {isSignedIn ? (
            <div className="flex flex-col space-y-3 pt-2">
              <span className="text-sm text-navy-600">
                Hello, {user?.firstName || 'User'}
              </span>
              <SignOutButton>
                <Button variant="outline" className="w-full border-navy-300 text-navy-700 hover:bg-navy-50">
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full bg-navy-500 hover:bg-navy-600 text-white mt-2">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
