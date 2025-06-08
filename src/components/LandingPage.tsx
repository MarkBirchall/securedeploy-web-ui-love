
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cloud, Users, Zap, Monitor, Settings, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Multi-tenant Support",
      description: "Secure isolation and management across multiple organisations"
    },
    {
      icon: Shield,
      title: "Secure Device Imaging",
      description: "Enterprise-grade security for all deployment operations"
    },
    {
      icon: Monitor,
      title: "Centralised Application Library",
      description: "Manage and deploy applications from a unified repository"
    },
    {
      icon: Zap,
      title: "Visual Task Sequence Builder",
      description: "Drag-and-drop interface for creating deployment workflows"
    },
    {
      icon: Settings,
      title: "Real-time Deployment Status",
      description: "Monitor progress and status of all active deployments"
    },
    {
      icon: Cloud,
      title: "Flexible Deployment Options",
      description: "Support for both cloud and on-premise environments"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60" role="banner">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SecureDeploy
              </h1>
              <p className="text-xs text-slate-500 -mt-1">.ai</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/login')} className="border-blue-200 text-blue-600 hover:bg-blue-50">
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('mailto:sales@securedeploy.ai', '_blank')}
              className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Sales
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center rounded-full px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <Zap className="mr-2 h-4 w-4" />
            AI-Powered Device Deployment Platform
          </div>
          <h2 id="hero-heading" className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Enterprise Device Deployment
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Sign In to Platform
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.open('mailto:sales@securedeploy.ai', '_blank')}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
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

      {/* Features Section */}
      <section className="py-24 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose SecureDeploy.ai?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built for modern enterprises that demand security, efficiency, and scalability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-slate-900 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your IT Operations?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join leading enterprises who trust SecureDeploy.ai for their device deployment needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => window.open('mailto:sales@securedeploy.ai', '_blank')}
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Sales Team
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.open('tel:+44-800-000-0000', '_blank')}
              className="border-white text-white hover:bg-white/10 px-8 py-4"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: 0800 000 0000
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
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
    </div>
  );
};

export default LandingPage;
