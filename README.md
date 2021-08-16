# IPT-portfolio

[View the website here](https://oliverw10.github.io/IPT-portfolio/)


`versionifier.py` fetches previous versions from the github releases, caches their pages and creates links on versions.html to them.
versions.html is embeded in the main page


(Assuming you have node/npm and python installed) run `npm install` to install local dependancies (minify and gh-pages)

`npm run build` to create the build files (minifies js and gets previous versions)

or

`npm run deploy` to create the build files and deploy them to github pages (gh-pages branch on github)