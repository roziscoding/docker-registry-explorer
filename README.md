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
> You MUST add http or https to the regisry URL

If you don't want to fill the registry's login, password and url every time you open this application, you can set the enviroment variables described in the sample [.envrc.sample](.envrc.sample). They're all strings and their names are pretty self explanatory.

If you insert anything wrong in the prompts or environment variables, the app will crash and you'll have to kill the terminal session. I'll fix that soon (or, see [I think something should be different](#i-think-something-should-be-different))

If you don't know how to set an environment variable, check [this link](http://bfy.tw/LInH)

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

## I think something should be different
Well, isn't open source beautiful?
PRs are totally welcome and desired :)

> PS: If it's a bug and you think it's my fault, issue me and I'll try to solve it ASAP
