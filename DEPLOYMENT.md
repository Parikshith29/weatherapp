# Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd weather-app
   vercel
   ```

3. **Add Environment Variable**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add: `VITE_WEATHER_API_KEY=0cee584efc7c8389dcfa1cb21c1c8070`

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Add Environment Variable**
   - Go to Netlify Dashboard
   - Site Settings → Environment Variables
   - Add: `VITE_WEATHER_API_KEY=0cee584efc7c8389dcfa1cb21c1c8070`

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**
   Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.ts**
   Add base URL:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

### Option 4: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=0 /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run**
   ```bash
   docker build -t weather-app .
   docker run -p 80:80 weather-app
   ```

## Environment Variables

Make sure to set the following environment variable in your deployment platform:

```
VITE_WEATHER_API_KEY=0cee584efc7c8389dcfa1cb21c1c8070
```

## Build Configuration

The app is configured for optimal production builds:
- Minified JavaScript
- Optimized CSS
- Tree-shaking enabled
- Code splitting
- Asset optimization

## Performance Tips

1. **Enable Gzip/Brotli compression** on your server
2. **Set proper cache headers** for static assets
3. **Use CDN** for faster global delivery
4. **Enable HTTP/2** for better performance

## Security Considerations

1. **API Key**: Consider using a backend proxy in production to hide the API key
2. **HTTPS**: Always use HTTPS in production
3. **CSP Headers**: Configure Content Security Policy headers
4. **CORS**: Configure CORS if using a separate API

## Monitoring

Consider adding:
- Error tracking (Sentry, Rollbar)
- Analytics (Google Analytics, Plausible)
- Performance monitoring (Lighthouse CI)

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Performance tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed

## Troubleshooting

### Build Fails
- Check Node.js version (v18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

### API Not Working
- Verify environment variable is set
- Check API key is valid
- Verify network requests in browser DevTools

### Styles Not Loading
- Check Tailwind configuration
- Verify PostCSS setup
- Clear build cache

## Support

For issues or questions:
1. Check the README.md
2. Review error logs
3. Check browser console
4. Verify API responses

---

**Happy Deploying! 🚀**
