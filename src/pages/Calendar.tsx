import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  createdBy?: {
    name: string;
  }
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", time: "09:00" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  }

  const handleCreateEvent = async () => {
    if (!date || !newEvent.title) return;

    const eventDate = new Date(date);
    const [hours, minutes] = newEvent.time.split(":");
    eventDate.setHours(parseInt(hours), parseInt(minutes));

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: newEvent.title,
          description: newEvent.description,
          date: eventDate,
        })
      });

      const data = await res.json();
      if (data.success) {
        setEvents([...events, data.event]);
        setNewEvent({ title: "", description: "", time: "09:00" });
        setIsDialogOpen(false);
        toast({
          title: "Event created",
          description: "Your event has been scheduled successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create event",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };

  const selectedDateEvents = events.filter(
    (event) => new Date(event.date).toDateString() === date?.toDateString()
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Calendar</h2>
            <p className="text-muted-foreground">Manage your schedule and upcoming events</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="e.g., Team Meeting"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event details..."
                  />
                </div>
                <Button onClick={handleCreateEvent} className="w-full">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDateEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No events scheduled for this day
                  </p>
                ) : (
                  selectedDateEvents.map((event) => (
                    <div
                      key={event._id}
                      className="p-3 bg-secondary rounded-lg space-y-1"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
