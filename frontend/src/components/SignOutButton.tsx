import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import * as apiClient from '../api-client'

const SignOutButton = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken')
      showToast({ message: 'Signed Out!', type: 'SUCCESS' })
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const handleClick = () => {
    mutation.mutate()
  }
  return (
    <button
      onClick={handleClick}
      className="flex items-center text-blue-500 px-5 py-2 bg-white rounded-full  font-bold hover:bg-gray-200 hover:text-black"
    >
      Sign Out
    </button>
  )
}
export default SignOutButton
