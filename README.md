# mpiglet
Minimal ISO 14496-12 / MPEG-4 Part 12 parser

# Goal
Provide a minimalistic viewer with the ability to display boxes and preview `mdat` contained data.

# Usage
`npm i` — install dependencies
`npm start` — run a dev server
`npm test` — run tests

# Behavior
MPiglet produces the following output

- for regular boxes display `Box Type` and `Box Size` in the console
- for `mdat` boxes display the box content in the console as a UTF8 string
- for `mdat` containing image (starting with `data:image`) library consumer display the image on the HTML page

# Assumptions
MPiglet expects valid MPEG-4 Part 12 files only, please be gentle with the little reader. 

# Tech
- Webpack — JS bundling, period. No assets handling, no transpiling or polyfilling
- Jest — test runner
- Webpack-dev-server — for dev-time convenience
- Babel — allows Jest to use `import`

**Rationale**: one of the purposes was to provide the least code transformation possible while maintaining multiple browser support.

This means Babel is not used for the bundle, but the Webpack is in place for code splitting. 

# Browser Support
MPiglet supports latest Chrome, IE 11 and Edge browsers.
Anything with an idea of modern JS should work just fine unless it does not.

## OhMyIE11
- arrow functions
- classes
- promises
- default params
- spread / destructuring
- TextDecoder

And other fun is not for those who want to stay away from polyfills.
