import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'
import { Link, useNavigate } from 'react-router-dom'

export type SignInFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const { showToast } = useAppContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>()

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in Successful!', type: 'SUCCESS' })
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 m-1 shadow-lg p-1 md:p-6 md:m-0 lg:p-10 lg:m-20 rounded-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">Sign In</h2>

      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm w-full font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be atleast 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{' '}
          <Link to="/register" className="underline">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 font-bold hover:bg-blue-500  rounded-full px-8 text-xl hover:text-black"
        >
          Login
        </button>
      </span>
    </form>
  )
}

export default SignIn
