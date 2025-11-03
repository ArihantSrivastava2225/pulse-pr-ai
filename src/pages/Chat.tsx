import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Chat = () => {
  const [message, setMessage] = useState("");

  const chatRooms = [
    { id: 1, name: "Team Alpha", members: 5, unread: 3, active: true },
    { id: 2, name: "Product Launch Q1", members: 8, unread: 0, active: false },
    { id: 3, name: "Creative Team", members: 4, unread: 7, active: false },
  ];

  const messages = [
    { id: 1, sender: "Sarah Johnson", message: "Has everyone reviewed the latest campaign draft?", time: "10:30 AM", isOwn: false },
    { id: 2, sender: "You", message: "Yes, I just finished reviewing it. Looks great!", time: "10:32 AM", isOwn: true },
    { id: 3, sender: "Mike Chen", message: "I have a few suggestions for the social media copy", time: "10:35 AM", isOwn: false },
    { id: 4, sender: "Sarah Johnson", message: "Please share them in the next meeting", time: "10:36 AM", isOwn: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Team Chat</h2>
          <p className="text-muted-foreground">Collaborate with your team in real-time</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-16rem)]">
          {/* Chat Rooms List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Chat Rooms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    room.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{room.name}</p>
                    {room.unread > 0 && (
                      <Badge variant="destructive" className="text-xs h-5 w-5 p-0 flex items-center justify-center">
                        {room.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-80">
                    <Users className="w-3 h-3" />
                    <span>{room.members} members</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-3 flex flex-col">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Alpha</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">5 members online</p>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  View Members
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {msg.sender.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 max-w-md ${msg.isOwn ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.isOwn && (
                        <>
                          <span className="text-sm font-medium">{msg.sender}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </>
                      )}
                      {msg.isOwn && (
                        <>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                          <span className="text-sm font-medium">{msg.sender}</span>
                        </>
                      )}
                    </div>
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
