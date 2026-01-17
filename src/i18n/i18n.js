import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🔴 OLD/WRONG: import { resources } from "./data/translations";
// 🟢 NEW/CORRECT: (Note the two dots '..')
import { resources } from "../data/translations"; 

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "mr",         // Default Language: Marathi
    fallbackLng: "en", // Backup Language: English
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;