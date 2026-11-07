/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  ChevronRight, 
  Cpu, 
  Zap, 
  Shield, 
  Globe, 
  Menu, 
  X, 
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Search,
  ShoppingBag,
  Headphones,
  MessageSquare,
  FileText,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AIAssistant } from "./components/AIAssistant";
import { Dashboard } from "./components/Dashboard";
import { ModelDetail } from "./components/ModelDetail";
import { REAL_CARS } from "./constants";

// --- Constants ---

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Next-Gen Propulsion",
    description: "Our proprietary tri-motor system delivers instantaneous torque and precise vectoring."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Aura Intelligence",
    description: "Level 4 autonomous capabilities powered by our custom neural processing unit."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safety First",
    description: "A rigid carbon-fiber monocoque combined with 360-degree sensor fusion."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Sustainable Luxury",
    description: "Interiors crafted from recycled ocean plastics and lab-grown mycelium leather."
  }
];

const SHOP_ITEMS = [
  {
    id: 1,
    name: "Aura Wall Connector",
    category: "Charging",
    price: "$550",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    name: "Carbon Fiber Spoiler",
    category: "Performance",
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    name: "Aura Lifestyle Jacket",
    category: "Apparel",
    price: "$240",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    name: "Performance Wheel Set",
    category: "Accessories",
    price: "$4,500",
    image: "https://images.unsplash.com/photo-1551446591-142875a901a1?auto=format&fit=crop&q=80&w=1000"
  }
];

