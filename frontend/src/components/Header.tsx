import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="bg-blue-700 py-5">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">TravelNestz</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex items-center text-blue-500 px-5 py-2 bg-white rounded-full  font-bold hover:bg-gray-200"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Header