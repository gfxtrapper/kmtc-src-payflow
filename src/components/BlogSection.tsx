import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, MessageSquare } from "lucide-react";

export const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "SRC Election Guidelines 2024",
      excerpt: "Important information for students interested in running for SRC positions this year.",
      date: "2024-03-15",
      author: "SRC Secretary",
      category: "Elections",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400",
      featured: true
    },
    {
      id: 2,
      title: "New Student Orientation Week",
      excerpt: "Join us for a comprehensive orientation program designed to help new students settle in.",
      date: "2024-03-10",
      author: "SRC Events Team",
      category: "Events",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400"
    },
    {
      id: 3,
      title: "Mental Health Support Services",
      excerpt: "Learn about the counseling and mental health resources available to all KMTC students.",
      date: "2024-03-08",
      author: "SRC Welfare",
      category: "Welfare",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"
    },
    {
      id: 4,
      title: "Academic Calendar Updates",
      excerpt: "Important changes to exam schedules and semester dates. Please review carefully.",
      date: "2024-03-05",
      author: "SRC Academic Affairs",
      category: "Academic",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Elections: "bg-primary text-primary-foreground",
      Events: "bg-secondary text-secondary-foreground",
      Welfare: "bg-success text-success-foreground",
      Academic: "bg-warning text-warning-foreground"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <section id="blog" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Latest News & Updates
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Informed with SRC
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the latest updates on SRC activities, important announcements, and opportunities for student engagement.
            </p>
          </div>

          {/* Featured Post */}
          {blogPosts.find(post => post.featured) && (
            <div className="mb-12">
              <Card className="overflow-hidden shadow-medium hover:shadow-strong transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={blogPosts[0].image} 
                      alt={blogPosts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <Badge className={getCategoryColor(blogPosts[0].category)}>
                      {blogPosts[0].category}
                    </Badge>
                    <CardHeader className="p-0 mt-4">
                      <CardTitle className="text-2xl mb-2">
                        {blogPosts[0].title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {blogPosts[0].excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {new Date(blogPosts[0].date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            {blogPosts[0].author}
                          </div>
                        </div>
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                      <Button variant="default">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-medium transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {post.author}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              View All News & Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};