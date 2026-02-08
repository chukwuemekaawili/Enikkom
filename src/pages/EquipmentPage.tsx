import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { EditableText } from "@/components/admin";
import { usePageContent } from "@/hooks/useSiteSettings";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Ship, Construction } from "lucide-react";

// Import authentic project images from PDFs
import equipmentFleet from "@/assets/projects/hdd-equipment-fleet.jpg";

// Verified equipment data from Enikkom documents
const hddRigs = [
  { name: "500T HDD Rig", capacity: "Up to 48\" diameter, 3km span", pullback: "500 Ton", quantity: "2", status: "Certified" },
  { name: "300T HDD Rig", capacity: "Up to 42\" diameter, 2km span", pullback: "300 Ton", quantity: "3", status: "Certified" },
  { name: "200T HDD Rig", capacity: "Up to 36\" diameter, 1.5km span", pullback: "200 Ton", quantity: "2", status: "Certified" },
  { name: "150T HDD Rig", capacity: "Up to 30\" diameter, 1.2km span", pullback: "150 Ton", quantity: "1", status: "Certified" },
  { name: "100T HDD Rig", capacity: "Up to 24\" diameter, 1km span", pullback: "100 Ton", quantity: "1", status: "Certified" },
  { name: "50T HDD Rig", capacity: "Up to 16\" diameter, 500m span", pullback: "50 Ton", quantity: "1", status: "Certified" },
];

const thrustBoringMachines = [
  { name: "72-1200 NG Thrust Boring", capacity: "72\" diameter", quantity: "1", status: "Certified" },
  { name: "48/54-G900 Thrust Boring", capacity: "48\"-54\" diameter", quantity: "1", status: "Certified" },
  { name: "42\"/48\" G600 Thrust Boring", capacity: "42\"-48\" diameter", quantity: "1", status: "Certified" },
  { name: "36\"/42\" 600 Pounds", capacity: "36\"-42\" diameter", quantity: "1", status: "Certified" },
  { name: "36\" 340 Pounds", capacity: "36\" diameter", quantity: "1", status: "Certified" },
  { name: "24-100 Thrust Boring", capacity: "24\" diameter", quantity: "1", status: "Certified" },
];

const microTunnelling = [
  { name: "48\" Micro Tunnelling - MTS", capacity: "48\" diameter, high accuracy", quantity: "1", status: "Certified" },
  { name: "800T Pipe Pusher - TSG", capacity: "800 Ton thrust capacity", quantity: "1", status: "Certified" },
  { name: "750T Herrenknecht Thruster", capacity: "750 Ton thrust capacity", quantity: "1", status: "Certified" },
  { name: "380T Pipe Pusher - Prime Drilling", capacity: "380 Ton thrust capacity", quantity: "1", status: "Certified" },
];

const marineEquipment = [
  { name: "Cutter Suction Dredger", capacity: "Multiple capacities", quantity: "3+", status: "Certified" },
  { name: "Crane Barge", capacity: "Various lift capacities", quantity: "4+", status: "Certified" },
  { name: "Impact Pile Driver", capacity: "Heavy duty", quantity: "2+", status: "Certified" },
  { name: "Lay Barge", capacity: "Pipeline installation", quantity: "2+", status: "Certified" },
];

const supportEquipment = [
  { name: "CAT 320 Amphibious Excavators", capacity: "Swamp operations", quantity: "6+", status: "Certified" },
  { name: "CAT 330/345 Track Excavators", capacity: "Various sizes", quantity: "15+", status: "Certified" },
  { name: "CAT D6/D7 Dozers", capacity: "ROW clearing", quantity: "8+", status: "Certified" },
  { name: "Sideboom Pipelayers", capacity: "Up to 48\" pipe", quantity: "12+", status: "Certified" },
  { name: "Automatic Welding Sets", capacity: "All pipe sizes", quantity: "20+", status: "Certified" },
  { name: "Mud Recycling Systems", capacity: "High volume", quantity: "Multiple", status: "Certified" },
];

