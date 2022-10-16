import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
    const { loginResponse } = useSelector(state => state.login)
    return !!loginResponse?.token ? <Outlet /> : <Navigate to="/login" />;
}
