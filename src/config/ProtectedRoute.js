import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom"
import Loader from "../components/Loader";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if(loading) return <Loader />
  if(!user) return <Navigate to="/" />
  return <>{ children }</>
}

export default ProtectedRoute;