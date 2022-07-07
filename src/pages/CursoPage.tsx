import { FaChevronLeft, FaFilePdf, FaVideo } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../libs/Api";

export default function CursoPage() {
  const params = useParams();

  const { data, isLoading } = useQuery(["curso", params.id], async () => {
    toast.loading('Carregando cursos', { toastId: 'loading-cursos'})
    const { data } = await Api.get(`curso/${params.id}`);

    return data;
  }, {
    onSettled: () => {
      toast.dismiss('loading-cursos')
    }
  });
  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {data && data?.data && (
        <div>
          <div className="flex items-center pb-3 border-b ">
            <Link
              to={`/pacote/${params.pacote_id}`}
              className="w-10 h-10 rounded-full justify-center flex items-center hover:bg-slate-100"
            >
              <FaChevronLeft />
            </Link>
            <h1 className="font-bold text-2xl">{data.data.nome}</h1>
          </div>
          <div className="flex flex-col mt-3 bg-white divide-y divide-slate-50 rounded-lg">
            {data?.data.aulas.map((aula: any, index: number) => (
              <div
                key={aula.id}
                className={`p-5 flex relative items-center hover:bg-[#efefef] transition-colors  ${
                  aula.is_disponivel ? "cursor-pointer" : "opacity-50"
                }`}
              >
                <div className="mr-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary-400 text-white">{index}</div>
                </div>
                <div>
                  <p className="text-lg font-bold uppercase">{aula.nome} </p>
                  <p className="text-slate-700 font-light">{aula.conteudo}</p>
                </div>
                <div className="ml-auto">
                
                    <a target="_blank" className="text-gray-700 flex items-center gap-2 px-2" href={aula.pdf}>
                        <FaFilePdf /> <span>PDF </span>
                    </a>
                </div>
                { !aula.is_disponivel &&  <span className="bg-primary-500 absolute right-2 top-2 text-[9px] rounded-full text-white px-1">07/07/2022</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
