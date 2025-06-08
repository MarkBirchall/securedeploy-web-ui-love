
import { Button } from "@/components/ui/button";
import { Shield, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60" role="banner">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-[#FEB329]" aria-hidden="true" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FEB329] to-[#F59E0B] bg-clip-text text-transparent">
              SecureDeploy
            </h1>
            <p className="text-xs text-slate-500 -mt-1">.ai</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/login')} className="border-[#FEB329]/30 text-[#FEB329] hover:bg-[#FEB329]/10">
            Sign In
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open('mailto:sales@securedeploy.ai', '_blank')}
            className="bg-[#FEB329] text-white border-[#FEB329] hover:bg-[#F59E0B]"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Sales
          </Button>
        </div>
      </div>
    </header>
  );
};
