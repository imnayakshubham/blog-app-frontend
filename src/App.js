import './App.css';
import { Route, Routes } from 'react-router-dom';

import React from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';


const Header = React.lazy(() => import('./components/Header/Header.jsx'));
const Login = React.lazy(() => import('./components/Login/Login'))
const Signup = React.lazy(() => import('./components/Signup/Signup'))
const Profile = React.lazy(() => import('./components/Profile/Profile'))
const Blogs = React.lazy(() => import('./components/Blogs/Blogs'))
const ViewBlog = React.lazy(() => import('./components/Blog/Blog'))
const CreateBlog = React.lazy(() => import('./components/Blog/CreateBlog'))
const NotFound = React.lazy(() => import('./components/NotFound/NotFound'))

function App() {
  return (
    <>
      <Header />
      <div style={{ margin: "1.2rem", height: "100vh-60px" }}>
        <Routes>
          <Route path="/login" element={
            <React.Suspense fallback={<></>}>
              <Login />
            </React.Suspense>
          } />
          <Route path="/signup" element={
            <React.Suspense fallback={<></>}>
              <Signup />
            </React.Suspense>
          } />

          <Route path="/" element={
            <React.Suspense fallback={<></>}>
              <Blogs />
            </React.Suspense>
          } />
          <Route path="/create" element={
            <React.Suspense fallback={<></>}>
              <CreateBlog />
            </React.Suspense>
          } />
          <Route path="/blog/:id" element={
            <React.Suspense fallback={<></>}>
              <ViewBlog />
            </React.Suspense>
          } />
          <Route path='/profile' element={<ProtectedRoutes />}>
            <Route path='/profile' element={
              <React.Suspense fallback={<></>}>
                <Profile />
              </React.Suspense>
            } />
          </Route>
          <Route path="*" element={
            <React.Suspense fallback={<></>}>
              <NotFound />
            </React.Suspense>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
