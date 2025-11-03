import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Newspaper } from "lucide-react";

const Insights = () => {
  const mediaData = [
    { source: "TechCrunch", title: "Innovation in PR Technology", sentiment: "positive", date: "2024-02-08", reach: "125K" },
    { source: "Forbes", title: "Digital Marketing Trends 2024", sentiment: "positive", date: "2024-02-07", reach: "340K" },
    { source: "Business Insider", title: "Corporate Communication Challenges", sentiment: "neutral", date: "2024-02-06", reach: "89K" },
    { source: "The Verge", title: "AI in Public Relations", sentiment: "positive", date: "2024-02-05", reach: "210K" },
    { source: "Reuters", title: "Crisis Management Best Practices", sentiment: "neutral", date: "2024-02-04", reach: "156K" },
  ];

  const summaryStats = [
    { label: "Total Mentions", value: "234", change: "+12%", trend: "up" },
    { label: "Positive Sentiment", value: "87%", change: "+5%", trend: "up" },
    { label: "Media Reach", value: "920K", change: "-3%", trend: "down" },
    { label: "Trending Topics", value: "8", change: "0%", trend: "neutral" },
  ];

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Insights</h2>
          <p className="text-muted-foreground">Real-time media monitoring and sentiment analysis</p>
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
                <p className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-success" : 
                  stat.trend === "down" ? "text-destructive" : 
                  "text-muted-foreground"
                }`}>
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Summary */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-sm leading-relaxed">
                <strong>This week's highlights:</strong> Your brand mentions have increased by 12% across major tech publications. 
                The sentiment is overwhelmingly positive (87%), particularly around your recent product launch. 
                TechCrunch and Forbes have featured your innovation story, reaching a combined audience of 465K readers. 
                <strong> Recommended action:</strong> Leverage this positive momentum by engaging with journalists who covered 
                your story and consider a follow-up announcement to maintain visibility.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Media Mentions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Media Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mediaData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Newspaper className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">{item.title}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-medium">{item.source}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>Reach: {item.reach}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={getSentimentColor(item.sentiment)}>
                      <span className="flex items-center gap-1">
                        {getSentimentIcon(item.sentiment)}
                        <span className="capitalize">{item.sentiment}</span>
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
                { topic: "AI Innovation", mentions: 89 },
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
