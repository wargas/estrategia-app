import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useLocalStorage } from 'usehooks-ts'
import Api from '../libs/Api'

export default function LoginPage() {
  const [, setToken] = useLocalStorage('auth_token', '')
  const navigate = useNavigate()

  const mutation = useMutation(
    async (values: any) => {
      const { data } = await Api.post(`login`, values)

      if (data?.access_token) {
        setToken(data?.access_token)
        navigate('/')
      } else {
        return new Error('ERROR')
      }
    },
    {
      onError: () => {
        toast.error('Credenciais invalidas')
      },
    },
  )

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => mutation.mutate(values),
  })

  return (
    <div className="h-screen bg-slate-900 flex items-center">
      <form
        onSubmit={form.handleSubmit}
        className="w-full flex flex-col gap-3  max-w-md mx-auto  p-5 "
      >
        <div>
          <h1 className="text-4xl text-white uppercase font-bold">
            Bem vindo ao sistema!
          </h1>
          <span className="text-gray-400 text-sm">
            Informe seus dados do login do estratégia
          </span>
        </div>
        <div className="flex flex-col">
          <label className="text-white">Email</label>
          <input
            className="bg-gray-800 text-white rounded h-10 px-3"
            type="text"
            {...form.getFieldProps('email')}
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white">Senha</label>
          <input
            className="bg-gray-800 text-white rounded h-10 px-3"
            type="password"
            {...form.getFieldProps('password')}
            placeholder="Senha"
          />
        </div>

        <div className="flex mt-5">
          <button
            disabled={
              mutation.isLoading ||
              form.values.email === '' ||
              form.values.password === ''
            }
            type="submit"
            className="w-full disabled:opacity-50 bg-primary-600 hover:bg-primary-700 transition-colors h-10 rounded text-white uppercase"
          >
            {mutation.isLoading ? 'carregando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  )
}
