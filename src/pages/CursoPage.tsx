import { useEffect, useMemo } from 'react'
import { FaChevronLeft, FaFilePdf, FaVideo } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useInterval } from 'usehooks-ts'
import { EstrategiaService } from '../libs/EstrategiaService'

const TOAST_ID = 'load_curso'

export default function CursoPage() {
  const params = useParams()

  const { data, isLoading, isFetching, refetch } = useQuery(
    ['curso', params.id],
    () => EstrategiaService.getCurso(params.id || 0),
  )

  
  useInterval(() => {
    refetch()
  }, 60000)

  return (
    <div className="relative">
      {data && data?.data && (
        <div>
          <div className="flex items-center gap-3 pb-3 border-b ">
            <Link
              to={
                params?.concurso_id
                  ? `/concursos/${params?.concurso_id}`
                  : `/pacote/${params.pacote_id}`
              }
              className="w-10 h-10 rounded-full justify-center flex items-center hover:bg-slate-100"
            >
              <FaChevronLeft />
            </Link>
            <h1 className="font-bold flex text-lg md:text-2xl">
              {data.data.nome}
            </h1>
          </div>
          <div className="flex relative flex-col mt-3 bg-white divide-y divide-slate-50 rounded-lg">
            {data?.data.aulas.map((aula: any, index: number) => (
              <div
                key={aula.id}
                className={`p-5 flex gap-5 relative items-center hover:bg-[#fefefe] transition-colors  ${
                  aula.is_disponivel ? '' : 'opacity-50'
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
                    <a target="_blank" href={aula.tec_concursos}>
                      Questões
                    </a>
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
                    {new Date(aula?.data_publicacao).toLocaleDateString('pt-BR', { timeZone: 'utc'})}
                  </span>
                )}
              </div>
            ))}
            {isFetching && (
              <div className="absolute flex justify-center pt-10 inset-0 bg-white rounded-lg">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
