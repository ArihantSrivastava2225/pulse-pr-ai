import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Building2, TrendingUp, AlertCircle, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Company {
    name: string;
    trigger: string;
    reason: string;
    suggestedPitch: string;
}

interface AnalysisResult {
    summaryText: string;
    companies: Company[];
}

export const AIAnalysis = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        setAnalyzing(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/ai/opportunities");
            const data = await res.json();

            if (data.success) {
                setResult(data.data);
            } else {
                setError(data.message || "Failed to analyze data");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to AI service");
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <Card className="border-primary/20 bg-gradient-to-b from-background to-primary/5">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            AI Opportunity Scout
                        </CardTitle>
                        <CardDescription>
                            Identify potential clients based on real-time news analysis
                        </CardDescription>
                    </div>
                    <Button
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="bg-primary hover:bg-primary/90"
                    >
                        {analyzing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Find Opportunities
                            </>
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="p-4 mb-4 text-sm text-destructive bg-destructive/10 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Summary Section */}
                        <div className="p-4 rounded-lg bg-background/50 border border-border">
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Market Overview
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {result.summaryText}
                            </p>
                        </div>

                        {/* Companies Grid */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {result.companies.map((company, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Building2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{company.name}</h4>
                                                <Badge variant="outline" className="text-[10px] h-5">
                                                    {company.trigger}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Why Reach Out</p>
                                            <p className="text-sm">{company.reason}</p>
                                        </div>

                                        <div className="p-3 rounded bg-secondary/50 text-xs text-secondary-foreground">
                                            <div className="flex items-center gap-2 mb-1 text-primary">
                                                <Megaphone className="w-3 h-3" />
                                                <span className="font-semibold">Suggested Pitch</span>
                                            </div>
                                            "{company.suggestedPitch}"
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
