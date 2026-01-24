# The Typist [![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-orange.svg)](COPYING.LESSER)
**The Typist** is small typing game where you have to write over a given text as
quickly as you can. Some additional options allow you to tweak difficulty, text
theme, language and even more!

This app comes from a school project on web technologies, i.e. HTML, CSS and JS.
Unfortunately, we aren't authorized to share the subject, but we were allowed to
use TS instead of JS.

> Version: **-**

Currently, only singleplayer is supported, but we are planning to add
multiplayer using named cursor moving with yours!

## Documentation
- **Main instance:** https://thetypist.pimous.dev/

This project is divided into two apps:
- A **front**-end one corresponding to the client side in TS, and what is
  mandatory to validate the course;
- And a future **back**-end one corresponding to the server side handling
  multiplayer, that will probably be made in PHP.

To manage our project and, especially, to transpile TS and prepare **front**
sources, we have chosen to use [Deno](https://deno.com/) instead of the
well-known Node.js. You may ask why? Because it was made by one of the original
creators of the latter in order to fix its conception issues using modern
techniques. Additionally, we are following the current
[Pimous Dev. Conventions](https://github.com/PimousDev/Conventions) so we also
used their configuration of [Webpack](https://webpack.js.org/).

### Technician installation guide
#### Requirements
- A working computer with shell access, ideally on a Linux distribution;
- An installation of Deno (Otherwise, go
  [there](https://docs.deno.com/runtime/getting_started/installation/));
- Probably an installation of git (Otherwise, go
  [there](https://git-scm.com/install/));
- Certainly a file web server and an installation of PHP;
- And optionally a (remote) server that may be able to run containers.

#### Guide
First, download this repository or clone it using:
```bash
git clone https://github.com/Xibitol/TheTypist.git
# or
git clone git@github.com:Xibitol/TheTypist.git
```

Next, if you have an access to one of Pimous Dev. fallback servers and a domain
name like `thetypist.pimous.dev` correctly set up, you may be able to just run:
```bash
deno task deploy
```
**And you're done, the server is deployed!**

Otherwise, the first step is to transpile TS and prepare files:
```bash
deno task compile
```
Then you will have client public files in `out/front/prod/public` and server
files in `out/back/prod`. Take and put them wherever you like, but ideally the
front app on a file web server.

> :bulb: In future updates, we will complete this guide with more information
> about how to deploy the back app.

**Thus, you're done!** Moreover, I recommend you to use
[Caddy](https://caddyserver.com/) as a web server and put all your services
into containers, like [Docker](https://www.docker.com/) ones.

### Developer preparation guide
#### Requirements
- A working computer with shell access, ideally on a Linux distribution;
- For the front app, an installation of Deno and optionally Docker or some kind
  of file web server (Otherwise, go respectively
  [there](https://docs.deno.com/runtime/getting_started/installation/) and
  [there](https://docs.docker.com/engine/install/));
- For the back app, an installation of PHP (Otherwise, go
  [there](https://www.php.net/downloads.php));
- Probably an installation of git (Otherwise, go
  [there](https://git-scm.com/install/));
- Certainly something that can edit text;
- And optionally knowledge in web development.

> :warning: If you are on Windows, be careful to keep Unix-style line endings
> (and shame on you).

#### Front app
First, download this repository or clone it using:
```bash
git clone https://github.com/Xibitol/TheTypist.git
# or
git clone git@github.com:Xibitol/TheTypist.git
```

Next, start your developer journey by installing all dependencies:
```bash
deno install
```
Then, as we are using Webpack, we are able to start a process that will watch
for changes and reprepare everything on-the-fly. To run it, do:
```bash
deno task fwatch
```
Finally, if you have a file web server at your disposal, just set one handler's
document root to `out/front/dev/public`. In more likely cases if you have
Docker, run:
```bash
deno task fserver
```
It will start a container with a Caddy file server pointing to one volume bound
to the right folder at an IP address you will have to discover on your own!
(Probably something close to `172.17.0.X`).

In addition, if you need to clean output files, just run:
```bash
deno task fclean
```

_Now code, spread your wings and fly, little wonder!_

#### Back app
First, download this repository or clone it:
```bash
git clone https://github.com/Xibitol/TheTypist.git
# or
git clone git@github.com:Xibitol/TheTypist.git
```

Next, start your developer journey by doing nothing! Relax, take a cup of herbal
tea and look at front-end web developers in pain.

Then, once you're done, to start and debug the server run:
```bash
deno task bdebug
```
Or without deno: _Soon..._

In addition, if you need to clean output files, just run:
```bash
deno task bclean
```

_Now code, spread your wings and fly, little wonder!_

## License
The typist (Web app and Server)  
Copyright &copy; 2026 - Xibitol & Pierre-Van
(https://github.com/Xibitol/TheTypist)

These apps are free software: you can redistribute them and/or modify them
under the terms of the GNU Lesser General Public License version 3 as published 
by the Free Software Foundation.

The latter are distributed in the hope that they will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

You should have received a copy of the GNU General Public License and the GNU
Lesser General Public License along with these apps (Links:
[GNU GPL v3](COPYING) & [GNU LGPL v3](COPYING.LESSER)). If not, see
https://www.gnu.org/licenses/.

## Developers
> [Xibitol](https://github.com/Xibitol)

> [Pierre-Van](https://github.com/Pierre-Van)

> [Veritis](https://github.com/Veritis23) (Text's Writer)