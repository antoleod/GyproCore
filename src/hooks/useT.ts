import { useProjectStore } from "../stores/projectStore";
import { translations, type Translations } from "../i18n";

export function useT(): Translations {
  const language = useProjectStore((s) => s.language);
  return translations[language];
}
