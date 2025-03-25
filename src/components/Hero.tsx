
import { useRef } from 'react';
import { ArrowDown, Scale, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const scrollToChat = () => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback to ID-based scrolling
      document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 flex flex-col">
      {/* Background Element */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 right-0 h-[40rem] bg-gradient-to-b from-navy-50 to-transparent -z-10"></div>
        <div className="absolute top-40 right-[10%] w-72 h-72 bg-teal-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-60 left-[5%] w-96 h-96 bg-gold-300 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container-custom flex-1 flex flex-col">
        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-24">
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium mb-4">
              AI-Powered Legal Assistance
            </div>
            <h1 className="heading-xl text-navy-800">
              Accessible Legal Guidance for Everyone
            </h1>
            <p className="text-lg md:text-xl text-navy-600 mt-6 max-w-2xl">
              LegalGenius provides instant, trustworthy legal assistance to help you navigate complex legal matters with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={scrollToChat}
                className="button-primary text-base px-8 py-6 flex items-center gap-2 group"
              >
                Start Chat
                <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
              </Button>
              <Button 
                variant="outline" 
                className="border-navy-200 hover:bg-navy-50 text-navy-700 text-base px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="glass-card w-full max-w-xl p-6 md:p-8 animate-scale-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-navy-700">Legal Document Analysis</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-teal-50 text-teal-700">AI-Powered</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="bg-navy-50 p-4 rounded-lg">
                    <p className="text-navy-700">Analyzing your lease agreement for potentially problematic clauses...</p>
                  </div>
                  <div>
                    <p className="text-navy-700 font-medium">Key findings:</p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-red-500">•</div>
                        <p className="text-navy-600 text-sm">Section 8.3 contains an unusual penalty clause for late payments</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-red-500">•</div>
                        <p className="text-navy-600 text-sm">Early termination terms (Section 12) differ from state standards</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-teal-500">•</div>
                        <p className="text-navy-600 text-sm">Security deposit handling complies with local regulations</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-right">
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">View Full Analysis →</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-navy-800 mb-4">How LegalGenius Helps You</h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              Our platform combines advanced AI with legal expertise to provide reliable assistance
              for your legal questions and document needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 md:p-8 opacity-0 animate-fade-in delay-1" style={{ animationFillMode: 'forwards' }}>
              <div className="w-12 h-12 rounded-lg bg-navy-100 flex items-center justify-center mb-6">
                <Scale className="text-navy-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Legal Guidance</h3>
              <p className="text-navy-600">
                Receive instant answers to your legal questions based on Indian legal code and Supreme Court precedents.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 opacity-0 animate-fade-in delay-2" style={{ animationFillMode: 'forwards' }}>
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-6">
                <FileText className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Document Analysis</h3>
              <p className="text-navy-600">
                Upload legal documents for AI analysis to identify important clauses and potential issues.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 opacity-0 animate-fade-in delay-3" style={{ animationFillMode: 'forwards' }}>
              <div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center mb-6">
                <Shield className="text-gold-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Privacy Protected</h3>
              <p className="text-navy-600">
                Your information remains secure and confidential with our enterprise-grade security measures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pass the ref to parent */}
      <div ref={chatSectionRef}></div>
    </div>
  );
};

export default Hero;
