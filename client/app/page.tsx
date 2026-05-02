// Definimos la forma del objeto Proyecto
interface Project {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
}

export default async function ProjectsPage() {
  const response = await fetch('http://127.0.0.1:3001/projects', { cache: 'no-store' });
  
  // Le decimos a TypeScript que el resultado es un array de Proyectos
  const projects: Project[] = await response.json();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}