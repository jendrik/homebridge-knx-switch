import type { API, StaticPlatformPlugin, Logging, PlatformConfig, AccessoryPlugin, Service, Characteristic, uuid } from 'homebridge';

import fakegato from 'fakegato-history';
import { Connection } from 'knx';

import { SwitchAccessory } from './accessory.js';

export class SwitchPlatform implements StaticPlatformPlugin {
  public readonly Service: typeof Service;
  public readonly Characteristic: typeof Characteristic;
  public readonly uuid: typeof uuid;

  public readonly fakeGatoHistoryService;

  public readonly connection: Connection;

  private readonly devices: SwitchAccessory[] = [];

  constructor(
    public readonly log: Logging,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.Service = api.hap.Service;
    this.Characteristic = api.hap.Characteristic;
    this.uuid = api.hap.uuid;

    this.fakeGatoHistoryService = fakegato(this.api);

    // connect
    this.connection = new Connection({
      ipAddr: config.ip ?? '224.0.23.12',
      ipPort: config.port ?? 3671,
      handlers: {
        connected: () => {
          log.info('KNX connected');
        },
        error: (connstatus: unknown) => {
          log.error(`KNX status: ${connstatus}`);
        },
      },
    });

    // read devices
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config.devices.forEach((element: any) => {
      if (element.name && element.listen_status && element.set_status) {
        this.devices.push(new SwitchAccessory(this, {
          name: element.name,
          set_status: element.set_status,
          listen_status: element.listen_status,
        }));
      }
    });
  }

  accessories(callback: (foundAccessories: AccessoryPlugin[]) => void): void {
    callback(this.devices);
  }
}
