
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cloud, Users, Zap, Monitor, Settings } from "lucide-react";

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

export const FeaturesSection = () => {
  return (
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
            <Card key={index} className="border-slate-200 hover:border-[#FEB329]/50 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FEB329]/20 to-[#F59E0B]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-[#FEB329]" aria-hidden="true" />
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
  );
};
