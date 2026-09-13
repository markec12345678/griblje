import { ChevronRight } from 'lucide-react';
import type { MuseumRecord } from '../data/museum';
import type { MuseumTrail } from '../data/trails';

type Props = {
  trails: MuseumTrail[];
  records: MuseumRecord[];
  onSelect: (record: MuseumRecord) => void;
};

export function MuseumTrails({ trails, records, onSelect }: Props) {
  return (
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
                <button key={record.id} onClick={() => onSelect(record)} className="w-full flex items-center justify-between gap-3 border border-neutral-800 px-3 py-3 text-left hover:border-white transition-colors">
                  <span>
                    <span className="block font-mono text-[9px] text-neutral-600 uppercase">{record.category} · {record.period}</span>
                    <span className="block font-display text-lg text-white uppercase mt-1">{record.title}</span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-[#FF2A2A]" />
                </button>
              ))}
            </div>
            <div className="mt-4 font-mono text-[9px] uppercase text-neutral-600">{trailRecords.length} muzejski {trailRecords.length === 1 ? 'zapis' : 'zapisi'}</div>
          </article>
        );
      })}
    </div>
  );
}
