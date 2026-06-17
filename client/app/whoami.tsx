'use client';

import React from 'react';

export default function Whoami() {
  return (
    <section id="whoami" className="w-full py-20 px-4 md:px-10 flex flex-col items-center bg-[var(--bg-card)] text-[var(--text-main)] transition-colors duration-500 border-t border-[var(--text-main)]">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch justify-between gap-12 md:gap-16">
        
        {/* Left Side: Biography */}
        <div className="flex-1 flex flex-col justify-center space-y-6 text-center md:text-right">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[var(--text-main)] pb-2">
            Who I Am
          </h2>
          <p className="text-[var(--text-main)] text-lg md:text-xl font-light leading-relaxed text-balance">
            Born and raised in the beautiful coastal region of Galicia, Spain, I grew up with a natural curiosity for how the world works. From an early age, technology fascinated me, drawing me deeper into the world of computers and systems. This curiosity quickly turned into a passion for software development. I discovered that through programming, I could build functional, clean, and elegant solutions from scratch, merging logic with creativity to craft meaningful digital experiences.
          </p>
        </div>

        {/* Vertical/Horizontal Separator Bar */}
        <div className="hidden md:block w-px bg-[var(--text-main)] opacity-30 self-stretch"></div>
        <div className="block md:hidden h-px bg-[var(--text-main)] opacity-30 w-full my-4"></div>

        {/* Right Side: Education */}
        <div className="flex-1 flex flex-col justify-center space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[var(--text-main)]">
            Education
          </h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
                Sep 2023 – Mar 2025
              </span>
              <h3 className="text-xl font-bold text-[var(--text-main)] leading-snug">
                Higher National Diploma (HND) in Multi-platform Applications Development (DAM)
              </h3>
              <p className="text-md text-[var(--text-muted)] font-light">
                IES San Clemente
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
                Sep 2021 – Jun 2023
              </span>
              <h3 className="text-xl font-bold text-[var(--text-main)] leading-snug">
                Higher National Diploma (HND) in Web Applications Development (DAW)
              </h3>
              <p className="text-md text-[var(--text-muted)] font-light">
                IES San Clemente
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
                Sep 2019 – Jun 2021
              </span>
              <h3 className="text-xl font-bold text-[var(--text-main)] leading-snug">
                Vocational Training in Microcomputer Systems and Networks (SMR)
              </h3>
              <p className="text-md text-[var(--text-muted)] font-light">
                IES Monte da Vila
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
