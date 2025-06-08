
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-slate-50 py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-[#FEB329]" />
              <span className="text-lg font-bold text-slate-900">SecureDeploy.ai</span>
            </div>
            <p className="text-slate-600">
              AI-powered enterprise device deployment platform
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto text-slate-600" onClick={() => window.open('/features', '_blank')}>
                Features
              </Button>
              <Button variant="link" className="p-0 h-auto text-slate-600" onClick={() => window.open('/docs', '_blank')}>
                Documentation
              </Button>
              <Button variant="link" className="p-0 h-auto text-slate-600" onClick={() => window.open('/security', '_blank')}>
                Security
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto text-slate-600" onClick={() => window.open('mailto:support@securedeploy.ai', '_blank')}>
                Contact Support
              </Button>
              <Button variant="link" className="p-0 h-auto text-slate-600" onClick={() => window.open('/help', '_blank')}>
                Help Centre
              </Button>
              <Button variant="link" className="p-0 h-auto text-slate-600" onClick={() => window.open('/status', '_blank')}>
                System Status
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2025 SecureDeploy.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
