import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatWithAura } from "../services/geminiService";

export function AIAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState<{ role: "user" | "model", parts: { text: string }[] }[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage("");
    setChatHistory(prev => [...prev, { role: "user", parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    const response = await chatWithAura(userMessage, chatHistory);
    
    setChatHistory(prev => [...prev, { role: "model", parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col shadow-2xl border-primary/20 bg-background/95 backdrop-blur-xl">
              <CardHeader className="p-4 border-b flex flex-row items-center justify-between bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Aura AI</CardTitle>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" ref={scrollRef}>
                {chatHistory.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground font-light">
                      Welcome to Aura Motors. How can I assist you today?
                    </p>
                  </div>
                )}
                {chatHistory.map((chat, i) => (
                  <div key={i} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-2 max-w-[80%] ${chat.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="w-6 h-6 shrink-0">
                        {chat.role === "user" ? (
                          <AvatarFallback className="bg-secondary text-[10px]"><User className="w-3 h-3" /></AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-primary text-[10px] text-primary-foreground"><Bot className="w-3 h-3" /></AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        chat.role === "user" 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-secondary/50 text-foreground rounded-tl-none"
                      }`}>
                        {chat.parts[0].text}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 items-center bg-secondary/30 p-3 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-3 h-3 animate-spin text-primary" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Aura is thinking...</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <div className="p-4 border-t bg-primary/5">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <Input 
                    placeholder="Ask about our models..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-full bg-background border-none h-10 text-xs"
                  />
                  <Button type="submit" size="icon" className="rounded-full h-10 w-10 shrink-0" disabled={isLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className={`w-14 h-14 rounded-full shadow-xl transition-all duration-500 ${isOpen ? "rotate-90 scale-0" : "scale-100"}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    </div>
  );
}
