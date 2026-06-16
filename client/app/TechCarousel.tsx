'use client';

import React, { useRef, useState } from 'react';

// Tecnologías ampliadas y sincronizadas con tu Github Tech Stack
const DEFAULT_TECHS = [
  // --- Frontend ---
  { name: 'React', category: 'Front-end framework', icon: '⚛️' },
  { name: 'Next.js', category: 'Front-end framework', icon: '▲' },
  { name: 'Vue.js', category: 'Front-end framework', icon: '💚' },
  { name: 'TypeScript', category: 'Front-end language', icon: '📘' },
  { name: 'JavaScript', category: 'Front-end language', icon: '💛' },
  { name: 'HTML5', category: 'Markup language', icon: '🧱' },
  { name: 'CSS3', category: 'Style language', icon: '🎨' },
  { name: 'Tailwind CSS', category: 'Style language', icon: '💨' },

  // --- Backend & Frameworks ---
  { name: 'NestJS', category: 'Back-end framework', icon: '🐱' },
  { name: 'Symfony', category: 'Back-end framework', icon: '🎼' },
  { name: 'Java', category: 'Back-end language', icon: '☕' },
  { name: 'PHP', category: 'Back-end language', icon: '🐘' },

  // --- Runtime environments ---
  { name: 'Node.js', category: 'JS Runtime-Environment', icon: '🌱' },

  // --- Databases & Tools ---
  { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
  { name: 'MongoDB', category: 'Database', icon: '🍃' },
  { name: 'Docker', category: 'DevOps-Composer', icon: '🐳' },
  { name: 'Git', category: 'Version Control', icon: '🌿' },
];

export default function TechCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Manejo de arrastrar con el ratón (Drag-to-Scroll)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    // Guardamos la posición inicial del ratón y el scroll actual
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;

    // Desactivamos temporalmente el efecto suave y el auto-snap para que el arrastre sea instantáneo y natural
    scrollContainerRef.current.style.scrollBehavior = 'auto';
    scrollContainerRef.current.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault(); // Evita selecciones de texto molestas al arrastrar
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    // Multiplicamos por 1.5 para darle más reactividad y velocidad al arrastre
    const walk = (x - startX.current) * 1.5; 
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging || !scrollContainerRef.current) return;
    setIsDragging(false);

    // Al soltar el ratón, reactivamos el scroll suave y el snap-snap para que se alinee perfectamente
    scrollContainerRef.current.style.scrollBehavior = 'smooth';
    scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
  };

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
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-6 overflow-x-auto pb-8 pt-4 px-4 scroll-smooth snap-x snap-mandatory custom-scrollbar select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            // Ayuda a prevenir que se arrastren imágenes nativas o elementos al mover
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {DEFAULT_TECHS.map((tech, index) => {
            // El color de fondo se intercala usando var(--bg-card) para los pares y transparente para los impares.
            const isEven = index % 2 === 0;

            return (
              <div
                key={tech.name}
                className="flex-shrink-0 w-64 snap-center p-8 transition-all duration-300 hover:scale-105 pointer-events-none select-none"
                style={{
                  backgroundColor: isEven ? 'var(--bg-card)' : 'transparent',
                  border: isEven ? 'var(--border-card)' : '1px solid var(--text-muted)',
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

      {/* Inyección de estilos para una barra de desplazamiento minimalista y elegante */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--text-muted);
          opacity: 0.5;
          border-radius: 9999px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--text-main);
        }
        
        /* Soporte para Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--text-muted) rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </section>
  );
}
