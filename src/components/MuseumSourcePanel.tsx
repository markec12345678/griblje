import { ExternalLink, ShieldCheck, TriangleAlert } from 'lucide-react';
import type { MuseumSource } from '../data/provenance';

type Props = {
  sourceIds: string[];
  sourceById: Map<string, MuseumSource>;
};

const statusLabel: Record<MuseumSource['verificationStatus'], string> = {
  preverjeno: 'Preverjeno',
  'delno-preverjeno': 'Delno preverjeno',
  nepreverjeno: 'Nepreverjeno',
};

const sourceTypeLabel: Record<MuseumSource['type'], string> = {
  'arhivski-dokument': 'Arhivski dokument',
  fotografija: 'Fotografija',
  zemljevid: 'Zemljevid',
  'spletni-vir': 'Spletni vir',
  'ustno-pričevanje': 'Ustno pričevanje',
  spomin: 'Spomin',
  drugo: 'Drugo',
};

function isSafeExternalUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function MuseumSourcePanel({ sourceIds, sourceById }: Props) {
  const sources = sourceIds
    .map((id) => sourceById.get(id))
    .filter((source): source is MuseumSource => Boolean(source));

  if (sourceIds.length === 0) {
    return (
      <section aria-labelledby="viri-title" className="border-t border-neutral-800 pt-5">
        <h3 id="viri-title" className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Viri in preverjanje</h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">Za ta zapis trenutno še ni povezan strukturirani vir.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="viri-title" className="border-t border-neutral-800 pt-5">
      <div className="flex items-center justify-between gap-4">
        <h3 id="viri-title" className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Viri in preverjanje</h3>
        <span className="font-mono text-[9px] uppercase text-neutral-600">{sources.length} {sources.length === 1 ? 'vir' : 'viri'}</span>
      </div>

      {sources.length < sourceIds.length && (
        <p className="mt-3 border border-neutral-800 bg-black/30 p-3 text-xs leading-relaxed text-neutral-500">
          Nekateri povezani viri trenutno niso najdeni v registru muzeja.
        </p>
      )}

      <div className="mt-4 space-y-3">
        {sources.map((source) => {
          const verified = source.verificationStatus === 'preverjeno';
          const safeUrl = source.url && isSafeExternalUrl(source.url) ? source.url : undefined;
          return (
            <article key={source.id} className="border border-neutral-800 bg-black/30 p-4">
              <div className="flex items-start gap-3">
                {verified ? <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#FF2A2A]" aria-hidden="true" /> : <TriangleAlert size={17} className="mt-0.5 shrink-0 text-neutral-500" aria-hidden="true" />}
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[9px] uppercase text-neutral-500">{statusLabel[source.verificationStatus]} · {sourceTypeLabel[source.type]}</div>
                  <h4 className="mt-1 text-sm font-medium text-white">{source.title}</h4>
                  {source.creator && <p className="mt-2 text-xs text-neutral-400">Avtor: {source.creator}</p>}
                  {source.institution && <p className="text-xs text-neutral-500">Institucija: {source.institution}</p>}
                  {source.license && <p className="text-xs text-neutral-500">Licenca: {source.license}</p>}
                  {source.archiveReference && <p className="text-xs text-neutral-500">Arhivska signatura: {source.archiveReference}</p>}
                  {source.accessedAt && <p className="text-xs text-neutral-600">Dostopano: {source.accessedAt}</p>}
                  {source.citation && <p className="mt-2 text-xs leading-relaxed text-neutral-500">{source.citation}</p>}
                  {source.notes && <p className="mt-3 text-xs leading-relaxed text-neutral-500">{source.notes}</p>}
                  {safeUrl && (
                    <a href={safeUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 border border-neutral-700 px-3 py-2 font-mono text-[9px] uppercase text-neutral-300 hover:border-white hover:text-white">
                      Odpri izvorni vir <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
