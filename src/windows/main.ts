import axios, { AxiosInstance } from 'axios'
import blessed from 'blessed'

export class MainWindow {
  private http: AxiosInstance
  private screen: blessed.Widgets.Screen
  private repositoriesList: blessed.Widgets.ListElement
  private tagList: blessed.Widgets.ListElement
  private loading: blessed.Widgets.LoadingElement

  constructor (screen: blessed.Widgets.Screen, login: string, password: string, baseUrl: string) {
    this.screen = screen

    screen.key([ 'r', 'C-r' ], (_ch, _key) => {
      this.populateRepositories()
    })

    this.http = axios.create({
      baseURL: `${baseUrl}/v2`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`
      }
    })

    this.repositoriesList = blessed.list({
      parent: screen,
      top: '0%',
      left: '0%',
      width: '20%',
      height: '100%',
      keys: true,
      border: {
        type: 'line'
      },
      style: {
        selected: {
          bg: 'white',
          fg: 'black'
        }
      }
    })

    this.repositoriesList.on("select", (item: blessed.Widgets.BoxElement, _index: number) => {
      this.populateTags(item.getText())
    })

    this.tagList = blessed.list({
      parent: screen,
      top: '0',
      left: '20%',
      width: '80%',
      height: '100%',
      keys: true,
      border: {
        type: 'line'
      },
      style: {
        selected: {
          bg: 'white',
          fg: 'black'
        }
      }
    })

    this.loading = blessed.loading({
      parent: screen,
      top: 'center',
      left: 'center',
      width: '30%',
      height: '20%'
    })
  }

  private async displayErrorAndExit (error: string) {
    blessed.message({
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: '30%',
      height: '20%',
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: 'red'
        }
      }
    }).error(error, 0, () => { process.exit(1) })
  }

  async populateRepositories (): Promise<void> {
    try {
      this.loading.load('Buscando repositórios')

      this.repositoriesList.clearItems()

      this.screen.render()

      const { data: { repositories } } = await this.http.get('/_catalog')

      this.repositoriesList.setItems(repositories)

      this.loading.stop()

      this.screen.render()
    } catch (err) {
      this.displayErrorAndExit(err.message)
    }
  }

  async populateTags (repositoryName: string) {
    try {
      this.loading.load('Buscando tags')

      this.tagList.clearItems()

      this.screen.render()

      const { data: { tags } } = await this.http.get(`/${repositoryName}/tags/list`)

      this.tagList.setItems(tags)

      this.loading.stop()

      this.screen.render()
    } catch (err) {
      this.displayErrorAndExit(err.message)
    }
  }

  async start () {
    this.repositoriesList.focus()

    await this.populateRepositories()
  }
}
