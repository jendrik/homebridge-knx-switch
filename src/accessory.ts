import { AccessoryConfig, AccessoryPlugin, CharacteristicValue, Service } from 'homebridge';

import { Datapoint } from 'knx';

import { PLUGIN_NAME, PLUGIN_VERSION, PLUGIN_DISPLAY_NAME } from './settings';

import { SwitchPlatform } from './platform';

export class SwitchAccessory implements AccessoryPlugin {
  private readonly uuid_base: string;
  private readonly name: string;
  private readonly displayName: string;
  private readonly set_status: string;
  private readonly listen_status: string;

  private readonly switchService: Service;
  private readonly informationService: Service;

  constructor(
    private readonly platform: SwitchPlatform,
    private readonly config: AccessoryConfig,
  ) {
    this.name = config.name;
    this.set_status = config.set_status;
    this.listen_status = config.listen_status;
    this.uuid_base = platform.uuid.generate(PLUGIN_NAME + '-' + this.name + '-' + this.listen_status);
    this.displayName = this.uuid_base;

    this.informationService = new platform.Service.AccessoryInformation()
      .setCharacteristic(platform.Characteristic.Name, this.name)
      .setCharacteristic(platform.Characteristic.Identify, this.name)
      .setCharacteristic(platform.Characteristic.Manufacturer, '@jendrik')
      .setCharacteristic(platform.Characteristic.Model, PLUGIN_DISPLAY_NAME)
      .setCharacteristic(platform.Characteristic.SerialNumber, this.displayName)
      .setCharacteristic(platform.Characteristic.FirmwareRevision, PLUGIN_VERSION);

    this.switchService = new platform.Service.Switch(this.name);

    const dp_listen_status = new Datapoint({
      ga: this.listen_status,
      dpt: 'DPT1.001',
      autoread: true,
    }, platform.connection);

    const dp_set_status = new Datapoint({
      ga: this.set_status,
      dpt: 'DPT1.001',
    }, platform.connection);

    dp_listen_status.on('change', (oldValue: number, newValue: number) => {
      platform.log.info(`Light Status: ${newValue}`);
      this.switchService.getCharacteristic(platform.Characteristic.On).updateValue(newValue);
    });

    this.switchService.getCharacteristic(platform.Characteristic.On)
      .onSet(async (value: CharacteristicValue) => {
        platform.log.info(`Set Status: ${value}`);
        dp_set_status.write(Boolean(value));
      });
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}