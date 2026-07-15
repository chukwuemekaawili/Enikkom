import { useState, useEffect, useRef, useCallback } from "react";
import { Layout } from "@/components/layout";
import SEO from "@/components/ui/SEO";
import { Hero, CTABand } from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTeamMembers, usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/content";
import { EnhancedImage } from "@/components/ui/enhanced-image";
import { siteImageSelections } from "@/content/siteImageSelections";
import { SectionHeading } from "@/components/home/SectionHeading";

const managementImages = siteImageSelections.management;

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  photo: string;
  highlight: string;
  category?: string;
}

// Default leadership from codebase (fallback if DB is empty)
const defaultLeadership: TeamMember[] = [
  {
    name: "Engr. Edward Amene",
    role: "Chief Executive Officer / Managing Director",
    bio: "A Mechanical Engineering graduate from the University of Nigeria, Nsukka, with over 37 years of experience in pipeline construction, including 14 years as a Project Engineer with SPDC. He founded Enikkom Group in 1995 and pioneered the use of trenchless technologies, including Horizontal Directional Drilling and Thrust Boring, in Nigeria's pipeline sector, completing the first HDD crossing of the River Niger in 2003.",
    expertise: ["Pipeline Construction", "HDD & Trenchless Technology", "Strategic Leadership"],
    photo: managementImages.photos.edwardAmene,
    highlight: "Pioneer of HDD technology in Nigeria, first River Niger crossing, 2003",
    category: "management",
  },
  {
    name: "Engr. Saleem Ahmad Khan",
    role: "Chief Technical Officer",
    bio: "A mechanical engineer from Pakistan with over 30 years of experience, specialising in pipeline construction, HDD, heavy mechanical operations, and oil & gas infrastructure. Holds a bachelor's degree from NED University Karachi and a Diploma from the Swedish Institute. Has led complex projects for Marathon Construction, Zakhem Nigeria, and Business Supply & Technology, delivering HDD crossings, hot tapping, and pipeline expansions for clients including NNPC, Chevron, BP, Eni Pakistan, and SSGC. Expertise spans project management, quality control, site inspection, and cost management.",
    expertise: ["HDD Operations", "Pipeline Engineering", "Project Management"],
    photo: managementImages.photos.saleemKhan,
    highlight: "30+ years of trenchless technology expertise across Nigeria and international markets",
    category: "management",
  },
  {
    name: "Mr. Francis Anatogu",
    role: "Chief Growth & Transformation Officer",
    bio: "A seasoned business executive with 30 years of experience spanning energy, consulting, trade policy, and international business development. Began his career in 1995 with Schlumberger and Shell before moving into consulting with Accenture and Deloitte, advising energy and resources companies on growth and operational improvement. Served as inaugural Executive Secretary of the National Committee Secretariat for AfCFTA, leading Nigeria's accession process. Holds a Mechanical Engineering degree from the University of Nigeria, Nsukka, and an MBA from the Judge Business School, University of Cambridge. Also serves as Non-Executive Director at Dryva Logistics and West Africa Advisor to the UK Institute of Directors.",
    expertise: ["Business Transformation", "International Strategy", "Trade & Policy"],
    photo: managementImages.photos.francisAnatogu,
    highlight: "Cambridge MBA | ex-Schlumberger, Shell, Accenture, Deloitte, driving Enikkom's growth agenda",
    category: "management",
  },

  {
    name: "Adekunle Adewole, PhD",
    role: "Chief Operations & Strategy Officer",
    bio: "A visionary financial and management executive with over 30 years of multi-sector experience, 9 of which in the C-Suite, spanning banking, corporate & structured finance, credit, advisory, aviation, and management consultancy. Holds a PhD in Business Administration (Strategic Management) and a post-doctoral diploma in Organisational Leadership from the University of Oxford, UK. Also holds a master's in Business Law and a Certificate in Global Management from INSEAD, Fontainebleau, France. Prior to joining Enikkom Group, served as CEO of Livingtrust Mortgage Bank Plc. Fellow of the Chartered Institute of Administrators and Honorary Senior Member of the Chartered Institute of Bankers.",
    expertise: ["Strategic Management", "Corporate Finance", "Organisational Leadership"],
    photo: managementImages.photos.adekunleAdewole,
    highlight: "Oxford post-doctoral | INSEAD | PhD Strategic Management | ex-CEO Livingtrust Mortgage Bank",
    category: "management",
  },
  {
    name: "Uzoma Nwagboso",
    role: "Chief Financial Officer",
    bio: "Uzoma Nwagboso (Uzo) is a versatile and results-driven Senior Strategic Finance & Energy Executive with over 25 years of experience spanning Corporate Banking, Sustainable Energy Finance, and Oil & Gas Project Management. Combining a technical foundation in Engineering with specialized Finance expertise, he offers a unique ability to bridge the gap between complex engineering operations and strategic financial stewardship.\n\nWith core competencies in Strategic Finance and Energy Infrastructure, he has a proven track record of managing project finance portfolios exceeding $750M, spearheading massive digital transformations (SAP S/4HANA, SAGE), and delivering significant cost savings through business process optimization. His expertise lies in navigating the financial complexities of the Nigerian energy landscape, including Enterprise Risk Management, EPC Project Finance, LNG production, and International Trade Finance.\n\nA registered engineer (COREN), he holds a B.Eng. in Mechanical Engineering and both an MBA and MSc in Finance and Banking. His global perspective is furthered by executive education at Harvard Business School, where he completed the Finance for Senior Executives program.",
    expertise: ["Strategic Finance", "Energy Infrastructure", "Project Management"],
    photo: managementImages.photos.uzomaNwagboso,
    highlight: "25+ years in Corporate Banking, Energy Finance, and O&G Project Management",
    category: "management",
  },
  {
    name: "Mr. Chibuike Nwachukwu",
    role: "Executive Director",
    bio: "A Nigerian administrator with 23 years of experience, including 15 years as Managing Director at Enikkom Group Limited. Holds an MSc in Peace & Conflict Studies and bachelor's degrees in Mathematics and Peace & Conflict Studies. Brings extensive administrative management experience across local and international organisations.",
    expertise: ["Administrative Management", "Operational Efficiency", "Strategic Leadership"],
    photo: managementImages.photos.chibuikeNwachukwu,
    highlight: "15 years as Managing Director, operational backbone of Enikkom Group",
    category: "management",
  },
  {
    name: "Teddy Allen",
    role: "General Manager, Drilling",
    bio: "An American professional with 38 years of global experience in directional drilling and pipeline installation across diverse formations including swamps, sands, silts, shales, and granite. Skilled with various rig types, jack-ups, platforms, semi-submersibles, and directional drilling rigs, and trained in direct pipe procedures. Brings extensive expertise in drilling tools, fluids, recycling equipment, and down-hole surveying systems, with a strong track record in implementing and monitoring operational and safety standards.",
    expertise: ["Directional Drilling", "Down-Hole Surveying", "Drilling Fluids & Tools"],
    photo: managementImages.photos.teddyAllen,
    highlight: "38 years global HDD expertise, diverse formations, direct pipe, and drilling systems",
    category: "management",
  },
  {
    name: "Idigbor Emeka, FCA",
    role: "Chief Accountant",
    bio: "A Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) with over 20 years of experience in financial strategy, control, and corporate governance. Previously with UAC Restaurants Limited, bringing rigorous financial management, audit expertise, and governance standards to Enikkom.",
    expertise: ["Financial Strategy", "Corporate Governance", "Audit & Compliance"],
    photo: managementImages.photos.idigborEmeka,
    highlight: "FCA, financial governance and reporting",
    category: "management",
  },
];

