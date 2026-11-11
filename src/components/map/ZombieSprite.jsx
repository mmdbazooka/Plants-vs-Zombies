import ZombieAppearance from '../customizeZombie/ZombieAppearance'

export default function ZombieSprite({ zombie, x, y, slowed = false }) {
    const burned = zombie.hp <= 0
    const custom = zombie.preset && !burned
    const sprite = burned ? 'burnedZombie.gif' : zombie.eating ? zombie.eat : zombie.walk
    const body = custom ? (zombie.eating ? 'eatzombie.gif' : 'Zombie.gif') : sprite

    return (
        <div data-zombie-row={zombie.row + 1} data-eating={zombie.eating} data-custom-zombie={custom ? zombie.preset.skin : undefined}
            className="absolute z-[11] pointer-events-none w-[80px] h-[116px] -translate-y-full"
            style={{ left: x, top: y, filter: slowed ? 'drop-shadow(0 0 7px cyan)' : undefined }}>
            <img src={`../src/assets/images/zombies/${body}`} alt="" className="absolute bottom-0 w-full"
                style={custom ? { clipPath: 'inset(39% 0 0 0)' } : undefined} />
            {custom && (
                <div className={`zombie-portrait ${zombie.eating ? 'zombie-portrait-biting' : ''}`}>
                    <div className="zombie-portrait-layers">
                        <ZombieAppearance preset={zombie.preset} />
                    </div>
                </div>
            )}
        </div>
    )
}
