import Api from "./Api";

export class EstrategiaService {
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
