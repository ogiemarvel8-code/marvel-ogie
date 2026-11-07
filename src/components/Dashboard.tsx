import * as React from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Navigation, 
  Music, 
  Settings, 
  Thermometer, 
  Battery, 
  Wind, 
  Lock, 
  Unlock,
  Volume2,
  Sun,
  Moon
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";

const PERFORMANCE_DATA = [
  { time: "0s", speed: 0, power: 0 },
  { time: "1s", speed: 28, power: 450 },
  { time: "2s", speed: 58, power: 890 },
  { time: "3s", speed: 85, power: 1020 },
  { time: "4s", speed: 110, power: 980 },
  { time: "5s", speed: 132, power: 950 },
];

export function Dashboard() {
  const [temp, setTemp] = React.useState([21]);
  const [isLocked, setIsLocked] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px]">Active Session</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">COMMAND CENTER</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full px-6" onClick={() => setIsLocked(!isLocked)}>
              {isLocked ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
              {isLocked ? "Locked" : "Unlocked"}
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-secondary/20 border-none p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Battery className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-primary">84%</span>
                </div>
                <div>
                  <div className="text-4xl font-bold tracking-tighter mb-2">352 mi</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Estimated Range</div>
                  <Progress value={84} className="h-1 mt-4" />
                </div>
              </Card>

              <Card className="bg-secondary/20 border-none p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-primary">GPS Active</span>
                </div>
                <div>
                  <div className="text-4xl font-bold tracking-tighter mb-2">Palo Alto</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Current Location</div>
                  <div className="flex items-center gap-2 mt-4 text-[10px] text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Signal Strength: High
                  </div>
                </div>
              </Card>

              <Card className="bg-secondary/20 border-none p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-primary">Sport+</span>
                </div>
                <div>
                  <div className="text-4xl font-bold tracking-tighter mb-2">1,020 hp</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Peak Output</div>
                  <div className="flex gap-1 mt-4">
                    {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? "bg-primary" : "bg-white/10"}`} />)}
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-secondary/20 border-none p-8">
              <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">Performance Analytics</CardTitle>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Real-time telemetry</p>
                </div>
                <Tabs defaultValue="power" className="w-auto">
                  <TabsList className="bg-background/50 rounded-full h-8">
                    <TabsTrigger value="power" className="rounded-full text-[10px] uppercase tracking-widest px-4">Power</TabsTrigger>
                    <TabsTrigger value="speed" className="rounded-full text-[10px] uppercase tracking-widest px-4">Speed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                      <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "12px", fontSize: "12px" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="power" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorPower)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Right Column - Controls */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-secondary/20 border-none p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Climate Control</h3>
              <div className="flex flex-col items-center gap-12">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="96" cy="96" r="88" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle cx="96" cy="96" r="88" fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray="552" strokeDashoffset={552 - (552 * temp[0] / 30)} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold tracking-tighter">{temp[0]}°</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Celsius</div>
                  </div>
                </div>
                <div className="w-full space-y-6">
                  <Slider value={temp} onValueChange={setTemp} max={30} min={16} step={1} className="w-full" />
                  <div className="flex justify-between gap-4">
                    <Button variant="secondary" className="flex-1 rounded-xl h-12"><Wind className="w-4 h-4 mr-2" /> Auto</Button>
                    <Button variant="secondary" className="flex-1 rounded-xl h-12"><Thermometer className="w-4 h-4 mr-2" /> Sync</Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-secondary/20 border-none p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Media Player</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary/20">
                  <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" alt="Album Art" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold tracking-tight">Midnight City</div>
                  <div className="text-xs text-muted-foreground">M83 — Hurry Up, We're Dreaming</div>
                </div>
              </div>
              <div className="space-y-6">
                <Progress value={45} className="h-1" />
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="icon" className="rounded-full"><Volume2 className="w-4 h-4" /></Button>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12"><Navigation className="w-5 h-5 rotate-270" /></Button>
                    <Button size="icon" className="rounded-full h-14 w-14 shadow-lg shadow-primary/20"><Zap className="w-6 h-6" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12"><Navigation className="w-5 h-5 rotate-90" /></Button>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full"><Settings className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
