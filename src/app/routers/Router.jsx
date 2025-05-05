import { createBrowserRouter , Container , Loading , StartMenu , Level , SelectPlants , Help , CustomizeZombie , Accessory , Backdrops , Clothes , Eyewear , FacialHair , Hair , Hat , Skin , Tidbits , DetailsCard , Achievement , NotFound , Guide } from "./Imports"

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
                path : "/customize-zombie",
                element : <CustomizeZombie />,
                children : [
                    {
                        path : "/customize-zombie/skin",
                        element : <Skin />
                    },
                    {
                        path : "/customize-zombie/hair",
                        element : <Hair />
                    },
                    {
                        path : "/customize-zombie/backdrops",
                        element : <Backdrops />
                    },
                    {
                        path : "/customize-zombie/facial_hair",
                        element : <FacialHair />
                    },
                    {
                        path : "/customize-zombie/hats",
                        element : <Hat />
                    },
                    {
                        path : "/customize-zombie/eyewear",
                        element : <Eyewear />
                    },
                    {
                        path : "/customize-zombie/clothes",
                        element : <Clothes />
                    },
                    {
                        path : "/customize-zombie/tidbits",
                        element : <Tidbits />
                    },
                    {
                        path : "/customize-zombie/accessory",
                        element : <Accessory />
                    }
                ]
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
