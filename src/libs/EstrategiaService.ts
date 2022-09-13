import Api from "./Api";

export class EstrategiaService {

  static async getConcursos(): Promise<ResponseConcursos>   {
    const { data } = await Api.get<ResponseConcursos>('curso');

    return data;
  }

  static async getPacotes() {
    const { data } = await Api.get(`assinatura`);

    return data?.data[0]?.cursos;
  }

  static async getPacote(id: number | string) {
    const { data } = await Api.get(`pacote/${id}`);

    return data;
  }

  static async getCurso(id: number | string) {
    const { data } = await Api.get(`curso/${id}`);

    return data;
  }

  static async getAula(id: number | string) {
    const { data } = await Api.get(`aula/${id}`);

    return data?.data;
  }
}

export interface ResponseConcursos {
  data: {
    concursos: Concurso[]
    cargos: any[]
  }
}


export interface Concurso {
  id: number
  titulo: string
  cursos: Curso[]
}

export interface Curso {
  id: number
  nome: string
  data_inicio: string
  data_retirada: string
  tipo: string
  id_cargos: any[]
  icone?: string
  modalidade: string
  redirect_area_aluno: any
  arquivado: boolean
  favorito: boolean
  total_aulas_visualizadas: number
  total_aulas: number
}