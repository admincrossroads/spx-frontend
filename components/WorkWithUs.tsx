"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContactModal } from "@/lib/contexts/ContactModalContext";

export default function WorkWithUs() {
  const { openModal } = useContactModal();

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative section-py px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="main-container"
        >
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">Work With Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-4xl">
            SPX works with driven professionals, consultants, and partners who share 
            our commitment to inclusive and sustainable development across Africa.
          </p>
        </motion.div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="section-py bg-muted/40">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-12">Careers & Internships</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-justify-custom">
                SPX recruits individuals who bring analytical rigor, practical experience, 
                creativity, and a strong sense of purpose. We value candidates who 
                demonstrate problem-solving skills and a commitment to Africa’s growth.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border shadow-sm">
                  <h3 className="font-bold text-primary mb-1">Analytical Rigor</h3>
                  <p className="text-xs text-muted-foreground">Data-driven decision making</p>
                </div>
                <div className="p-4 bg-white rounded-lg border shadow-sm">
                  <h3 className="font-bold text-primary mb-1">Field Experience</h3>
                  <p className="text-xs text-muted-foreground">Practical context understanding</p>
                </div>
              </div>
            </div>
            <Card className="border-2 border-primary/10">
              <CardHeader>
                <CardTitle>Open Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  We are always looking for talent. Please reach out to share your CV.
                </p>
                <Button onClick={openModal} className="w-full">Submit Interest</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONSULTANTS */}
      <section id="roster" className="section-py">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-12">Consultant Roster</h2>
          <div className="p-8 border rounded-2xl bg-card">
            <p className="text-lg leading-relaxed mb-8">
              SPX maintains a roster of independent specialists who support our work on 
              short-term and project-based assignments. We welcome expertise in:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Agriculture & Agronomy", "Clean Energy & PUE", "Digital Platforms",
                "MEL", "Market Systems", "Applied Science", "Research & Analytics"
              ].map((item) => (
                <Badge key={item} variant="secondary" className="px-4 py-2 text-sm">
                  {item}
                </Badge>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={openModal} variant="outline">Join Our Roster</Button>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships" className="section-py bg-primary/5">
        <div className="main-container text-center">
          <h2 className="text-3xl font-semibold mb-6">Partnership Opportunities</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            We partner with development organizations, private companies, research 
            institutions, and community organizations to deliver impactful programs.
          </p>
          <Button onClick={openModal} size="lg" className="rounded-full px-10">
            Discuss a Partnership
          </Button>
        </div>
      </section>

      {/* VENDORS */}
      <section id="vendors" className="section-py">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-12">Vendor Registration</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                SPX engages suppliers who meet high standards of quality, reliability, 
                and professionalism. We work with vendors across:
              </p>
              <ul className="space-y-3">
                {["Clean energy hardware", "Agricultural tools", "Logistics & Transport", "Digital services"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Supplier Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Suppliers must commit to our compliance, transparency, and accountability standards.
                </p>
                <Button onClick={openModal} variant="outline" className="w-full">Register as Vendor</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

