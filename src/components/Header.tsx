import { Button } from "@/components/ui/button";
import { Menu, X, User, Shield, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import kmtcLogo from "@/assets/kmtc-logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Pay SRC Fee", href: "#payment" },
    { name: "News & Updates", href: "#blog" },
    { name: "SRC Activities", href: "#activities" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and branding */}
          <div className="flex items-center space-x-3">
            <img 
              src={kmtcLogo} 
              alt="KMTC SRC Logo" 
              className="h-10 w-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">KMTC SRC</h1>
              <p className="text-xs text-muted-foreground">Student Representative Council</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="admin" size="sm">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Student Login
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant="admin" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-3 border-t">
                {loading ? (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : user ? (
                  <>
                    <p className="px-3 text-sm text-muted-foreground">{user.email}</p>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="admin" size="sm" className="w-full justify-start">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm" className="justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Student Login
                      </Button>
                    </Link>
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="admin" size="sm" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