export default function EquipmentPage() {
  const { content } = usePageContent('equipment');
  const heroContent = content.hero || {};
  const hddContent = content.hdd_fleet || {};
  const thrustContent = content.thrust_boring || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Equipment & Fleet Capability"}
        subtitle={heroContent.subtitle || "West Africa's largest HDD fleet with 10+ maxi rigs up to 500T pullback capacity. Modern, well-maintained equipment ready for deployment."}
        badge={heroContent.badge || "West Africa's Largest Fleet"}
        primaryCTA={{ label: heroContent.primaryBtnText || "View HDD Equipment Details", href: heroContent.primaryBtnLink || "/equipment/hdd" }}
        backgroundImage={heroContent.backgroundImage || equipmentFleet}
        size="default"
        pageSlug="equipment"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Fleet Overview Stats */}
      <section className="py-12 bg-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10+", label: "Maxi HDD Rigs" },
              { value: "500T", label: "Max Pullback Capacity" },
              { value: "48\"", label: "Max Pipe Diameter" },
              { value: "6", label: "Thrust Boring Machines" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HDD Rig Fleet */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-5 w-5 text-primary" />
                <p className="section-eyebrow">Core Fleet</p>
              </div>
              <h2 className="mb-2">
                <EditableText
                  value={hddContent.title || "HDD Rig Fleet"}
                  pageSlug="equipment"
                  sectionKey="hdd_fleet"
                  field="title"
                />
              </h2>
              <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-2xl">
                <EditableText
                  value={hddContent.description || "10+ maxi HDD rigs from 50T to 500T pullback capacity through our partnership with HDDThailand."}
                  pageSlug="equipment"
                  sectionKey="hdd_fleet"
                  field="description"
                />
              </p>
            </div>
            <Link 
              to="/equipment/hdd" 
              className="hidden md:flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            >
              View Full Specifications <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="overflow-x-auto rounded-[14px] border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Equipment</TableHead>
                    <TableHead className="font-semibold">Pullback</TableHead>
                    <TableHead className="font-semibold">Capacity/Specs</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hddRigs.map((item, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-[13px]">{item.name}</TableCell>
                      <TableCell className="text-[13px] text-primary font-semibold">{item.pullback}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{item.capacity}</TableCell>
                      <TableCell className="text-[13px]">{item.quantity}</TableCell>
                      <TableCell><Badge variant="outline" className="text-green-600 border-green-600/30">{item.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Thrust Boring Machines */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Construction className="h-5 w-5 text-primary" />
              <p className="section-eyebrow">Trenchless Technology</p>
            </div>
            <h2 className="mb-2">
              <EditableText
                value={thrustContent.title || "Thrust Boring & Micro Tunnelling"}
                pageSlug="equipment"
                sectionKey="thrust_boring"
                field="title"
              />
            </h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-2xl">
              <EditableText
                value={thrustContent.description || "6 thrust boring machines and specialized micro tunnelling equipment for precise underground installations."}
                pageSlug="equipment"
                sectionKey="thrust_boring"
                field="description"
              />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Thrust Boring */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Thrust Boring Machines</h3>
              <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Equipment</TableHead>
                      <TableHead className="font-semibold">Capacity</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {thrustBoringMachines.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-[13px]">{item.name}</TableCell>
                        <TableCell className="text-[13px] text-muted-foreground">{item.capacity}</TableCell>
                        <TableCell className="text-[13px]">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>

            {/* Micro Tunnelling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Micro Tunnelling Equipment</h3>
              <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Equipment</TableHead>
                      <TableHead className="font-semibold">Capacity</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {microTunnelling.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-[13px]">{item.name}</TableCell>
                        <TableCell className="text-[13px] text-muted-foreground">{item.capacity}</TableCell>
                        <TableCell className="text-[13px]">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marine & Support Equipment */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Ship className="h-5 w-5 text-primary" />
              <p className="section-eyebrow">Marine & Support</p>
            </div>
            <h2 className="mb-2">Marine & Support Equipment</h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-2xl">
              Full fleet of dredgers, barges, excavators, and pipeline construction equipment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Marine */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Marine Equipment</h3>
              <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Equipment</TableHead>
                      <TableHead className="font-semibold">Capacity</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marineEquipment.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-[13px]">{item.name}</TableCell>
                        <TableCell className="text-[13px] text-muted-foreground">{item.capacity}</TableCell>
                        <TableCell className="text-[13px]">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>

            {/* Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Support Equipment</h3>
              <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Equipment</TableHead>
                      <TableHead className="font-semibold">Capacity</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportEquipment.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-[13px]">{item.name}</TableCell>
                        <TableCell className="text-[13px] text-muted-foreground">{item.capacity}</TableCell>
                        <TableCell className="text-[13px]">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Note */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                <EditableText
                  value={content.partnership?.title || "Strategic Partnership with HDDThailand"}
                  pageSlug="equipment"
                  sectionKey="partnership"
                  field="title"
                />
              </h3>
              <p className="text-[14px] text-muted-foreground max-w-2xl">
                <EditableText
                  value={content.partnership?.description || "Our partnership with HDDThailand Co. Ltd provides access to cutting-edge trenchless technology, specialized equipment, and international expertise for complex HDD projects."}
                  pageSlug="equipment"
                  sectionKey="partnership"
                  field="description"
                />
              </p>
            </div>
            <Link to="/contact" className="shrink-0">
              <button className="btn-primary">
                Download Equipment Sheet
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <CTABand 
        headline={content.cta?.headline || "Need Equipment for Your Project?"}
        subhead={content.cta?.subhead || "Access West Africa's largest HDD fleet. Get availability and specifications within 24 hours."}
        primaryCTA={{ label: "Check Equipment Availability", href: "/contact" }} 
        secondaryCTA={{ label: "View HDD Fleet Details", href: "/equipment/hdd" }}
      />
    </Layout>
  );
}
