clear cache and restart
Remove-Item -Recurse -Force .nuxt, node_modules/.cache
npm run dev  