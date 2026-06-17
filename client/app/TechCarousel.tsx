'use client';

import React, { useRef, useState } from 'react';

const DEFAULT_TECHS = [
  { name: 'React', category: 'Front-end framework', icon: '⚛️' },
  { name: 'Next.js', category: 'Front-end framework', icon: '▲' },
  { name: 'Vue.js', category: 'Front-end framework', icon: '💚' },
  { name: 'TypeScript', category: 'Front-end language', icon: '📘' },
  { name: 'JavaScript', category: 'Front-end language', icon: '💛' },
  { name: 'HTML5', category: 'Markup language', icon: '🧱' },
  { name: 'CSS3', category: 'Style language', icon: '🎨' },
  { name: 'Tailwind CSS', category: 'Style language', icon: '💨' },
  { name: 'NestJS', category: 'Back-end framework', icon: '🐱' },
  { name: 'Symfony', category: 'Back-end framework', icon: '🎼' },
  { name: 'Java', category: 'Back-end language', icon: '☕' },
  { name: 'PHP', category: 'Back-end language', icon: '🐘' },
  { name: 'Node.js', category: 'JS Runtime-Environment', icon: '🌱' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
  { name: 'MongoDB', category: 'Database', icon: '🍃' },
  { name: 'Docker', category: 'DevOps-Composer', icon: '🐳' },
  { name: 'Git', category: 'Version Control', icon: '🌿' },
];

const GROUP_MAP: Record<string, string> = {
  React: 'Frontend',
  'Next.js': 'Frontend',
  'Vue.js': 'Frontend',
  TypeScript: 'Frontend',
  JavaScript: 'Frontend',
  HTML5: 'Frontend',
  CSS3: 'Frontend',
  'Tailwind CSS': 'Frontend',
  NestJS: 'Backend',
  Symfony: 'Backend',
  Java: 'Backend',
  PHP: 'Backend',
  'Node.js': 'Backend',
  PostgreSQL: 'DB & Version control',
  MongoDB: 'DB & Version control',
  Docker: 'DB & Version control',
  Git: 'DB & Version control',
};

function groupByCategory(techs: typeof DEFAULT_TECHS) {
  const groups: Record<string, typeof DEFAULT_TECHS> = {};
  for (const tech of techs) {
    const key = GROUP_MAP[tech.name];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(tech);
  }
  return Object.entries(groups);
}

function CarouselRow({ category, techs }: { category: string; techs: typeof DEFAULT_TECHS }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsDragging(true);
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeftStart.current = ref.current.scrollLeft;
    ref.current.style.scrollBehavior = 'auto';
    ref.current.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging || !ref.current) return;
    setIsDragging(false);
    ref.current.style.scrollBehavior = 'smooth';
    ref.current.style.scrollSnapType = 'x mandatory';
  };

  return (
    <div className="w-full max-w-7xl mb-8">
      <div className="px-4">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4 text-[var(--text-main)]">
          {category}
        </h3>
      </div>
      <div className="relative overflow-hidden">
        <div
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-6 overflow-x-auto py-2 px-4 scroll-smooth snap-x snap-mandatory carousel-row select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {techs.map((tech, index) => {
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
                    <h4 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                      {tech.name}
                    </h4>
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
    </div>
  );
}

export default function TechCarousel() {
  const groups = groupByCategory(DEFAULT_TECHS);

  return (
    <section id="tech" className="w-full py-20 px-4 md:px-10 flex flex-col items-center bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-500">
      <div className="w-full max-w-7xl text-center md:text-left mb-8 px-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
          Technologies
        </h2>
        <p className="text-lg md:text-xl font-light text-[var(--text-muted)] max-w-2xl">
          A showcase of the tools and languages I work(ed) with.
        </p>
      </div>

      {groups.map(([category, techs]) => (
        <CarouselRow key={category} category={category} techs={techs} />
      ))}

      <style jsx global>{`
        .carousel-row::-webkit-scrollbar {
          display: none;
        }
        .carousel-row {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </section>
  );
}
