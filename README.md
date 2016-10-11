**Simon-game**
Classic game with changing difficulty feature.
Created with React + d3js libraries.

Deployed app:
http://enieste-simon-game.apps.firfi.com/



# deploy
npm run build
git subtree push --prefix build origin gh-pages
git push dokku gh-pages:master
