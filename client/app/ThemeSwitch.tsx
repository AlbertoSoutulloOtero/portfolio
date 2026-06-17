"use client";

import React, { useState, useEffect } from "react";

const SECTIONS = [
  { id: "resume", label: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z"/></svg> },
  { id: "whoami", label: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q76 0 144 26.5T745-780q53 47 88 111t44 139q-20-11-42-18t-45-10q-19-75-68.5-132T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h260q-29 32-44.5 72T520-324q0 78 31 121t80 94q-36 14-74 21.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm362.5-115.5Q820-295 820-320t-17-42.5Q786-380 761-380q-26 0-43.5 17.5T700-320q0 25 17.5 42.5T760-260q25 0 42.5-17.5ZM760-80q-3 0-16-11l-4-7q-22-38-55.5-67.5T627-232q-14-20-20.5-43.5T600-324q0-66 47-111t113-45q66 0 113 45t47 111q0 25-6.5 48.5T893-232q-24 37-57.5 66.5T780-98l-4 7q-2 5-6.5 8t-9.5 3Z"/></svg> },
  { id: "tech", label: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg> },
  { id: "projects", label: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160l80-80h240q33 0 56.5 23.5T720-720v120h80q33 0 56.5 23.5T880-520v320q0 33-23.5 56.5T800-120H160Zm0-80h640v-320H160v320Zm0-400v80-80Zm0 80h640v-80H160v80Z"/></svg> },
];

export default function ThemeSwitch({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [menuOpen]);

  const buttonBaseStyles = "w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg";
  const subButtonBaseStyles = "w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg text-sm font-bold";

  const dynamicStyles = theme === "light"
    ? "bg-white text-black border-black"
    : "bg-black text-white border-white";

  return (
    <>
      {children}
      <div className="fixed bottom-8 right-8 z-50 flex gap-4 items-center">

        <a
          href="https://github.com/AlbertoSoutulloOtero"
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBaseStyles} ${dynamicStyles}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </a>

        <a
          href="https://linkedin.com/in/albertosoutullootero"
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBaseStyles} ${dynamicStyles}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </a>

        <button
          onClick={toggleTheme}
          className={`${buttonBaseStyles} ${dynamicStyles}`}
        >
          <span className="flex items-center justify-center pointer-events-none">
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                <path d="M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-226.5 56.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
              </svg>
            )}
          </span>
        </button>

        {/* 4th button: dropdown menu for sections */}
        <div data-dropdown className="relative flex items-center justify-center hidden md:flex">
          {SECTIONS.map((section, i) => {
            const offset = -(i + 1) * 60;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`absolute ${subButtonBaseStyles} ${dynamicStyles}`}
                style={{
                  transform: menuOpen
                    ? `translateY(${offset}px) scale(1)`
                    : "translateY(0px) scale(0.3)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${menuOpen ? i * 0.07 : 0}s`,
                  pointerEvents: menuOpen ? "auto" : "none",
                }}
              >
                {section.label}
              </button>
            );
          })}

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`${buttonBaseStyles} ${dynamicStyles} relative z-10`}
          >
            <span className="flex items-center justify-center pointer-events-none text-lg font-bold">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
