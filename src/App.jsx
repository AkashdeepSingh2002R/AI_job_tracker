import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

export default function App(){
  return (
    <>
      <Header/>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet/>
      </main>
      <ToastContainer position="top-center" autoClose={1800} />
    </>
  )
}
