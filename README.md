# Better WAPI WebApp

A web frontend for [Better WAPI](https://github.com/Loupeznik/better-wapi)

![Docker Image Version](https://img.shields.io/docker/v/loupeznik/better-wapi-webapp?style=for-the-badge&logo=docker&link=https%3A%2F%2Fhub.docker.com%2Fr%2Floupeznik%2Fbetter-wapi-webapp%2Ftags)

## Running

```bash
git clone https://github.com/Loupeznik/better-wapi-webapp

npm install -g pnpm
pnpm install

pnpm run dev
```

## Building and configuration

Build the project with `pnpm run build`. The output will be in the `dist` folder.

```bash
pnpm install
pnpm run build
```

Then edit the `dist/config.json` file and set the `API_BASE_URL` to the BaseURL of your [Better WAPI](https://github.com/Loupeznik/better-wapi) instance.

## Screenshots

Create a record

![Create record](.github/screenshot/create.png)

Update a record

![Update record](.github/screenshot/update.png)

List records

![List records](.github/screenshot/list.png)
