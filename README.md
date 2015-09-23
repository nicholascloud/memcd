# A tiny memcached command runner

## Usage

```
Usage: memcd [--host=(user:pass@)host:port,...] command ...args
Examples:
  $ memcd get some:key
  $ memcd set some:key value 1000
  $ memcd --host=localhost:11211 stats
  $ memcd help
  $ memcd help [command]

Note:
  If --host is specified it MUST be the first argument to memcd.

Available commands:
  help, stats, flush, get, set, add, replace, delete, increment, decrement
```

## Installation

This utility should be installed globally:

```
$ npm install -g memcd
$ memcd help
```

Alternatively, install and run relative to your project:

```
$ npm install memcd
$ ./node_modules/.bin/memcd help
```

## Notes

This library uses the [memjs](http://amitlevy.com/projects/memjs/) client.

## License

----

The MIT License (MIT)

Copyright (c) 2015 Nicholas Cloud

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
