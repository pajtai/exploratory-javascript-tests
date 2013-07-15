exploratory-javascript-tests
============================

Some tests to help me remember the behavior of Javascript.

* Vanilla JavaScript tests can be viewed [here](http://pajtai.github.io/exploratory-javascript-tests/).
* jQuery tests can be viewed [here](http://pajtai.github.io/exploratory-javascript-tests/index-jquery.html).

To use this repo, clone it and `npm install` for all the goodies.

Goodies include:

* `grunt server` - for livereload of vanilla js tests.
* `grunt server-jquery` - for livereload of jquery js tests.
* `grunt deploy` - to build to `dist` and push contents of `dist` to the `gh-pages` branch without a merge (since gh-pages should be orphaned) from the current branch.
Included is a meaningful git commit on `gh-pages` indicating where build is from: `Build: 8 Branch: master  Version: 0.0.3 SHA: 9cd5bf8`
