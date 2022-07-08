import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Api from "../libs/Api";

export default function HomePage() {
  const { data, isLoading } = useQuery("assinatura", async () => {
    const { data } = await Api.get("assinatura");

    return data;
  });

  return (
    <div>
      <h1 className="text-2xl mb-3 uppercase font-bold">Concursos</h1>
      <hr />
      {isLoading ? <div>Carregando...</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-3 mt-3">
            {data.data[0].cursos.map((curso: any) => (
                <Link key={curso.id} to={`pacote/${curso.id}`} className="bg-white hover:bg-[#fefefe] cursor-pointer shadow p-5 rounded-lg">
                    <p className="font-bold uppercase">{curso.nome}</p>
        
                </Link>
            ))}
        </div>
      )}
    </div>
  );
}
