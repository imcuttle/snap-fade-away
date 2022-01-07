# snap-fade-away

[![Build status](https://img.shields.io/travis/imcuttle/snap-fade-away/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/snap-fade-away)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/snap-fade-away.svg?style=flat-square)](https://codecov.io/github/imcuttle/snap-fade-away?branch=master)
[![NPM version](https://img.shields.io/npm/v/snap-fade-away.svg?style=flat-square)](https://www.npmjs.com/package/snap-fade-away)
[![NPM Downloads](https://img.shields.io/npm/dm/snap-fade-away.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/snap-fade-away)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> The effection like Thanos snapping finger

[Live Demo](http://imcuttle.github.io/snap-fade-away)

## Installation

```bash
npm install snap-fade-away
# or use yarn
yarn add snap-fade-away
```

## Usage

```javascript
import snapFadeAway from 'snap-fade-away'

async (() => {
  await snapFadeAway(window.root)
  // Animated!
})()
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### snapFadeAway

[index.js:62-135](https://github.com/imcuttle/snap-fade-away/blob/06b011d5ac98a0fd303d29f00ae74da97fc951eb/index.js#L62-L135 "Source code on GitHub")

The effect like Thanos snapping finger

#### Parameters

-   `elem`  {HTMLElement} The animating element
-   `opts`  {{}}
    -   `opts.frameCount`  {number} (optional, default `20`)
    -   `opts.debug`  {boolean} (optional, default `false`)
    -   `opts.duration`  {string} The animation duration (optional, default `'2s'`)
    -   `opts.relativeElem`  {HTMLElement} Mount on where (optional, default `document.documentElement`)
    -   `opts.canvasClassName`  {string} (optional, default `'snap-fade-away-canvas'`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** 

## Contributing

-   Fork it!
-   Create your new branch:  
    `git checkout -b feature-new` or `git checkout -b fix-which-bug`
-   Start your magic work now
-   Make sure npm test passes
-   Commit your changes:  
    `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
-   Push to the branch: `git push`
-   Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:moyuyc95@gmail.com">moyuyc95@gmail.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