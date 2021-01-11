import bazel from '@bazel/worker';

function a(a: string[], o?: { [path: string]: string }): boolean {
  return true;
}

bazel.runWorkerLoop(a);
