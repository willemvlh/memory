npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:wasmachien75/memory.git master:gh-pages