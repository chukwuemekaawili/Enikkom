import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Drill, Settings, Wrench } from "lucide-react";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/admin";
import {
  equipmentSourceNote,
  hddRigSpecs,
  thrustBoringSpecs,
  microTunnelingSpecs,
  hddSupportSystems,
} from "@/content/equipmentSpecs";
import { siteImageSelections } from "@/content/siteImageSelections";

export default function HDDEquipmentPage() {
  const { content } = usePageContent('hdd-equipment');
  const heroContent = content.hero || {};
  const overviewContent = content.overview || {};
  const partnerContent = content.partner || {};
  const hddEquipmentImages = siteImageSelections.hddEquipment;

  return (
    <Layout>
      <Hero
        title={heroContent.title || "HDD & Trenchless Equipment"}
        subtitle={heroContent.subtitle || "Model-specific HDD technical capacity sourced from the approved fleet schedule, including separate DD-1100 and DD-1100 RS entries, rated thrust in kN, torque, power, mud systems, and trenchless support equipment."}
        badge={heroContent.badge || "Technical Capacity Schedule"}
        backgroundImage={heroContent.backgroundImage || hddEquipmentImages.hero}
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
                  value={overviewContent.description || "The current equipment schedule lists named American Augers units across the fleet, including DD-580, DD-440 / DD-440T, DD-1100, DD-1100 RS, DD-625, DD-220T, DD-100, and the latest DD-600 inventory entry. This page now presents the engineering ratings exactly as they appear in the technical capacity pack instead of generic diameter placeholders."}
                  pageSlug="hdd-equipment"
                  sectionKey="overview"
                  field="description"
                  multiline
                />
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Drill, label: overviewContent.stat1 || "DD-1100 + DD-1100 RS Listed Separately" },
                  { icon: Settings, label: overviewContent.stat2 || "500T Max Pullback Class" },
                  { icon: Wrench, label: overviewContent.stat3 || "4,893 kN Max Thrust Rating" },
                  { icon: CheckCircle, label: overviewContent.stat4 || "1,000 gpm Max Mud Flow" },
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
                src={overviewContent.image || hddEquipmentImages.support}
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
                    <TableHead className="font-semibold">Model</TableHead>
                    <TableHead className="font-semibold">Inventory Label</TableHead>
                    <TableHead className="font-semibold">Pullback Class</TableHead>
                    <TableHead className="font-semibold">Rated Thrust / kN</TableHead>
                    <TableHead className="font-semibold">Rotary Torque</TableHead>
                    <TableHead className="font-semibold">Power / Fluid</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hddRigSpecs.map((rig, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-[13px]">{rig.model}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground whitespace-nowrap">{rig.inventoryLabel}</TableCell>
                      <TableCell className="text-[13px] text-primary font-semibold whitespace-nowrap">{rig.pullbackClass}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground min-w-[190px]">{rig.thrustRating}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground min-w-[170px]">{rig.rotaryTorque}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground min-w-[210px]">
                        <div>{rig.power}</div>
                        <div className="text-[11px] mt-1">{rig.fluidFlow}</div>
                      </TableCell>
                      <TableCell className="text-[13px]">{rig.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-[12px] text-muted-foreground mt-2">
              <EditableText
                value={content.hdd_table?.footer || `Rated technical data shown here is drawn from the current equipment pack. ${equipmentSourceNote}`}
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
                    <TableHead className="font-semibold">Make</TableHead>
                    <TableHead className="font-semibold">Rated Capacity</TableHead>
                    <TableHead className="font-semibold">Year</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...thrustBoringSpecs, ...microTunnelingSpecs].map((item, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-[13px]">{item.equipment}</TableCell>
                      <TableCell className="text-[13px]">{item.make}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{item.rating}</TableCell>
                      <TableCell className="text-[13px]">{item.year}</TableCell>
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
                value={content.support?.title || "Support Systems & Downhole Equipment"}
                pageSlug="hdd-equipment"
                sectionKey="support"
                field="title"
              />
            </h3>
            <div className="overflow-x-auto rounded-[14px] border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">System</TableHead>
                    <TableHead className="font-semibold">Documented Detail</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hddSupportSystems.map((item, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-[13px]">{item.system}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{item.detail}</TableCell>
                      <TableCell className="text-[13px]">{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                value={partnerContent.description || "HDDTEC Ltd — our joint venture with HDDThailand Co. Ltd — combines HDDThailand's 15+ years of international HDD experience (ISO 9001:2015 certified) with ECL's deep local knowledge, operating Nigeria's largest in-country fleet of 9 HDD rigs to tackle any crossing challenge."}
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
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
