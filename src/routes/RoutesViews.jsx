import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import ErrorPage from '../pages/ErrorPage'
import NavbarC from '../components/NavbarC'
import FooterC from '../components/FooterC'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import AdminPage from '../pages/AdminPage'
import ProductPage from '../pages/ProductPage'
import AdminUsersPage from '../pages/AdminUsersPage'
import AdminProductsPage from '../pages/AdminProductsPage'
import UserFavPage from '../pages/UserFavPage'
import UserCartPage from '../pages/UserCartPage'
import AboutPage from '../pages/AboutPage'
import PrivateRoute from '../components/PrivateRoute'

const RoutesViews = () => {

  return (
    <>
      <NavbarC />
      <Routes>
        <Route path='/user-cart' element={
          <PrivateRoute rolRuta={'usuario'}>
            <UserCartPage />
          </PrivateRoute>
        } />
        <Route path='/user-fav' element={
          <PrivateRoute rolRuta={'usuario'}>
            <UserFavPage />
          </PrivateRoute>
        } />
        <Route path='/user' element={
          <PrivateRoute rolRuta={'usuario'}>
            <UserPage />
          </PrivateRoute>
        } />
        <Route path='/adminUsers' element={
          <PrivateRoute rolRuta={'admin'}>
            <AdminUsersPage />
          </PrivateRoute>
        } />
        <Route path='/adminProducts' element={
          <PrivateRoute rolRuta={'admin'}>
            <AdminProductsPage />
          </PrivateRoute>
        } />
        <Route path='/admin' element={
          <PrivateRoute rolRuta={'admin'}>
            <AdminPage />
          </PrivateRoute>
        } />

        <Route path='/about' element={<AboutPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/product/:idProduct' element={<ProductPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <FooterC />
    </>
  )
}

export default RoutesViews