const defaultBoardOfDirectors: TeamMember[] = [
  {
    name: "Biodun Adefila",
    role: "Chairman, Board of Directors",
    bio: "Currently Managing Director of Spice360, a leading brand consultancy. Formerly Chief Operating Officer at SO&U Limited, one of Nigeria's foremost advertising agencies. Over 20 years of experience in brand management, marketing strategy, and corporate governance, bringing invaluable strategic insight to Enikkom's growth.",
    expertise: ["Brand Management", "Corporate Governance", "Marketing Strategy"],
    photo: managementImages.photos.biodunAdefila,
    highlight: "Board governance and strategic direction",
    category: "board",
  },
  {
    name: "Ken James",
    role: "Non-Executive Director",
    bio: "Over 40 years of distinguished experience in oil and gas, marine services, and infrastructure development across West Africa. Provides strategic oversight and deep industry expertise to guide Enikkom's expansion in the energy and marine construction sectors.",
    expertise: ["Oil & Gas", "Marine Services", "Infrastructure Development"],
    photo: managementImages.photos.kenJames,
    highlight: "40+ years shaping West Africa's energy infrastructure",
    category: "board",
  },
];

// Helper to convert DB team member to display format
interface DBTeamMember {
  name: string;
  title: string;
  bio?: string;
  qualifications?: string;
  photo_url?: string;
  highlights?: string;
  category?: string;
}

