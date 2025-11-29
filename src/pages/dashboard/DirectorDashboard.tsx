import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, CheckCircle, FileText, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Campaign {
  _id: string;
  name: string;
  progress: number; // Assuming backend has this, or we calculate it
  deadline: string;
  status: string;
}

const DirectorDashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    teamMembers: 24, // Mocked for now
    tasksCompleted: "87%", // Mocked
    reportsGenerated: 34 // Mocked
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/campaigns", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.campaigns);
        setStats(prev => ({
          ...prev,
          activeCampaigns: data.campaigns.length
        }));
      }
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
    }
  }

  const overviewStats = [
    { title: "Active Campaigns", value: stats.activeCampaigns.toString(), icon: TrendingUp, trend: "+15%" },
    { title: "Team Members", value: stats.teamMembers.toString(), icon: Users, trend: "+2" },
    { title: "Tasks Completed", value: stats.tasksCompleted, icon: CheckCircle, trend: "+5%" },
    { title: "Reports Generated", value: stats.reportsGenerated.toString(), icon: FileText, trend: "+8" },
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
            {campaigns.length === 0 ? (
              <p className="text-muted-foreground">No active campaigns found.</p>
            ) : (
              campaigns.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">Deadline: {new Date(campaign.deadline).toLocaleDateString()}</p>
                    </div>
                    <span className="text-sm font-medium text-primary">{campaign.status}</span>
                  </div>
                  <Progress value={campaign.progress || 0} className="h-2" />
                </div>
              ))
            )}
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
