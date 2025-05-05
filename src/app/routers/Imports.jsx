import { createBrowserRouter } from 'react-router-dom'
import Container from '../../components/Container'
import Loading from '../../screens/Loading'
import StartMenu from '../../screens/StartMenu'
import Level from '../../screens/Level'
import SelectPlants from '../../screens/SelectPlants'
import Help from '../../screens/Help'
import CustomizeZombie from '../../screens/CustomizeZombie'
import { Accessory , Backdrops , Clothes , Eyewear , FacialHair , Hair , Hat , Skin , Tidbits } from '../../components/customizeZombie/index'
import DetailsCard from '../../screens/DetailsCard'
import Achievement from '../../screens/Achievement'
import NotFound from '../../screens/NotFound'
import Guide from '../../screens/Guide'


export { createBrowserRouter , Container , Loading , StartMenu , Level , SelectPlants , Help , CustomizeZombie , Accessory , Backdrops , Clothes , Eyewear , FacialHair , Hair , Hat , Skin , Tidbits , DetailsCard , Achievement , NotFound , Guide }