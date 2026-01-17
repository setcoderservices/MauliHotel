import { useTranslation } from "react-i18next";
import logoMauli from "../assets/images/logo-mauli.jpg";

function Navbar() {
  const { i18n } = useTranslation();

  return (
    <nav className="
      fixed top-0 inset-x-0 z-50
      h-20
      bg-white/80 backdrop-blur-xl
      border-b border-black/5
    ">
      <div className="
        max-w-7xl mx-auto
        h-full
        px-6 md:px-10
        flex items-center justify-between
      ">

        {/* 🌿 Logo + Brand */}
        <div className="flex items-center gap-4">
          <img
            src={logoMauli}
            alt="Hotel Mauli Logo"
            className="h-11 w-11 rounded-full object-cover shadow-md"
          />

          <div className="leading-tight">
            <p className="font-heading text-xl tracking-wide text-[#2b2b2b]">
              Hotel Mauli
            </p>
            <span className="text-xs tracking-widest uppercase text-[#C0392B]">
              Kunda Chaha
            </span>
          </div>
        </div>

        {/* 🌍 Language Switcher */}
        <div className="
          flex items-center
          bg-[#F4F4F4]
          rounded-full
          p-1
          shadow-inner
        ">
          {["en", "hi", "mr"].map((lang) => {
            const isActive = i18n.language === lang;

            return (
              <button
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                className={`
                  px-4 py-1.5
                  text-xs md:text-sm
                  rounded-full
                  font-semibold
                  tracking-wider
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#C0392B] text-white shadow-md"
                      : "text-gray-600 hover:text-black"
                  }
                `}
              >
                {lang.toUpperCase()}
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
