import { Fragment, type ReactNode } from "react";

/** Minimal markdown renderer for CMS content: headings, paragraphs, lists, tables, bold/italic/code/links. */

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={k++} className="font-semibold text-ink">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={k++} className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[0.9em] text-brand-ink">{t.slice(1, -1)}</code>);
    else if (t.startsWith("*")) out.push(<em key={k++}>{t.slice(1, -1)}</em>);
    else {
      const mm = /\[([^\]]+)\]\(([^)]+)\)/.exec(t)!;
      out.push(
        <a key={k++} href={mm[2]} className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
          {mm[1]}
        </a>,
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ content, className = "" }: { content: string; className?: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const cls =
        level === 1
          ? "mt-12 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          : level === 2
            ? "mt-12 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]"
            : "mt-8 font-display text-xl font-semibold text-ink";
      const Tag = (`h${Math.min(level + 1, 4)}`) as "h2" | "h3" | "h4";
      blocks.push(
        <Tag key={key++} className={cls}>
          {inline(h[2])}
        </Tag>,
      );
      i++;
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-2xl border border-line-soft">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface text-[12px] uppercase tracking-[0.12em] text-ash">
              <tr>{head.map((c, j) => <th key={j} className="px-4 py-3 font-semibold">{inline(c)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-line-soft">
                  {r.map((c, j) => <td key={j} className="px-4 py-3 text-graphite">{inline(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (/^(\d+)\.\s/.test(line) || /^[-*]\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\d+\.\s/.test(lines[i]) : /^[-*]\s/.test(lines[i]))) {
        items.push(lines[i].replace(/^(\d+\.|[-*])\s/, ""));
        i++;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List key={key++} className={`my-5 space-y-2.5 pl-1 ${ordered ? "list-none [counter-reset:item]" : ""}`}>
          {items.map((it, j) => (
            <li key={j} className="flex gap-3 text-[16px] leading-relaxed text-graphite">
              {ordered ? (
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-[12px] font-bold text-brand">{j + 1}</span>
              ) : (
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
              )}
              <span>{inline(it)}</span>
            </li>
          ))}
        </List>,
      );
      continue;
    }
    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="my-6 rounded-r-2xl border-l-4 border-accent bg-accent-tint/60 px-5 py-4 text-[17px] italic text-ink">
          {inline(quote.join(" "))}
        </blockquote>,
      );
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|\||\d+\.\s|[-*]\s|>)/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-5 text-[16px] leading-[1.8] text-graphite sm:text-[17px]">
        {para.map((p, j) => (
          <Fragment key={j}>
            {inline(p)}
            {j < para.length - 1 ? " " : null}
          </Fragment>
        ))}
      </p>,
    );
  }

  return <div className={className}>{blocks}</div>;
}
