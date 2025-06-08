
import { Button } from "@/components/ui/button";
import { Zap, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FEB329]/10 via-[#FEB329]/5 to-[#F59E0B]/10 py-24" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="container mx-auto px-4 text-center relative">
        <div className="inline-flex items-center rounded-full px-4 py-2 bg-[#FEB329]/20 text-[#D97706] text-sm font-medium mb-8">
          <Zap className="mr-2 h-4 w-4" />
          AI-Powered Device Deployment Platform
        </div>
        <h2 id="hero-heading" className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Enterprise Device Deployment
          <span className="block bg-gradient-to-r from-[#FEB329] to-[#F59E0B] bg-clip-text text-transparent">
            Made Simple
          </span>
        </h2>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Streamline your IT operations with our comprehensive platform for secure device imaging, 
          application deployment, and centralised management across your entire organisation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-[#FEB329] hover:bg-[#F59E0B] text-white px-8 py-4 text-lg"
          >
            Sign In to Platform
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.open('mailto:sales@securedeploy.ai', '_blank')}
            className="border-[#FEB329]/30 text-[#FEB329] hover:bg-[#FEB329]/10 px-8 py-4 text-lg"
          >
            <Mail className="mr-2 h-5 w-5" />
            Request Demo
          </Button>
        </div>
        <p className="text-sm text-slate-500 mt-6">
          Enterprise solution • Contact our sales team to get started
        </p>
      </div>
    </section>
  );
};
