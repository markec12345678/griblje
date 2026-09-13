import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Search, X, MapPin, Clock3, BookOpen, Image as ImageIcon, ChevronRight, Filter } from 'lucide-react';

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
  {
    id: 'sveti-vid',
    title: 'Cerkev sv. Vida',
    category: 'KRAJ',
    period: 'Danes / dediščina',
    description: 'Ena od prepoznavnih točk Gribelj in izhodišče za raziskovanje vasi. V digitalnem muzeju jo obravnavamo kot krajevno točko, povezano z zgodbami, fotografijami in zgodovinskimi viri.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Griblje%2C_%C4%8Crnomelj_-_cerkev_sv._Vida.jpg',
    location: 'Središče Gribelj',
    source: 'Wikimedia Commons',
  },
  {
    id: 'kolpa',
    title: 'Kolpa pri Gribljah',
    category: 'KOLPA',
    period: 'Naravna dediščina',
    description: 'Kolpa je eden ključnih elementov prostora Gribelj. Muzej jo obravnava kot del življenja vasi: narava, voda, delo, preživljanje prostega časa in meja.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Kolpa_griblje.jpg',
    location: 'Kolpa',
    source: 'Wikimedia Commons',
  },
  {
    id: 'malenca',
    title: 'Malenca na Kolpi',
    category: 'KOLPA',
    period: 'Gospodarska dediščina',
    description: 'Stari mlini oziroma malence sodijo med pomembne zgodbe življenja ob Kolpi. Ta zapis je namenjen temu, da se k lokaciji pozneje dodajo fotografije, pričevanja in dokumentirani podatki.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Slap_in_malenca_na_Kolpi_pri_Gribljah.jpg',
    location: 'Kolpa pri Gribljah',
    source: 'Wikimedia Commons',
  },
  {
    id: '1945-pilot',
    title: 'Pogovor angleškega pilota s partizani',
    category: 'VOJNA',
    period: 'Marec 1945',
    description: 'Zgodovinska fotografija, povezana z dogajanjem v Gribljah marca 1945. Pri muzejski objavi je pomembno ohraniti fotografijo, kontekst in preverljiv vir.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pogovor_angle%C5%A1kega_pilota_s_partizani%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg',
    location: 'Griblje, marec 1945',
    source: 'Wikimedia Commons',
  },
  {
    id: '1945-ranjenci',
    title: 'Ranjeni partizani in zavezniška letala',
    category: 'VOJNA',
    period: 'Marec 1945',
    description: 'Fotografski dokument o dogajanju v Gribljah med drugo svetovno vojno. Pred objavo končnega muzejskega zapisa bomo posamezne trditve vezali na arhivski vir.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Ranjeni_partizani_opazujejo_pristajanje_zavezni%C5%A1kih_letal%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg',
    location: 'Griblje, marec 1945',
    source: 'Wikimedia Commons',
  },
  {
    id: 'meja',
    title: 'Meja ob Gribljah',
    category: 'KRAJ',
    period: 'Sodobna zgodovina',
    description: 'Prostor ob Kolpi je skozi čas dobival različne pomene. Digitalni muzej bo na tej točki povezoval sodobne fotografije, zgodovinske zemljevide in pričevanja.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Slovenian_border_fence_in_Griblje.JPG',
    location: 'Ob Kolpi',
    source: 'Wikimedia Commons',
  },
  {
    id: 'panorama',
    title: 'Griblje – panorama',
    category: 'KRAJ',
    period: 'Sodobnost',
    description: 'Pogled na vas kot muzejski predmet. Vsaka lokacija v vasi lahko postane vstopna točka v zgodbo prostora.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Griblje%2C_%C4%8Crnomelj.jpg',
    location: 'Griblje',
    source: 'Wikimedia Commons',
  },
  {
    id: 'ribnik',
    title: 'Ribnik Griblje',
    category: 'KOLPA',
    period: 'Narava',
    description: 'Naravna in krajevna dediščina. V prihodnji zbirki bo mogoče dodati sezonske fotografije, živalske in rastlinske vrste ter zgodbe domačinov.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Pond_Griblje.jpg',
    location: 'Griblje',
    source: 'Wikimedia Commons',
  },
];

