import { useMemo, useState } from "react";
import { FaChevronLeft, FaSearch } from "react-icons/fa";
import { Link, Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Concurso } from "../../libs/EstrategiaService";

export default function ConcursoDetail() {

  const { concurso_id: id } = useParams()
  const data = useOutletContext<Concurso[]>()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const concurso = useMemo(() => {
    return data.find(c => c.id.toString() === id)
  }, [data, id])

  const filtreds = useMemo(() => {

    return concurso?.cursos
      .filter(c => JSON.stringify(c)
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase()
        .includes(
          search
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
        )) || []

  }, [search, concurso?.cursos])

  return <div className="relative">
    <div className="flex items-center gap-3 border-b pb-3">
      <Link to={`/concursos`}>
        <FaChevronLeft />
      </Link>
      <div>
        <h1 className="font-bold text-2xl">{concurso?.titulo}</h1>
        <span className="font-light text-sm">{concurso?.cursos.length} cursos</span>
      </div>
      <div className="flex flex-1 bg-white h-10 rounded-full ml-auto items-center">
        <input placeholder="Filtrar" className="bg-transparent focus:outline-none px-5 flex-1" value={search} onChange={ev => setSearch(ev.target.value)} type="text" />
        <span className="mr-5 text-gray-400">
          <FaSearch />
        </span>
      </div>
    </div>
    <hr />

    <div className="bg-white rounded mt-4 shadow-sm py-4 divide-y divide-gray-100">
      {filtreds.map(curso => (
        <div onClick={() => navigate(`curso/${curso.id}`)} key={curso.id} className="p-4 cursor-pointer hover:bg-gray-50">
          <div>
            <p className="text-gray-700">{curso.nome}</p>
            <span className="text-gray-400 font-light">{curso.total_aulas} aulas</span>
          </div>
        </div>
      ))}
    </div>

  </div>
}