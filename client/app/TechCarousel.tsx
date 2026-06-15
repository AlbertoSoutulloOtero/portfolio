'use client';

import React from 'react';

// Tecnologías de demostración (se pueden editar o ampliar después)
const DEFAULT_TECHS = [
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'Next.js', category: 'Framework', icon: '▲' },
  { name: 'TypeScript', category: 'Language', icon: '📘' },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
  { name: 'Node.js', category: 'Backend', icon: '🟢' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
  { name: 'Git', category: 'Version Control', icon: '🐾' },
  { name: 'Docker', category: 'DevOps', icon: '🐳' },
];

export default function TechCarousel() {
  return (
    <section className="w-full py-20 px-4 md:px-10 flex flex-col items-center bg-[var(--bg-card)] text-[var(--text-main)] transition-colors duration-500">
      <div className="w-full max-w-7xl text-center md:text-left mb-12">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
          Technologies
        </h2>
        <p className="text-lg md:text-xl font-light text-[var(--text-muted)] max-w-2xl">
          A showcase of the tools and languages I work with.
        </p>
      </div>

      {/* Contenedor del Carrusel / Fila de Elementos */}
      <div className="w-full max-w-7xl relative overflow-hidden py-4">
        {/* Desvanecimiento en los bordes para look premium */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--bg-page)] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--bg-page)] to-transparent pointer-events-none z-10" />

        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 scroll-smooth no-scrollbar snap-x snap-mandatory">
          {DEFAULT_TECHS.map((tech, index) => {
            // El color de fondo se intercala usando var(--bg-card) para los pares y transparente para los impares.
            const isEven = index % 2 === 0;

            return (
              <div
                key={tech.name}
                className="flex-shrink-0 w-64 snap-center p-8 transition-all duration-300 hover:scale-105 select-none"
                style={{
                  backgroundColor: isEven ? 'var(--bg-card)' : 'transparent',
                  border: isEven ? 'var(--border-card)' : '1px solid transparent',
                  borderRadius: 'var(--radius)',
                  boxShadow: isEven ? 'var(--shadow-card)' : 'none',
                }}
              >
                <div className="flex flex-col items-start gap-4">
                  <span className="text-5xl mb-2" role="img" aria-label={tech.name}>
                    {tech.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                      {tech.name}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)] mt-1">
                      {tech.category}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inyección de estilos para ocultar las scrollbars del carrusel */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
