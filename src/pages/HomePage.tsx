import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { EstrategiaService } from "../libs/EstrategiaService";

const TOAST_ID = "laod_pacotes";

export default function HomePage() {
  useEffect(() => {
    toast.loading("Carregando pacotes", { toastId: TOAST_ID });

    return () => {
      toast.dismiss(TOAST_ID);
    };
  }, []);

  const { data, isLoading } = useQuery(
    "assinatura",
    EstrategiaService.getPacotes,
    {
      refetchOnWindowFocus: false,
      onSettled: () => {
        toast.dismiss(TOAST_ID)
      }
    }
  );

  return (
    <div>
      <h1 className="text-2xl mb-3 uppercase font-bold">Concursos</h1>
      <hr />
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-3 mt-3">
          {data.map((curso: any) => (
            <Link
              key={curso.id}
              to={`pacote/${curso.id}`}
              className="bg-white hover:bg-[#fefefe] cursor-pointer shadow p-5 rounded-lg"
            >
              <p className="font-bold uppercase">{curso.nome}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
