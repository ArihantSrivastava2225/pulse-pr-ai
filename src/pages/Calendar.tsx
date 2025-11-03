import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

const Calendar = () => {
  const events = [
    { id: 1, title: "Product Launch Campaign", date: "2024-02-10", time: "10:00 AM", type: "campaign", priority: "high" },
    { id: 2, title: "Team Meeting", date: "2024-02-12", time: "2:00 PM", type: "meeting", priority: "medium" },
    { id: 3, title: "Press Release Deadline", date: "2024-02-15", time: "5:00 PM", type: "deadline", priority: "high" },
    { id: 4, title: "Content Review", date: "2024-02-18", time: "11:00 AM", type: "review", priority: "low" },
    { id: 5, title: "Client Presentation", date: "2024-02-20", time: "3:00 PM", type: "meeting", priority: "high" },
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      campaign: "bg-primary/10 text-primary",
      meeting: "bg-accent/10 text-accent",
      deadline: "bg-destructive/10 text-destructive",
      review: "bg-success/10 text-success",
    };
    return colors[type] || "bg-muted";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Work Calendar</h2>
          <p className="text-muted-foreground">View and manage your scheduled tasks and deadlines</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                February 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Adjust for calendar start
                  const isCurrentMonth = day > 0 && day <= 29;
                  const hasEvent = [10, 12, 15, 18, 20].includes(day);
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square p-2 rounded-lg border text-center ${
                        isCurrentMonth
                          ? "border-border hover:bg-secondary cursor-pointer"
                          : "border-transparent text-muted-foreground/30"
                      } ${hasEvent ? "bg-primary/5 border-primary/20" : ""}`}
                    >
                      {isCurrentMonth && (
                        <>
                          <span className="text-sm font-medium">{day}</span>
                          {hasEvent && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mt-1" />
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      {event.priority === "high" && (
                        <Badge variant="destructive" className="text-xs">High</Badge>
                      )}
                    </div>
                    <p className="font-medium text-sm mb-1">{event.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{event.date}</span>
                      <Clock className="w-3 h-3 ml-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Events List */}
        <Card>
          <CardHeader>
            <CardTitle>All Scheduled Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${getTypeColor(event.type)} flex items-center justify-center`}>
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                        <span>•</span>
                        <span className="capitalize">{event.type}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={event.priority === "high" ? "destructive" : "secondary"}>
                    {event.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
