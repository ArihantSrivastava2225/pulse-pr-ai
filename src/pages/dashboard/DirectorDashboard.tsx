import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, CheckCircle, FileText, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DirectorDashboard = () => {
  const overviewStats = [
    { title: "Active Campaigns", value: "12", icon: TrendingUp, trend: "+15%" },
    { title: "Team Members", value: "24", icon: Users, trend: "+2" },
    { title: "Tasks Completed", value: "87%", icon: CheckCircle, trend: "+5%" },
    { title: "Reports Generated", value: "34", icon: FileText, trend: "+8" },
  ];

  const campaigns = [
    { name: "Product Launch Q1", progress: 85, deadline: "2024-02-15", status: "On Track" },
    { name: "Brand Awareness", progress: 60, deadline: "2024-03-01", status: "In Progress" },
    { name: "Crisis Management", progress: 95, deadline: "2024-01-30", status: "Almost Done" },
  ];

  const reports = [
    { name: "Q4 2023 Performance Report", date: "2024-01-10", size: "2.4 MB" },
    { name: "Media Coverage Analysis", date: "2024-01-08", size: "1.8 MB" },
    { name: "Team Productivity Report", date: "2024-01-05", size: "1.2 MB" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Director Dashboard</h2>
          <p className="text-muted-foreground">Overview of all campaigns and team performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-success font-medium">{stat.trend}</span>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campaign Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {campaigns.map((campaign, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">Deadline: {campaign.deadline}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{campaign.status}</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reports & Presentations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports & Presentations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DirectorDashboard;
