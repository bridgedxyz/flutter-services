import bazel from '@bazel/worker';
import winston from 'winston';
import { FlutterWebManager } from './flutter-web';
import { FlutterSdk, Sdk } from './sdk-manager';
import path from "path"
import { spawn } from "child_process"

const _logger = winston.createLogger();

export class Compiler {
  readonly _sdk: Sdk;
  readonly _flutterSdk: FlutterSdk;
  readonly _flutterWebManager: FlutterWebManager;
  readonly _dartdevcPath: string;
  // readonly _ddcDriver: bazel.


  constructor(sdk: Sdk, flutterSdk: FlutterSdk) {
    this._sdk = sdk;
    this._flutterSdk = flutterSdk;

    this._dartdevcPath = path.join(flutterSdk.sdkPath, 'bin', 'dartdevc')
    spawn(this._dartdevcPath, ['--persistent_worker'])
    this._flutterWebManager = new FlutterWebManager(this._flutterSdk)
  }


  importsOkForCompile(imports: Set<string>): boolean {
    throw 'not implemented'
  }

  async warmup(useHtml: boolean = false): Promise<CompilationResults> {
    throw 'not implemented'
  }

  compile(input: string, options?: {
    returnSourceMap?: boolean
  }) {

  }
}



class CompilationResults {
  readonly compiledJS: string;
  readonly sourceMap: string;
  readonly problems: Array<CompilationProblem>;
}


class CompilationProblem {

}