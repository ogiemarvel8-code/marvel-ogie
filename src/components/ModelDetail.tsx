import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { REAL_CARS } from "../constants";

export function ModelDetail() {
  const { id } = useParams();
  const car = REAL_CARS.find(c => c.id === id);
  const [activeImage, setActiveImage] = React.useState(0);

  if (!car) return <div className="pt-40 text-center">Model not found</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-12 group transition-colors">
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Lineup
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Gallery */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[16/10] rounded-3xl overflow-hidden bg-secondary/20"
              >
                <img 
                  src={car.gallery[activeImage]} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="grid grid-cols-3 gap-4">
                {car.gallery.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-primary" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`${car.name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-10">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px]">{car.brand}</Badge>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">{car.name}</h1>
                <p className="text-2xl text-muted-foreground font-light">{car.type}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/5">
                {Object.entries(car.specs).map(([key, value], i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold tracking-tight">{value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{key}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold tracking-tight">Overview</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{car.description}</p>
              </div>

              <Tabs defaultValue="features" className="w-full">
                <TabsList className="bg-secondary/30 rounded-full p-1 mb-8">
                  <TabsTrigger value="features" className="rounded-full px-8 uppercase text-[10px] tracking-widest">Key Features</TabsTrigger>
                  <TabsTrigger value="config" className="rounded-full px-8 uppercase text-[10px] tracking-widest">Configuration</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {car.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/20">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-light">{f}</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="config" className="space-y-6">
                  <div className="p-6 rounded-3xl bg-secondary/20 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold">Estimated Delivery</h4>
                      <span className="text-sm text-primary">6-8 Weeks</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Price</span>
                        <span>{car.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Destination Fee</span>
                        <span>$1,200</span>
                      </div>
                      <Separator className="bg-white/5" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{car.price}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="flex-1 rounded-full py-8 text-lg uppercase tracking-widest">
                  Order Now
                </Button>
                <Button size="lg" variant="outline" className="flex-1 rounded-full py-8 text-lg uppercase tracking-widest">
                  Test Drive
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
