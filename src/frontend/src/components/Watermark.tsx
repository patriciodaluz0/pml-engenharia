import { cn } from "@/lib/utils";

interface WatermarkProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}

const WATERMARK_TEXT = "Patrício M. da Luz - Engenharia Eletrônica";

export function Watermark({
  src,
  alt,
  className,
  imgClassName,
  loading,
}: WatermarkProps) {
  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      data-ocid="watermark"
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn("size-full object-cover", imgClassName)}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rotate-[-30deg] whitespace-nowrap border border-foreground/15 bg-background/40 px-6 py-2 font-mono text-xs font-medium uppercase tracking-[0.25em] text-foreground/40 backdrop-blur-[1px]">
            {WATERMARK_TEXT}
          </span>
        </div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_28px,rgba(0,0,0,0.03)_28px,rgba(0,0,0,0.03)_56px)]" />
      </div>
    </div>
  );
}
