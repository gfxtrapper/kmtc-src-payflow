import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 20 272 7000", "+254 711 123 456"],
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["src@kmtc.ac.ke", "info@kmtc.ac.ke"],
      color: "text-secondary"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["KMTC Nairobi Campus", "Off Ngong Road, Nairobi"],
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
      color: "text-warning"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Get in Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contact SRC Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about SRC fee payment, activities, or need support? We're here to help you every step of the way.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">How to Reach Us</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-l-4 border-l-primary/20 hover:border-l-primary transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <info.icon className={`h-5 w-5 mt-1 ${info.color}`} />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{info.title}</h4>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-muted-foreground">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Contact Options */}
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Quick Help Options
                  </CardTitle>
                  <CardDescription>
                    Choose the fastest way to get assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    Call SRC Helpline
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support Team
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Live Chat Support
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Frequently Asked Questions</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Find quick answers to common questions about SRC fees and services.
                    </p>
                    <Button variant="outline">View FAQ Section</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="mr-2 h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What is your message about?"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Response Time:</strong> We typically respond within 24 hours during business days. 
                    For urgent matters related to payments, please call our helpline directly.
                  </p>
                </div>

                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full"
                  disabled={!isFormValid}
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};