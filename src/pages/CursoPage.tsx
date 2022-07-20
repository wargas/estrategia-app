import { useEffect } from "react";
import { FaChevronLeft, FaFilePdf, FaVideo } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { EstrategiaService } from "../libs/EstrategiaService";

const TOAST_ID = 'load_curso'

export default function CursoPage() {
  const params = useParams();

  useEffect(() => {
    toast.loading('Carregando curso', { toastId: TOAST_ID})

    return () => {
      toast.dismiss(TOAST_ID)
    }
  }, [])

  const { data, isLoading } = useQuery(["curso", params.id], () =>
    EstrategiaService.getCurso(params.id || 0),
    {
      refetchOnWindowFocus: false,
      onSettled: () => {
        toast.dismiss(TOAST_ID)
      }
    }
  );

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {data && data?.data && (
        <div>
          <div className="flex items-center gap-3 pb-3 border-b ">
            <Link
              to={`/pacote/${params.pacote_id}`}
              className="w-10 h-10 rounded-full justify-center flex items-center hover:bg-slate-100"
            >
              <FaChevronLeft />
            </Link>
            <h1 className="font-bold flex text-lg md:text-2xl">{data.data.nome}</h1>
          </div>
          <div className="flex flex-col mt-3 bg-white divide-y divide-slate-50 rounded-lg">
            {data?.data.aulas.map((aula: any, index: number) => (
              <div
                key={aula.id}
                className={`p-5 flex gap-5 relative items-center hover:bg-[#fefefe] transition-colors  ${
                  aula.is_disponivel ? "" : "opacity-50"
                }`}
              >
                <div className="mr-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary-400 text-white">
                    {index}
                  </div>
                </div>
                <Link to={`aula/${aula.id}`}>
                  <p className="text-lg font-bold uppercase">{aula.nome} </p>
                  <p className="text-slate-700 font-light">{aula.conteudo}</p>
                </Link>
                <div className="ml-auto flex">
                  {aula?.tec_concursos && (
                    <a target="_blank" href={aula.tec_concursos}>Questões</a>
                  )}
                  <a
                    target="_blank"
                    className="text-gray-700 flex items-center gap-2 px-2"
                    href={aula.pdf}
                  >
                    <FaFilePdf /> <span>PDF </span>
                  </a>
                </div>
                {!aula.is_disponivel && (
                  <span className="bg-primary-500 absolute right-2 top-2 text-[9px] rounded-full text-white px-1">
                    {new Date(aula?.data_publicacao).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
