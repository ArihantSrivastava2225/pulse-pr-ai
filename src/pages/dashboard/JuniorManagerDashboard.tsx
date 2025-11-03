import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, MessageSquare, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JuniorManagerDashboard = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState("50");

  const tasks = [
    { id: 1, title: "Social Media Campaign Planning", assignedBy: "Sarah", deadline: "2024-02-10", status: "in-progress" },
    { id: 2, title: "Press Release Draft", assignedBy: "Mike", deadline: "2024-02-12", status: "pending" },
    { id: 3, title: "Media Contact Outreach", assignedBy: "Sarah", deadline: "2024-02-15", status: "in-progress" },
  ];

  const creators = [
    { id: 1, name: "Alex Rivera", role: "Content Writer", available: true },
    { id: 2, name: "Jordan Kim", role: "Graphic Designer", available: true },
    { id: 3, name: "Taylor Swift", role: "Video Editor", available: false },
  ];

  const handleCreateTeam = () => {
    toast({
      title: "Team created",
      description: "Your team has been created successfully",
    });
  };

  const handleStartChat = () => {
    toast({
      title: "Chat started",
      description: "Redirecting to team chat...",
    });
  };

  const handleUpdateProgress = () => {
    toast({
      title: "Progress updated",
      description: `Progress updated to ${progress}%`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Junior Manager Dashboard</h2>
          <p className="text-muted-foreground">Manage your tasks and coordinate with creators</p>
        </div>

        {/* Assigned Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium">{task.title}</p>
                      <Badge variant={task.status === "in-progress" ? "default" : "secondary"}>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Assigned by {task.assignedBy} • Due: {task.deadline}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Team Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Create Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Team Name</Label>
                <Input placeholder="Enter team name" />
              </div>
              <div className="space-y-2">
                <Label>Select Creators</Label>
                <div className="space-y-2">
                  {creators.map((creator) => (
                    <div key={creator.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-sm">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">{creator.role}</p>
                      </div>
                      <Badge variant={creator.available ? "default" : "secondary"}>
                        {creator.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateTeam} className="flex-1">
                  Create Team
                </Button>
                <Button variant="outline" onClick={handleStartChat}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Update Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Task</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map((task) => (
                      <SelectItem key={task.id} value={task.id.toString()}>
                        {task.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Progress (%)</Label>
                <Input 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Remarks</Label>
                <Textarea placeholder="Add any comments or updates..." rows={3} />
              </div>
              <Button onClick={handleUpdateProgress} className="w-full">
                Submit Update
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered insights based on recent media trends and campaign performance
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-background">
                  <p className="font-medium text-sm mb-1">Trending Topic: Tech Innovation</p>
                  <p className="text-xs text-muted-foreground">87% positive sentiment • 234 mentions</p>
                </div>
                <div className="p-3 rounded-lg bg-background">
                  <p className="font-medium text-sm mb-1">Recommended Action: Increase social presence</p>
                  <p className="text-xs text-muted-foreground">Based on competitor analysis</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default JuniorManagerDashboard;
