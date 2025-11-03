import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, BarChart3, Zap, Shield, Globe } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Zap,
      title: "AI-Powered Automation",
      description: "Automate routine PR tasks and focus on strategic initiatives",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track campaign performance and media coverage instantly",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamlessly coordinate with your PR team in one platform",
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "AI-driven recommendations to optimize your PR strategy",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your sensitive PR data",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Manage campaigns across multiple regions and languages",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PulsePR
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Streamline PR Campaigns,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Press Releases
            </span>
            , and Media Insights with AI
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your public relations workflow with intelligent automation,
            real-time analytics, and seamless team collaboration.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")} className="shadow-lg">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Why Choose PulsePR?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage successful PR campaigns in one powerful platform
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-primary to-accent p-12 text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your PR Strategy?
          </h3>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of PR professionals who trust PulsePR to manage their campaigns
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/signup")}
            className="shadow-lg"
          >
            Get Started Today
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 PulsePR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
