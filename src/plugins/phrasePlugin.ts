import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

// [phrase [a1]{b1}...[an]{bn}] ->
// <Phrase :phrase="[{character: 'a1', pronunciation: 'b1'}, ...]" />
export default function phrasePlugin(md: MarkdownIt): void {
  const pairPattern = /\[([^\]]*)\]\{([^}]*)\}/g;

  function tokenize(state: any, silent: boolean): boolean {
    const pos = state.pos as number;
    const src = state.src as string;

    if (!src.startsWith("[phrase ", pos)) return false;

    let level = 1;
    let i = pos + 7;
    for (; i < src.length; i++) {
      if (src[i] === "[") level++;
      else if (src[i] === "]") level--;
      if (level === 0) break;
    }
    if (level !== 0) return false;

    const content = src.slice(pos + 7, i);
    const matches = [];
    let m;
    while ((m = pairPattern.exec(content)) !== null) {
      matches.push({ character: m[1], pronunciation: m[2] } as RubyData);
    }
    if (matches.length === 0) return false;

    if (!silent) {
      const token = state.push("phrase", "", 0);
      token.content = matches;
    }

    state.pos = i + 1;
    return true;
  }

  md.inline.ruler.before("character_ruby", "phrase", tokenize);

  md.renderer.rules["phrase"] = (tokens: Token[], idx: number): string => {
    const content = tokens[idx].content;
    return `<Phrase :phrase='${JSON.stringify(content)}' />`;
  };
}
