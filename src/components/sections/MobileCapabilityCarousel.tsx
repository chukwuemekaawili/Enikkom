import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CapabilityCard } from "./CapabilityCard";
import { LucideIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Capability {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
  metric?: string;
}

interface MobileCapabilityCarouselProps {
  capabilities: Capability[];
}

export function MobileCapabilityCarousel({ capabilities }: MobileCapabilityCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <div className="md:hidden -mx-4 px-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {capabilities.map((cap, index) => (
            <CarouselItem key={cap.title} className="pl-3 basis-[85%]">
              <CapabilityCard
                {...cap}
                index={index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Interactive pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {capabilities.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              current === index 
                ? "bg-primary w-4" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
