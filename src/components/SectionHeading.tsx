import type { ReactNode } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type SectionHeadingProps = { eyebrow: string; title: ReactNode; arrows?: boolean };

export function SectionHeading({ eyebrow, title, arrows = false }: SectionHeadingProps) {
  return <div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-3">{title}</h2></div>{arrows ? <div className="hidden gap-2 md:flex"><button className="round-nav" aria-label="Previous products"><ChevronLeft size={18} /></button><button className="round-nav" aria-label="Next products"><ChevronRight size={18} /></button></div> : <Link className="hidden link-arrow sm:flex" to="/shop">Shop all <ArrowRight size={15} /></Link>}</div>;
}
