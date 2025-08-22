import {
  getMCFeature,
  MC_FIELDS,
  MC_OPTIONS_MAP,
  type MCField,
} from "./feature-mc";
import {
  getLangFeature,
  LANG_FIELDS,
  LANG_OPTIONS_MAP,
  type LangField,
} from "./feature-lang";

export type Feature = {
  label: string; // displayed
  getter: (entry: MCEntry) => string;
  values: string[];
};

const GROUPS = ["聲母", "韻母", "聲調"] as const;
type FeatureGroup = (typeof GROUPS)[number];
export const GROUP_OPTIONS = GROUPS.map((group) => ({
  value: group,
  label: group,
}));

export function getFieldOptions(language: string, group: FeatureGroup | "") {
  if (language == "") {
    return [];
  }
  const allOptions = language === "MC" ? MC_OPTIONS_MAP : LANG_OPTIONS_MAP;
  return group === ""
    ? Object.entries(allOptions).map(([group, options]) => ({
        type: "group",
        key: group,
        label: group,
        children: options,
      }))
    : allOptions[group];
}

type EmptyFeatureKey = { language: ""; group: ""; field: "" };
export type ValidFeatureKey =
  | { language: "MC"; group: FeatureGroup; field: MCField }
  | { language: Language; group: FeatureGroup; field: LangField };
export type FeatureKey = ValidFeatureKey | EmptyFeatureKey;

export type LangFeatureKey = {
  language: "lang";
  group: FeatureGroup;
  field: LangField;
};

function getEmptyFeatureKey(): EmptyFeatureKey {
  return { language: "", group: "", field: "" };
}

function isFeatureKey({
  language,
  field,
}: {
  language: "MC" | Language | "lang" | "";
  field: string;
}): boolean {
  if (language === "") return false;
  return ((language === "MC" ? MC_FIELDS : LANG_FIELDS) as string[]).includes(
    field
  );
}

export function getFeature(featureKey: ValidFeatureKey): Feature {
  const { language, field } = featureKey;
  return language === "MC"
    ? getMCFeature(field)
    : getLangFeature(language, field);
}

export type PredictForm = {
  Xs: FeatureKey[];
  Y: FeatureKey | LangFeatureKey;
};
export type ValidPredictForm = {
  Xs: ValidFeatureKey[];
  Y: ValidFeatureKey | LangFeatureKey;
};

function getEmptyForm(): PredictForm {
  return {
    Xs: [getEmptyFeatureKey()],
    Y: getEmptyFeatureKey(),
  };
}

function checkForm(form: PredictForm): boolean {
  return [...form.Xs, form.Y].every((formItem) => isFeatureKey(formItem));
}

function getFormActions(form: PredictForm): Record<string, () => void> {
  return {
    addX: () => {
      form.Xs.push(getEmptyFeatureKey());
    },
    deleteX: () => {
      form.Xs.pop();
    },
    clear: () => {
      form.Xs = [getEmptyFeatureKey()];
      form.Y = getEmptyFeatureKey();
    },
    reverse: () => {
      const { Xs, Y } = JSON.parse(JSON.stringify(form));
      if (Y.language === "lang") {
        Y.language = "";
      }
      form.Xs = [Y];
      form.Y = Xs[0];
    },
  };
}

export const PredictFormUtils = {
  getEmptyForm,
  checkForm,
  getFormActions,
};