// --- Components ---

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-background rounded-full" />
          </div>
          AURA
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <Link to="/" className="hover:text-primary transition-colors duration-300">Models</Link>
          <Link to="/dashboard" className="hover:text-primary transition-colors duration-300">Dashboard</Link>
          <Link to="/shop" className="hover:text-primary transition-colors duration-300">Shop</Link>
          <Link to="/support" className="hover:text-primary transition-colors duration-300">Support</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/shop">
            <Button variant="outline" className="hidden md:flex rounded-full px-6 uppercase text-xs tracking-widest">
              Shop
            </Button>
          </Link>
          <Button className="rounded-full px-6 uppercase text-xs tracking-widest">
            Test Drive
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l">
              <div className="flex flex-col gap-6 mt-12">
                <Link to="/" className="text-2xl font-light tracking-tight hover:text-primary transition-colors">Models</Link>
                <Link to="/shop" className="text-2xl font-light tracking-tight hover:text-primary transition-colors">Shop</Link>
                <Link to="/support" className="text-2xl font-light tracking-tight hover:text-primary transition-colors">Support</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-bold tracking-tighter mb-8 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-background rounded-full" />
              </div>
              AURA
            </div>
            <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8">
              Pushing the boundaries of what's possible in electric mobility. 
              Designed in California, engineered for the world.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Models</h5>
            <ul className="flex flex-col gap-4 text-sm font-light text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Spectre GT</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Zenith Sedan</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Apex Hypercar</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Company</h5>
            <ul className="flex flex-col gap-4 text-sm font-light text-muted-foreground">
              <li><Link to="/support" className="hover:text-primary transition-colors">About Aura</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Newsletter</h5>
            <p className="text-sm font-light text-muted-foreground mb-6">
              Receive updates on new models and exclusive events.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Email address" 
                className="bg-secondary/50 border-none rounded-full px-6 py-3 text-sm flex-1 focus:ring-1 ring-primary outline-none"
              />
              <Button size="icon" className="rounded-full w-12 h-12">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            © 2026 Aura Motors. All rights reserved.
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero Car" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center container px-6"
        >
          <Badge variant="outline" className="mb-6 px-4 py-1 rounded-full uppercase tracking-[0.3em] text-[10px] border-primary/50 text-primary">
            The Future of Performance
          </Badge>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
            AURA <span className="text-primary">SPECTRE</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Experience the pinnacle of electric grand touring. 
            Engineered for those who demand everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-10 py-7 text-base uppercase tracking-widest">
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-base uppercase tracking-widest backdrop-blur-sm">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-50">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "0-60 MPH", value: "2.8s" },
              { label: "Range", value: "420mi" },
              { label: "Top Speed", value: "185mph" },
              { label: "Peak Power", value: "1,020hp" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lineup Section */}
      <section id="models" className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">THE LINEUP</h2>
              <p className="text-muted-foreground text-lg font-light">
                From luxury sedans to record-breaking hypercars, every Aura is built with the same uncompromising philosophy.
              </p>
            </div>
            <Button variant="link" className="text-primary uppercase tracking-widest group">
              View All Models <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REAL_CARS.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="group overflow-hidden bg-secondary/30 border-none hover:bg-secondary/50 transition-colors duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-3xl font-bold tracking-tighter">{car.name}</h3>
                        <p className="text-primary text-xs uppercase tracking-widest font-medium">{car.brand} — {car.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{car.price}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm font-light mb-8 line-clamp-2">
                      {car.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mb-8">
                      <div>
                        <div className="text-lg font-bold">{car.specs.range}</div>
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Range</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{car.specs.acceleration}</div>
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground">0-60</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{car.specs.topSpeed}</div>
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Top Speed</div>
                      </div>
                    </div>
                    <Link to={`/model/${car.id}`}>
                      <Button className="w-full rounded-full uppercase tracking-widest text-xs py-6">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-32 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
                ENGINEERED <br /> TO EXCEED
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {FEATURES.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold tracking-tight">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-full border border-primary/20 p-12 flex items-center justify-center"
            >
              <div className="absolute inset-0 animate-pulse bg-primary/5 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070" 
                alt="Chassis" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-[8px] uppercase tracking-widest opacity-50">Electric</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

const Shop = () => {
  return (
    <PageWrapper>
      <section className="pt-40 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">SHOP</h1>
              <p className="text-muted-foreground text-lg font-light">Premium accessories and lifestyle gear for the Aura enthusiast.</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search accessories..." 
                className="pl-12 rounded-full bg-secondary/30 border-none h-12"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {["All", "Charging", "Performance", "Apparel", "Accessories"].map((cat) => (
              <Button key={cat} variant={cat === "All" ? "default" : "outline"} className="rounded-full px-8 uppercase text-[10px] tracking-widest">
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SHOP_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group overflow-hidden bg-secondary/20 border-none hover:bg-secondary/40 transition-all duration-500">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <Button size="icon" className="absolute bottom-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">{item.category}</p>
                    <h3 className="text-xl font-bold tracking-tight mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium">{item.price}</p>
                      <a href="tel:+1800287238" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        Call Owner
                      </a>
                    </div>
                    <Button className="w-full mt-4 rounded-full uppercase tracking-widest text-[10px] py-4" variant="secondary">
                      Book Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

const Support = () => {
  return (
    <PageWrapper>
      <section className="pt-40 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-center">SUPPORT</h1>
            <p className="text-muted-foreground text-xl font-light text-center mb-20">
              We're here to ensure your Aura experience is seamless. 
              Find answers, schedule service, or contact our team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                { icon: <FileText />, title: "Guides", desc: "Owner's manuals and technical documentation." },
                { icon: <Headphones />, title: "Service", desc: "Schedule maintenance or roadside assistance." },
                { icon: <MessageSquare />, title: "Community", desc: "Connect with other Aura owners worldwide." }
              ].map((box, i) => (
                <Card key={i} className="bg-secondary/20 border-none p-8 text-center hover:bg-secondary/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                    {box.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{box.title}</h3>
                  <p className="text-muted-foreground text-sm font-light">{box.desc}</p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-8">Contact Us</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-muted-foreground text-sm">support@auramotors.com</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Phone</h4>
                      <p className="text-muted-foreground text-sm">+1 (800) AURA-EV</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Headquarters</h4>
                      <p className="text-muted-foreground text-sm">100 Innovation Way, Palo Alto, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-secondary/20 border-none p-8">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" className="bg-background/50 border-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" className="bg-background/50 border-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="bg-background/50 border-none min-h-[120px]" />
                  </div>
                  <Button className="w-full rounded-full py-6 uppercase tracking-widest text-xs">
                    Submit Request
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    document.documentElement.classList.add('dark');
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Navbar isScrolled={isScrolled} />
      
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/support" element={<Support />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/model/:id" element={<ModelDetail />} />
          </Routes>
        </div>
      </AnimatePresence>

      <AIAssistant />
      <Footer />
    </div>
  );
}
