import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { EditableText } from "@/components/content";
import { usePageContent } from "@/hooks/useSiteSettings";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  equipmentSourceNote,
  hddRigSpecs,
  thrustBoringSpecs,
  microTunnelingSpecs,
  marineFleetSpecs,
  supportFleetSpecs,
} from "@/content/equipmentSpecs";
import { siteImageSelections } from "@/content/siteImageSelections";

export default function EquipmentPage() {
  const { content } = usePageContent('equipment');
  const heroContent = content.hero || {};
  const hddContent = content.hdd_fleet || {};
  const thrustContent = content.thrust_boring || {};
  const equipmentImages = siteImageSelections.equipment;

  return (
    <Layout>
      <Hero
        title={heroContent.title || "Technical Capacity & Equipment Fleet"}
        subtitle={heroContent.subtitle || "Document-backed technical capacity for Enikkom's HDD, trench boring, microtunneling, marine, and support fleets. Model-specific engineering ratings now replace the old generic equipment copy."}
        badge={heroContent.badge || "Nigeria's Largest HDD Fleet"}
        primaryCTA={{ label: heroContent.primaryBtnText || "View HDD Equipment Details", href: heroContent.primaryBtnLink || "/equipment/hdd" }}
        backgroundImage={heroContent.backgroundImage || equipmentImages.hero}
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
              { value: "500T", label: "Top HDD Pullback Class" },
              { value: "4,893 kN", label: "DD-1100 Max Thrust" },
              { value: "1.2M lb", label: "Largest Thrust Boring Rating" },
              { value: "2 CSDs", label: "Owned Cutter Suction Dredgers" },
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
              <p className="enk-kicker mb-2">Core Fleet</p>
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
                  value={hddContent.description || "Model-by-model HDD ratings sourced from the technical capacity sheets. DD-1100 and DD-1100 RS are shown as separate 500-ton rigs, and the table now uses rated thrust, kN conversions, torque, power, and fluid-flow figures instead of generic diameter claims."}
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
            <div className="overflow-x-auto rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Model</TableHead>
                    <TableHead className="font-semibold">Inventory Label</TableHead>
                    <TableHead className="font-semibold">Pullback Class</TableHead>
                    <TableHead className="font-semibold">Rated Thrust / kN</TableHead>
                    <TableHead className="font-semibold">Rotary Torque</TableHead>
                    <TableHead className="font-semibold">Power / Flow</TableHead>
                    <TableHead className="font-semibold">Qty</TableHead>
                    <TableHead className="font-semibold">Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hddRigSpecs.map((item, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-[13px]">
                        {item.model}
                        {(item.model === "American Augers DD-1100" || item.model === "American Augers DD-1100 RS") && (
                          <span className="enk-chip ml-2 text-[9px]">
                            500T
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-[13px] text-muted-foreground whitespace-nowrap">{item.inventoryLabel}</TableCell>
                      <TableCell className="text-[13px] text-primary font-semibold whitespace-nowrap">{item.pullbackClass}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground min-w-[190px]">{item.thrustRating}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground min-w-[170px]">{item.rotaryTorque}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground min-w-[210px]">
                        <div>{item.power}</div>
                        <div className="text-[11px] mt-1">{item.fluidFlow}</div>
                      </TableCell>
                      <TableCell className="text-[13px]">{item.quantity}</TableCell>
                      <TableCell className="text-[13px]">{item.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-[12px] text-muted-foreground mt-3">
              {equipmentSourceNote}
            </p>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              {hddRigSpecs.filter((item) =>
                [
                  "American Augers DD-580",
                  "American Augers DD-1100",
                  "American Augers DD-1100 RS",
                  "American Augers DD-625",
                ].includes(item.model)
              ).map((item) => (
                <div key={item.model} className="rounded-xl border border-border bg-muted/20 p-4">
                  <p className="text-[12px] font-semibold text-foreground mb-1">{item.model}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{item.note}</p>
                </div>
              ))}
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
            <p className="enk-kicker mb-2">Trenchless Technology</p>
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
                value={thrustContent.description || "Rated push-capacity schedules for the American Augers thrust boring fleet and the dedicated microtunneling / pipe pusher spreads in the equipment register."}
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
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Equipment</TableHead>
                      <TableHead className="font-semibold">Make</TableHead>
                      <TableHead className="font-semibold">Rated Capacity</TableHead>
                      <TableHead className="font-semibold">Year</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {thrustBoringSpecs.map((item, i) => (
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

            {/* Micro Tunnelling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Micro Tunnelling Equipment</h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Equipment</TableHead>
                      <TableHead className="font-semibold">Make</TableHead>
                      <TableHead className="font-semibold">Rated Capacity</TableHead>
                      <TableHead className="font-semibold">Year</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {microTunnelingSpecs.map((item, i) => (
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
            <p className="enk-kicker mb-2">Marine & Support</p>
            <h2 className="mb-2">Marine & Support Equipment</h2>
            <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-2xl">
              Detailed marine, civil, and logistics fleet groupings from the owned-equipment schedule, including dredgers, excavators, sidebooms, cranes, transport, generators, and field vehicles.
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
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Asset Category</TableHead>
                      <TableHead className="font-semibold">Documented Detail</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marineFleetSpecs.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-[13px]">{item.category}</TableCell>
                        <TableCell className="text-[13px] text-muted-foreground">{item.detail}</TableCell>
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
              <div className="mb-4 overflow-hidden rounded-xl border border-border bg-card">
                <EnhancedImage
                src={equipmentImages.support}
                  alt="Heavy transport and support fleet assets mobilized for field operations"
                  wrapperClassName="aspect-[16/10]"
                  className="h-full w-full"
                  tone="natural"
                  fallbackLabel="Support fleet reference"
                />
                <div className="border-t border-border px-4 py-3">
                  <p className="text-[13px] font-semibold text-foreground">Heavy Transport & Support Fleet Reference</p>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    Documentary fleet image used in place of the old logo-style placeholder so the support section reflects the actual transport, power, and field-logistics capability listed in the equipment schedule.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Fleet Category</TableHead>
                      <TableHead className="font-semibold">Documented Detail</TableHead>
                      <TableHead className="font-semibold">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportFleetSpecs.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-[13px]">{item.category}</TableCell>
                        <TableCell className="text-[13px] text-muted-foreground">{item.detail}</TableCell>
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
      <section className="py-12 bg-muted/40 border-y border-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                <EditableText
                  value={content.partnership?.title || "Technical Partnership with HDDThailand Co. Ltd"}
                  pageSlug="equipment"
                  sectionKey="partnership"
                  field="title"
                />
              </h3>
              <p className="text-[14px] text-muted-foreground max-w-2xl">
                <EditableText
                  value={content.partnership?.description || "HDDThailand Co. Ltd is an international trenchless specialist with over 15 years of experience. HDDThailand provides engineering services, project management services, and quality assurance procedures consistent with ISO-9001 certification for all directional drilling projects. This collaboration brings proven trenchless technology to the oil and gas industry."}
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
