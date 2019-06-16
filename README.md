# mpiglet
Minimal ISO 14496-12 / MPEG-4 Part 12 parser

# Goal
Provide a minimalistic viewer with the ability to display boxes and preview `mdat` contained data.

# Usage
`npm i` — install dependencies
`npm start` — run a dev server

# Behavior
MPiglet produces the following output

- for regular boxes display `Box Type` and `Box Size` in the console
- for `mdat` boxes display the box content in the console as a UTF8 string
- for `mdat` containing image library consumer display the image on the HTML page

# Assumptions
MPiglet expects valid MPEG-4 Part 12 files only, please be gentle with the little reader. 

# Browser Support
MPiglet supports latest Chrome, IE 11 and Edge browsers.
Anything with an idea of modern JS should work just fine unless it does not.
