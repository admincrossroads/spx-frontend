"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Filter, Lightbulb, Building2, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Innovation {
  id: string;
  title: string;
  description: string;
  category: "applied-research" | "enterprise-support" | "digital-tools";
  status: "active" | "completed" | "pilot";
  image: string;
  focusArea: string;
  location?: string;
  year?: number;
}

const innovations: Innovation[] = [
  {
    id: "1",
    title: "Soil Health Monitoring System",
    description: "Digital platform for real-time soil health assessment and recommendations for smallholder farmers.",
    category: "applied-research",
    status: "active",
    image: "/images/projects/p1.jpg",
    focusArea: "Agriculture",
    location: "Ethiopia",
    year: 2024,
  },
  {
    id: "2",
    title: "Solar Cold Storage Units",
    description: "Solar-powered cold storage solutions for post-harvest management and reducing food waste.",
    category: "applied-research",
    status: "pilot",
    image: "/images/projects/p2.jpg",
    focusArea: "Energy",
    location: "Kenya",
    year: 2024,
  },
  {
    id: "3",
    title: "AgriTech Startup Incubator",
    description: "Supporting early-stage agricultural technology startups with mentorship, funding, and market access.",
    category: "enterprise-support",
    status: "active",
    image: "/images/projects/p3.jpg",
    focusArea: "Agriculture",
    location: "Tanzania",
    year: 2023,
  },
  {
    id: "4",
    title: "Digital MEL Dashboard",
    description: "Comprehensive monitoring, evaluation, and learning platform for real-time project tracking and insights.",
    category: "digital-tools",
    status: "active",
    image: "/images/projects/p1.jpg",
    focusArea: "Digital",
    location: "Regional",
    year: 2024,
  },
  {
    id: "5",
    title: "Waste-to-Value Research",
    description: "Applied research on converting agricultural waste into valuable products and energy sources.",
    category: "applied-research",
    status: "active",
    image: "/images/projects/p2.jpg",
    focusArea: "Climate",
    location: "Rwanda",
    year: 2024,
  },
  {
    id: "6",
    title: "Renewable Energy Ventures",
    description: "Incubating and supporting clean energy enterprises focused on mini-grids and solar solutions.",
    category: "enterprise-support",
    status: "active",
    image: "/images/projects/p3.jpg",
    focusArea: "Energy",
    location: "Ghana",
    year: 2023,
  },
  {
    id: "7",
    title: "Digital Market Platform",
    description: "Connecting smallholder farmers with buyers through a digital marketplace and logistics support.",
    category: "digital-tools",
    status: "pilot",
    image: "/images/projects/p1.jpg",
    focusArea: "Agriculture",
    location: "Uganda",
    year: 2024,
  },
  {
    id: "8",
    title: "Microbial Solutions Lab",
    description: "Research facility developing microbial solutions for soil health and crop productivity.",
    category: "applied-research",
    status: "active",
    image: "/images/projects/p2.jpg",
    focusArea: "Agriculture",
    location: "Ethiopia",
    year: 2024,
  },
  {
    id: "9",
    title: "Climate Data Analytics",
    description: "Advanced analytics platform for climate risk assessment and adaptation planning.",
    category: "digital-tools",
    status: "active",
    image: "/images/projects/p3.jpg",
    focusArea: "Climate",
    location: "Regional",
    year: 2024,
  },
];

const categories = [
  { value: "all", label: "All", icon: null },
  { value: "applied-research", label: "Applied Research", icon: Lightbulb },
  { value: "enterprise-support", label: "Enterprise Support", icon: Building2 },
  { value: "digital-tools", label: "Digital & Data Tools", icon: Database },
];

const statuses = ["All", "Active", "Completed", "Pilot"];
const focusAreas = ["All", "Energy", "Agriculture", "Employment", "Digital", "Climate", "Governance"];

export default function InnovationHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedFocusArea, setSelectedFocusArea] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredInnovations = innovations.filter((innovation) => {
    const matchesSearch =
      innovation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      innovation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (innovation.location && innovation.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || innovation.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" ||
      innovation.status === selectedStatus.toLowerCase();
    const matchesFocusArea = selectedFocusArea === "All" || innovation.focusArea === selectedFocusArea;

    return matchesSearch && matchesCategory && matchesStatus && matchesFocusArea;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "completed":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "pilot":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-semibold mb-6">
              SPX Innovation Hub
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Turning science, technology, and enterprise ideas into practical,
              scalable development solutions across Africa. We support applied research,
              enterprise development, and digital innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THREE MAIN AREAS */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Applied Research</CardTitle>
                <CardDescription>
                  Pilots, field testing, and implementation research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We conduct hands-on experimentation and field research to develop
                  practical solutions for agriculture, energy, climate, and circular economy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Enterprise Support</CardTitle>
                <CardDescription>
                  Supporting ventures tackling systemic bottlenecks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We incubate and support early-stage businesses with training,
                  prototyping resources, and market pathways to scale impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Digital & Data Tools</CardTitle>
                <CardDescription>
                  Dashboards, MEL tools, and digital systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We develop digital agriculture tools, informational platforms,
                  and market systems that support producers and enterprises.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FILTERS AND SEARCH */}
      <section className="container mx-auto px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search innovations by name, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <p className="text-sm text-muted-foreground">
              {filteredInnovations.length} innovation{filteredInnovations.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-3 gap-4 mb-6 p-6 border rounded-lg bg-card"
            >
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className="flex items-center gap-2"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {category.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Focus Area Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Focus Area</label>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <Button
                      key={area}
                      variant={selectedFocusArea === area ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFocusArea(area)}
                    >
                      {area}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* INNOVATIONS GRID */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          {filteredInnovations.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                No innovations found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedStatus("All");
                  setSelectedFocusArea("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInnovations.map((innovation, index) => (
                <motion.div
                  key={innovation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={innovation.image}
                      alt={innovation.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        {getCategoryLabel(innovation.category)}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(innovation.status)}
                      >
                        {innovation.status.charAt(0).toUpperCase() + innovation.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {innovation.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {innovation.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        {innovation.location && <span>{innovation.location}</span>}
                        {innovation.year && (
                          <>
                            <span>•</span>
                            <span>{innovation.year}</span>
                          </>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {innovation.focusArea}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 p-8 border rounded-xl bg-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {innovations.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Innovations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {innovations.filter((i) => i.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(innovations.map((i) => i.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Innovation Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(innovations.map((i) => i.focusArea)).size}
              </div>
              <div className="text-sm text-muted-foreground">Focus Areas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center p-12 border rounded-xl bg-muted/40">
          <h2 className="text-3xl font-semibold mb-4">
            Partner with SPX Innovation Hub
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Are you an innovator, researcher, or entrepreneur working on solutions
            for Africa's development challenges? Let's collaborate to scale your impact.
          </p>
          <Button size="lg" className="rounded-full px-10">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}

