import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import { EstrategiaService } from "../../libs/EstrategiaService";

export default function ConcursosPage() {

  const { data: dataConcursos, isLoading } = useQuery(['concursos'], () => EstrategiaService.getConcursos())

  if(isLoading) return <div>Carregando...</div>

  return <div className="relative">
    <Outlet context={dataConcursos?.data.concursos} />
  </div>
}