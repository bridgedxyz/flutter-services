import assert from 'assert';
import { DART_VM_VERSION } from './dart-vm';

export const kMainDart = 'main.dart';
export const kBootstrapDart = 'bootstrap.dart';

export const kBootstrapFlutterCode = `
import 'dart:ui' as ui;
import 'main.dart' as user_code;

void main() async {
  await ui.webOnlyInitializePlatform();
  user_code.main();
}
`;

export const kBootstrapDartCode = `
import 'main.dart' as user_code;

void main() {
  user_code.main();
}
`;

export const sampleCode = `
void main() {
  print("hello");
}
`;

export const sampleCodeWeb = `
import 'dart:html';

void main() {
  print("hello");
  querySelector('#foo').text = 'bar';
}
`;

export const sampleCodeFlutter = `
import 'package:flutter/material.dart';

void main() async {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: Text('Hey there, boo!'),
        ),
        body: Center(
          child: Text(
            'You are pretty okay.',
          ),
        ),
      ),
    ),
  );
}
`;

// From https://gist.github.com/johnpryan/b6409e10de32b280b8938aa75364fa7b
export const sampleCodeFlutterCounter = `
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '\$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
`;

// From https://gist.github.com/johnpryan/b3ccb26497ac84895540185935ed5825
export const sampleCodeFlutterSunflower = `
import 'package:flutter/material.dart';
import 'dart:math' as math;

final Color primaryColor = Colors.orange;
final TargetPlatform platform = TargetPlatform.android;

void main() {
  runApp(Sunflower());
}

class SunflowerPainter extends CustomPainter {
  static const seedRadius = 2.0;
  static const scaleFactor = 4;
  static const tau = math.pi * 2;

  static final phi = (math.sqrt(5) + 1) / 2;

  final int seeds;

  SunflowerPainter(this.seeds);

  @override
  void paint(Canvas canvas, Size size) {
    var center = size.width / 2;

    for (var i = 0; i < seeds; i++) {
      var theta = i * tau / phi;
      var r = math.sqrt(i) * scaleFactor;
      var x = center + r * math.cos(theta);
      var y = center - r * math.sin(theta);
      var offset = Offset(x, y);
      if (!size.contains(offset)) {
        continue;
      }
      drawSeed(canvas, x, y);
    }
  }

  @override
  bool shouldRepaint(SunflowerPainter oldDelegate) {
    return oldDelegate.seeds != this.seeds;
  }

  // Draw a small circle representing a seed centered at (x,y).
  void drawSeed(Canvas canvas, num x, num y) {
    var paint = Paint()
      ..strokeWidth = 2
      ..style = PaintingStyle.fill
      ..color = primaryColor;
    canvas.drawCircle(Offset(x, y), seedRadius, paint);
  }
}

class Sunflower extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SunflowerState();
  }
}

class _SunflowerState extends State<Sunflower> {
  double seeds = 100.0;

  int get seedCount => seeds.floor();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData().copyWith(
        platform: platform,
        brightness: Brightness.dark,
        sliderTheme: SliderThemeData.fromPrimaryColors(
          primaryColor: primaryColor,
          primaryColorLight: primaryColor,
          primaryColorDark: primaryColor,
          valueIndicatorTextStyle: DefaultTextStyle.fallback().style,
        ),
      ),
      home: Scaffold(
        appBar: AppBar(title: Text("Sunflower")),
        drawer: Drawer(
            child: ListView(
          children: [
            DrawerHeader(
              child: Center(
                child: Container(
                  child: Text(
                    "Sunflower 🌻",
                    style: TextStyle(fontSize: 32),
                  ),
                ),
              ),
            ),
          ],
        )),
        body: Container(
          constraints: BoxConstraints.expand(),
          decoration:
              BoxDecoration(border: Border.all(color: Colors.transparent)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Container(
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.transparent)),
                child: SizedBox(
                  width: 400,
                  height: 400,
                  child: CustomPaint(
                    painter: SunflowerPainter(seedCount),
                  ),
                ),
              ),
              Text("Showing \$seedCount seeds"),
              ConstrainedBox(
                constraints: BoxConstraints.tightFor(width: 300),
                child: Slider.adaptive(
                  min: 20,
                  max: 2000,
                  value: seeds,
                  onChanged: (newValue) {
                    setState(() {
                      seeds = newValue;
                    });
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`;

// From https://gist.github.com/RedBrogdon/ecb28c29c646b7f38139b1e7f44129b7
export const sampleCodeFlutterDraggableCard = `
import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';

main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: PhysicsCardDragDemo(),
    ),
  );
}

class PhysicsCardDragDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('A draggable card!'),
      ),
      body: DraggableCard(
        child: FlutterLogo(
          size: 128,
        ),
      ),
    );
  }
}

class DraggableCard extends StatefulWidget {
  final Widget child;
  DraggableCard({this.child});

  @override
  _DraggableCardState createState() => _DraggableCardState();
}

class _DraggableCardState extends State<DraggableCard>
    with SingleTickerProviderStateMixin {
  AnimationController _controller;
  Alignment _dragAlignment = Alignment.center;
  Animation<Alignment> _animation;

  void _runAnimation(Offset pixelsPerSecond, Size size) {
    _animation = _controller.drive(
      AlignmentTween(
        begin: _dragAlignment,
        end: Alignment.center,
      ),
    );

    final unitsPerSecondX = pixelsPerSecond.dx / size.width;
    final unitsPerSecondY = pixelsPerSecond.dy / size.height;
    final unitsPerSecond = Offset(unitsPerSecondX, unitsPerSecondY);
    final unitVelocity = unitsPerSecond.distance;

    const spring = SpringDescription(
      mass: 30,
      stiffness: 1,
      damping: 1,
    );

    final simulation = SpringSimulation(spring, 0, 1, -unitVelocity);

    _controller.animateWith(simulation);
  }

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);

    _controller.addListener(() {
      setState(() {
        _dragAlignment = _animation.value;
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return GestureDetector(
      onPanDown: (details) {
        _controller.stop();
      },
      onPanUpdate: (details) {
        setState(() {
          _dragAlignment += Alignment(
            details.delta.dx / (size.width / 2),
            details.delta.dy / (size.height / 2),
          );
        });
      },
      onPanEnd: (details) {
        _runAnimation(details.velocity.pixelsPerSecond, size);
      },
      child: Align(
        alignment: _dragAlignment,
        child: Card(
          child: widget.child,
        ),
      ),
    );
  }
}
`;

