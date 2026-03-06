import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useSelector(store => store.auth);
    if(isLoading){
        return <h1>loading..</h1>
    }
    if(!user) {
        return <Navigate to={"/login"} />
    }
  return children
}

export default ProtectedRoute