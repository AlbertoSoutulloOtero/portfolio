import next from 'next';
import React from 'react';

async function getGithubRepos(){
  const res = await fetch('https://api.github.com/users/AlbertoSoutulloOtero', {next: {revalidate: 3600}});
  if(!res.ok) return 0;
  const data = await res.json();
  return Math.max(0, data.public_repos - 2);
}

export default async function Resume() {

  // Calculating the years I've been programming
  const startProgramingDate = new Date('2022-01-01');
  const today = new Date();
  const yearsOfExperience = Math.floor((today.getTime() - startProgramingDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)) 

  //Published repositories
  const publicRepositories = await getGithubRepos();

  return (
    // Layout en columna sin justify-center global: el centrado vertical vive en el wrapper
    // flex-1 inferior, y las stats quedan siempre en flujo al final (evita solapamientos en portátiles).
    <section id="resume" className="w-full min-h-screen flex flex-col items-center py-16 px-4 md:px-10">

      {/* flex-1 + justify-center: centra hero y botón en el espacio disponible por encima de las stats */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl">

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full">

          <div className="flex-1 space-y-7 text-center md:text-left">
            <h1 className="text-[var(--text-main)] text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase transition-all duration-200 hover:scale-95">
              ALBERTO <br /> 
              <span className="text-[var(--text-muted)]">SOUTULLO</span>
            </h1>
            
            <p className="text-[var(--text-main)] max-w-xl text-xl md:text-2xl font-light leading-relaxed text-balance mx-auto md:mx-0">
              Full Stack Developer specialized in crafting
              <span className="font-semibold"> minimalist</span> ,
              <span className="font-semibold"> high-performance</span> digital experiences.
            </p>

            <div className="w-20 h-1 bg-[var(--text-main)] transition-colors duration-300 mx-auto md:mx-0"></div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end w-full">
            <div className="relative group">
              <div className="w-64 h-64 md:w-80 md:h-80 border-4 border-[var(--text-main)] overflow-hidden rounded-3xl transition-all duration-500 group-hover:scale-105 shadow-[10px_10px_0px_0px_var(--text-muted)]">
                <img 
                  src="/images/1758801253586.jpg" 
                  alt="Tu Foto" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Margen único aquí (sin mt-10 duplicado en el enlace) para separar botón del hero */}
        <div className="flex flex-wrap gap-6 justify-center w-full mt-8 md:mt-24">

          <a 
            href="/cv/CV_AlbertoSoutulloOtero.pdf" 
            download="CV_AlbertoSoutulloOtero.pdf"
            className="px-8 py-3 border-2 border-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] font-bold uppercase tracking-wider transition-all duration-0 hover:duration-300 shadow-[4px_4px_0px_0px_var(--text-muted)] active:translate-y-1 active:shadow-none">
            Download CV
          </a>

        </div>
      </div>

      {/* Antes: md:absolute md:bottom-10 sacaba este bloque del flujo y se montaba sobre el botón en 1080p.
          Ahora: flex-shrink-0 + márgenes responsivos; el botón empuja este contenedor hacia abajo de forma natural. */}
      <div className='flex-shrink-0 mt-8 md:mt-12 lg:mt-16 flex gap-8 md:gap-16 border-t border-[var(--text-main)] pt-8 w-full max-w-xl justify-center'>
        <div className='flex flex-col items-center'>
          <span className='text-4xl md:text-5xl font-black tracking-tighter transition-all duration-500 hover:scale-110'>
            {yearsOfExperience}
          </span>
          <span className='text-[10px] uppercase tracking-[0.2rem] text-[var(--text-muted)] font-bold ps-4'>
            Years of experience
          </span>
        </div>

        <div className='w-px h-12 bg-[var(--text-main)] hidden md:block'></div>

        <div className='flex flex-col items-center pe-12'>
          <span className='text-4xl md:text-5xl font-black tracking-tighter transition-all duration-500 hover:scale-110'>
            {publicRepositories}
          </span>
          <span className='text-[10px] uppercase tracking-[0.2rem] text-[var(--text-muted)] font-bold ps-4'>
            Projects
          </span>
        </div>

      </div>
    </section>
  );
}