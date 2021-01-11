export abstract class Sdk {
  constructor(parameters) {}
}

export class FlutterSdk extends Sdk {
  constructor(parameters) {
    super(parameters);
  }
}
