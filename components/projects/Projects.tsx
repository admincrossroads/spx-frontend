"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  country: string;
  region?: string;
  status: "active" | "completed" | "upcoming";
  image: string;
  focusArea: string;
  year?: number;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Bloom Initiative: Energy-Enabled Livelihoods & Circular Economy",
    description: "A multi-stakeholder program designed to integrate clean energy, PUE technologies, and circular economy innovations to support rural livelihoods.",
    tag: "Energy",
    country: "Ethiopia",
    region: "Regional",
    status: "active",
    image: "/images/projects/p1.jpg",
    focusArea: "Energy",
    year: 2024,
  },
  {
    id: "2",
    title: "Digital Advisory for Smallholder Farmers",
    description: "Integrated digital platforms providing agronomy and market development advice to coffee-growing communities, improving farm productivity and quality management.",
    tag: "Digital",
    country: "Ethiopia",
    region: "Coffee Regions",
    status: "active",
    image: "/images/projects/p2.jpg",
    focusArea: "Digital",
    year: 2023,
  },
  {
    id: "3",
    title: "Applied Science Innovation: Agricultural Waste Transformation",
    description: "Incubating microbial technologies that accelerate the conversion of agricultural waste into nutrient-rich organic compost for greener farming systems.",
    tag: "Climate",
    country: "Ethiopia",
    region: "National",
    status: "active",
    image: "/images/projects/p3.jpg",
    focusArea: "Climate",
    year: 2024,
  },
  {
    id: "4",
    title: "Coffee Sector Skills Development",
    description: "Established an international-standard coffee training institute offering professional training in roasting, cupping, and barista skills to strengthen human capital.",
    tag: "Employment",
    country: "Ethiopia",
    region: "Addis Ababa",
    status: "active",
    image: "/images/projects/p1.jpg",
    focusArea: "Employment",
    year: 2023,
  },
  {
    id: "5",
    title: "Renewable Energy Operations Support",
    description: "Providing technical and operational maintenance for wind power assets to ensure the long-term sustainability and reliability of clean energy investments.",
    tag: "Energy",
    country: "Ethiopia",
    region: "National",
    status: "active",
    image: "/images/projects/p2.jpg",
    focusArea: "Energy",
    year: 2024,
  },
  {
    id: "6",
    title: "Research & Sector Analysis",
    description: "Conducting market research in banking, digital payments, and agricultural value chains to inform evidence-based policy and spark private-sector innovation.",
    tag: "Research",
    country: "Ethiopia",
    region: "National",
    status: "completed",
    image: "/images/projects/p3.jpg",
    focusArea: "Research",
    year: 2023,
  },
  {
    id: "7",
    title: "Commercial Farm Advisory & Operational Support",
    description: "Strategic advisory for commercial farms on technology adoption, market linkage development, and system optimization to enhance productivity.",
    tag: "Agriculture",
    country: "Ethiopia",
    region: "Regional",
    status: "active",
    image: "/images/projects/p1.jpg",
    focusArea: "Agriculture",
    year: 2024,
  },
  {
    id: "8",
    title: "Media & Thought Leadership Partnerships",
    description: "Hosting high-level economic dialogues and televised panels to promote national thought leadership and advance Africa's development discourse.",
    tag: "Governance",
    country: "Ethiopia",
    region: "National",
    status: "active",
    image: "/images/projects/p2.jpg",
    focusArea: "Governance",
    year: 2024,
  },
];

const focusAreas = ["All", "Energy", "Agriculture", "Employment", "Digital", "Climate", "Governance", "Research"];
const statuses = ["All", "Active", "Completed", "Upcoming"];
const regions = ["All", "East Africa", "West Africa", "Pan-African"];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFocusArea, setSelectedFocusArea] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFocusArea = selectedFocusArea === "All" || project.focusArea === selectedFocusArea;
    const matchesStatus =
      selectedStatus === "All" ||
      project.status === selectedStatus.toLowerCase();
    const matchesRegion = selectedRegion === "All" || project.region === selectedRegion;

    return matchesSearch && matchesFocusArea && matchesStatus && matchesRegion;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "completed":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "upcoming":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative section-py">
        <div className="main-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-semibold mb-6">
              Our Projects
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Impactful initiatives driving development across Africa. Explore our
              portfolio of projects spanning energy, agriculture, employment, digital
              transformation, climate resilience, and governance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS AND SEARCH */}
      <section className="main-container mb-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by name, country, or description..."
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
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
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

              {/* Region Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Region</label>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section id="portfolio" className="main-container mb-20">
        <div className="max-w-6xl mx-auto">
          <div id="featured" className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Project Portfolio</h2>
            <p className="text-muted-foreground">Our ongoing and completed initiatives driving impact.</p>
          </div>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                No projects found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFocusArea("All");
                  setSelectedStatus("All");
                  setSelectedRegion("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary/90 text-primary-foreground px-3 py-1 text-sm">
                        {project.tag}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(project.status)} px-3 py-1 text-sm`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span>{project.country}</span>
                        {project.year && (
                          <>
                            <span>•</span>
                            <span>{project.year}</span>
                          </>
                        )}
                      </div>
                      {project.region && (
                        <span className="text-muted-foreground/70">{project.region}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ADDITIONAL SECTIONS */}
      <section id="impact" className="main-container mb-20 text-center">
        <div className="max-w-4xl mx-auto p-12 border rounded-xl bg-muted/40">
          <h2 className="text-3xl font-semibold mb-4">Impact Stories</h2>
          <p className="text-muted-foreground mb-8">
            Discover how SPX initiatives are transforming communities and systems across Africa.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card className="p-6">
              <h3 className="font-bold mb-2">Coffee Sector Transformation</h3>
              <p className="text-sm text-muted-foreground">How our training institute is creating jobs and increasing value for smallholder farmers.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-2">Energy-Enabled Livelihoods</h3>
              <p className="text-sm text-muted-foreground">The impact of solar-powered processing tools on rural enterprise income.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="main-container mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 p-8 border rounded-xl bg-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {projects.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {projects.filter((p) => p.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(projects.map((p) => p.country)).size}
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(projects.map((p) => p.focusArea)).size}
              </div>
              <div className="text-sm text-muted-foreground">Focus Areas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

