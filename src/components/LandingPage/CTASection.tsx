
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FEB329] to-[#F59E0B]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Transform Your IT Operations?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join leading enterprises who trust SecureDeploy.ai for their device deployment needs.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => window.open('mailto:sales@securedeploy.ai', '_blank')}
            className="bg-white text-[#FEB329] hover:bg-slate-100 px-8 py-4"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};
