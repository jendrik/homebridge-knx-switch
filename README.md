# Homebridge KNX Switch

[![npm](https://img.shields.io/npm/v/@jendrik/homebridge-knx-switch)](https://www.npmjs.com/package/@jendrik/homebridge-knx-switch)
[![license](https://img.shields.io/npm/l/@jendrik/homebridge-knx-switch)](LICENSE)
[![homebridge](https://img.shields.io/badge/homebridge-1.8%2B%20%7C%202.0-blue)](https://homebridge.io)
[![node](https://img.shields.io/badge/node-20%20%7C%2022%20%7C%2024-green)](https://nodejs.org)

A [Homebridge](https://homebridge.io) plugin that exposes KNX switches to Apple HomeKit.

## Features

- Control KNX switches via HomeKit
- Separate group addresses for setting and listening to switch status
- Supports KNX IP routers and interfaces (multicast and tunneling)
- History logging via [fakegato-history](https://github.com/simont77/fakegato-history) (visible in the Eve app)
- Configurable via the Homebridge UI

## Requirements

- Homebridge >= 1.8.0 or >= 2.0.0
- Node.js >= 20.18.0
- A KNX IP router or interface reachable on the network

## Installation

### Via Homebridge UI

Search for `@jendrik/homebridge-knx-switch` in the Homebridge UI plugin tab and click **Install**.

### Via CLI

```sh
npm install -g @jendrik/homebridge-knx-switch
```

## Configuration

The plugin can be configured through the Homebridge UI or by editing `config.json` manually.

### Example `config.json`

```json
{
  "platforms": [
    {
      "platform": "knx-switch",
      "ip": "224.0.23.12",
      "port": 3671,
      "devices": [
        {
          "name": "Living Room Light",
          "set_status": "1/1/1",
          "listen_status": "1/1/2"
        },
        {
          "name": "Kitchen Light",
          "set_status": "1/1/3",
          "listen_status": "1/1/4"
        }
      ]
    }
  ]
}
```

### Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `platform` | Yes | `"knx-switch"` | Must be `"knx-switch"` |
| `ip` | No | `224.0.23.12` | IP address of the KNX router or interface |
| `port` | No | `3671` | Port of the KNX router or interface |
| `devices` | Yes | | Array of switch devices (see below) |

### Device Options

| Option | Required | Description |
|--------|----------|-------------|
| `name` | Yes | Display name for the switch in HomeKit |
| `set_status` | Yes | KNX group address for writing switch state (e.g. `1/1/1`) |
| `listen_status` | Yes | KNX group address for reading switch state (e.g. `1/1/2`) |

## Development

### Setup

```sh
git clone https://github.com/jendrik/homebridge-knx-switch.git
cd homebridge-knx-switch
npm install
```

### Build

```sh
npm run build
```

### Lint

```sh
npm run lint
```

### Watch (development mode)

```sh
npm run watch
```

This compiles the plugin, links it to Homebridge, and restarts on source file changes.

## License

[Apache-2.0](LICENSE)
