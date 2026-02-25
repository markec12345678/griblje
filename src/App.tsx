import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Skull, Flame, Waves, MapPin } from 'lucide-react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] selection:bg-[#FF2A2A] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Kolpa_griblje.jpg" 
            alt="Griblje Background" 
            className="w-full h-full object-cover img-brutal"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="z-10 text-center flex flex-col items-center px-4">
          <motion.h1 
            initial={{ scale: 1.5, opacity: 0, skewX: -10 }}
            animate={{ scale: 1, opacity: 1, skewX: -10 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="font-display text-[20vw] md:text-[15vw] leading-[0.8] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 glitch-hover cursor-default"
          >
            GRIBLJE
          </motion.h1>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center items-center gap-4 text-[#FF2A2A] font-bold tracking-widest uppercase text-sm md:text-xl font-mono"
          >
            <MapPin size={24} />
            <span>Bela krajina, Slovenija</span>
            <MapPin size={24} />
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 z-10 text-[#FF2A2A]"
        >
          <ArrowDown size={48} />
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="bg-[#FF2A2A] text-black font-display text-4xl py-4 overflow-hidden skew-container my-20 border-y-4 border-white">
        <div className="marquee-track unskew-content">
          <span className="mx-4">ZGODOVINA • MITI • LEGENDE • KOLPA • USKOKI • TURŠKI VPADI • ZELENI JURIJ •</span>
          <span className="mx-4">ZGODOVINA • MITI • LEGENDE • KOLPA • USKOKI • TURŠKI VPADI • ZELENI JURIJ •</span>
          <span className="mx-4">ZGODOVINA • MITI • LEGENDE • KOLPA • USKOKI • TURŠKI VPADI • ZELENI JURIJ •</span>
          <span className="mx-4">ZGODOVINA • MITI • LEGENDE • KOLPA • USKOKI • TURŠKI VPADI • ZELENI JURIJ •</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {/* Row 1 */}
          <div className="relative aspect-square group">
            <div className="absolute inset-0 bg-[#FF2A2A] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Griblje%2C_%C4%8Crnomelj_-_cerkev_sv._Vida.jpg" alt="Cerkev sv. Vida Griblje" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-white" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-white font-mono px-2 py-1 text-xs uppercase">01 / Vas</div>
          </div>
          <div className="relative aspect-square group md:translate-y-12">
            <div className="absolute inset-0 bg-white translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Slap_in_malenca_na_Kolpi_pri_Gribljah.jpg" alt="Kolpa Griblje" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-[#FF2A2A]" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-[#FF2A2A] font-mono px-2 py-1 text-xs uppercase">02 / Kolpa</div>
          </div>
          <div className="relative aspect-square group">
            <div className="absolute inset-0 bg-neutral-800 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Pogovor_angle%C5%A1kega_pilota_s_partizani%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg" alt="Zgodovina Griblje" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-white" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-white font-mono px-2 py-1 text-xs uppercase">03 / Zgodovina</div>
          </div>
          
          {/* Row 2 */}
          <div className="relative aspect-square group mt-8 md:mt-0">
            <div className="absolute inset-0 bg-[#FF2A2A] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Ranjeni_partizani_opazujejo_pristajanje_zavezni%C5%A1kih_letal%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg" alt="Partizani Griblje 1945" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-white" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-white font-mono px-2 py-1 text-xs uppercase">04 / Partizani 1945</div>
          </div>
          <div className="relative aspect-square group mt-8 md:mt-0 md:translate-y-12">
            <div className="absolute inset-0 bg-white translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Slovenian_border_fence_in_Griblje.JPG" alt="Meja Griblje" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-[#FF2A2A]" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-[#FF2A2A] font-mono px-2 py-1 text-xs uppercase">05 / Meja</div>
          </div>
          <div className="relative aspect-square group mt-8 md:mt-0">
            <div className="absolute inset-0 bg-neutral-800 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Bela_krajina_Kolpa.jpg" alt="Bela krajina Kolpa" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-white" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-white font-mono px-2 py-1 text-xs uppercase">06 / Bela krajina</div>
          </div>

          {/* Row 3 */}
          <div className="relative aspect-square group mt-8 md:mt-0">
            <div className="absolute inset-0 bg-[#FF2A2A] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Griblje%2C_%C4%8Crnomelj.jpg" alt="Griblje Panorama" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-white" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-white font-mono px-2 py-1 text-xs uppercase">07 / Panorama</div>
          </div>
          <div className="relative aspect-square group mt-8 md:mt-0 md:translate-y-12">
            <div className="absolute inset-0 bg-white translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Pond_Griblje.jpg" alt="Ribnik Griblje" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-[#FF2A2A]" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-[#FF2A2A] font-mono px-2 py-1 text-xs uppercase">08 / Ribnik</div>
          </div>
          <div className="relative aspect-square group mt-8 md:mt-0">
            <div className="absolute inset-0 bg-neutral-800 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Pond_at_Griblje_%2844612474114%29.jpg" alt="Narava Griblje" className="absolute inset-0 w-full h-full object-cover img-brutal border-2 border-white" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 bg-black text-white font-mono px-2 py-1 text-xs uppercase">09 / Narava</div>
          </div>
        </div>

        {/* Static History Section */}
        <div className="relative mb-32">
          <div className="absolute -left-10 top-0 bottom-0 w-1 bg-[#FF2A2A] hidden md:block"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-display text-4xl text-white uppercase mb-4 border-b-2 border-neutral-800 pb-2">KRVAVA MEJA IN TURŠKI VPADI</h2>
              <p className="text-xl leading-relaxed text-neutral-400">
                Reka <span className="glitch-word">Kolpa</span> ni bila vedno le mirna poletna oaza. V 15. in 16. stoletju je bila <strong>krvava meja</strong> med krščansko Evropo in prodirajočim Osmanskim imperijem. Griblje so stale na prvi bojni črti. Zvonovi cerkve sv. Vida niso zvonili le k maši, ampak so bili <strong>plat zvona</strong> – opozorilo pred bližajočo se <span className="glitch-word">smrtjo</span> in uničenjem. Na to območje so se naselili <strong>Uskoki</strong>, neizprosni in divji bojevniki, ki so bežali pred Turki in postali živi ščit Bele krajine. Njihova <span className="glitch-word">kri</span>, pogum in nepopustljivost so še danes zapisani v genih domačinov.
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl text-white uppercase mb-4 border-b-2 border-neutral-800 pb-2">ZAVEZNIŠKA KRILA NAD VASJO (MAREC 1945)</h2>
              <p className="text-xl leading-relaxed text-neutral-400">
                Druga svetovna <span className="glitch-word">vojna</span> je v Griblje prinesla grmenje motorjev, ki niso pripadali sovražniku. <strong>Marec 1945</strong>. Nebo nad Belo krajino se je stemnilo pod mogočnimi krili zavezniških letal. Na zasilnih letališčih in poljih v okolici so pristajala britanska in ameriška letala. Zgodovinski arhivi in fotografije iz Gribelj prikazujejo <strong>ranjene partizane</strong>, ki z upanjem zrejo v nebo, in angleške pilote, ki so tvegali vse, da bi jih evakuirali v varno zaledje v Italiji. Polja okoli vasi so v tistih mrzlih dneh postala <strong>križišče življenja in <span className="glitch-word">smrti</span></strong>, kjer so se kovali mednarodni zavezniki v boju proti fašizmu.
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl text-white uppercase mb-4 border-b-2 border-neutral-800 pb-2">SVETI VID IN DUHOVI KOLPE</h2>
              <p className="text-xl leading-relaxed text-neutral-400">
                V osrčju vasi stoji <strong>cerkev sv. Vida</strong>, ki na svojih temeljih nosi stoletja molitev, strahov in upanja. Griblje so tesno, skoraj krvno povezane z reko <span className="glitch-word">Kolpo</span> – reko, ki daje življenje, poganja starodavne mline (malence) in hkrati skriva temačne skrivnosti v svojih globinah. Tu še vedno živi duh <strong>Zelenega Jurija</strong>, pradavnega simbola pomladi, ki vsako leto znova premaga temo in zimo. Narava v Gribljah ni le kulisa; je divja, neukročena sila, ki narekuje ritem življenja že tisočletja.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Brutalist Timeline */}
        <section className="mb-32">
          <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-[#FF2A2A] pb-4">Kronologija preživetja</h2>
          <div className="space-y-8">
            {[
              { year: "15. STOLETJE", title: "PRVE OMEMBE", desc: "Vas zraste ob reki Kolpi. Reka daje življenje, a hkrati prinaša nevarnost. Oblikuje se prva skupnost, ki kljubuje naravi." },
              { year: "1520 - 1530", title: "PRIHOD USKOKOV", desc: "Vzpostavi se krvava obrambna linija. Griblje postanejo živi ščit pred vpadi Osmanskega imperija. Zvonovi bijejo plat zvona." },
              { year: "MAREC 1945", title: "OPERACIJA REŠEVANJA", desc: "Zavezniška letala (Britanci in Američani) pristajajo na zasilnih stezah okoli vasi. Vaščani in partizani rešujejo ranjence v osrčje Italije." },
              { year: "1991", title: "NOVA MEJA", desc: "Reka Kolpa čez noč postane mednarodna meja. Kljub žici in političnim delitvam, duh vasi in povezanost ljudi ostaneta neprekinjena." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col md:flex-row gap-4 md:gap-12 items-start group"
              >
                <div className="font-display text-4xl md:text-5xl text-[#FF2A2A] min-w-[250px] group-hover:skew-x-[-10deg] transition-transform">
                  {item.year}
                </div>
                <div className="border-l-2 border-neutral-800 pl-6 md:pl-12 pb-8">
                  <h3 className="font-mono text-2xl text-white font-bold mb-2 uppercase">{item.title}</h3>
                  <p className="text-xl text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Local Fragments Cards */}
        <section className="mb-32">
          <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-white pb-4">Lokalni fragmenti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-[#FF2A2A] p-8 text-black border-4 border-[#FF2A2A] hover:bg-black hover:text-[#FF2A2A] transition-colors duration-300"
            >
              <h3 className="font-display text-4xl mb-4 uppercase">Zeleni Jurij</h3>
              <p className="font-mono text-lg font-bold mb-4">POMLADNI DEMON</p>
              <p className="text-lg leading-relaxed">Starodavni poganski običaj, ki je v Beli krajini preživel stoletja pokristjanjevanja. Predstavlja zmago pomladi nad zimo, luči nad temo. V Gribljah je ta tradicija globoko zakoreninjena v identiteto ljudi, ki so vedno znova morali preživeti ostre zime in težke čase.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-neutral-900 p-8 text-white border-4 border-neutral-900 hover:border-white transition-colors duration-300"
            >
              <h3 className="font-display text-4xl mb-4 uppercase">Malence</h3>
              <p className="font-mono text-lg text-[#FF2A2A] font-bold mb-4">MLINI NA KOLPI</p>
              <p className="text-lg leading-relaxed text-neutral-400">Reka Kolpa ni bila le meja, bila je industrija preteklosti. Leseni mlini (malence) so neprestano mleli žito za preživetje vasi. Bili so zbirališča, mesta skrivnosti in srčni utrip Gribelj. Njihova kolesa so se vrtela v ritmu neizprosne narave.</p>
            </motion.div>
          </div>
        </section>

        {/* Brutalist Quote */}
        <section className="mb-32 relative py-20 border-y-8 border-[#FF2A2A] overflow-hidden">
          <div className="absolute inset-0 bg-[#FF2A2A] opacity-10 transform -skew-y-3"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <h2 className="font-display text-6xl md:text-8xl text-white uppercase leading-none mb-8">
              "Zemlja, prepojena s <span className="text-[#FF2A2A] glitch-word">krvjo</span> in <span className="text-[#FF2A2A] glitch-word">znojem</span>."
            </h2>
            <p className="font-mono text-xl text-neutral-400 uppercase tracking-widest">
              — Glasovi prednikov, Bela krajina
            </p>
          </motion.div>
        </section>

        {/* Heritage of Blisters */}
        <section className="mb-20">
          <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-[#FF2A2A] pb-4 text-right">Dediščina <span className="glitch-word">žuljev</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-l-4 border-white pl-8"
            >
              <h3 className="font-display text-5xl mb-2 text-white uppercase">Beli lan</h3>
              <p className="font-mono text-sm text-[#FF2A2A] font-bold mb-6 tracking-widest">TKANJE PREŽIVETJA</p>
              <p className="text-xl leading-relaxed text-neutral-400">
                Tradicionalna bela oblačila Bele krajine niso znak nedolžnosti, temveč surove trdoživosti. Lan je bil pridelan z <span className="glitch-word">žulji</span> na kamniti zemlji, obdelan v ledeni vodi Kolpe in stkan v dolgih, mrzlih zimah ob brlenju sveč. Vsaka nit v narodni noši je prežeta z garanjem generacij, ki niso poznale predaje.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="border-l-4 border-[#FF2A2A] pl-8"
            >
              <h3 className="font-display text-5xl mb-2 text-white uppercase">Eksodus</h3>
              <p className="font-mono text-sm text-[#FF2A2A] font-bold mb-6 tracking-widest">S TREBUHOM ZA KRUHOM</p>
              <p className="text-xl leading-relaxed text-neutral-400">
                Konec 19. in v začetku 20. stoletja je revščina zarezala globlje kot turški meči. Trta je zbolela za trtno ušjo, zemlja ni dala dovolj. Sledil je množičen beg. Možje in fantje iz Gribelj so s cule na rami odhajali v ameriške rudnike in jeklarne. Mnogi se niso nikoli vrnili, a so s <span className="glitch-word">krvavo</span> zasluženimi dolarji ohranili vas pri življenju.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Dark Waters of Kolpa - Full Width */}
      <section className="relative py-32 border-y-8 border-white overflow-hidden group mb-32">
        <div className="absolute inset-0 z-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Kolpa_griblje.jpg" alt="Kolpa" className="w-full h-full object-cover img-brutal scale-105 group-hover:scale-100 transition-transform duration-1000" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors duration-1000"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-8xl text-[#FF2A2A] uppercase mb-8">Temne vode Kolpe</h2>
            <div className="max-w-2xl">
              <p className="text-2xl leading-relaxed text-white font-medium mb-6">
                Kolpa ni le meja. Je živo bitje, ki diha z vasjo. Poleti prinaša ohladitev in življenje, spomladi in jeseni pa pokaže svoje zobe.
              </p>
              <p className="text-xl leading-relaxed text-neutral-400">
                Deroča voda je skozi stoletja odnesla marsikatero življenje, uničila mline in poplavila polja. A brez nje Griblje ne bi obstajale. Je reka, ki daje, in reka, ki neizprosno jemlje. Njen šum je edina stalnica v zgodovini vasi.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brutalist Dictionary */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
        <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-[#FF2A2A] pb-4">Besede prednikov</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { word: "STELJNIK", desc: "Značilen brezov gozd s podrastjo orlove praproti. Simbol belokranjske krajine in trdega dela." },
            { word: "MALENCA", desc: "Mlin na vodi. Srce vaške ekonomije in prostor, kjer so se kovali načrti in širile skrivnosti." },
            { word: "PISANICA", desc: "Z voskom in črno barvo poslikano jajce. Umetnost, rojena iz revščine in potrpljenja." },
            { word: "TAMBURICA", desc: "Instrument, ki je preglasil jok in priklical smeh. Zvok, ki je združeval vas ob dolgih večerih." },
            { word: "USKOK", desc: "Pribežnik, bojevnik, prednik. Tisti, ki je raje izbral boj na krvavi meji kot suženjstvo." },
            { word: "JURIJ", desc: "Zeleni Jurij. Prinašalec pomladi, odganjalec zime. Arhetip preživetja." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="border-2 border-neutral-800 p-6 hover:border-[#FF2A2A] hover:bg-[#FF2A2A] hover:text-black transition-all duration-300 group cursor-default"
            >
              <h4 className="font-display text-3xl mb-2 text-white group-hover:text-black">{item.word}</h4>
              <p className="font-mono text-sm text-neutral-400 group-hover:text-black/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fire and Night */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border-4 border-[#FF2A2A] p-8 md:p-16 relative overflow-hidden group bg-black"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
            <Flame size={300} className="text-[#FF2A2A]" />
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-[#FF2A2A] uppercase mb-6 relative z-10">Ogenj in noč</h2>
          <p className="font-mono text-xl text-white font-bold mb-6 tracking-widest relative z-10">KRESNA NOČ • OČIŠČENJE • POGANSTVO</p>
          <p className="text-xl leading-relaxed text-neutral-400 relative z-10 max-w-2xl">
            Ko poletje doseže svoj vrhunec, se ob Kolpi prižgejo ognji. Kresna noč v Gribljah ni le praznik, je starodavni ritual. Preskakovanje plamenov je očiščenje duše in telesa, ostanek poganskih časov, ki so preživeli stoletja. Iskre letijo v črno nebo, zvok tamburic preglasi šumenje reke in za eno noč se pozabi na žulje, revščino in strah. Ogenj je življenje.
          </p>
        </motion.div>
      </section>

      {/* Unwritten Laws */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-[#FF2A2A] pb-4 text-right">Nepisani zakoni</h2>
        <div className="space-y-12">
          {[
            { num: "01", title: "Reka vzame, kar ji pripada", desc: "Kolpa je vir življenja, a ne odpušča napak. Spoštuj njeno moč, ko naraste, in bodi hvaležen, ko se umiri. Kdor podcenjuje vodo, ne dočaka starosti." },
            { num: "02", title: "Tujec je gost, dokler ne prestopi meje", desc: "Uskoška kri ne pozabi hitro. Gostoljubje je sveto, a nezaupanje do tistih, ki prihajajo z mečem ali slabimi nameni, je vrezano v kosti. Vas brani svoje." },
            { num: "03", title: "Kar zraste iz kamna, je močnejše od železa", desc: "Zemlja tu ne daje obilja zlahka. Trdoživost ni izbira, je pogoj za obstoj. Vsak klas pšenice in vsaka nit lana sta prigarana z znojem in krvjo." }
          ].map((law, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center group"
            >
              <div className="font-display text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-black group-hover:from-[#FF2A2A] group-hover:to-black transition-all duration-500 leading-none">
                {law.num}
              </div>
              <div className="flex-1 border-l-2 border-[#FF2A2A] pl-6 md:pl-8">
                <h3 className="font-display text-3xl md:text-4xl text-white uppercase mb-4">{law.title}</h3>
                <p className="font-mono text-lg text-neutral-400 leading-relaxed">{law.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture of Defiance */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-white">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-16 bg-white text-black flex flex-col justify-center"
          >
            <h2 className="font-display text-5xl md:text-6xl uppercase mb-6">Arhitektura kljubovanja</h2>
            <p className="font-mono text-sm text-[#FF2A2A] font-bold mb-6 tracking-widest">LES • KAMEN • SLAMA</p>
            <p className="text-xl leading-relaxed font-medium">
              Stare hiše v Gribljah niso bile zgrajene za udobje. Bile so trdnjave. Zgrajene iz grobega kamna in hrastovega lesa, krite s slamo.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-16 bg-neutral-900 flex flex-col justify-center"
          >
            <p className="text-xl leading-relaxed text-neutral-400">
              Te strehe so gorele. V turških vpadih, v vojnah, v nesrečah. A vsakič, ko je vas pogorela, so jo zgradili znova. Na istih temeljih. Z istim kljubovanjem. Arhitektura vasi je fizični dokaz, da Gribelj ni mogoče izbrisati z zemljevida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blood of the Earth & Ancestor's Alarm */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kri Zemlje */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FF2A2A] p-8 md:p-12 text-black border-4 border-[#FF2A2A] relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 text-black opacity-10 font-display text-[200px] leading-none group-hover:scale-110 transition-transform duration-700">
              VINO
            </div>
            <h3 className="font-display text-5xl md:text-6xl uppercase mb-4 relative z-10">Kri zemlje</h3>
            <p className="font-mono text-sm font-bold mb-6 tracking-widest uppercase relative z-10">Trta • Kamen • Preživetje</p>
            <p className="text-xl leading-relaxed font-medium relative z-10">
              Vina v Gribljah ne pijemo za žejo. Pijemo ga iz spoštovanja. Rdeča kaplja, stisnjena iz trte, ki raste na skopem kraškem kamnu, je simbol preživetja. Trtna uš je nekoč uničila vse, a so ljudje trto posadili znova. Vino je kri te zemlje, grenko in močno, kot življenje samo.
            </p>
          </motion.div>

          {/* Alarm Prednikov */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-4 border-white p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute -left-10 -top-10 text-white opacity-5 font-display text-[200px] leading-none group-hover:scale-110 transition-transform duration-700">
              ZVON
            </div>
            <h3 className="font-display text-5xl md:text-6xl text-white uppercase mb-4 relative z-10">Alarm prednikov</h3>
            <p className="font-mono text-sm text-[#FF2A2A] font-bold mb-6 tracking-widest uppercase relative z-10">Zvonovi sv. Vida</p>
            <p className="text-xl leading-relaxed text-neutral-400 relative z-10">
              Pred sirenami in telefoni je bil zvon. Ko je udaril izven ure, je vas obstala. En ritem je pomenil ogenj. Drugi ritem je pomenil poplavo. Tretji je pomenil vojno. Zvonik ni bil le verski simbol, bil je stolp preživetja. Njegov zvok je še danes zapisan v podzavesti vsakega domačina.
            </p>
          </motion.div>
        </div>
      </section>

      {/* People of Griblje */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-[#FF2A2A] pb-4">Ljudje Gribelj</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Uskoški branilci", era: "16. STOLETJE", role: "VARUHI KRVAVE MEJE", desc: "Zgodovinski zapisi potrjujejo, da so Griblje in okoliške vasi naselili Uskoki, begunci pred Osmanskim imperijem, ki so postali elitni vojaki Vojne krajine. V zameno za svobodno zemljo so z lastno krvjo branili prehode čez reko Kolpo. Njihovi priimki in geni še danes živijo v vasi." },
            { name: "Amerikanci", era: "1890 - 1924", role: "REŠITELJI IZ RUDNIKOV", desc: "Ko je trtna uš uničila vinograde in je zavladala lakota, je sledil množičen eksodus. Vaščani Gribelj so odhajali v ameriške jeklarne in rudnike (Cleveland, Joliet). Z garanjem v temi so domov pošiljali dolarje in dobesedno odkupili zadolžene kmetije. Mnogi so tam pustili kosti, a rešili vas." },
            { name: "Varuhi Piccadilly Hope", era: "1944 - 1945", role: "PARTIZANI IN KMETJE", desc: "Med 2. svetovno vojno so domačini Gribelj in sosednjega Krasinca sodelovali pri eni največjih reševalnih operacij. Na zasilnem letališču 'Piccadilly Hope' so pod okriljem noči in ob stalni nevarnosti nemških patrulj pomagali evakuirati zavezniške pilote in več kot 2000 ranjencev v varno Italijo." },
            { name: "Belokranjske žene", era: "SKOZI STOLETJA", role: "STEBER PREŽIVETJA", desc: "Resnične junakinje vasi. Ko so možje krvaveli na Soški fronti (1915-1918) ali v partizanih, so ženske same obdelovale skopo zemljo, tkale lan za preživetje in vzgajale otroke v pomanjkanju. Ohranjale so starodavne običaje, pesmi in jezik. Brez njihove trme bi Griblje postale le spomin." }
          ].map((person, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative border-2 border-neutral-800 p-8 hover:border-[#FF2A2A] transition-colors duration-300 bg-black"
            >
              <div className="absolute top-0 right-0 bg-neutral-900 px-3 py-1 font-mono text-xs text-neutral-500 group-hover:text-[#FF2A2A] group-hover:bg-neutral-800 transition-colors">
                {person.era}
              </div>
              <h3 className="font-display text-4xl text-white uppercase mb-1 group-hover:text-[#FF2A2A] transition-colors">{person.name}</h3>
              <p className="font-mono text-sm text-[#FF2A2A] font-bold mb-4 tracking-widest">{person.role}</p>
              <p className="text-lg text-neutral-400 leading-relaxed">{person.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blood Toll */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t-8 border-b-8 border-[#FF2A2A] py-16 md:py-24 text-center"
        >
          <h2 className="font-display text-6xl md:text-8xl text-white uppercase mb-8">Krvni davek</h2>
          <p className="font-mono text-xl text-[#FF2A2A] font-bold mb-8 tracking-widest">1914 • 1941 • 1991</p>
          <p className="text-2xl md:text-3xl leading-relaxed text-neutral-400 max-w-3xl mx-auto font-medium">
            Svoboda v Gribljah ni bila nikoli podarjena. Bila je odkupljena. Prva svetovna vojna je izpraznila hiše in napolnila tuja bojišča. Druga je prinesla ogenj in partizanski odpor. Spomeniki v vasi niso le kosi kamna – so nema opozorila, da je mir le premor med viharji.
          </p>
        </motion.div>
      </section>

      {/* Map of Scars */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-white pb-4 text-right">Zemljevid brazgotin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "MRTVICE", subtitle: "OKLJUKI SMRTI", desc: "Mrtvi rokavi reke Kolpe, kjer voda zastane in potemni. Legende pravijo, da v njih prebivajo vodni duhovi, ki v globine vlečejo neprevidne plavalce." },
            { title: "KRUPA", subtitle: "KRAŠKA SILA", desc: "Reka, ki se nedaleč stran izliva v Kolpo. Njen izvir je miren, a njena zgodovina skriva mline, trdo delo in skrivnosti podzemlja." },
            { title: "CERKVENI ZID", subtitle: "ZADNJA OBRAMBA", desc: "Obzidje okoli cerkve sv. Vida je bilo v času turških vpadov zadnje zatočišče. Tisti, ki niso pravočasno prišli za zidove, niso dočakali jutra." }
          ].map((scar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-neutral-900 p-8 border-t-4 border-neutral-800 hover:border-[#FF2A2A] transition-colors duration-300 group"
            >
              <h3 className="font-display text-4xl text-white uppercase mb-2 group-hover:text-[#FF2A2A] transition-colors">{scar.title}</h3>
              <p className="font-mono text-xs text-[#FF2A2A] font-bold mb-4 tracking-widest">{scar.subtitle}</p>
              <p className="text-lg text-neutral-400 leading-relaxed">{scar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Raw Data / Survival Dossier */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-neutral-800 pb-4">Surovi podatki</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "KOORDINATE", value: "45.5786° N, 15.2869° E" },
            { label: "NADMORSKA VIŠINA", value: "144 m" },
            { label: "STATUS", value: "AKTIVNO PREŽIVETJE" },
            { label: "NEVARNOST", value: "POPLAVE / ZGODOVINA" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900 p-6 border-l-4 border-[#FF2A2A] hover:bg-neutral-800 transition-colors"
            >
              <p className="font-mono text-xs text-neutral-500 mb-2">{stat.label}</p>
              <p className="font-mono text-lg text-white font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bloodline (Population) */}
      <section className="mb-32 max-w-5xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-12 border-b-4 border-[#FF2A2A] pb-4">Krvna linija</h2>
        <div className="bg-neutral-900 p-8 md:p-12 border-4 border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF2A2A] to-transparent opacity-50"></div>
          <p className="font-mono text-sm text-[#FF2A2A] font-bold mb-8 tracking-widest uppercase">Demografija preživetja</p>
          
          <div className="space-y-6">
            {[
              { year: "1520", pop: "???", event: "Prihod Uskokov. Evidenc ni, le grobovi.", width: "20%" },
              { year: "1890", pop: "Vrhunec", event: "Pred veliko trtno ušjo in begom v Ameriko.", width: "100%" },
              { year: "1945", pop: "Zdesetkano", event: "Davek druge svetovne vojne in taborišč.", width: "40%" },
              { year: "DANES", pop: "~350", event: "Tisti, ki so ostali. Tisti, ki ne gredo nikamor.", width: "60%" }
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className="flex justify-between text-white font-mono text-sm md:text-base mb-2 relative z-10">
                  <span className="font-bold">{stat.year}</span>
                  <span className="text-neutral-400 group-hover:text-white transition-colors">{stat.event}</span>
                  <span className="text-[#FF2A2A] font-bold">{stat.pop}</span>
                </div>
                <div className="h-2 bg-black w-full relative z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: stat.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-[#FF2A2A]"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survival Manifesto */}
      <section className="mb-32 max-w-5xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <h2 className="font-display text-7xl md:text-9xl text-white uppercase leading-none mb-8 tracking-tighter">
            TUKAJ SMO.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF2A2A] to-black">TUKAJ OSTANEMO.</span>
          </h2>
          <p className="font-mono text-xl text-neutral-500 uppercase tracking-widest max-w-2xl mx-auto">
            Griblje niso le točka na zemljevidu. So stanje duha. So dokaz, da lahko človek preživi vse, če ima pod nogami svojo zemljo in ob sebi svojo reko.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t-8 border-[#FF2A2A] bg-black py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Griblje%2C_%C4%8Crnomelj.jpg" alt="Footer bg" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10">
          <h2 className="font-display text-8xl md:text-[10vw] text-white opacity-20 mb-6 leading-none hover:opacity-100 transition-opacity duration-500">GRIBLJE</h2>
          <div className="flex justify-center gap-8 mb-8 text-[#FF2A2A]">
            <Skull size={32} />
            <Flame size={32} />
            <Waves size={32} />
          </div>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
            Ustvarjeno v divjini • {new Date().getFullYear()} • Bela krajina
          </p>
        </div>
      </footer>
    </div>
  );
}
