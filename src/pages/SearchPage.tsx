import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useState } from 'react'
import debounce from 'lodash/debounce'
import qs from 'query-string'
import Api from "../libs/Api";
import { SearchResponse } from "../interfaces/search";


export default function SearchPage() {
    const [query, setQuery] = useState('')

    const { data: dataCursos } = useQuery<SearchResponse>(['search', query], async () => {

        const params = qs.stringify({
            size: 51,
            subscriptions: 146521,
            q: query,
            type: 'pacote',
            boost: 'curso',
            from: 0,
        })

        const { data } = await Api.get<any>(`https://search.estrategiaconcursos.com.br/indexes/products/search?${params}`)

        return data
    }, { enabled: query.length > 0 })

    const { mutate } = useMutation(async (id: any) => {
        const { data } = await Api.post(`https://api.estrategiaconcursos.com.br/api/aluno/assinaturaInscricao?produto_id=${id}`, {inscrito: true})

        console.log(data)
    })

    function handleChangeText(ev: any) {
        setTimeout(() => {
            setQuery(ev.target.value)
        }, 500)
    }

    return <div>
        <div>
            <div className="flex items-center pb-3 gap-3  border-b  mb-4">
                <Link
                    to={`/`}
                    className="w-10 h-10  rounded-full justify-center flex items-center hover:bg-slate-400"
                >
                    <FaChevronLeft />
                </Link>
                <h1 className="uppercase flex-1 font-bold text-lg md:text-2xl">Pesquisar Pacotes</h1>
            </div>
            <div className="bg-white shadow rounded flex">
                <input onChange={handleChangeText} type="text" className="h-12 px-4 border-none bg-transparent flex-1 focus:outline-none" placeholder="Nome do pacote" />
                <button className="w-20 flex items-center justify-center border-l">
                    <FaSearch className="text-gray-400" />
                </button>
            </div>
            <div className="bg-white mt-4 rounded divide-y divide-gray-100">
                {dataCursos?.result.map(curso => (
                    <div key={curso.id} className="px-4 py-4 flex items-center">
                        <div className="flex-1">
                            {curso.name}
                        </div>
                        <div>
                            <button onClick={() => mutate(curso.id)}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}