const convertDBMember = (dbMember: DBTeamMember): TeamMember => ({
  name: dbMember.name,
  role: dbMember.title,
  bio: dbMember.bio || '',
  expertise: dbMember.qualifications ? dbMember.qualifications.split(',').map((s: string) => s.trim()) : [],
  photo: dbMember.photo_url || '',
  highlight: dbMember.highlights || '',
  category: dbMember.category || 'management',
});

const TeamMemberCard = ({ 
  member, 
  index, 
  onSelect 
}: { 
  member: TeamMember; 
  index: number;
  onSelect: (index: number) => void;
}) => (
  <button
    type="button"
    onClick={() => onSelect(index)}
    className="enk-doc-card enk-doc-card--interactive group flex h-full cursor-pointer flex-col overflow-hidden text-left focus-ring"
  >
    {/* Typed header row */}
    <div className="flex min-h-[34px] items-center border-b border-[var(--enk-rule)] px-4 py-1">
      <p className="enk-overline !text-[10px]">Personnel Record</p>
    </div>

    {/* Photo plate */}
    <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--enk-rule)]">
      {member.photo ? (
        <EnhancedImage
          src={member.photo}
          alt={`${member.name}, ${member.role}, Enikkom Construction Limited`}
          wrapperClassName="h-full w-full"
          className="h-full w-full object-top"
          tone="documentary"
          fallbackLabel={member.name}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: "var(--enk-record-inset)" }}>
          <span className="enk-mono text-4xl text-[var(--enk-blueprint)]">{member.name.charAt(0)}</span>
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
      <h3 className="text-[15px] font-semibold text-[var(--enk-ink)] md:text-[16px]">{member.name}</h3>
      <p className="mt-1 text-[13px] font-semibold text-[var(--enk-steel)]">
        {member.role}
      </p>
      <p className="mt-2.5 flex-1 text-[12.5px] leading-6 text-[var(--enk-steel)] line-clamp-3 md:line-clamp-4">{member.bio}</p>

      {member.expertise.length > 0 && (
        <div className="mb-3 mt-3 flex flex-wrap gap-1.5">
          {member.expertise.slice(0, 3).map((skill) => (
            <span key={skill} className="enk-chip">
              {skill}
            </span>
          ))}
        </div>
      )}

      <span className="mt-auto flex items-center justify-end gap-1.5 pt-3 text-[14px] font-bold text-[var(--enk-accent-on-dark)] transition-colors group-hover:text-[var(--enk-accent-primary-on-dark)]">
        View full bio →
      </span>
    </div>
  </button>
);

