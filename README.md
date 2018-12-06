docker-registry-explorer
===

Enormously simple [blessed](https://npmjs.org/package/blessed) based cli tool to show repositories and tags available on a given docker registry server

## Usage
- install from npm (or yarn, or pnpm etc)
```bash
npm i -g @rjmunhoz/docker-registry-explorer
```

- run
```bash
drxplore
```

- use the up and down arrow keys to change repositories, hit enter (or return) to select a repositry and load its tags

## Environment variables
> Don't add the `/v2/` suffix to the URL address.

If you don't want to fill the registry's login, password and url every time you open this application, you can set the enviroment variables described in the sample [.envrc.sample](.envrc.sample). They're all strings and their names are pretty self explanatory.

## Running from source

- clone this
```bash
git clone https://github.com/rjmunhoz/docker-registry-explorer.git
```

- go into the newly created folder
```bash
cd docker-registry-explorer
```

- build it
```bash
npm run build
```

- Run it
```bash
node dist/index.js
```
