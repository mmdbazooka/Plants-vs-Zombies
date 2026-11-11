import { cp, readdir, readFile } from 'node:fs/promises'
import { basename, extname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

function gameAudio() {
    const moduleId = 'virtual:game-audio'
    const resolvedId = '\0' + moduleId
    const directory = new URL('./src/assets/audio/', import.meta.url)
    const tracks = new Map()

    return {
        name: 'game-audio',
        resolveId(id) {
            if (id === moduleId || id.startsWith(moduleId + '/')) return '\0' + id
        },
        async load(id) {
            if (id === resolvedId) {
                const files = await readdir(directory)
                tracks.clear()
                for (const file of files) {
                    if (!['.mp3', '.ogg'].includes(extname(file))) continue
                    tracks.set(basename(file, extname(file)), file)
                }
                const loaders = [...tracks.keys()].map(name =>
                    `${JSON.stringify(name)}: () => import(${JSON.stringify(moduleId + '/' + name)}).then(module => module.default)`
                )
                return `export default { ${loaders.join(', ')} }`
            }
            if (!id.startsWith(resolvedId + '/')) return

            const file = tracks.get(id.slice(resolvedId.length + 1))
            if (!file) return
            const url = new URL(file, directory)
            this.addWatchFile(fileURLToPath(url))
            const bytes = await readFile(url)
            return `export default "${bytes.toString('base64')}"`
        },
    }
}

const gameImages = {
    name: 'game-images',
    async writeBundle({ dir }) {
        await cp(new URL('./src/assets/images/', import.meta.url), resolve(dir, 'src/assets/images'), { recursive: true })
    },
}

export default defineConfig({
    plugins: [gameAudio(), gameImages, react()],
})
