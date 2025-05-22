import type { SettingsStore as _SettingsStore } from "../stores/settings";

export {};

declare global {
  interface Window {
    DICTIONARY: Entry[];
    VARIANTS_MAP: { [character: string]: string[] };
  }

  // precomputed from 音韻地位
  interface MCSyllable {
    聲母: string;
    清濁: string;
    音: string;
    組: string;
    攝: string;
    韻系: string;
    等: string;
    呼: string;
    聲調: string;
    音韻地位: string;
    反切: string;
    中古拼音: string;
    推導撫州話: string;
    推導普通話: string;
    推導廣州話: string;
  }

  interface Entry extends MCSyllable {
    字頭: string;
    撫州話: string;
    文白新: string;
    訓作: string;
    釋義: string;
    廣韻釋義: string;
  }

  type RubyData = {
    character: string;
    pronunciation: string;
  };

  type SettingsStore = _SettingsStore;
}
