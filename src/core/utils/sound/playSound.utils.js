export const playSound = (name) => document.getElementById(name)?.play()?.catch(() => {})
export const stopSound = (name) => document.getElementById(name)?.pause()

export const bleepHover = () => playSound('bleep')
export const tapClick = () => playSound('tap')
export const errorSound = () => playSound('buzzer')
