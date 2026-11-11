import { useContext, useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { initSound, playSound, stopSound, tapClick } from '../core/utils/sound/playSound.utils'
import { context } from '../context/AppContext'

const Container = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { flag } = useContext(context)
    const loadingReady = useRef(false)
    const menuMusic = ['/start-menu', '/help', '/achievement'].includes(pathname) || pathname.startsWith('/customize-zombie')

    useEffect(initSound, [])

    useEffect(() => {
        if (!menuMusic) return
        playSound('startmusic')
        return () => stopSound('startmusic')
    }, [menuMusic])

    useEffect(() => {
        if (pathname !== '/loading') return
        loadingReady.current = false
        const timer = setTimeout(() => { loadingReady.current = true }, 5000)
        return () => clearTimeout(timer)
    }, [pathname])

    const click = () => {
        if (loadingReady.current && pathname === '/loading') {
            navigate('/start-menu')
            tapClick()
        }
    }

    return (
        <div id="container" onClick={click} className={`w-[800px] h-[600px] border-[#999] shadow-[0_0_7px_#999] relative ${flag ? 'overflow-y-scroll' : 'overflow-hidden'} rounded-2xl`}>
            <Outlet />
        </div>
    )
}

export default Container
