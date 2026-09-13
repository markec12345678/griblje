import type { MuseumRecord } from '../data/museum';
import type { MuseumTrail } from '../data/trails';

type Props = {
  trails: MuseumTrail[];
  records: MuseumRecord[];
};

export function MuseumTrails({ trails, records }: Props) {
  return (
    <section id="poti" className="bg-[#050505] text-[#E4E3E0] px-5 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="font-mono text-[#FF2A2A] uppercase tracking-[0.22em] text-xs md:text-sm mb-3">01B / Poti</p>
          <h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">Raziskovalne poti</h2>
          <p className="mt-5 max-w-2xl text-neutral-400 leading-relaxed">Kurirane poti povežejo obstoječe muzejske zapise v zgodbo. Ne dodajajo novih zgodovinskih trditev, ampak obiskovalcu določijo smiselno zaporedje raziskovanja.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trails.map((trail, index) => {
            const trailRecords = trail.recordIds
              .map((id) => records.find((record) => record.id === id))
              .filter((record): record is MuseumRecord => Boolean(record));

            return (
              <article key={trail.id} className="border border-neutral-800 bg-[#090909] p-6 hover:border-[#FF2A2A] transition-colors">
                <div className="font-mono text-[10px] text-[#FF2A2A] uppercase">Pot {String(index + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-3xl text-white uppercase leading-none mt-3">{trail.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">{trail.description}</p>
                <div className="mt-6 space-y-2">
                  {trailRecords.map((record) => (
                    <a key={record.id} href="#zbirka" className="block border border-neutral-800 px-3 py-3 hover:border-white transition-colors">
                      <span className="block font-mono text-[9px] text-neutral-600 uppercase">{record.category} · {record.period}</span>
                      <span className="block font-display text-lg text-white uppercase mt-1">{record.title}</span>
                    </a>
                  ))}
                </div>
                <div className="mt-4 font-mono text-[9px] uppercase text-neutral-600">{trailRecords.length} {trailRecords.length === 1 ? 'zapis' : 'zapisov'} v poti</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
