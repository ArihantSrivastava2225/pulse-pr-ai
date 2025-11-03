import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Clock, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const CreatorDashboard = () => {
  const { toast } = useToast();

  const tasks = [
    { id: 1, title: "Design social media graphics", deadline: "2024-02-08", status: "in-progress", type: "design" },
    { id: 2, title: "Write blog post draft", deadline: "2024-02-10", status: "pending", type: "content" },
    { id: 3, title: "Create video content", deadline: "2024-02-12", status: "pending", type: "video" },
  ];

  const notifications = [
    { id: 1, message: "New task assigned: Social Media Campaign", time: "2 hours ago", read: false },
    { id: 2, message: "Task approved: Blog Post Draft", time: "5 hours ago", read: true },
    { id: 3, message: "Deadline reminder: Video content due tomorrow", time: "1 day ago", read: false },
  ];

  const handleUpload = (taskId: number) => {
    toast({
      title: "File uploaded",
      description: "Your work has been submitted successfully",
    });
  };

  const handleComplete = (taskId: number) => {
    toast({
      title: "Task completed",
      description: "Task marked as complete",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Creator Dashboard</h2>
          <p className="text-muted-foreground">Manage your assigned tasks and deliverables</p>
        </div>

        {/* Assigned Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium">{task.title}</p>
                        <Badge variant={task.status === "in-progress" ? "default" : "secondary"}>
                          {task.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Due: {task.deadline}</span>
                        <span>•</span>
                        <span className="capitalize">{task.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpload(task.id)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Work
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleComplete(task.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-muted-foreground">
                  Support for images, documents, and videos
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">social_graphics.zip</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Uploaded</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border ${
                      notification.read 
                        ? "border-border bg-background" 
                        : "border-primary/30 bg-primary/5"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">8</p>
                <p className="text-sm text-muted-foreground">Completed This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">3</p>
                <p className="text-sm text-muted-foreground">Active Tasks</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">95%</p>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatorDashboard;
