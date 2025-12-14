import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Newspaper, Loader2 } from "lucide-react";
import { MassMailDialog } from "@/components/mail/MassMailDialog";
import { AIAnalysis } from "@/components/insights/AIAnalysis";

const Insights = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);
  const [summaryStats, setSummaryStats] = useState<any[]>([]);
  const [summaryText, setSummaryText] = useState("");
  const [socialStats, setSocialStats] = useState<any>(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/insights");
      const data = await res.json();
      if (data.success) {
        setNews(data.data.news);
        setSummaryStats(data.data.summaryStats);
        setSummaryText(data.data.summaryText);
        setSocialStats(data.data.socialStats);
      }
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-success/10 text-success";
      case "negative":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">AI Insights</h2>
            <p className="text-muted-foreground">Real-time media monitoring and sentiment analysis</p>
          </div>
          <MassMailDialog />
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {getTrendIcon(stat.trend)}
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className={`text-sm font-medium ${stat.trend === "up" ? "text-success" :
                  stat.trend === "down" ? "text-destructive" :
                    "text-muted-foreground"
                  }`}>
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Analysis Section */}
        <AIAnalysis />

        {/* AI Summary */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-sm leading-relaxed">
                {summaryText}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Media Mentions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Media Mentions (Real-time)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {news.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Newspaper className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-medium mb-1 hover:underline">{item.title}</a>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-medium">{item.source}</span>
                        <span>•</span>
                        <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Random sentiment for demo since RSS doesn't give sentiment */}
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="capitalize">Positive</span>
                      </span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { topic: socialStats?.trending || "AI", mentions: 89 },
                { topic: "Digital PR", mentions: 67 },
                { topic: "Brand Strategy", mentions: 54 },
                { topic: "Tech Trends", mentions: 45 },
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-lg border border-border text-center">
                  <p className="font-medium mb-2">{item.topic}</p>
                  <p className="text-2xl font-bold text-primary">{item.mentions}</p>
                  <p className="text-xs text-muted-foreground mt-1">mentions</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
