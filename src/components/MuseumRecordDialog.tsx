import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { MuseumRecord } from '../data/museum';
import { sourceById } from '../data/provenance';
import { MuseumSourcePanel } from './MuseumSourcePanel';

type Props = {
  record: MuseumRecord | null;
  onClose: () => void;
};

export function MuseumRecordDialog({ record, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!record) return;

    const previousOverflow = document.body.style.overflow;
    const activeElement = document.activeElement;
    openerRef.current = activeElement instanceof HTMLElement ? activeElement : null;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement &&
          !element.hasAttribute('disabled') &&
          element.getAttribute('aria-hidden') !== 'true',
      );

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      const opener = openerRef.current;
      if (opener && document.contains(opener)) requestAnimationFrame(() => opener.focus());
      openerRef.current = null;
    };
  }, [record, onClose]);

  if (!record) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 p-0 md:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="museum-record-title"
        aria-describedby="museum-record-description"
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-neutral-700 bg-[#080808] shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Zapri muzejski zapis"
          className="absolute right-4 top-4 z-10 border border-neutral-700 bg-black/80 p-3 text-neutral-300 hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF2A2A]"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          {record.image ? (
            <div className="aspect-[4/3] bg-neutral-900 lg:aspect-auto lg:min-h-[560px]">
              <img src={record.image} alt={record.title} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center bg-neutral-900 font-mono text-xs uppercase text-neutral-600">
              Fotografija še ni dodana
            </div>
          )}

          <div className="p-6 md:p-9">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF2A2A]">
              {record.category} · {record.period}
            </div>
            <h2 id="museum-record-title" className="mt-3 font-display text-4xl md:text-6xl uppercase leading-[.9] text-white">
              {record.title}
            </h2>
            <p id="museum-record-description" className="mt-6 text-base leading-relaxed text-neutral-300">
              {record.description}
            </p>

            <dl className="mt-7 grid grid-cols-1 gap-3 border-y border-neutral-800 py-5 text-sm">
              <div>
                <dt className="font-mono text-[9px] uppercase text-neutral-600">Lokacija</dt>
                <dd className="mt-1 text-neutral-300">{record.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase text-neutral-600">Status muzejske obdelave</dt>
                <dd className="mt-1 text-neutral-300">{record.status}</dd>
              </div>
            </dl>

            <div className="mt-7">
              <MuseumSourcePanel sourceIds={record.sourceIds} sourceById={sourceById} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
