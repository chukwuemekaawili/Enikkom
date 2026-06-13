import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { ImageIcon } from "lucide-react";
import { getAssetUrl } from "@/lib/assetMap";
import { getResponsiveImageInfo } from "@/lib/responsiveImages";
import { cn } from "@/lib/utils";

type ImageTone = "natural" | "vivid" | "soft" | "logo" | "cinematic";
type ImageFit = "cover" | "contain";

interface EnhancedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "className"> {
  wrapperClassName?: string;
  className?: string;
  tone?: ImageTone;
  fit?: ImageFit;
  hoverZoom?: boolean;
  priority?: boolean;
  fallbackLabel?: string;
  shimmer?: boolean;
}

const toneClasses: Record<ImageTone, string> = {
  natural: "contrast-[1.02] saturate-[1.04]",
  vivid: "contrast-[1.05] saturate-[1.1] brightness-[1.01]",
  soft: "contrast-[1.01] saturate-[0.98] brightness-[1.02]",
  logo: "",
  cinematic: "brightness-[1.06] contrast-[1.08] saturate-[1.06] sepia-[0.02]",
};

export function EnhancedImage({
  src,
  alt,
  wrapperClassName,
  className,
  tone = "natural",
  fit = "cover",
  hoverZoom = false,
  priority = false,
  fallbackLabel = "Image unavailable",
  shimmer = true,
  loading,
  fetchPriority,
  decoding,
  sizes,
  width,
  height,
  onLoad,
  onError,
  ...props
}: EnhancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = typeof src === "string" ? getAssetUrl(src) : src;
  const responsiveImageInfo =
    typeof resolvedSrc === "string" ? getResponsiveImageInfo(resolvedSrc) : undefined;
  const imageAlt = alt ?? "";
  const imageAriaHidden = imageAlt === "" ? true : props["aria-hidden"];
  const webpSrcSet = responsiveImageInfo?.webpVariants
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [resolvedSrc]);

  const showFallback = !resolvedSrc || hasError;

  return (
    <div className={cn("relative overflow-hidden bg-muted", wrapperClassName)}>
      {!showFallback && shimmer && !isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(110deg,hsl(var(--muted))_8%,rgba(255,255,255,0.9)_18%,hsl(var(--muted))_33%)] bg-[length:200%_100%] animate-[imageShimmer_1.8s_linear_infinite]"
        />
      )}

      {showFallback ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/80 px-4 text-center text-muted-foreground">
          <ImageIcon className="h-5 w-5" />
          <span className="text-xs font-medium">{fallbackLabel}</span>
        </div>
      ) : (
        <picture>
          {webpSrcSet ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}
          <img
            {...props}
            src={resolvedSrc}
            alt={imageAlt}
            aria-hidden={imageAriaHidden}
            width={width ?? responsiveImageInfo?.width}
            height={height ?? responsiveImageInfo?.height}
            sizes={sizes}
            loading={priority ? "eager" : loading ?? "lazy"}
            fetchPriority={priority ? "high" : fetchPriority ?? "auto"}
            decoding={decoding ?? "async"}
            onLoad={(event) => {
              setIsLoaded(true);
              onLoad?.(event);
            }}
            onError={(event) => {
              setHasError(true);
              setIsLoaded(true);
              onError?.(event);
            }}
            className={cn(
              "h-full w-full select-none transition-[opacity,transform,filter] duration-700 ease-out will-change-transform",
              fit === "contain" ? "object-contain" : "object-cover",
              toneClasses[tone],
              !isLoaded && "scale-[1.04] opacity-0 blur-sm",
              isLoaded && "scale-100 opacity-100 blur-0",
              hoverZoom && "group-hover:scale-105",
              className
            )}
          />
        </picture>
      )}
    </div>
  );
}
