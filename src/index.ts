import blessed from 'blessed'
import { MainWindow } from './windows/main';

process.on('unhandledRejection', (reason: any, _promise: Promise<any>) => {
  console.error(reason)
  process.exit(1)
})

function readInputFactory(screen: blessed.Widgets.Screen, prompt: blessed.Widgets.PromptElement) {
  return function readPromptInput(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      prompt.readInput(text, '', (err: Error, result: string) => {
        if (err) reject(err)
        resolve(result)
        prompt.hide()
        screen.render()
      })
    })
  }
}

(async () => {
  const screen = blessed.screen()

  screen.key(['escape', 'q', 'C-c'], function (_ch, _key) {
    return process.exit(0);
  });

  const prompt = blessed.prompt({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '30%',
    height: '20%',
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'white'
      }
    }
  })

  const readPromptInput = readInputFactory(screen, prompt)

  const login = process.env.REGISTRY_LOGIN || await readPromptInput('Registry login')
  const passowrd = process.env.REGISTRY_PASSWORD || await readPromptInput('Registry password')
  const url = process.env.REGISTRY_URL || await readPromptInput('Registry URL')

  const mainWindow = new MainWindow(screen, login, passowrd, url)

  mainWindow.start()
})()
