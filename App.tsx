import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, BookOpen, ChevronRight, Clock3, Filter, Image as ImageIcon, MapPin, Search, X } from 'lucide-react';

type MuseumItem = {
  id: string;
  title: string;
  category: string;
  period: string;
  description: string;
  image: string;
  location: string;
  source: string;
};

const categories = ['VSE', 'ZGODOVINA', 'KOLPA', 'KRAJ', 'VOJNA', 'IZROČILO'];

const items: MuseumItem[] = [
  { id: 'sveti-vid', title: 'Cerkev sv. Vida', category: 'KRAJ', period: 'Danes / dediščina', description: 'Prepoznavna krajevna točka in izhodišče za raziskovanje Gribelj. Zapis je zasnovan kot muzejski vnos, ki ga bomo dopolnjevali z dokumenti, fotografijami in pričevanji.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Griblje%2C_%C4%8Crnomelj_-_cerkev_sv._Vida.jpg', location: 'Središče Gribelj', source: 'Wikimedia Commons' },
  { id: 'kolpa', title: 'Kolpa pri Gribljah', category: 'KOLPA', period: 'Naravna dediščina', description: 'Kolpa je eden ključnih elementov prostora Gribelj. Muzej jo predstavlja skozi naravo, vodo, vsakdanje življenje, delo, prosti čas in zgodovino prostora ob meji.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Kolpa_griblje.jpg', location: 'Kolpa', source: 'Wikimedia Commons' },
  { id: 'malenca', title: 'Malenca na Kolpi', category: 'KOLPA', period: 'Gospodarska dediščina', description: 'Zapis o življenju in delu ob Kolpi. Končni muzejski zapis bo povezan z dokumentiranimi podatki, fotografijami in lokalnimi pričevanji.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Slap_in_malenca_na_Kolpi_pri_Gribljah.jpg', location: 'Kolpa pri Gribljah', source: 'Wikimedia Commons' },
  { id: '1945-pilot', title: 'Pogovor angleškega pilota s partizani', category: 'VOJNA', period: 'Marec 1945', description: 'Zgodovinska fotografija, povezana z dogajanjem v Gribljah marca 1945. Fotografija je muzejski dokument; širši kontekst mora biti vezan na preverljive arhivske vire.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pogovor_angle%C5%A1kega_pilota_s_partizani%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg', location: 'Griblje, marec 1945', source: 'Wikimedia Commons' },
  { id: '1945-ranjenci', title: 'Ranjeni partizani in zavezniška letala', category: 'VOJNA', period: 'Marec 1945', description: 'Fotografski dokument o dogajanju v Gribljah med drugo svetovno vojno. Pri končni objavi bodo posamezne zgodovinske trditve povezane z viri.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Ranjeni_partizani_opazujejo_pristajanje_zavezni%C5%A1kih_letal%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg', location: 'Griblje, marec 1945', source: 'Wikimedia Commons' },
  { id: 'meja', title: 'Meja ob Gribljah', category: 'KRAJ', period: 'Sodobna zgodovina', description: 'Prostor ob Kolpi je skozi čas spreminjal svoj pomen. Muzej bo tukaj povezal sodobne fotografije, zemljevide, dokumente in pričevanja.', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Slovenian_border_fence_in_Griblje.JPG', location: 'Ob Kolpi', source: 'Wikimedia Commons' },
  { id: 'panorama', title: 'Griblje – panorama', category: 'KRAJ', period: 'Sodobnost', description: 'Pogled na vas kot muzejski predmet. Vsaka lokacija v vasi je lahko vstopna točka v zgodbo prostora.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Griblje%2C_%C4%8Crnomelj.jpg', location: 'Griblje', source: 'Wikimedia Commons' },
  { id: 'ribnik', title: 'Ribnik Griblje', category: 'KOLPA', period: 'Narava', description: 'Naravna in krajevna dediščina. Zbirka bo lahko vsebovala sezonske fotografije, podatke o naravi in spomine domačinov.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Pond_Griblje.jpg', location: 'Griblje', source: 'Wikimedia Commons' },
];

const timeline = [
  { year: 'ZGODNJA ZGODOVINA', title: 'Začetki kraja', text: 'Časovno os bomo gradili iz preverljivih zgodovinskih virov in jasno ločevali dokumentirano dejstvo od kasnejšega spomina ali pripovedi.' },
  { year: '15.–16. STOLETJE', title: 'Mejni prostor', text: 'Obdobja mejnega prostora in zgodovine Bele krajine bodo predstavljena z viri, zemljevidi in kontekstom.' },
  { year: 'MAREC 1945', title: 'Zavezniška letala', text: 'Griblje imajo ohranjene fotografske dokumente, povezane z dogodki marca 1945. To je ena osrednjih zgodovinskih zbirk projekta.' },
  { year: '1991 → DANES', title: 'Nova meja in sodobna vas', text: 'Sodobna zgodovina, življenje ob Kolpi, spremembe prostora in današnja identiteta Gribelj.' },
];

function SectionLabel({ children }: { children: string }) {
  return <p className="font-mono text-[#FF2A2A] uppercase tracking-[0.22em] text-xs md:text-sm mb-3">{children}</p>;
}

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], ['0%', '18%']);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('VSE');
  const [selected, setSelected] = useState<MuseumItem | null>(null);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatch = category === 'VSE' || item.category === category;
      const text = `${item.title} ${item.description} ${item.period} ${item.location}`.toLowerCase();
      return categoryMatch && (!q || text.includes(q));
    });
  }, [query, category]);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); };
  }, [selected]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] selection:bg-[#FF2A2A] selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-xl tracking-tight text-white">GRIBLJE<span className="text-[#FF2A2A]">.</span></a>
          <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase text-neutral-400">
            <a href="#zbirka" className="hover:text-white">Zbirka</a><a href="#zemljevid" className="hover:text-white">Zemljevid</a><a href="#cas" className="hover:text-white">Čas</a><a href="#o-muzeju" className="hover:text-white">O muzeju</a>
          </nav>
          <div className="font-mono text-[10px] uppercase text-neutral-500">Digitalni muzej vasi</div>
        </div>
      </header>

      <section id="top" className="relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110 opacity-50">
          <img src={items[1].image} alt="Kolpa pri Gribljah" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_78%)]" /><div className="absolute inset-0 bg-black/45" />
        </motion.div>
        <div className="relative z-10 text-center px-5 max-w-6xl">
          <SectionLabel>Digitalni muzej vasi / Bela krajina</SectionLabel>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="font-display text-[20vw] md:text-[15vw] leading-[.78] tracking-[-.07em] text-white">GRIBLJE</motion.h1>
          <p className="mt-10 max-w-2xl mx-auto text-lg md:text-2xl leading-relaxed text-neutral-300">Vas kot muzej. Kraj kot zbirka. Ljudje, hiše, Kolpa, predmeti, spomini in zgodovina na enem mestu.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2 font-mono text-[11px] uppercase"><span className="border border-[#FF2A2A] px-3 py-2">Živa vas</span><span className="border border-white/25 px-3 py-2">Digitalna zbirka</span><span className="border border-white/25 px-3 py-2">Odprta zbirka</span></div>
        </div>
        <a href="#zbirka" className="absolute bottom-8 z-10 text-[#FF2A2A]" aria-label="Nadaljuj na zbirko"><motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ArrowDown size={38} /></motion.div></a>
      </section>

      <div className="bg-[#FF2A2A] text-black font-display text-2xl md:text-4xl py-4 overflow-hidden border-y-4 border-white"><div className="marquee-track"><span className="mx-4">LJUDJE • HIŠE • ZGODBE • KOLPA • PREDMETI • SPOMINI • ZGODOVINA • GRIBLJE •</span><span className="mx-4">LJUDJE • HIŠE • ZGODBE • KOLPA • PREDMETI • SPOMINI • ZGODOVINA • GRIBLJE •</span></div></div>

      <main className="max-w-7xl mx-auto px-5 py-24">
        <section id="o-muzeju" className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 mb-28 items-end">
          <div><SectionLabel>00 / Ideja</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-[.9]">Ne spletna stran o vasi.<br /><span className="text-[#FF2A2A]">Muzej vasi.</span></h2></div>
          <div className="text-neutral-400 text-lg leading-relaxed border-l border-neutral-800 pl-6"><p>Model temelji na logiki najboljših živih muzejev: prostor ni samo ozadje, ampak je del zbirke. Beamish danes zgodovino predstavlja skozi kraje, vsakdanje življenje, zgodbe in aktivno sodelovanje obiskovalcev. cite_placeholder</p><p className="mt-5">Griblje lahko naredijo svojo različico: <strong className="text-white">resnična vas kot digitalni muzej</strong>, kjer je vsaka lokacija lahko eksponat.</p></div>
        </section>

        <section id="zbirka" className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mb-10"><div><SectionLabel>01 / Zbirka</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Raziskuj Griblje</h2></div><div className="font-mono text-xs text-neutral-500 flex items-center gap-2"><BookOpen size={16} /> {filteredItems.length} / {items.length} ZAPISOV</div></div>
          <div className="bg-[#0a0a0a] border border-neutral-800 p-4 md:p-5 mb-8 sticky top-16 z-20"><div className="relative mb-4"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={19} /><input aria-label="Iskanje po muzejski zbirki" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Išči: Kolpa, cerkev, 1945 ..." className="w-full bg-black border border-neutral-700 px-12 py-4 text-white outline-none focus:border-[#FF2A2A] font-mono text-sm" /></div><div className="flex flex-wrap gap-2 items-center"><Filter size={15} className="text-neutral-600 mr-1" />{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`px-3 py-2 border font-mono text-[10px] uppercase transition ${category === item ? 'bg-[#FF2A2A] text-black border-[#FF2A2A]' : 'border-neutral-700 text-neutral-400 hover:border-white hover:text-white'}`}>{item}</button>)}</div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredItems.map((item, index) => <motion.article layout key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(item)} onClick={() => setSelected(item)} className="group border border-neutral-800 bg-[#090909] hover:border-[#FF2A2A] focus:border-[#FF2A2A] outline-none cursor-pointer transition-colors"><div className="aspect-[4/3] overflow-hidden relative bg-neutral-900"><img src={item.image} alt={item.title} loading={index > 2 ? 'lazy' : 'eager'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" /><span className="absolute top-3 left-3 bg-black/90 text-[#FF2A2A] px-2 py-1 font-mono text-[10px]">{item.category}</span></div><div className="p-5"><div className="font-mono text-[10px] text-neutral-600 mb-2">{item.period}</div><h3 className="font-display text-3xl text-white uppercase leading-none mb-3">{item.title}</h3><p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">{item.description}</p><div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between text-[#FF2A2A] font-mono text-[10px] uppercase"><span><MapPin size={13} className="inline mr-1" />{item.location}</span><ChevronRight size={17} /></div></div></motion.article>)}</div>
          {filteredItems.length === 0 && <div className="border border-dashed border-neutral-700 p-12 text-center text-neutral-500 font-mono text-sm">Ni zadetkov. Poskusi drugo iskanje.</div>}
        </section>

        <section id="zemljevid" className="mb-28">
          <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-10"><div><SectionLabel>02 / Zemljevid</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-[.9]">Vas je<br /><span className="text-[#FF2A2A]">eksponat.</span></h2><p className="mt-6 text-neutral-400 leading-relaxed max-w-md">Naslednja velika plast muzeja je zemljevid resničnega prostora. Vsaka točka bo lahko odprla fotografijo, zgodbo, hišo, predmet ali dokument.</p><div className="mt-7 font-mono text-[10px] text-neutral-600 uppercase">Zemljevid lokacij / v pripravi</div></div><div className="relative min-h-[430px] overflow-hidden border border-neutral-800 bg-[#090909]"><div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]" /><svg viewBox="0 0 800 430" className="absolute inset-0 w-full h-full"><path d="M80 20 C180 110 120 170 260 220 S520 230 720 410" fill="none" stroke="#FF2A2A" strokeWidth="5" strokeDasharray="10 9" opacity=".8" /><path d="M100 390 C220 320 330 360 430 280 S610 150 760 70" fill="none" stroke="#555" strokeWidth="2" /><path d="M40 150 L760 260" fill="none" stroke="#333" strokeWidth="1" /></svg>{items.slice(0, 6).map((item, i) => { const points = [[29,55],[52,62],[67,35],[43,37],[75,69],[24,30]]; const [x,y] = points[i]; return <button key={item.id} onClick={() => setSelected(item)} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${x}%`, top: `${y}%` }} aria-label={`Odpri ${item.title}`}><span className="block w-4 h-4 rounded-full bg-[#FF2A2A] border-2 border-white shadow-[0_0_0_7px_rgba(255,42,42,.12)] group-hover:scale-125 transition-transform" /><span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/90 border border-neutral-700 px-2 py-1 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</span></button>; })}<div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase text-neutral-500"><span>Kolpa</span><span>Digitalni muzejski zemljevid</span><span>Griblje</span></div></div></div>
        </section>

        <section id="cas" className="mb-28"><div className="mb-10"><SectionLabel>03 / Čas</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Griblje skozi čas</h2></div><div className="border-t border-neutral-800">{timeline.map((item) => <div key={item.year} className="grid md:grid-cols-[230px_1fr] gap-6 border-b border-neutral-800 py-9"><div className="font-display text-xl text-[#FF2A2A]">{item.year}</div><div><h3 className="font-display text-3xl text-white uppercase mb-2">{item.title}</h3><p className="text-neutral-400 leading-relaxed max-w-3xl">{item.text}</p></div></div>)}</div></section>

        <section className="border-y border-neutral-800 py-20 mb-20 grid md:grid-cols-[1fr_auto] gap-10 items-center"><div><SectionLabel>04 / Naslednji korak</SectionLabel><h2 className="font-display text-5xl md:text-6xl text-white uppercase leading-none">Spomini naj postanejo<br /><span className="text-[#FF2A2A]">del zbirke.</span></h2><p className="mt-5 max-w-2xl text-neutral-400 leading-relaxed">Predviden je prihodnji prispevni modul za fotografije, predmete in pričevanja domačinov. Vsak prispevek bo moral imeti jasen izvor in status preverjanja.</p></div><div className="border border-neutral-700 px-6 py-5 font-mono text-xs uppercase text-neutral-400">Prispevki / v pripravi</div></section>
      </main>

      <footer className="border-t border-neutral-800"><div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row justify-between gap-5 font-mono text-[10px] uppercase text-neutral-600"><span>Griblje / Digitalni muzej vasi</span><span>Živa vas · odprta zbirka · Bela krajina</span></div></footer>

      <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 md:p-8 flex items-center justify-center" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}><motion.div initial={{ opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} className="relative w-full max-w-5xl max-h-[92vh] overflow-auto bg-[#090909] border border-neutral-700 shadow-2xl"><button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 border border-neutral-700 text-white flex items-center justify-center hover:border-[#FF2A2A]" aria-label="Zapri"><X size={20} /></button><div className="grid lg:grid-cols-[1.1fr_.9fr]"><div className="bg-black min-h-[300px]"><img src={selected.image} alt={selected.title} className="w-full h-full object-cover max-h-[620px]" referrerPolicy="no-referrer" /></div><div className="p-7 md:p-10"><div className="font-mono text-[10px] text-[#FF2A2A] uppercase mb-3">{selected.category} / muzejski zapis</div><h2 className="font-display text-4xl md:text-6xl text-white uppercase leading-[.9] mb-7">{selected.title}</h2><div className="space-y-4 text-sm"><div className="flex gap-3 border-t border-neutral-800 pt-4"><Clock3 size={16} className="text-[#FF2A2A] shrink-0" /><span className="text-neutral-300">{selected.period}</span></div><div className="flex gap-3 border-t border-neutral-800 pt-4"><MapPin size={16} className="text-[#FF2A2A] shrink-0" /><span className="text-neutral-300">{selected.location}</span></div><div className="flex gap-3 border-t border-neutral-800 pt-4"><ImageIcon size={16} className="text-[#FF2A2A] shrink-0" /><span className="text-neutral-300">Vir: {selected.source}</span></div></div><p className="mt-8 text-neutral-400 leading-relaxed">{selected.description}</p><div className="mt-8 border border-neutral-800 p-4 font-mono text-[10px] uppercase text-neutral-600">Muzejski status: osnovni zapis · nadaljnja dokumentacija v pripravi</div></div></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}

export default App;
