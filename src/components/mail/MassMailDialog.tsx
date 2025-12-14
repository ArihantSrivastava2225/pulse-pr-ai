import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MassMailDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recipients, setRecipients] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const { toast } = useToast();

    const handleSend = async () => {
        if (!recipients || !subject || !body) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive",
            });
            return;
        }

        // Split recipients by comma and clean up
        const recipientList = recipients.split(",").map(email => email.trim()).filter(email => email);

        if (recipientList.length === 0) {
            toast({ title: "Error", description: "Invalid recipients list", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/mail/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipients: recipientList, subject, body }),
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: "Emails sent successfully!",
                });
                if (data.previewUrl) {
                    console.log("Email Preview:", data.previewUrl);
                    toast({
                        title: "Test Mode",
                        description: "Check console for Ethereal email preview link.",
                    });
                }
                setOpen(false);
                setRecipients("");
                setSubject("");
                setBody("");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to send emails",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Mail className="w-4 h-4" />
                    Mass Mail
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Send Mass Email</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="recipients">Recipients (comma separated)</Label>
                        <Input
                            id="recipients"
                            placeholder="email1@example.com, email2@example.com"
                            value={recipients}
                            onChange={(e) => setRecipients(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Company Announcement"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="body">Message Body (HTML supported)</Label>
                        <Textarea
                            id="body"
                            placeholder="<p>Hello everyone...</p>"
                            rows={5}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSend} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Emails
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
