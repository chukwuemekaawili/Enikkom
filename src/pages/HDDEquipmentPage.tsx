import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Drill, Settings, Wrench } from "lucide-react";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/admin";

// Import authentic image from PDFs
import hddDrilling from "@/assets/projects/hdd-rig-night.jpg";

// Real HDD Rig Fleet from Enikkom documents
const hddRigs = [
  { model: "Maxi HDD Rig", pullback: "500T", diameter: "Up to 48\"", length: "Up to 3km", quantity: "2" },
  { model: "Maxi HDD Rig", pullback: "300T", diameter: "Up to 42\"", length: "Up to 2.5km", quantity: "3" },
  { model: "Maxi HDD Rig", pullback: "200T", diameter: "Up to 36\"", length: "Up to 2km", quantity: "2" },
  { model: "Maxi HDD Rig", pullback: "150T", diameter: "Up to 30\"", length: "Up to 1.5km", quantity: "1" },
  { model: "Maxi HDD Rig", pullback: "100T", diameter: "Up to 24\"", length: "Up to 1.2km", quantity: "1" },
  { model: "Mini HDD Rig", pullback: "50T", diameter: "Up to 16\"", length: "Up to 800m", quantity: "1" },
];

// Real Thrust Boring & Micro Tunnelling Equipment from documents
const thrustBoringEquipment = [
  { type: "48\" Micro Tunnelling Machine", capacity: "48\" diameter", application: "Large utility crossings", quantity: "1 (MTS)" },
  { type: "800T Pipe Pusher", capacity: "Up to 60\" diameter", application: "Major crossings", quantity: "1 (TSG)" },
  { type: "750T Herrenknecht Thruster", capacity: "Up to 54\" diameter", application: "Road/Railway crossings", quantity: "1" },
  { type: "380T Pipe Pusher", capacity: "Up to 42\" diameter", application: "Highway crossings", quantity: "1 (Prime Drilling)" },
  { type: "Thrust Boring Machine 72-1200 NG", capacity: "Up to 72\" diameter", application: "Large crossings", quantity: "1" },
  { type: "Thrust Boring Machine 48/54-G900", capacity: "48-54\" diameter", application: "Medium crossings", quantity: "1" },
  { type: "Thrust Boring Machine 42\"/48\" G600", capacity: "42-48\" diameter", application: "Standard crossings", quantity: "1" },
  { type: "Thrust Boring Machine 36\"/42\" 600 lbs", capacity: "36-42\" diameter", application: "Utility crossings", quantity: "1" },
  { type: "Thrust Boring Machine 36\" 340 lbs", capacity: "36\" diameter", application: "Short crossings", quantity: "1" },
  { type: "Thrust Boring Machine 24-100", capacity: "Up to 24\" diameter", application: "Small utility crossings", quantity: "1" },
];

const supportEquipment = [
  "Mud Recycling Systems (Multiple capacities)",
  "Mud Mixing Plants",
  "Mud Pumps (Various sizes)",
  "Drilling Fluid Systems",
  "Reamers (Various sizes up to 48\")",
  "Pipe Handling Equipment",
  "Tracking & Guidance Systems (Paratrack, TruTracker)",
  "Downhole Tools & Motors",
  "Welding Sets (Automatic & Manual)",
  "Power Generators",
  "Support Vehicles & Cranes",
  "CAT & Hitachi Excavators",
];

