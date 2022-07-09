import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { EstrategiaService } from "../libs/EstrategiaService";
import { useEffect } from "react";
import { toast } from "react-toastify";

const TOAST_ID = 'load_pacote'

export default function PacotePage() {
  const params = useParams();

  useEffect(() => {
    toast.loading('Carregando curso', { toastId: TOAST_ID})

    return () => {
      toast.dismiss(TOAST_ID)
    }
  }, [])


  const { data, isLoading } = useQuery(["pacote", params.id], () =>
    EstrategiaService.getPacote(params?.id || 0),
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
      {data?.data && (
        <div>
          <div className="flex items-center pb-3 gap-3  border-b ">
            <Link
              to={`/`}
              className="w-10 h-10  rounded-full justify-center flex items-center hover:bg-slate-400"
            >
              <FaChevronLeft />
            </Link>
            <h1 className="uppercase flex-1 font-bold text-lg md:text-2xl">{data.data.nome}</h1>
          </div>
          <div className="flex flex-col mt-3 bg-white divide-y divide-slate-50 rounded-lg">
            {data?.data.cursos.map((curso: any) => (
              <Link
                key={curso.id}
                to={`/pacote/${params.id}/curso/${curso.id}`}
                className="p-5 cursor-pointer flex items-center justify-between"
              >
                <div>{curso.nome} </div>
                <button className="text-slate-400">
                  <FaChevronRight />
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
