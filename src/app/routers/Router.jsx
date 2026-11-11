import { createBrowserRouter , Container , Loading , StartMenu , Level , SelectPlants , Help , CustomizeZombie , DetailsCard , Achievement , NotFound , Guide } from "./Imports"

const router = createBrowserRouter([
    
    {
        path : "/",
        element : <Container />,
        children : [
            {
                path : "/",
                element : <Guide />
            },
            {
                path : "/loading",
                element : <Loading />
            },
            {
                path : "/start-menu",
                element : <StartMenu />
            },
            {
                path : "/select-plants",
                element : <SelectPlants />
            },
            {
                path : "/achievement",
                element : <Achievement />
            },
            {
                path : "/help",
                element : <Help />
            },
            {
                path : "/details-card",
                element : <DetailsCard />
            },
            {
                path : '/customize-zombie/:tab?',
                element : <CustomizeZombie />
            },
            {
                path : "/level",
                element : <Level />,
            },
            {
                path : "*",
                element : <NotFound />
            },
        ]
    },
    
])

export default router
