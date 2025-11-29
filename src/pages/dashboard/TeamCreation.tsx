import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Creator {
    _id: string;
    name: string;
    email: string;
}

const TeamCreation = () => {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

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
                toast({
                    title: "Error",
                    description: "Failed to fetch content creators",
                    variant: "destructive",
                });
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedMembers.length === 0) {
            toast({
                title: "Validation Error",
                description: "Please select at least one member.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
                navigate("/dashboard/junior_manager"); // Redirect to dashboard
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

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Create New Team</h2>
                    <p className="text-muted-foreground">Form a team of content creators for your campaigns.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Team Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="teamName">Team Name</Label>
                                <Input
                                    id="teamName"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="e.g., Alpha Squad"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief description of the team's purpose..."
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Select Members (Max 5)</Label>
                                <div className="border rounded-md p-4 space-y-3 max-h-60 overflow-y-auto">
                                    {creators.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center">No content creators found.</p>
                                    ) : (
                                        creators.map((creator) => (
                                            <div key={creator._id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={creator._id}
                                                    checked={selectedMembers.includes(creator._id)}
                                                    onCheckedChange={() => handleMemberToggle(creator._id)}
                                                />
                                                <Label
                                                    htmlFor={creator._id}
                                                    className="text-sm font-normal cursor-pointer flex-1"
                                                >
                                                    {creator.name} <span className="text-muted-foreground text-xs">({creator.email})</span>
                                                </Label>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground text-right">
                                    {selectedMembers.length}/5 selected
                                </p>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Creating Team..." : "Create Team"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default TeamCreation;
