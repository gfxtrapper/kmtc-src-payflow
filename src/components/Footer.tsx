import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import kmtcLogo from "@/assets/kmtc-logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "SRC Fee Payment", href: "#payment" },
      { name: "Student Services", href: "#services" },
      { name: "Academic Support", href: "#academic" },
      { name: "Welfare Services", href: "#welfare" }
    ],
    information: [
      { name: "About SRC", href: "#about" },
      { name: "SRC Constitution", href: "#constitution" },
      { name: "Election Process", href: "#elections" },
      { name: "Annual Reports", href: "#reports" }
    ],
    campus: [
      { name: "Nairobi Campus", href: "#nairobi" },
      { name: "Mombasa Campus", href: "#mombasa" },
      { name: "Kisumu Campus", href: "#kisumu" },
      { name: "All Campuses", href: "#campuses" }
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "FAQs", href: "#faq" },
      { name: "Technical Support", href: "#tech-support" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" }
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={kmtcLogo} 
                  alt="KMTC SRC Logo" 
                  className="h-12 w-12"
                />
                <div>
                  <h3 className="text-xl font-bold">KMTC SRC</h3>
                  <p className="text-sm text-muted-foreground">Student Representative Council</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Empowering KMTC students through representation, advocacy, and comprehensive support services. 
                Your voice, your future, our commitment.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>+254 20 272 7000</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>src@kmtc.ac.ke</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="font-semibold mb-4">Information</h4>
              <ul className="space-y-3">
                {footerLinks.information.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campuses */}
            <div>
              <h4 className="font-semibold mb-4">Campuses</h4>
              <ul className="space-y-3">
                {footerLinks.campus.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3 mb-6">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Newsletter Signup */}
              <div className="bg-gradient-card p-4 rounded-lg">
                <h5 className="font-medium mb-2">Stay Updated</h5>
                <p className="text-xs text-muted-foreground mb-3">
                  Get the latest SRC news and announcements
                </p>
                <Button size="sm" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              <p>© {currentYear} KMTC Student Representative Council. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <span className="text-muted-foreground">•</span>
              <a 
                href="https://kmtc.ac.ke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center"
              >
                KMTC Official
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};