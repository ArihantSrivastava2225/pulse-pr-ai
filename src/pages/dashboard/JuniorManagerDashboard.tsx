import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";

interface Creator {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const JuniorManagerDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [progress, setProgress] = useState("50");

  // Team Creation State
  const [creators, setCreators] = useState<Creator[]>([]);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [createdTeamId, setCreatedTeamId] = useState<string | null>(null);

  const tasks = [
    { id: 1, title: "Social Media Campaign Planning", assignedBy: "Sarah", deadline: "2024-02-10", status: "in-progress" },
    { id: 2, title: "Press Release Draft", assignedBy: "Mike", deadline: "2024-02-12", status: "pending" },
    { id: 3, title: "Media Contact Outreach", assignedBy: "Sarah", deadline: "2024-02-15", status: "in-progress" },
  ];

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teams/creators", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCreators(data.creators);
      } else {
        console.error("Failed to fetch creators:", data.message);
      }
    } catch (error) {
      console.error("Error fetching creators:", error);
    }
  };

  const handleMemberToggle = (creatorId: string) => {
    setSelectedMembers((prev) => {
      if (prev.includes(creatorId)) {
        return prev.filter((id) => id !== creatorId);
      } else {
        if (prev.length >= 5) {
          toast({
            title: "Limit Reached",
            description: "You can select a maximum of 5 members.",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, creatorId];
      }
    });
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast({ title: "Error", description: "Team name is required", variant: "destructive" });
      return;
    }
    if (selectedMembers.length === 0) {
      toast({ title: "Error", description: "Select at least one member", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: teamName,
          description,
          members: selectedMembers,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Team created successfully!",
        });
        setCreatedTeamId(data.team._id); // Store the new team ID
        setTeamName("");
        setDescription("");
        setSelectedMembers([]);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create team",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartChat = () => {
    if (createdTeamId) {
      navigate("/chat", { state: { room: createdTeamId } });
    } else {
      toast({
        title: "No Team Selected",
        description: "Please create a team first to start a chat.",
        variant: "default",
      });
    }
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
                <Input
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Team purpose..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Select Creators (Max 5)</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
                  {creators.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center p-2">No content creators found.</p>
                  ) : (
                    creators.map((creator) => (
                      <div key={creator._id} className="flex items-center space-x-2 p-2 hover:bg-secondary/20 rounded">
                        <Checkbox
                          id={creator._id}
                          checked={selectedMembers.includes(creator._id)}
                          onCheckedChange={() => handleMemberToggle(creator._id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={creator._id} className="font-medium text-sm cursor-pointer block">
                            {creator.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{creator.email}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {selectedMembers.length}/5 selected
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateTeam} className="flex-1" disabled={loading}>
                  {loading ? "Creating..." : "Create Team"}
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
