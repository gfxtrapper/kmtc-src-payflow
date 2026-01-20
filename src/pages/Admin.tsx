import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield, ArrowLeft, Users, CreditCard, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import kmtcLogo from "@/assets/kmtc-logo.png";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate("/");
      }
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-admin/5 via-background to-secondary/5">
        <Loader2 className="h-8 w-8 animate-spin text-admin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 via-background to-secondary/5">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto h-12 w-12 text-destructive" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const adminCards = [
    {
      title: "Payment Records",
      description: "View and manage all student payments",
      icon: CreditCard,
      count: "Coming soon",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Student Profiles",
      description: "Manage student information and registrations",
      icon: Users,
      count: "Coming soon",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Reports",
      description: "Generate and download payment reports",
      icon: FileText,
      count: "Coming soon",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Settings",
      description: "Configure system settings and preferences",
      icon: Settings,
      count: "",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-admin/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={kmtcLogo} alt="KMTC SRC Logo" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">KMTC SRC Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Site
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Welcome, Admin</h2>
          <p className="text-muted-foreground">
            Manage payments, students, and system settings from here.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminCards.map((card) => (
            <Card key={card.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`p-2 rounded-full ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.count}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Full payment management, reporting, and student management features coming soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Shield className="mx-auto h-16 w-16 mb-4 opacity-50" />
                <p>Admin features are being developed. Check back soon!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
