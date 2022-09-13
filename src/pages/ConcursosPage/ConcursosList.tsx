import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Concurso } from "../../libs/EstrategiaService";

export default function ConcursosList() {

  const data =  useOutletContext<Concurso[]>()

  return <div className="relative">
    <h1 className="text-2xl mb-3 uppercase font-bold">Concursos</h1>
    <hr />
    <div className="bg-white shadow-sm divide-y divide-gray-50 py-4 mt-4 rounded">
      {data?.map(concurso => (
        <div key={concurso.id} className="flex p-4 justify-between">
          <div>
            {concurso.titulo}
          </div>
          <div>
            <Link to={`/concursos/${concurso.id}`}>
              detalhe
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
}