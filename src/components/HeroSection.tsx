import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Users, Calendar, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to 
            <span className="block text-5xl md:text-7xl bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              KMTC SRC
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Your gateway to seamless SRC fee payment, student services, and staying connected with campus life at Kenya Medical Training College.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" className="min-w-[200px]">
              <CreditCard className="mr-2 h-5 w-5" />
              Pay SRC Fee (Ksh 1,500)
            </Button>
            <Button variant="outline" size="xl" className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary">
              <Users className="mr-2 h-5 w-5" />
              Learn About SRC
            </Button>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="font-semibold text-white">Secure Payments</h3>
                <p className="text-sm text-white/80">M-PESA & Card</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="font-semibold text-white">Student Services</h3>
                <p className="text-sm text-white/80">24/7 Support</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="font-semibold text-white">SRC Events</h3>
                <p className="text-sm text-white/80">Stay Updated</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="font-semibold text-white">Instant Receipt</h3>
                <p className="text-sm text-white/80">Download PDF</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};