import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, ArrowRight, Camera } from "lucide-react";

export const ActivitiesSection = () => {
  const activities = [
    {
      id: 1,
      title: "Medical Students Conference 2024",
      description: "Annual conference bringing together medical students from across Kenya for knowledge sharing and networking.",
      date: "2024-04-15",
      time: "9:00 AM - 5:00 PM",
      location: "KMTC Nairobi Main Hall",
      category: "Conference",
      status: "upcoming",
      participants: 200,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
      featured: true
    },
    {
      id: 2,
      title: "SRC Sports Day",
      description: "Inter-campus sports competition featuring football, basketball, athletics, and more.",
      date: "2024-03-25",
      time: "8:00 AM - 6:00 PM",
      location: "KMTC Sports Complex",
      category: "Sports",
      status: "upcoming",
      participants: 150,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    },
    {
      id: 3,
      title: "Mental Health Awareness Week",
      description: "A week dedicated to promoting mental health awareness and wellness among students.",
      date: "2024-03-18",
      time: "All Day",
      location: "All KMTC Campuses",
      category: "Wellness",
      status: "ongoing",
      participants: 500,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"
    },
    {
      id: 4,
      title: "Community Health Outreach",
      description: "Students participated in a community health outreach program in rural Kenya.",
      date: "2024-02-28",
      time: "Full Day",
      location: "Kajiado County",
      category: "Outreach",
      status: "completed",
      participants: 80,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400"
    },
    {
      id: 5,
      title: "Research Symposium",
      description: "Students presented their research projects and findings to faculty and peers.",
      date: "2024-02-15",
      time: "2:00 PM - 6:00 PM",
      location: "KMTC Research Center",
      category: "Academic",
      status: "completed",
      participants: 120,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      id: 6,
      title: "New Year Gala",
      description: "Annual celebration to welcome new students and celebrate achievements.",
      date: "2024-01-20",
      time: "7:00 PM - 11:00 PM",
      location: "KMTC Main Auditorium",
      category: "Social",
      status: "completed",
      participants: 300,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Conference: "bg-primary text-primary-foreground",
      Sports: "bg-secondary text-secondary-foreground",
      Wellness: "bg-success text-success-foreground",
      Outreach: "bg-warning text-warning-foreground",
      Academic: "bg-primary text-primary-foreground",
      Social: "bg-secondary text-secondary-foreground"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: "bg-primary/10 text-primary border-primary/20",
      ongoing: "bg-success/10 text-success border-success/20",
      completed: "bg-muted text-muted-foreground border-border"
    };
    return colors[status as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const upcomingActivities = activities.filter(activity => activity.status === "upcoming" || activity.status === "ongoing");
  const pastActivities = activities.filter(activity => activity.status === "completed");

  return (
    <section id="activities" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              SRC Activities & Events
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Engaging Student Life
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the vibrant campus life at KMTC through our diverse range of academic, social, and wellness activities.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-primary" />
              Upcoming Events
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {upcomingActivities.map((activity, index) => (
                <Card key={activity.id} className={`overflow-hidden ${index === 0 ? 'lg:col-span-2' : ''} shadow-medium hover:shadow-strong transition-shadow`}>
                  <div className={`${index === 0 ? 'md:flex' : ''}`}>
                    <div className={`${index === 0 ? 'md:w-1/2' : ''} aspect-video overflow-hidden`}>
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className={`${index === 0 ? 'md:w-1/2' : ''} p-6`}>
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getCategoryColor(activity.category)}>
                          {activity.category}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                      
                      <CardHeader className="p-0">
                        <CardTitle className={`${index === 0 ? 'text-2xl' : 'text-lg'} mb-2`}>
                          {activity.title}
                        </CardTitle>
                        <CardDescription>
                          {activity.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-0 mt-4">
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(activity.date).toLocaleDateString()} at {activity.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {activity.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            {activity.participants} participants expected
                          </div>
                        </div>
                        
                        <Button variant={index === 0 ? "default" : "outline"} size={index === 0 ? "lg" : "default"}>
                          {activity.status === "ongoing" ? "Join Now" : "Register Interest"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Activities */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Camera className="mr-2 h-6 w-6 text-secondary" />
              Past Activities & Achievements
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pastActivities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-medium transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(activity.status)}>
                        Completed
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">
                      {activity.title}
                    </CardTitle>
                    <CardDescription>
                      {activity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-3 w-3" />
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-3 w-3" />
                        {activity.participants} participants
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Camera className="mr-2 h-4 w-4" />
                      View Gallery
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                View All Activities Archive
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};