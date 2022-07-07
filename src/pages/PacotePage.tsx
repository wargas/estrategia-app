import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Api from "../libs/Api";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { toast } from "react-toastify";

export default function PacotePage() {
    const params = useParams()
    const { data, isLoading } = useQuery(['pacote', params.id], async () => {
        toast.loading('Carregando pacote...', {toastId: 'load-pacote'})
        const { data } = await Api.get(`pacote/${params.id}`)

        return data
    }, {
        onSettled: () => {
            toast.dismiss('load-pacote')
        }
    })

  return <div>
    {isLoading && <p>Carregando...</p>}
    {data?.data && (
        <div>
            <div className="flex items-center pb-3  border-b ">
               <Link to={`/`} className="w-10 h-10 rounded-full justify-center flex items-center hover:bg-slate-100">
                    <FaChevronLeft />
                </Link> 
                <h1 className="uppercase font-bold text-2xl">{data.data.nome}</h1>
            </div>
            <div className="flex flex-col mt-3 bg-white divide-y divide-slate-50 rounded-lg">
                {data?.data.cursos.map((curso: any) => (
                    <Link key={curso.id} to={`/pacote/${params.id}/curso/${curso.id}`} className="p-5 cursor-pointer flex items-center justify-between">
                        <div>{curso.nome} </div>
                        <button className="text-slate-400">
                            <FaChevronRight />
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )}
    
  </div>;
}
