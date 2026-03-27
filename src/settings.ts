import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json');

/**
 * This is the name of the platform that users will use to register the plugin in the Homebridge config.json
 */
export const PLATFORM_NAME = 'knx-switch';

/**
 * This must match the name of your plugin as defined the package.json
 */
export const PLUGIN_NAME = '@jendrik/homebridge-knx-switch';
export const PLUGIN_DISPLAY_NAME: string = packageJson.displayName;
export const PLUGIN_VERSION: string = packageJson.version;
