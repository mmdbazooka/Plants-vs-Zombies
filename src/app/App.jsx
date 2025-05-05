import { RouterProvider  } from 'react-router-dom'
import { useEffect } from 'react'
import router from "./routers/Router"
import AppContext from '../context/appContext'

const App = () => {

    useEffect(() => {
      window.ondragstart = () => false
      container.style.filter = `brightness(${localStorage.getItem("brightness")}%)`
    }, [])

    return (
      <AppContext >
        <RouterProvider router={router}></RouterProvider> 
      </AppContext>
    )
}

export default App