export default function HDDEquipmentPage() {
  const { content } = usePageContent('hdd-equipment');
  const heroContent = content.hero || {};
  const overviewContent = content.overview || {};
  const partnerContent = content.partner || {};

  return (
    <Layout>
      <Hero
        title={heroContent.title || "HDD & Trenchless Equipment"}
        subtitle={heroContent.subtitle || "West Africa's largest fleet of Horizontal Directional Drilling rigs—10+ maxi rigs with capacities from 50T to 500T pullback. Plus micro-tunnelling and thrust boring equipment."}
        badge={heroContent.badge || "10+ Maxi HDD Rigs Available"}
        backgroundImage={heroContent.backgroundImage || hddDrilling}
        size="default"
        primaryCTA={{ label: "Request Equipment Specs", href: "/contact" }}
        pageSlug="hdd-equipment"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      {/* Overview */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4">
                <EditableText
                  value={overviewContent.title || "Industry-Leading HDD Fleet"}
                  pageSlug="hdd-equipment"
                  sectionKey="overview"
                  field="title"
                />
              </h2>
              <p className="text-muted-foreground text-[14px] md:text-[15px] mb-6 leading-relaxed">
                <EditableText
                  value={overviewContent.description || "Our strategic partnership with HDDThailand provides access to cutting-edge technology and the largest HDD equipment fleet in West Africa. From utility crossings to major river crossings up to 3km in length—we hold the record for Africa's longest single drill at 3.1km."}
                  pageSlug="hdd-equipment"
                  sectionKey="overview"
                  field="description"
                  multiline
                />
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Drill, label: overviewContent.stat1 || "10+ Maxi HDD Rigs" },
                  { icon: Settings, label: overviewContent.stat2 || "500T Max Pullback" },
                  { icon: Wrench, label: overviewContent.stat3 || "48\" Max Diameter" },
                  { icon: CheckCircle, label: overviewContent.stat4 || "3.1km Record Drill" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-[14px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-[13px] font-medium">
                      <EditableText
                        value={item.label}
                        pageSlug="hdd-equipment"
                        sectionKey="overview"
                        field={`stat${i + 1}`}
                      />
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="relative rounded-xl overflow-hidden hover-lift"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <EditableImage
                src={overviewContent.image || hddDrilling}
                alt="HDD Rig in Operation"
                pageSlug="hdd-equipment"
                sectionKey="overview"
                field="image"
                className="w-full h-[320px] md:h-[380px] object-cover"
              />
            </motion.div>
          </div>

          {/* HDD Rig Fleet Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-xl font-semibold mb-6">
              <EditableText
                value={content.hdd_table?.title || "Maxi HDD Rig Fleet"}
                pageSlug="hdd-equipment"
                sectionKey="hdd_table"
                field="title"
              />
            </h3>
            <div className="overflow-x-auto rounded-[14px] border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Equipment Type</TableHead>
                    <TableHead className="font-semibold">Pullback Capacity</TableHead>
                    <TableHead className="font-semibold">Max Diameter</TableHead>
                    <TableHead className="font-semibold">Max Length</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hddRigs.map((rig, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-[13px]">{rig.model}</TableCell>
                      <TableCell className="text-[13px] text-primary font-semibold">{rig.pullback}</TableCell>
                      <TableCell className="text-[13px]">{rig.diameter}</TableCell>
                      <TableCell className="text-[13px]">{rig.length}</TableCell>
                      <TableCell className="text-[13px]">{rig.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-[12px] text-muted-foreground mt-2">
              <EditableText
                value={content.hdd_table?.footer || "Total: 10+ Maxi HDD Rigs • Combined pullback capacity: 2,300+ tons"}
                pageSlug="hdd-equipment"
                sectionKey="hdd_table"
                field="footer"
              />
            </p>
          </motion.div>

          {/* Thrust Boring & Micro Tunnelling Equipment */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="mb-14"
          >
            <h3 className="text-xl font-semibold mb-6">
              <EditableText
                value={content.thrust_table?.title || "Micro Tunnelling & Thrust Boring Equipment"}
                pageSlug="hdd-equipment"
                sectionKey="thrust_table"
                field="title"
              />
            </h3>
            <div className="overflow-x-auto rounded-[14px] border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Equipment Type</TableHead>
                    <TableHead className="font-semibold">Capacity</TableHead>
                    <TableHead className="font-semibold">Typical Application</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thrustBoringEquipment.map((item, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-[13px]">{item.type}</TableCell>
                      <TableCell className="text-[13px]">{item.capacity}</TableCell>
                      <TableCell className="text-[13px]">{item.application}</TableCell>
                      <TableCell className="text-[13px]">{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Support Equipment */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">
              <EditableText
                value={content.support?.title || "Support Equipment"}
                pageSlug="hdd-equipment"
                sectionKey="support"
                field="title"
              />
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {supportEquipment.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-2 p-3 bg-muted/30 rounded-[14px]"
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-[13px]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              <EditableText
                value={partnerContent.subtitle || "Strategic Partnership"}
                pageSlug="hdd-equipment"
                sectionKey="partner"
                field="subtitle"
              />
            </p>
            <h2 className="mb-3">
              <EditableText
                value={partnerContent.title || "HDDThailand Co. Ltd."}
                pageSlug="hdd-equipment"
                sectionKey="partner"
                field="title"
              />
            </h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-2xl mx-auto">
              <EditableText
                value={partnerContent.description || "Our strategic partnership with HDDThailand provides access to cutting-edge HDD technology, international expertise, and the largest equipment fleet in West Africa—ensuring we can tackle any crossing challenge."}
                pageSlug="hdd-equipment"
                sectionKey="partner"
                field="description"
                multiline
              />
            </p>
          </motion.div>
        </div>
      </section>

      <CTABand 
        headline="Need HDD Equipment for Your Project?"
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />
    </Layout>
  );
}