const timeline = [
  { year: 'ZGODNJA ZGODOVINA', title: 'Začetki kraja', text: 'Prvi del muzeja bo časovno os naselbine gradil iz preverljivih zgodovinskih virov, ne iz ugibanj.' },
  { year: '15.–16. STOLETJE', title: 'Mejni prostor', text: 'Obdobje vpadov in utrjevanja obrambnega prostora Bele krajine bo predstavljeno z viri, zemljevidi in pričevanji.' },
  { year: 'MAREC 1945', title: 'Zavezniška letala', text: 'Griblje so povezane z dokumentiranimi fotografijami in dogodki iz marca 1945.' },
  { year: '1991 → DANES', title: 'Nova meja in nova vas', text: 'Sodobna zgodovina, Kolpa, življenje ob meji in današnja identiteta Gribelj.' },
];

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('VSE');
  const [selected, setSelected] = useState<MuseumItem | null>(null);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === 'VSE' || item.category === category;
      const haystack = `${item.title} ${item.description} ${item.period} ${item.location}`.toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] selection:bg-[#FF2A2A] selection:text-white">
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 opacity-45">
          <img src={items[1].image} alt="Kolpa pri Gribljah" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/65" />
        </motion.div>
        <div className="relative z-10 text-center px-5 max-w-6xl">
          <p className="font-mono text-[#FF2A2A] font-bold tracking-[0.35em] uppercase mb-6">DIGITALNI MUZEJ VASI</p>
          <motion.h1 initial={{ scale: 1.35, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="font-display text-[19vw] md:text-[14vw] leading-[0.8] tracking-tighter uppercase text-white">
            GRIBLJE
          </motion.h1>
          <p className="mt-8 text-lg md:text-2xl text-neutral-300 max-w-2xl mx-auto">Vas kot muzej. Kraj kot zbirka. Zgodbe ljudi, hiš, Kolpe in časa na enem mestu.</p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap font-mono text-sm uppercase">
            <span className="border border-[#FF2A2A] px-3 py-2">Živa vas</span>
            <span className="border border-white/30 px-3 py-2">Digitalna zbirka</span>
            <span className="border border-white/30 px-3 py-2">Bela krajina</span>
          </div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 z-10 text-[#FF2A2A]"><ArrowDown size={42} /></motion.div>
      </section>

      <div className="bg-[#FF2A2A] text-black font-display text-3xl md:text-4xl py-4 overflow-hidden border-y-4 border-white">
        <div className="marquee-track"><span className="mx-4">LJUDJE • HIŠE • ZGODBE • KOLPA • PREDMETI • SPOMINI • ZGODOVINA • GRIBLJE •</span><span className="mx-4">LJUDJE • HIŠE • ZGODBE • KOLPA • PREDMETI • SPOMINI • ZGODOVINA • GRIBLJE •</span></div>
      </div>

      <main className="max-w-6xl mx-auto px-5 py-20">
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <p className="font-mono text-[#FF2A2A] uppercase tracking-widest mb-3">01 / ZBIRKA</p>
              <h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Raziskuj Griblje</h2>
            </div>
            <div className="flex items-center gap-2 text-neutral-500 font-mono text-sm"><BookOpen size={18} /> {filteredItems.length} ZAPISOV</div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-4 md:p-5 mb-8">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Išči po muzeju: Kolpa, cerkev, 1945 ..." className="w-full bg-black border border-neutral-700 px-12 py-4 text-white outline-none focus:border-[#FF2A2A] font-mono" />
            </div>
            <div className="flex flex-wrap gap-2 items-center"><Filter size={16} className="text-neutral-500 mr-1" />{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`px-3 py-2 border font-mono text-xs uppercase transition-colors ${category === item ? 'bg-[#FF2A2A] text-black border-[#FF2A2A]' : 'border-neutral-700 text-neutral-400 hover:border-white hover:text-white'}`}>{item}</button>)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((item, index) => (
              <motion.article key={item.id} layout initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="group border border-neutral-800 bg-[#0a0a0a] hover:border-[#FF2A2A] transition-colors cursor-pointer" onClick={() => setSelected(item)}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 bg-black text-[#FF2A2A] px-2 py-1 font-mono text-xs">{item.category}</div>
                </div>
                <div className="p-5">
                  <div className="font-mono text-xs text-neutral-500 mb-2">{item.period}</div>
                  <h3 className="font-display text-3xl text-white uppercase mb-3">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed line-clamp-3">{item.description}</p>
                  <div className="mt-5 flex items-center justify-between text-[#FF2A2A] font-mono text-xs uppercase"><span><MapPin size={14} className="inline mr-1" />{item.location}</span><ChevronRight size={18} /></div>
                </div>
              </motion.article>
            ))}
          </div>
          {filteredItems.length === 0 && <div className="border border-dashed border-neutral-700 p-12 text-center text-neutral-500 font-mono">NI ZADETKOV. POSKUSI DRUGO ISKANJE.</div>}
        </section>

        <section className="mb-24">
          <div className="mb-10"><p className="font-mono text-[#FF2A2A] uppercase tracking-widest mb-3">02 / ČAS</p><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Griblje skozi čas</h2></div>
          <div className="space-y-0 border-t border-neutral-800">{timeline.map((item) => <div key={item.year} className="grid md:grid-cols-[220px_1fr] border-b border-neutral-800 py-8 gap-6 group"><div className="font-display text-2xl text-[#FF2A2A]">{item.year}</div><div><h3 className="font-display text-3xl text-white uppercase mb-2">{item.title}</h3><p className="text-neutral-400 text-lg leading-relaxed max-w-3xl">{item.text}</p></div></div>)}</div>
        </section>

        <section className="mb-24 border-4 border-[#FF2A2A] p-6 md:p-10 bg-[#090909]">
          <div className="flex items-center gap-3 mb-6"><MapPin className="text-[#FF2A2A]" /><p className="font-mono text-[#FF2A2A] uppercase tracking-widest">03 / MUZEJSKI ZEMLJEVID</p></div>
          <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-5">Vas postane zemljevid zgodb.</h2>
          <p className="text-neutral-400 text-lg max-w-3xl leading-relaxed mb-8">Naslednji korak je interaktivni zemljevid Gribelj: hiše, cerkev, Kolpa, malence, zgodovinske lokacije, dogodki in spomini. Vsaka točka bo imela svojo muzejsko kartoteko.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs uppercase">{['Hiše', 'Ljudje', 'Dogodki', 'Predmeti'].map((label) => <div key={label} className="border border-neutral-700 p-4 text-neutral-300">+ {label}</div>)}</div>
        </section>

        <section className="border-y-8 border-white py-20 text-center">
          <ImageIcon className="mx-auto text-[#FF2A2A] mb-5" size={38} />
          <h2 className="font-display text-5xl md:text-8xl text-white uppercase leading-none">Ne samo spletna stran.</h2>
          <p className="mt-6 text-xl text-neutral-400 max-w-2xl mx-auto">Digitalni arhiv in virtualni vhod v resnično vas. Vsaka zgodba mora imeti vir, fotografijo, lokacijo ali pričevanje.</p>
        </section>
      </main>

      <footer className="border-t border-neutral-800 py-10 px-5"><div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 font-mono text-xs text-neutral-600 uppercase"><span>GRIBLJE / DIGITALNI MUZEJ</span><span>ŽIVA VAS • ŽIVE ZGODBE</span></div></footer>

      <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 md:p-10 overflow-y-auto" onClick={() => setSelected(null)}><motion.div initial={{ y: 30, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20 }} className="max-w-5xl mx-auto bg-[#090909] border border-neutral-700 min-h-full md:min-h-0" onClick={(e) => e.stopPropagation()}><div className="flex justify-end p-3"><button onClick={() => setSelected(null)} className="p-2 text-neutral-400 hover:text-white"><X size={28} /></button></div><div className="grid md:grid-cols-2"><div className="aspect-square md:aspect-auto md:min-h-[520px]"><img src={selected.image} alt={selected.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div><div className="p-7 md:p-10 flex flex-col"><div className="font-mono text-[#FF2A2A] text-xs uppercase mb-4">{selected.category} / {selected.period}</div><h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none mb-6">{selected.title}</h2><p className="text-lg text-neutral-300 leading-relaxed mb-8">{selected.description}</p><div className="mt-auto space-y-3 border-t border-neutral-800 pt-6 font-mono text-sm text-neutral-500"><div><MapPin size={15} className="inline mr-2" />{selected.location}</div><div><Clock3 size={15} className="inline mr-2" />{selected.period}</div><div><BookOpen size={15} className="inline mr-2" />Vir: {selected.source}</div></div></div></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}

export default App;