// From https://gist.github.com/RedBrogdon/40308e0a5f47acba46ba62f4d8be2bf4
export const sampleCodeFlutterImplicitAnimations = `
import 'package:flutter/material.dart';
import 'dart:math';

class DiscData {
  static final _rng = Random();

  double size;
  Color color;
  Alignment alignment;

  DiscData() {
    color = Color.fromARGB(
      _rng.nextInt(200),
      _rng.nextInt(255),
      _rng.nextInt(255),
      _rng.nextInt(255),
    );
    size = _rng.nextDouble() * 40 + 10;
    alignment = Alignment(
      _rng.nextDouble() * 2 - 1,
      _rng.nextDouble() * 2 - 1,
    );
  }
}

void main() async {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Container(
          color: Color(0xFF15202D),
          child: SizedBox.expand(
            child: VariousDiscs(50),
          ),
        ),
      ),
    ),
  );
}

class VariousDiscs extends StatefulWidget {
  final numberOfDiscs;

  VariousDiscs(this.numberOfDiscs);
  
  @override
  _VariousDiscsState createState() => _VariousDiscsState();
}

class _VariousDiscsState extends State<VariousDiscs> {
  final _discs = <DiscData>[];

  @override
  void initState() {
    super.initState();
    _makeDiscs();
  }

  void _makeDiscs() {
    _discs.clear();
    for (int i = 0; i < widget.numberOfDiscs; i++) {
      _discs.add(DiscData());
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() {
        _makeDiscs();
      }),
      child: Stack(
        children: [
          Center(
            child: Text(
              'Click a disc!',
              style: TextStyle(color: Colors.white, fontSize: 50),
            ),
          ),
          for (final disc in _discs)
            Positioned.fill(
              child: AnimatedAlign(
                duration: Duration(milliseconds: 500),
                curve: Curves.easeInOut,
                alignment: disc.alignment,
                child: AnimatedContainer(
                  duration: Duration(milliseconds: 500),
                  decoration: BoxDecoration(
                    color: disc.color,
                    shape: BoxShape.circle,
                  ),
                  height: disc.size,
                  width: disc.size,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
`;

export const sampleCodeMultiFoo = `
import 'bar.dart';

void main() {
  print(bar());
}
`;

export const sampleCodeMultiBar = `
bar() {
  return 4;
}
`;

export const sampleCodeAsync = `
import 'dart:html';

main() async {
  print("hello");
  querySelector('#foo').text = 'bar';
  var foo = await HttpRequest.getString('http://www.google.com');
  print(foo);
}
`;

export const sampleCodeError = `
void main() {
  print("hello")
}
`;

export const sampleCodeErrors = `
void main() {
  print1("hello");
  print2("hello");
  print3("hello");
}
`;

export const sampleStrongError = `
void main() {
  foo('whoops');
}

void foo(int i) {
  print(i);
}
`;

export const sampleDart2Error = `
class Foo {
  final bool isAlwaysNull;
  Foo(this.isAlwaysNull) {}
}

void main(List<String> argv) {
  var x = new Foo(null);
  var y = 1;
  y = x;
}
`;

export class Lines {
  readonly _starts: Array<number> = [];

  constructor(source: string) {
    /// the origin dart code
    ///    final units = source.codeUnits;
    ///for (var i = 0; i < units.length; i++) {
    ///if (units[i] == 10) _starts.add(i);
    ///}

    const units = source;
    for (var i = 0; i < units.length; i++) {
      if (units.codePointAt(i) == 10) this._starts.push(i);
    }
  }

  /// Return the 0-based line number.
  getLineForOffset(offset: number): number {
    assert(offset != null);
    for (var i = 0; i < this._starts.length; i++) {
      if (offset <= this._starts[i]) return i;
    }
    return this._starts.length;
  }
}

/// Returns the version of the current Dart runtime.
///
/// The returned `String` is formatted as the [semver](http://semver.org) version
/// string of the current Dart runtime, possibly followed by whitespace and other
/// version and build details.

export function vmVersion(): string {
  return DART_VM_VERSION;
}

/// If [str] has leading and trailing quotes, remove them.
export function stripMatchingQuotes(str: string): string {
  if (str.length <= 1) return str;

  if (str.startsWith("'") && str.endsWith("'")) {
    str = str.substring(1, str.length - 1);
  } else if (str.startsWith('"') && str.endsWith('"')) {
    str = str.substring(1, str.length - 1);
  }
  return str;
}
