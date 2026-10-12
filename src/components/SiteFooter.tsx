import { ArrowRight, Camera } from "lucide-react";
import { Link } from "react-router-dom";

type FooterColumnProps = { title: string; links: string[] };

function FooterColumn({ title, links }: FooterColumnProps) {
  return <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">{title}</p><ul className="mt-4 space-y-3 text-sm">{links.map((link) => <li key={link}><a className="transition hover:text-white" href="#footer">{link}</a></li>)}</ul></div>;
}

export function SiteFooter() {
  return <footer className="bg-[#1e1c1a] px-5 pb-7 pt-14 text-stone-300 lg:px-10 lg:pt-16"><div className="mx-auto grid max-w-[1440px] gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]"><div><Link className="font-serif text-[28px] font-semibold tracking-[-0.07em] text-white" to="/">VÉSTI<span className="text-[#d79a74]">.</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">Thoughtful pieces for a life beautifully lived.</p></div><FooterColumn title="Shop" links={["New arrivals", "Clothing", "Accessories", "Gift cards"]} /><FooterColumn title="About" links={["Our story", "Journal", "Care guide", "Stockists"]} /><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">A note from us</p><p className="mt-4 text-sm leading-6">Occasional letters, first looks, and quiet inspiration.</p><div className="mt-4 flex border-b border-stone-600"><input className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-stone-500" placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight size={17} /></button></div></div></div><div className="mx-auto mt-14 flex max-w-[1440px] flex-col justify-between gap-4 border-t border-stone-700 pt-6 text-[10px] uppercase tracking-[0.12em] text-stone-500 sm:flex-row"><span>© 2025 VÉSTI studio</span><div className="flex gap-5"><a href="#instagram" className="flex items-center gap-1"><Camera size={13} /> Instagram</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div></footer>;
}
