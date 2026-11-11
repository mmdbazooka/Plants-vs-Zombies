import { RouterProvider } from 'react-router-dom'
import router from './routers/Router'
import AppContext from '../context/AppContext'

const App = () => (
    <AppContext>
        <RouterProvider router={router} />
    </AppContext>
)

export default App
