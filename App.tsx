import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, BookOpen, CheckCircle2, ChevronRight, Clock3, Filter, Image as ImageIcon, MapPin, Search, X } from 'lucide-react';
import { collectionLayers, museumRecords, timeline, type MuseumRecord } from './src/data/museum';
import { catalogEntries, catalogTotal } from './src/data/catalog';
import { mapLayers, villageMapPoints, type MapLayer } from './src/data/map';
import { VillageMap } from './src/components/VillageMap';

const categories = ['VSE', 'KRAJ', 'KOLPA', 'VOJNA', 'LJUDJE', 'HIŠE', 'PREDMETI', 'SPOMINI'];

function SectionLabel({ children }: { children: string }) {
  return <p className="font-mono text-[#FF2A2A] uppercase tracking-[0.22em] text-xs md:text-sm mb-3">{children}</p>;
}

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], ['0%', '18%']);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('VSE');
  const [mapLayer, setMapLayer] = useState<MapLayer>('KRAJI');
  const [selected, setSelected] = useState<MuseumRecord | null>(null);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return museumRecords.filter((item) => {
      const categoryMatch = category === 'VSE' || item.category === category;
      const text = `${item.title} ${item.description} ${item.period} ${item.location}`.toLowerCase();
      return categoryMatch && (!q || text.includes(q));
    });
  }, [query, category]);

  const visibleMapPoints = useMemo(() => villageMapPoints.filter((point) => point.layer === mapLayer), [mapLayer]);
  const recordById = (id: string) => museumRecords.find((item) => item.id === id);

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
            <a href="#zbirka" className="hover:text-white">Zbirka</a><a href="#katalog" className="hover:text-white">Katalog</a><a href="#zemljevid" className="hover:text-white">Zemljevid</a><a href="#cas" className="hover:text-white">Čas</a><a href="#o-muzeju" className="hover:text-white">O muzeju</a>
          </nav>
          <div className="font-mono text-[10px] uppercase text-neutral-500">Digitalni muzej vasi</div>
        </div>
      </header>

      <section id="top" className="relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110 opacity-50">
          <img src={museumRecords[1].image} alt="Kolpa pri Gribljah" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
          <div className="text-neutral-400 text-lg leading-relaxed border-l border-neutral-800 pl-6"><p>Model sledi logiki živih muzejev: prostor ni samo ozadje, ampak del zbirke. Beamish zgodovino predstavlja skozi zgodovinska območja, vsakdanje življenje, zgodbe, demonstracije in aktivno raziskovanje obiskovalcev.</p><p className="mt-5">Griblje lahko naredijo svojo različico: <strong className="text-white">resnična vas kot digitalni muzej</strong>, kjer je vsaka lokacija lahko vstopna točka v zgodbo.</p></div>
        </section>

        <section id="zbirka" className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mb-10"><div><SectionLabel>01 / Zbirka</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Raziskuj Griblje</h2></div><div className="font-mono text-xs text-neutral-500 flex items-center gap-2"><BookOpen size={16} /> {filteredItems.length} / {museumRecords.length} ZAPISOV</div></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">{collectionLayers.map((layer) => <button key={layer.id} onClick={() => setCategory(layer.status === 'aktivno' ? layer.label.toUpperCase().replace('KRAJI', 'KRAJ') : 'VSE')} className="border border-neutral-800 bg-[#090909] p-4 text-left hover:border-[#FF2A2A] transition-colors"><div className="font-mono text-[9px] uppercase text-neutral-500 mb-2">{layer.status}</div><div className="font-display text-lg text-white uppercase">{layer.label}</div><div className="mt-2 text-[11px] leading-relaxed text-neutral-500">{layer.description}</div></button>)}</div>
          <div className="bg-[#0a0a0a] border border-neutral-800 p-4 md:p-5 mb-8 sticky top-16 z-20"><div className="relative mb-4"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={19} /><input aria-label="Iskanje po muzejski zbirki" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Išči: Kolpa, cerkev, 1945 ..." className="w-full bg-black border border-neutral-700 px-12 py-4 text-white outline-none focus:border-[#FF2A2A] font-mono text-sm" /></div><div className="flex flex-wrap gap-2 items-center"><Filter size={15} className="text-neutral-600 mr-1" />{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`px-3 py-2 border font-mono text-[10px] uppercase transition ${category === item ? 'bg-[#FF2A2A] text-black border-[#FF2A2A]' : 'border-neutral-700 text-neutral-400 hover:border-white hover:text-white'}`}>{item}</button>)}</div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredItems.map((item, index) => <motion.article layout key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(item)} onClick={() => setSelected(item)} className="group border border-neutral-800 bg-[#090909] hover:border-[#FF2A2A] focus:border-[#FF2A2A] outline-none cursor-pointer transition-colors"><div className="aspect-[4/3] overflow-hidden relative bg-neutral-900"><img src={item.image} alt={item.title} loading={index > 2 ? 'lazy' : 'eager'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" /><span className="absolute top-3 left-3 bg-black/90 text-[#FF2A2A] px-2 py-1 font-mono text-[10px]">{item.category}</span></div><div className="p-5"><div className="font-mono text-[10px] text-neutral-600 mb-2">{item.period}</div><h3 className="font-display text-3xl text-white uppercase leading-none mb-3">{item.title}</h3><p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">{item.description}</p><div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between text-[#FF2A2A] font-mono text-[10px] uppercase"><span><MapPin size={13} className="inline mr-1" />{item.location}</span><ChevronRight size={17} /></div></div></motion.article>)}</div>
          {filteredItems.length === 0 && <div className="border border-dashed border-neutral-700 p-12 text-center text-neutral-500 font-mono text-sm">Ni zadetkov. Poskusi drugo iskanje.</div>}
        </section>

        <section id="katalog" className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mb-10">
            <div><SectionLabel>01A / Katalog</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Stanje zbirke</h2></div>
            <div className="font-mono text-xs text-neutral-500">{catalogTotal} ZAPISOV / {catalogEntries.length} SKLOPOV</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {catalogEntries.map((entry) => (
              <div key={entry.kind} className={`border p-5 text-left transition ${entry.status === 'aktivno' ? 'border-neutral-700 bg-[#090909] hover:border-[#FF2A2A]' : 'border-neutral-800 bg-[#070707]'}`}>
                <div className="font-mono text-[10px] uppercase text-neutral-500">{entry.status}</div>
                <div className="font-display text-4xl text-white mt-3">{entry.count}</div>
                <div className="font-display text-lg uppercase text-white">{entry.label}</div>
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">{entry.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="zemljevid" className="mb-28"><div className="grid lg:grid-cols-[.7fr_1.3fr] gap-10"><div><SectionLabel>02 / Zemljevid</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-[.9]">Vas je<br /><span className="text-[#FF2A2A]">eksponat.</span></h2><p className="mt-6 text-neutral-400 leading-relaxed max-w-md">Zemljevid zdaj uporablja preverjene koordinate. Sloji bodo povezovali kraje z ljudmi, hišami, predmeti, zgodbami in dogodki. Nepreverjenih lokacij ne prikazujemo kot dejanskih koordinat.</p><div className="mt-7 grid grid-cols-2 gap-2">{mapLayers.map((layer) => { const count = villageMapPoints.filter((point) => point.layer === layer.id).length; return <button key={layer.id} onClick={() => setMapLayer(layer.id)} className={`border px-3 py-3 text-left transition ${mapLayer === layer.id ? 'border-[#FF2A2A] bg-[#FF2A2A] text-black' : 'border-neutral-800 bg-[#090909] text-neutral-400 hover:border-white'}`}><div className="font-mono text-[10px] uppercase">{layer.label}</div><div className="font-mono text-[9px] mt-1 opacity-70">{count ? `${count} točk` : 'v pripravi'}</div></button>; })}</div></div><div className="overflow-hidden border border-neutral-800 bg-[#090909]"><VillageMap points={visibleMapPoints} layer={mapLayer} records={museumRecords} onSelect={setSelected} /></div></div></section>

        <section id="cas" className="mb-28"><div className="mb-10"><SectionLabel>03 / Čas</SectionLabel><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Griblje skozi čas</h2></div><div className="border-t border-neutral-800">{timeline.map((item) => <div key={item.year} className="grid md:grid-cols-[230px_1fr] gap-6 border-b border-neutral-800 py-9"><div className="font-display text-xl text-[#FF2A2A]">{item.year}</div><div><h3 className="font-display text-3xl text-white uppercase mb-2">{item.title}</h3><p className="text-neutral-400 leading-relaxed max-w-3xl">{item.text}</p></div></div>)}</div></section>

        <section className="border-y border-neutral-800 py-20 mb-20 grid md:grid-cols-[1fr_auto] gap-10 items-center"><div><SectionLabel>04 / Naslednji korak</SectionLabel><h2 className="font-display text-5xl md:text-6xl text-white uppercase leading-none">Spomini naj postanejo<br /><span className="text-[#FF2A2A]">del zbirke.</span></h2><p className="mt-5 max-w-2xl text-neutral-400 leading-relaxed">Prihodnji prispevni modul bo sprejemal fotografije, predmete in pričevanja domačinov. Vsak prispevek bo imel izvor, status preverjanja in možnost kasnejše dopolnitve.</p></div><div className="border border-neutral-700 px-6 py-5 font-mono text-xs uppercase text-neutral-400">Prispevki / v pripravi</div></section>
      </main>

      <footer className="border-t border-neutral-800"><div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row justify-between gap-5 font-mono text-[10px] uppercase text-neutral-600"><span>Griblje / Digitalni muzej vasi</span><span>Živa vas · odprta zbirka · Bela krajina</span></div></footer>

      <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 md:p-8 flex items-center justify-center" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}><motion.div initial={{ opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} className="relative w-full max-w-5xl max-h-[92vh] overflow-auto bg-[#090909] border border-neutral-700 shadow-2xl"><button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 border border-neutral-700 text-white flex items-center justify-center hover:border-[#FF2A2A]" aria-label="Zapri"><X size={20} /></button><div className="grid lg:grid-cols-[1.1fr_.9fr]"><div className="bg-black min-h-[300px]">{selected.image && <img src={selected.image} alt={selected.title} className="w-full h-full object-cover max-h-[620px]" referrerPolicy="no-referrer" />}</div><div className="p-7 md:p-10"><div className="font-mono text-[10px] text-[#FF2A2A] uppercase mb-3">{selected.category} / muzejski zapis</div><h2 className="font-display text-4xl md:text-6xl text-white uppercase leading-[.9] mb-7">{selected.title}</h2><div className="space-y-4 text-sm"><div className="flex gap-3 border-t border-neutral-800 pt-4"><Clock3 size={16} className="text-[#FF2A2A] shrink-0" /><span className="text-neutral-300">{selected.period}</span></div><div className="flex gap-3 border-t border-neutral-800 pt-4"><MapPin size={16} className="text-[#FF2A2A] shrink-0" /><span className="text-neutral-300">{selected.location}</span></div><div className="flex gap-3 border-t border-neutral-800 pt-4"><ImageIcon size={16} className="text-[#FF2A2A] shrink-0" /><span className="text-neutral-300">Vir: {selected.source}</span></div><div className="flex gap-3 border-t border-neutral-800 pt-4"><CheckCircle2 size={16} className="text-[#FF2A2A] shrink-0" /><span className="text-neutral-300">Status: {selected.status}</span></div></div><p className="mt-8 text-neutral-400 leading-relaxed">{selected.description}</p>{selected.relatedIds && selected.relatedIds.length > 0 && <div className="mt-8 border-t border-neutral-800 pt-6"><div className="font-mono text-[10px] uppercase text-neutral-500 mb-3">Povezano v zbirki</div><div className="flex flex-wrap gap-2">{selected.relatedIds.map((id) => { const related = recordById(id); return related ? <button key={id} onClick={() => setSelected(related)} className="border border-neutral-700 px-3 py-2 text-xs text-neutral-300 hover:border-[#FF2A2A] hover:text-white">{related.title}</button> : null; })}</div></div>}</div></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}

export default App;
