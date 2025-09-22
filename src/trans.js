import { useState, useEffect } from "react";
import sk from "./locales/sk.json";
import en from "./locales/en.json";

const dictionaries = { sk, en };

export function useTranslation(defaultLang = "sk") {
  // Load saved lang from localStorage if available
  const storedLang = localStorage.getItem("lang");
  const [lang, setLangState] = useState(storedLang || defaultLang);

  // Whenever lang changes, save it
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (newLang) => {
    setLangState(newLang);
  };

  const t = (key, vars) => {
    let text = dictionaries[lang][key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        text = text.replace(new RegExp(`{${k}}`, "g"), vars[k]);
      });
    }
    return text;
  };

  return { t, lang, setLang };
}
