
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ChatSection from '@/components/ChatSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <ChatSection />
      <Footer />
    </div>
  );
};

export default Index;
