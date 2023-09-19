/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const { authStatus } = useSelector(state => state.auth);

  if(authStatus === 'notAuthenticated'){
    return <Navigate to="/auth/login" />
  } 
  return children;
}

export default ProtectedRoute