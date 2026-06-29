'use client';

import React from 'react';

const PROJECTS = [
  {
    title: 'Dante´s Memories',
    description:
      'A demo of a game where you play as a vampire trying to survive the demons that betrayed you. Built with Unity and C#.',
    image: '/images/danteshud.png',
    githubUrl: 'https://github.com/AlbertoSoutulloOtero/DantesMemoriesJuego',
  },
  {
    title: 'NorthGZ',
    description:
      'A full-featured e-commerce example for selling posters and masks, built as a modular template that can easily adapt to any product catalog.',
    image: '/images/northgz.png',
    githubUrl: 'https://github.com/AlbertoSoutulloOtero/northgz',
  },
  {
    title: 'Notify-wa',
    description:
      'Node.js/TypeScript CLI tool that runs terminal commands and sends WhatsApp notifications on completion via whatsapp-web.js + Puppeteer (WhatsApp Web API).',
    image: '/images/notifywa.png',
    githubUrl: 'https://github.com/AlbertoSoutulloOtero/notify-wa',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-20 px-4 md:px-10 flex flex-col items-center bg-[var(--bg-card)] text-[var(--text-main)] transition-colors duration-500">
      <div className="w-full max-w-7xl">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
            Projects
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {PROJECTS.map((project, index) => (
            <a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-8 rounded-custom shadow-custom border border-[var(--text-muted)]/20 transition-transform duration-300 hover:scale-[1.01] ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-1 w-full space-y-4 text-center ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg font-light leading-relaxed text-[var(--text-muted)]">
                    {project.description}
                  </p>
                  <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[var(--accent)] group-hover:underline">
                    View on GitHub →
                  </span>
                </div>

                <div className="w-full md:w-80 shrink-0">
                  <div className="relative overflow-hidden rounded-xl border border-[var(--text-muted)]/20">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