const TeamMemberModal = ({ 
  member, 
  open, 
  onClose,
  onNavigate,
  currentIndex,
  totalCount
}: { 
  member: TeamMember | null; 
  open: boolean; 
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  currentIndex: number;
  totalCount: number;
}) => {
  if (!member) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm p-1.5 hover:bg-background transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        {/* Navigation arrows */}
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
          aria-label="Previous team member"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
          aria-label="Next team member"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col md:flex-row overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col md:flex-row w-full"
            >
              {/* Photo - reduced width */}
              <div className="md:w-1/3 shrink-0">
                <div className="aspect-square md:aspect-auto md:h-full relative">
                  {member.photo ? (
                    <EnhancedImage
                      src={member.photo} 
                      alt={`${member.name}, ${member.role}, Enikkom Construction Limited`}
                      wrapperClassName="h-full w-full"
                      className="h-full w-full object-top"
                      tone="natural"
                      fallbackLabel={member.name}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-6xl text-muted-foreground">{member.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(0deg, oklch(0.13 0.03 255 / 0.3), transparent)" }} />
                </div>
              </div>
              
              {/* Content - more space */}
              <div className="p-6 md:p-8 flex-1">
                <DialogHeader className="text-left mb-4">
                  <DialogTitle className="text-xl md:text-2xl font-semibold mb-1">
                    {member.name}
                  </DialogTitle>
                  <p className="text-[13px] md:text-[14px] font-semibold text-primary">
                    {member.role}
                  </p>
                </DialogHeader>

                {/* Highlight */}
                {member.highlight && (
                  <div className="mb-5 rounded-sm border border-border bg-muted/40 p-3 md:p-4">
                    <p className="text-sm md:text-[15px] font-medium text-foreground">
                      {member.highlight}
                    </p>
                  </div>
                )}
                
                {/* Full bio */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Biography</h4>
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                
                {/* Expertise */}
                {member.expertise.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-[6px] bg-muted/40 px-2.5 py-0.5 text-[12px] font-medium text-foreground/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Navigation hints */}
                <div className="pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">←</kbd>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">→</kbd>
                    <span className="ml-1">to browse</span>
                  </span>
                  <span>{currentIndex + 1} of {totalCount}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function ManagementPage() {
  // Fetch from database
  const { members: dbMembers, isLoading } = useTeamMembers();
  const { content } = usePageContent('management');
  
  const heroContent = content.hero || {};
  const leadershipContent = content.leadership || {};
  const boardContent = content.board || {};
  
  // Use DB members if available, otherwise fallback to codebase defaults
  const dbManagement = dbMembers.filter(m => m.category === 'management').map(convertDBMember);
  const dbBoard = dbMembers.filter(m => m.category === 'board').map(convertDBMember);
  
  const leadership = dbManagement.length > 0 ? dbManagement : defaultLeadership;
  const boardOfDirectors = dbBoard.length > 0 ? dbBoard : defaultBoardOfDirectors;
  
  // Combined array for navigation
  const allTeamMembers = [...leadership, ...boardOfDirectors];
  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const currentIndexRef = useRef<number | null>(null);
  
  // Keep ref in sync with state
  useEffect(() => {
    currentIndexRef.current = selectedIndex;
  }, [selectedIndex]);
  
  // Navigation function
  const navigate = useCallback((direction: 'prev' | 'next') => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      if (direction === 'next') {
        return (prev + 1) % allTeamMembers.length;
      } else {
        return (prev - 1 + allTeamMembers.length) % allTeamMembers.length;
      }
    });
  }, [allTeamMembers.length]);
  
  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentIndexRef.current === null) return;
      
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate('next');
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate('prev');
      } else if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
  
  const selectedMember = selectedIndex !== null ? allTeamMembers[selectedIndex] : null;
  
  return (
    <Layout>
      <SEO
        title="Leadership & Management Team – Enikkom"
        description="Meet Enikkom's leadership and board: decades of pipeline, HDD, finance, and energy expertise led by founder Engr. Edward Amene."
        canonical="/about/leadership"
      />
      <Hero
        title={heroContent.title || "Management Team"}
        subtitle={heroContent.subtitle || "The team responsible for engineering and construction delivery across Nigeria and West Africa."}
        badge="Personnel Register"
        backgroundImage={heroContent.backgroundImage || managementImages.hero}
        size="default"
      />

      <section className="enk-section" style={{ borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="mb-10">
            <SectionHeading
              kicker="Leadership Team"
              title={
                <EditableText
                  value={leadershipContent.title || "Our Leadership"}
                  pageSlug="management"
                  sectionKey="leadership"
                  field="title"
                />
              }
              intro={
                <EditableText
                  value={leadershipContent.description || "Industry veterans in HDD, pipeline construction, marine works, and project management."}
                  pageSlug="management"
                  sectionKey="leadership"
                  field="description"
                  multiline
                />
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member, index) => (
              <TeamMemberCard 
                key={member.name} 
                member={member} 
                index={index} 
                onSelect={setSelectedIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="enk-section" style={{ backgroundColor: "var(--enk-bg-muted)", borderBottom: "1px solid var(--enk-rule)" }}>
        <div className="enk-container">
          <div className="mb-10">
            <SectionHeading
              kicker="Governance"
              title={
                <EditableText
                  value={boardContent.title || "Board of Directors"}
                  pageSlug="management"
                  sectionKey="board"
                  field="title"
                />
              }
              intro={
                <EditableText
                  value={boardContent.description || "Strategic guidance and governance for the group."}
                  pageSlug="management"
                  sectionKey="board"
                  field="description"
                  multiline
                />
              }
            />
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {boardOfDirectors.map((member, index) => (
              <TeamMemberCard 
                key={member.name} 
                member={member} 
                index={leadership.length + index} 
                onSelect={setSelectedIndex}
              />
            ))}
          </div>
        </div>
      </section>

      <TeamMemberModal 
        member={selectedMember}
        open={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        onNavigate={navigate}
        currentIndex={selectedIndex ?? 0}
        totalCount={allTeamMembers.length}
      />

      <CTABand
        headline="Put a project in front of this team"
        primaryCTA={{ label: "Discuss a project scope", href: "/contact" }}
        secondaryCTA={{ label: "View projects", href: "/projects" }}
      />
    </Layout>
  );
}
