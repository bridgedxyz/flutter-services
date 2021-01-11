import { FlutterSdk } from './sdk-manager';

export class FlutterWebManager {
  readonly flutterSdk: FlutterSdk;
  constructor(flutterSdk: FlutterSdk) {
    this.flutterSdk = flutterSdk;
  }
}
