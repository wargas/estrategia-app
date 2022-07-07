import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Api from "../libs/Api";
import { useAuth } from "../providers/AuthProvider";

export default function LoginPage() {

  const auth = useAuth()

  const mutation = useMutation(
    async (values: any) => {
      toast.loading("Autenticando usuário", { toastId: "loading-login" });
      const { data } = await Api.post(`login`, values);

      if(data?.access_token) {
        auth.setToken(data?.access_token, '/')
      } else {
        return new Error('ERROR')
      }
    },
    {
      onSettled: () => {
        toast.dismiss("loading-login");
      },
      onError: () => {
        toast.error("Credenciais invalidas");
      },
    }
  );

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <div className="h-screen bg-primary-500 flex items-center">
      <form
        onSubmit={form.handleSubmit}
        className="w-full flex flex-col gap-3  max-w-md mx-auto shadow rounded bg-white p-5 "
      >
        <div>
          <h1 className="text-4xl text-primary-700 uppercase font-bold">
            Bem vindo ao sistema!
          </h1>
          <span className="text-gray-400 text-sm">
            Informe seus dados do login do estratégia
          </span>
        </div>
        <hr />
        <div className="flex flex-col">
          <label className="text-gray-700">Email</label>
          <input
            className="bg-primary-100 rounded h-10 px-3"
            type="text"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700">Senha</label>
          <input
            className="bg-primary-100 rounded h-10 px-3"
            type="password"
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Senha"
          />
        </div>

        <div className="flex mt-5">
          <button
            disabled={
              mutation.isLoading ||
              form.values.email === "" ||
              form.values.password === ""
            }
            type="submit"
            className="w-full disabled:opacity-50 bg-primary-600 hover:bg-primary-700 transition-colors h-10 rounded text-white uppercase"
          >
            {mutation.isLoading ? "carregando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
