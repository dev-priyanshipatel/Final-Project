import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useSelector(store => store.auth);
    if(isLoading){
        <h1>loading..</h1>
    }
    if(!user) {
        <Navigate to={"/login"} />
    }
  return Children
}

export default ProtectedRoute