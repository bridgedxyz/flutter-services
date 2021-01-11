import bazel from '@bazel/worker';
import winston from 'winston';
import { FlutterWebManager } from './flutter-web';
import { FlutterSdk, Sdk } from './sdk-manager';

const _logger = winston.createLogger();

export class Compiler {
  readonly _sdk: Sdk;
  readonly _flutterSdk: FlutterSdk;
  readonly _flutterWebManager: FlutterWebManager;
  readonly _dartdevcPath: string;
  // readonly _ddcDriver: bazel.
}
