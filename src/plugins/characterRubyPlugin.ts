import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

type CharacterRubyData = {
  character: string;
  pronunciation: string;
};

// [a]{b} -> <CharacterRuby :character="a" :pronunciation="b" />
export default function characterRubyPlugin(md: MarkdownIt): void {
  const pattern = /^\[([^\]]+)\]\{([^}]+)\}/;

  function tokenize(state: any, silent: boolean): boolean {
    const pos = state.pos as number;
    const src = state.src as string;
    const input = src.slice(pos);

    const match = pattern.exec(input);
    if (!match) return false;

    if (!silent) {
      const token = state.push("character_ruby", "", 0);
      token.content = {
        character: match[1],
        pronunciation: match[2],
      } as unknown as string;
    }

    state.pos += match[0].length;
    return true;
  }

  md.inline.ruler.before("text", "character_ruby", tokenize);

  md.renderer.rules["character_ruby"] = (
    tokens: Token[],
    idx: number
  ): string => {
    const content = tokens[idx].content as unknown as CharacterRubyData;
    return `<CharacterRuby :character='${JSON.stringify(
      content.character
    )}' :pronunciation='${JSON.stringify(content.pronunciation)}' />`;
  };
}
