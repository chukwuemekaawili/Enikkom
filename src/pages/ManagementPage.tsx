import { useState, useEffect, useRef, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Hero, CTABand } from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTeamMembers, usePageContent } from "@/hooks/useSiteSettings";
import { EditableText } from "@/components/admin";

// Import hero image
import heroHddRig from "@/assets/projects/hdd-night-panorama.jpg";

// Import real team headshots from enikkom.com (fallback)
import photoEdwardAmene from "@/assets/team/edward-amene.png";
import photoSaleemKhan from "@/assets/team/saleem-khan.png";
import photoFrancisAnatogu from "@/assets/team/francis-anatogu.png";
import photoAdekunleAdewole from "@/assets/team/adekunle-adewole.png";
import photoChibuikeNwachukwu from "@/assets/team/chibuike-nwachukwu.png";
import photoTeddyAllen from "@/assets/team/teddy-allen.png";
import photoIdigborEmeka from "@/assets/team/idigbor-emeka.png";
import photoBiodunAdefila from "@/assets/team/biodun-adefila.jpg";
import photoKenJames from "@/assets/team/ken-james.png";

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
    bio: "A Mechanical Engineering graduate from the University of Nigeria, Nsukka, with over 37 years of experience in pipeline construction and infrastructure development. Spent 14 years as a Project Engineer with Shell Petroleum Development Company before founding Enikkom Group in 1995. Pioneered Horizontal Directional Drilling (HDD) technology in Nigeria with the historic River Niger crossing in 2003.",
    expertise: ["Pipeline Construction", "HDD Technology", "Strategic Leadership"],
    photo: photoEdwardAmene,
    highlight: "Pioneer of HDD technology in Nigeria — River Niger crossing, 2003",
    category: "management",
  },
  {
    name: "Engr. Saleem Ahmad Khan",
    role: "Chief Technical Officer",
    bio: "A highly accomplished mechanical engineer from Pakistan with over 30 years of experience in pipeline construction, HDD, and heavy equipment operations. Has successfully led complex HDD crossings and pipeline projects for NNPC, Chevron, BP, Eni, and SSGC across Nigeria and Pakistan. Expertise spans the full spectrum of trenchless technology and pipeline engineering.",
    expertise: ["HDD Operations", "Pipeline Engineering", "Heavy Equipment"],
    photo: photoSaleemKhan,
    highlight: "30+ years mastering trenchless technology across continents",
    category: "management",
  },
  {
    name: "Mr. Francis Anatogu",
    role: "Chief Growth & Transformation Officer",
    bio: "A seasoned business executive with 30 years of experience in oil & gas, infrastructure, and management consulting. Previously held leadership roles at Shell, Accenture, and Deloitte. Served as Executive Secretary of Nigeria's National Action Committee on AfCFTA. Holds an MBA from Cambridge University, driving Enikkom's business transformation and growth initiatives.",
    expertise: ["Business Transformation", "Strategy Consulting", "Change Management"],
    photo: photoFrancisAnatogu,
    highlight: "Cambridge MBA driving Enikkom's strategic transformation",
    category: "management",
  },
  {
    name: "Adekunle Adewole, PhD",
    role: "Chief Operations & Strategy Officer",
    bio: "Over 30 years of multi-sector experience, including serving as CEO of Livingtrust Mortgage Bank Plc. Holds a PhD in Strategic Management and a leadership diploma from Oxford University. Brings world-class operational excellence and strategic planning expertise to Enikkom's management team.",
    expertise: ["Operations Excellence", "Strategic Management", "Executive Leadership"],
    photo: photoAdekunleAdewole,
    highlight: "Oxford-trained leader with PhD in Strategic Management",
    category: "management",
  },
  {
    name: "Mr. Chibuike Nwachukwu",
    role: "Executive Director",
    bio: "Over 23 years of experience in organizational management and project execution, including 15 years as Managing Director of Enikkom Group. Deep expertise in project delivery, team leadership, business development, and stakeholder management across Nigeria's oil & gas and infrastructure sectors.",
    expertise: ["Project Execution", "Organizational Management", "Business Development"],
    photo: photoChibuikeNwachukwu,
    highlight: "15 years as MD — the operational backbone of Enikkom",
    category: "management",
  },
  {
    name: "Teddy Allen",
    role: "General Manager, Drilling",
    bio: "An American drilling specialist with over 38 years of global experience in directional drilling and trenchless technology. Has worked across North America, Africa, and the Middle East, leading complex HDD operations for major oil & gas projects. Oversees Enikkom's drilling operations with a focus on technical excellence and safety.",
    expertise: ["Directional Drilling", "Trenchless Technology", "International Operations"],
    photo: photoTeddyAllen,
    highlight: "38 years of global drilling expertise across 3 continents",
    category: "management",
  },
  {
    name: "Idigbor Emeka, FCA",
    role: "Chief Accountant",
    bio: "A Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) with over 20 years of experience in financial strategy, control, and corporate governance. Previously with UAC Restaurants Limited, bringing rigorous financial management, audit expertise, and governance standards to Enikkom.",
    expertise: ["Financial Strategy", "Corporate Governance", "Audit & Compliance"],
    photo: photoIdigborEmeka,
    highlight: "FCA-certified excellence in financial governance",
    category: "management",
  },
];

const defaultBoardOfDirectors: TeamMember[] = [
  {
    name: "Biodun Adefila",
    role: "Chairman, Board of Directors",
    bio: "Currently Managing Director of Spice360, a leading brand consultancy. Formerly Chief Operating Officer at SO&U Limited, one of Nigeria's foremost advertising agencies. Over 20 years of experience in brand management, marketing strategy, and corporate governance, bringing invaluable strategic insight to Enikkom's growth.",
    expertise: ["Brand Management", "Corporate Governance", "Marketing Strategy"],
    photo: photoBiodunAdefila,
    highlight: "Driving strategic brand vision and governance excellence",
    category: "board",
  },
  {
    name: "Ken James",
    role: "Non-Executive Director",
    bio: "Over 40 years of distinguished experience in oil and gas, marine services, and infrastructure development across West Africa. Provides strategic oversight and deep industry expertise to guide Enikkom's expansion in the energy and marine construction sectors.",
    expertise: ["Oil & Gas", "Marine Services", "Infrastructure Development"],
    photo: photoKenJames,
    highlight: "40+ years shaping West Africa's energy infrastructure",
    category: "board",
  },
];

// Helper to convert DB team member to display format
const convertDBMember = (dbMember: any): TeamMember => ({
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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
    onClick={() => onSelect(index)}
    className="bg-card rounded-[14px] border overflow-hidden group hover-lift cursor-pointer"
  >
    {/* Photo with hover highlight overlay */}
    <div className="aspect-[4/3] relative overflow-hidden">
      {member.photo ? (
        <img 
          src={member.photo} 
          alt={`${member.name} — ${member.role}, Enikkom Construction Limited`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-4xl text-muted-foreground">{member.name.charAt(0)}</span>
        </div>
      )}
      {/* Default gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
      {/* Hover highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 md:p-5">
        <p className="text-white text-center text-sm md:text-base font-medium leading-snug drop-shadow-lg">
          "{member.highlight || 'Industry leader at Enikkom'}"
        </p>
      </div>
    </div>
    
    <div className="p-4 md:p-5">
      <h3 className="font-semibold text-[15px] md:text-lg mb-1">{member.name}</h3>
      <p className="text-primary font-medium text-[12px] md:text-[13px] mb-2 md:mb-3">{member.role}</p>
      <p className="text-[12px] md:text-[13px] text-muted-foreground mb-3 md:mb-4 leading-relaxed line-clamp-3 md:line-clamp-4">{member.bio}</p>
      
      {member.expertise.length > 0 && (
        <div className="flex flex-wrap gap-1 md:gap-1.5">
          {member.expertise.slice(0, 3).map((skill) => (
            <span 
              key={skill} 
              className="px-1.5 md:px-2 py-0.5 md:py-1 bg-muted text-[10px] md:text-[11px] font-medium rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-primary text-[11px] md:text-xs font-medium mt-3 md:mt-4 group-hover:underline">
        View full bio →
      </p>
    </div>
  </motion.div>
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
                    <img 
                      src={member.photo} 
                      alt={`${member.name} — ${member.role}, Enikkom Construction Limited`}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-6xl text-muted-foreground">{member.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r pointer-events-none" />
                </div>
              </div>
              
              {/* Content - more space */}
              <div className="p-6 md:p-8 flex-1">
                <DialogHeader className="text-left mb-4">
                  <DialogTitle className="text-xl md:text-2xl font-semibold mb-1">
                    {member.name}
                  </DialogTitle>
                  <p className="text-primary font-medium text-sm md:text-base">
                    {member.role}
                  </p>
                </DialogHeader>
                
                {/* Highlight quote */}
                {member.highlight && (
                  <div className="bg-primary/5 border-l-4 border-primary p-3 md:p-4 rounded-r-lg mb-5">
                    <p className="text-sm md:text-base font-medium text-foreground italic">
                      "{member.highlight}"
                    </p>
                  </div>
                )}
                
                {/* Full bio */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Biography</h4>
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                    {member.bio || 'Biography coming soon.'}
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
                          className="px-3 py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-medium rounded-full"
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
      <Hero
        title={heroContent.title || "Management Team"}
        subtitle={heroContent.subtitle || "Experienced leaders driving excellence in engineering and construction across Nigeria and West Africa."}
        backgroundImage={heroContent.backgroundImage || heroHddRig}
        size="default"
        pageSlug="management"
        sectionKey="hero"
        imageField="backgroundImage"
      />

      <section className="section-padding">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4">
              <EditableText
                value={leadershipContent.title || "Our Leadership"}
                pageSlug="management"
                sectionKey="leadership"
                field="title"
              />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-[14px] md:text-[15px]">
              <EditableText
                value={leadershipContent.description || "A team of industry veterans with deep expertise in HDD, pipeline construction, marine works, and project management, committed to delivering excellence on every project."}
                pageSlug="management"
                sectionKey="leadership"
                field="description"
                multiline
              />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4">
              <EditableText
                value={boardContent.title || "Board of Directors"}
                pageSlug="management"
                sectionKey="board"
                field="title"
              />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-[14px] md:text-[15px]">
              <EditableText
                value={boardContent.description || "Providing strategic guidance and governance to ensure Enikkom's continued growth and excellence."}
                pageSlug="management"
                sectionKey="board"
                field="description"
                multiline
              />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
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
        headline="Ready to Discuss Your Project?"
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
