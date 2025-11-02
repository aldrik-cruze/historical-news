<div align="center">

# 📰 Historical News

*Explore history, one day at a time*

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success?style=flat-square&logo=github)](https://aldrik-cruze.github.io/historical-news)
[![Vercel](https://img.shields.io/badge/Vercel-Live-black?style=flat-square&logo=vercel)](https://historical-news-git-master-aldrik-cruzes-projects.vercel.app)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Performance](https://img.shields.io/badge/Performance-A+-brightgreen?style=flat-square)](OPTIMIZATIONS.md)

## 🌐 Live Demos

**Choose your preferred deployment:**

<table>
  <tr>
    <td align="center">
      <a href="https://aldrik-cruze.github.io/historical-news">
        <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages"/>
      </a>
      <br/>
      <sub><b>GitHub Pages</b></sub>
      <br/>
      <sub>Static Hosting</sub>
    </td>
    <td align="center">
      <a href="https://historical-news-git-master-aldrik-cruzes-projects.vercel.app">
        <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
      </a>
      <br/>
      <sub><b>Vercel</b></sub>
      <br/>
      <sub>Edge Network</sub>
    </td>
  </tr>
</table>


</div>

---

## 📖 About

Historical News is a modern web application that brings historical events to life. Browse significant events, notable births, and deaths from any day in history through an elegant, responsive interface powered by Wikipedia's "On This Day" API.

## ✨ Features

- 📅 **Browse by Date** - Explore events from any day in history
- 🔍 **Smart Search** - Search across events with intelligent filtering
- 🎭 **Event Filtering** - Filter by Events, Births, or Deaths
- 📆 **Year Range** - Find events within specific time periods
- 🌓 **Dark/Light Mode** - Toggle between themes
- 🧠 **Interactive Quiz** - Test your historical knowledge
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Beautiful animations with Framer Motion
- 🔗 **Social Sharing** - Share events on social media

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/aldrik-cruze/historical-news.git
cd historical-news

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the app.

### 🌐 Deployment Options

**Deploy to GitHub Pages:**
```bash
npm run deploy
```

**Deploy to Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or simply push to GitHub and connect your repository to Vercel for automatic deployments.

## 🛠️ Built With

- [React 18.3.1](https://reactjs.org/) - UI library
- [Vite 5.4.2](https://vitejs.dev/) - Build tool & dev server
- [Framer Motion 11.5.4](https://www.framer.com/motion/) - Animation library
- [Wikipedia API](https://en.wikipedia.org/api/rest_v1/) - Historical data source

## 🚀 Performance Optimizations

This project includes advanced performance optimizations:

- ⚡ **GPU Acceleration** - Hardware-accelerated animations
- 🎯 **Code Splitting** - Separate vendor chunks for better caching
- 🧠 **React.memo** - Prevents unnecessary re-renders (50-70% reduction)
- ⏱️ **Debouncing** - 300ms debounced search input
- 📦 **esbuild Minification** - Fast and efficient bundling
- 🎨 **CSS Optimization** - Content visibility and layout containment
- 📱 **Mobile Optimized** - Reduced animations and GPU usage on mobile

**Performance Metrics:**
- 🏃 40-50% faster initial load
- 🎯 Consistent 60fps scrolling
- 🔋 Improved battery life on mobile

See [OPTIMIZATIONS.md](OPTIMIZATIONS.md) for detailed performance documentation.

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── features/        # NewsFeed, Controls, Filters
│   └── ui/              # Reusable components
├── styles/              # Global styles
├── App.jsx              # Root component
└── main.jsx             # Entry point
```

## 💻 Available Scripts

```bash
npm run dev             # Start development server (localhost:3000)
npm run build           # Build for production
npm run build:github    # Build for GitHub Pages deployment
npm run build:vercel    # Build for Vercel deployment
npm run preview         # Preview production build
npm run deploy          # Deploy to GitHub Pages
```

## 🎨 Key Features

### Smart Filtering
- **All** - View all events
- **Events** - Historical milestones
- **Births** - Notable births
- **Deaths** - Notable deaths

### Date Controls
- Month/Day selection
- Year range filtering
- Multi-date search

### Interactive Elements
- Quiz mode with scoring
- Social media sharing
- Wikipedia article links
- Reading time estimates

## 🔧 Configuration

Customize theme colors in `src/App.css`:

```css
:root {
  --primary-color: #6366F1;
  --secondary-color: #EC4899;
  --accent-color: #F59E0B;
}
```

## 🐛 Troubleshooting

**Blank screen?**
```bash
rebuild.bat  # Windows
```

**Port in use?**
```bash
vite --port 3001
```

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

See [Documentation](docs/DEVELOPER_GUIDE.md) for more help.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [x] ⚡ Advanced performance optimizations
- [x] 🌐 Multi-platform deployment (GitHub Pages + Vercel)
- [x] 🧠 Interactive quiz system
- [x] 🔍 Debounced search with multi-date support
- [x] 🎨 GPU-accelerated animations
- [ ] 👤 User authentication
- [ ] 🔖 Bookmarking system
- [ ] 📊 Timeline visualization
- [ ] 🌍 Multi-language support
- [ ] 📴 PWA capabilities & offline mode

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 👏 Acknowledgments

- [Wikipedia](https://www.wikipedia.org/) - Historical data API
- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- [GitHub Pages](https://pages.github.com/) - Free static hosting
- [Vercel](https://vercel.com/) - Edge network deployment

---

<div align="center">

**Made for Tech Fair 2025**

### 🌐 Live Deployments

[GitHub Pages](https://aldrik-cruze.github.io/historical-news) • [Vercel](https://historical-news-git-master-aldrik-cruzes-projects.vercel.app)

[⬆ Back to Top](#-historical-news)

</div>
