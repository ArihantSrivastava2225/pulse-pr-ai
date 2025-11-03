import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, UserPlus, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SeniorManagerDashboard = () => {
  const { toast } = useToast();

  const campaigns = [
    { id: 1, name: "Product Launch Q1", team: "Team Alpha", status: "active", progress: 75 },
    { id: 2, name: "Social Media Campaign", team: "Team Beta", status: "planning", progress: 30 },
    { id: 3, name: "Press Release Series", team: "Team Gamma", status: "active", progress: 90 },
  ];

  const juniorManagers = [
    { id: 1, name: "Sarah Johnson", tasks: 8, available: true },
    { id: 2, name: "Mike Chen", tasks: 5, available: true },
    { id: 3, name: "Emily Davis", tasks: 12, available: false },
  ];

  const handleAssignTask = (managerId: number) => {
    toast({
      title: "Task assigned",
      description: "Task has been assigned to the junior manager",
    });
  };

  const handleUploadReport = () => {
    toast({
      title: "Report uploaded",
      description: "Your report has been uploaded successfully",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Senior PR Manager Dashboard</h2>
            <p className="text-muted-foreground">Manage campaigns and coordinate with junior managers</p>
          </div>
          <Button onClick={handleUploadReport}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Report
          </Button>
        </div>

        {/* Ongoing Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-medium">{campaign.name}</p>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{campaign.team} • {campaign.progress}% complete</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Junior Managers */}
        <Card>
          <CardHeader>
            <CardTitle>Junior Managers Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {juniorManagers.map((manager) => (
                <Card key={manager.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant={manager.available ? "default" : "secondary"}>
                        {manager.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                    <p className="font-medium mb-1">{manager.name}</p>
                    <p className="text-sm text-muted-foreground mb-4">{manager.tasks} active tasks</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleAssignTask(manager.id)}
                      disabled={!manager.available}
                    >
                      Assign Task
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: "Q1 Campaign Report", date: "2024-02-15", priority: "high" },
                { task: "Media Coverage Analysis", date: "2024-02-20", priority: "medium" },
                { task: "Team Performance Review", date: "2024-02-25", priority: "low" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.task}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>
                    {item.priority}
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

export default SeniorManagerDashboard;
