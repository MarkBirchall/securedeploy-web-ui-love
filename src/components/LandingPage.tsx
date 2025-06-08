
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cloud, Users, Zap, Monitor, Settings } from "lucide-react";
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

  const testimonials = [
    {
      quote: "SecureDeploy has transformed our IT deployment process. What used to take hours now takes minutes.",
      author: "Sarah Johnson, IT Director at TechCorp"
    },
    {
      quote: "The visual task builder is brilliant. Our technicians can create complex sequences without any scripting knowledge.",
      author: "Michael Chen, Systems Administrator at GlobalTech"
    },
    {
      quote: "Outstanding platform with excellent security features. Perfect for our multi-tenant requirements.",
      author: "Emma Williams, CTO at DataFlow Solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white" role="banner">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-primary">SecureDeploy</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="hero-heading" className="text-5xl font-bold text-primary mb-6">
            Enterprise Device Deployment Made Simple
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your IT operations with our comprehensive platform for secure device imaging, 
            application deployment, and centralised management across your entire organisation.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">
            Why Choose SecureDeploy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-20" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <blockquote className="text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <cite className="text-sm font-medium">— {testimonial.author}</cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <Button variant="link" onClick={() => window.open('/docs', '_blank')}>
              Documentation
            </Button>
            <Button variant="link" onClick={() => window.open('/support', '_blank')}>
              Support
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SecureDeploy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
