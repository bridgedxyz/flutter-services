# flutter-services

dart-services re-written in node/ts, supports hot-reloading feature. with dartDDC connection keep-alive

## What does this offer

- custom package (custom pubspec) support
- hot-reloading support
- app build (non-web build / works with CI/CD usage)
- offers exclusive paid plan (super fast build for prototyping)

> that's all! but it gives us total new opportunity

## How it works

flutter-services uses @bazel/worker (a build system by google) for executing dartDDC compile
