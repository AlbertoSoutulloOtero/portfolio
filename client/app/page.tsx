import Resume from "./resume";
import TechCarousel from "./TechCarousel";
import Whoami from "./whoami";
import Projects from "./projects";

interface Project {
  id: number;
  title: string;
  description?: string;
}

export default async function ProjectsPage() {
  // Async fetch for SEO
  //const response = await fetch('http://127.0.0.1:3001/projects', { cache: 'no-store' });
  //const projects: Project[] = await response.json();

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-500">

      <Resume />

      <Whoami />

      <TechCarousel />

      <Projects />

    {/* this is going for later in other component
    <h1 className="text-3xl font-bold mb-8">Mis Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="bg-custom-card p-6 rounded-custom shadow-custom border-2 border-transparent hover:border-custom-accent">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="opacity-70 mt-2">{project.description}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron proyectos o la API no devolvió una lista.</p>
        )}
      </div> */}
    </main>
  );
}