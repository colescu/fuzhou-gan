import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

export type DoubleMode =
  | "pinyin"
  | "ipaStrict"
  | "and"
  | "xor"
  | "left"
  | "right";

function createComponent(
  name: string,
  props: Record<string, string | null | undefined>
): string {
  const attrs = Object.entries(props)
    .filter(([_, value]) => value != null)
    .map(([prop, value]) => `:${prop}='${JSON.stringify(value)}'`)
    .join(" ");
  return `<${name} ${attrs} />`;
}

function createDouble(pinyin: string, ipa: string, mode?: DoubleMode): string {
  return `<Double :mode='${JSON.stringify(mode)}'>
    <template #pinyin>${pinyin}</template>
    <template #ipa>${ipa}</template>
  </Double>`;
}

function createDoublePronunciation(
  language: string,
  pronunciation: string,
  mode?: DoubleMode
) {
  return createDouble(
    createComponent("Pronunciation", {
      language,
      pronunciation,
      format: "pinyin",
    }),
    createComponent("Pronunciation", {
      language,
      pronunciation,
      format: "ipaStrict",
    }),
    mode
  );
}

function renderDoublePronunciation(mode?: DoubleMode) {
  return (tokens: Token[], index: number): string => {
    const { language, pronunciation } = tokens[index]!.meta;
    return createDoublePronunciation(language, pronunciation, mode);
  };
}

export function createInlinePlugin(
  tokenName: string,
  pattern: RegExp,
  meta: string[] | ((match: string[]) => Record<string, any>),
  beforeRule: string = "text",
  renderRule: (tokens: Token[], index: number) => string = (tokens, index) =>
    createComponent(tokenName, tokens[index]!.meta)
) {
  function tokenize(state: any, silent: boolean): boolean {
    const pos = state.pos as number;
    const src = state.src.slice(pos) as string;
    const match = pattern.exec(src);
    if (!match) return false;

    if (!silent) {
      const token = state.push(tokenName, "", 0);
      if (typeof meta === "function") {
        token.meta = meta(match.slice(1));
      } else {
        token.meta = Object.fromEntries(
          meta.map((field, index) => [field, match[index + 1]])
        );
      }
    }

    state.pos += match[0].length;
    return true;
  }

  function plugin(md: MarkdownIt) {
    md.inline.ruler.before(beforeRule, tokenName, tokenize);
    md.renderer.rules[tokenName] = renderRule;
  }

  return plugin;
}

const markdownPlugins = [
  // :p(a) -> <span class="pinyin">a</span>
  createInlinePlugin(
    "Pinyin",
    /^\:p\(([^)\s]+)\)/,
    ["text"],
    undefined,
    (tokens, index) => `<span class="pinyin">${tokens[index]!.meta.text}</span>`
  ),
  // :i(a) -> <span class="ipa">a</span>
  createInlinePlugin(
    "Ipa",
    /^\:i\(([^)\s]+)\)/,
    ["text"],
    undefined,
    (tokens, index) => `<span class="ipa">${tokens[index]!.meta.text}</span>`
  ),
  // :is(a) -> :i(a) with // if pinyin
  createInlinePlugin(
    "IpaSlash",
    /^\:is\(([^)\s]+)\)/,
    ["text"],
    undefined,
    (tokens, index) =>
      createDouble(
        "",
        `<span class="ipa">${tokens[index]!.meta.text}</span>`,
        "right"
      )
  ),
  // :marker(a=b) -> Double Part
  ...(
    [
      ["", undefined],
      ["&", "and"],
      ["x", "xor"],
      ["l", "left"],
      ["r", "right"],
    ] as const
  ).map(([marker, mode]) =>
    createInlinePlugin(
      `Part_${mode}`,
      new RegExp(`^:${marker}\\(([^)\\s]+)=([^)\\s]+)\\)`),
      ["pinyin", "ipa"],
      undefined,
      (tokens, index) => {
        const { pinyin, ipa } = tokens[index]!.meta;
        return createDouble(
          `<span class="pinyin">${pinyin}</span>`,
          `<span class="ipa">${ipa}</span>`,
          mode
        );
      }
    )
  ),
  // {L:a}(mode) -> Double Pronunciation
  createInlinePlugin(
    "Pronunciation",
    /^\{(?:(\w+):)?([^}]+)\}\(([^)]+)\)/,
    ["language", "pronunciation", "mode"],
    undefined,
    (tokens, index) => {
      const { language, pronunciation, mode } = tokens[index]!.meta;
      return createDoublePronunciation(language, pronunciation, mode);
    }
  ),
  // {L:a}D -> {L:a}()
  createInlinePlugin(
    "DoublePronunciation",
    /^\{(?:(\w+):)?([^}]+)\}D/,
    ["language", "pronunciation"],
    "Pronunciation",
    renderDoublePronunciation()
  ),
  // {L:a} -> {L:a}(xor)
  createInlinePlugin(
    "XorPronunciation",
    /^\{(?:(\w+):)?([A-Za-z][^}]+)\}(?![()}D])/,
    ["language", "pronunciation"],
    "DoublePronunciation",
    renderDoublePronunciation("xor")
  ),
  // [a] -> <Character character="a" />
  createInlinePlugin(
    "Character",
    /^\[([\u4e00-\u9fff][^\]]*)\]/,
    ["character"],
    "image"
  ),
  // [a]{L:b} -> <CharacterRuby character="a" pronunciation="b" language="L" />
  createInlinePlugin(
    "CharacterRuby",
    /^\[([^\]]+)\]\{(?:(\w+):)?([^}]+)\}/,
    ["character", "language", "pronunciation"],
    "Character"
  ),
  // @P(L:[a1]{b1}...[an]{bn}) ->
  // <Phrase :phrase='[{character: "a1", pronunciation: "b1"}, ...]' language="L" />
  createInlinePlugin(
    "Phrase",
    /^@P\((?:(\w+):)?([^)]+)\)/,
    (match: string[]) => {
      const [language, content, _] = match;
      return {
        language,
        phrase: [...content!.matchAll(/\[([^\]]+)\]\{([^}]*)\}/g)].map((m) => ({
          character: m[1],
          pronunciation: m[2],
        })),
      };
    },
    "CharacterRuby"
  ),
];

export default markdownPlugins;
