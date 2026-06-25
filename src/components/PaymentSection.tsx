import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, Building2, Receipt, CheckCircle, AlertCircle, Users, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const PaymentSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    admissionNumber: "",
    campus: "",
    phoneNumber: "",
    paymentMethod: ""
  });

  const campuses = [
    "Nairobi Campus",
    "Mombasa Campus", 
    "Kisumu Campus",
    "Nakuru Campus",
    "Eldoret Campus",
    "Nyeri Campus",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  const handlePay = async () => {
    if (!user) {
      toast.error("Please sign in to continue");
      navigate("/auth");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("paystack-initialize", {
        body: {
          fullName: formData.fullName,
          admissionNumber: formData.admissionNumber,
          campus: formData.campus,
          phoneNumber: formData.phoneNumber,
          paymentMethod: formData.paymentMethod,
          email: user.email,
        },
      });
      if (error) throw error;
      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        throw new Error("No authorization URL returned");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to initialize payment");
      setLoading(false);
    }
  };

  return (
    <section id="payment" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              SRC Fee Payment
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pay Your SRC Registration Fee
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete your SRC registration with a secure one-time payment of <strong>Ksh 1,500</strong>. 
              Choose from multiple payment methods and get instant confirmation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Student Information
                </CardTitle>
                <CardDescription>
                  Fill in your details to proceed with payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name as per admission"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admissionNumber">Admission Number</Label>
                  <Input
                    id="admissionNumber"
                    placeholder="e.g., KMTC/2024/001"
                    value={formData.admissionNumber}
                    onChange={(e) => handleInputChange("admissionNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campus">Campus</Label>
                  <Select onValueChange={(value) => handleInputChange("campus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {campuses.map((campus) => (
                        <SelectItem key={campus} value={campus}>
                          {campus}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="254XXXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpesa">
                        <div className="flex items-center">
                          <Smartphone className="mr-2 h-4 w-4" />
                          M-PESA
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Credit/Debit Card
                        </div>
                      </SelectItem>
                      <SelectItem value="bank">
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4" />
                          Bank Transfer
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="payment" 
                  size="lg" 
                  className="w-full mt-6"
                  disabled={!isFormValid || loading}
                  onClick={handlePay}
                >
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CreditCard className="mr-2 h-5 w-5" />}
                  {loading ? "Redirecting..." : "Pay Ksh 1,500 Now"}
                </Button>
              </CardContent>
            </Card>

            {/* Payment Info & Benefits */}
            <div className="space-y-6">
              {/* Fee Breakdown */}
              <Card className="border-primary/20 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg">Fee Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span>SRC Registration Fee</span>
                      <span className="font-semibold">Ksh 1,500</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span>Processing Fee</span>
                      <span className="text-success font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-primary">Ksh 1,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-success" />
                    What You Get
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Receipt className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">Instant downloadable receipt</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">Official SRC membership</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">Access to SRC events & activities</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="mr-2 h-4 w-4 text-warning mt-1 flex-shrink-0" />
                      <span className="text-sm">SMS/Email confirmation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Security Note */}
              <Card className="border-success/20 bg-success/5">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-success">Secure Payment</h4>
                      <p className="text-sm text-muted-foreground">
                        Your payment is protected with bank-level security. All transactions are encrypted and secure.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};