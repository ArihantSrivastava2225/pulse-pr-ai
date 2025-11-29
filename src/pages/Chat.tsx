import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { io, Socket } from "socket.io-client";

interface Message {
  _id?: string;
  sender: {
    _id: string;
    name: string;
    email: string;
  } | string; // Handle both populated and unpopulated
  message: string;
  timestamp?: string;
  room?: string;
  isOwn?: boolean;
}

const Chat = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentRoom, setCurrentRoom] = useState(location.state?.room || "general");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatRooms, setChatRooms] = useState([
    { id: "general", name: "General", members: 15, unread: 0, active: true },
  ]);

  const userId = localStorage.getItem("token"); // Assuming token stores user ID for now, or decode it

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teams/my-teams", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        const teamRooms = data.teams.map((team: any) => ({
          id: team._id,
          name: team.name,
          members: team.members.length + 1, // +1 for manager
          unread: 0,
          active: false
        }));
        setChatRooms(prev => [...prev.filter(r => r.id === 'general'), ...teamRooms]);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      newSocket.emit("join_room", currentRoom);
    });

    newSocket.on("receive_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    // Fetch chat history
    fetch(`http://localhost:5000/api/chat/${currentRoom}`, {
      credentials: "include"
    }) // You might need to add auth headers here
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessages(data.messages);
        }
      });

    return () => {
      newSocket.disconnect();
    }
  }, [currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      const msgData = {
        room: currentRoom,
        message: message,
        sender: userId || "Anonymous", // In a real app, backend handles sender from token
      };

      // We send to backend via API to persist, then backend emits via socket
      // OR we emit via socket and backend persists. 
      // Based on our controller, we post to API.

      fetch("http://localhost:5000/api/chat", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}` // Add token if needed
        },
        body: JSON.stringify(msgData)
      });

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
                  onClick={() => setCurrentRoom(room.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${currentRoom === room.id
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
                  <CardTitle>{chatRooms.find(r => r.id === currentRoom)?.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Online</p>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  View Members
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => {
                const isOwn = typeof msg.sender === 'object' ? msg.sender._id === userId : msg.sender === userId;
                const senderName = typeof msg.sender === 'object' ? msg.sender.name : "User";

                return (
                  <div
                    key={index}
                    className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {senderName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 max-w-md ${isOwn ? "text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {!isOwn && (
                          <>
                            <span className="text-sm font-medium">{senderName}</span>
                            <span className="text-xs text-muted-foreground">{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ""}</span>
                          </>
                        )}
                        {isOwn && (
                          <>
                            <span className="text-xs text-muted-foreground">{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ""}</span>
                            <span className="text-sm font-medium">You</span>
                          </>
                        )}
                      </div>
                      <div
                        className={`inline-block p-3 rounded-lg ${isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                          }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
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
