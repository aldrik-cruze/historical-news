<div align="center">

# 📰 Historical News

*Explore history, one day at a time*

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://aldrik-cruze.github.io/historical-news)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

**[Live Demo](https://aldrik-cruze.github.io/historical-news)** • **[Documentation](docs/DOCUMENTATION_INDEX.md)**

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

Visit `http://localhost:5173` to view the app.

## 🛠️ Built With

- [React 18.3.1](https://reactjs.org/) - UI library
- [Vite 5.4.2](https://vitejs.dev/) - Build tool
- [Framer Motion 11.5.4](https://www.framer.com/motion/) - Animations
- [Wikipedia API](https://en.wikipedia.org/api/rest_v1/) - Historical data

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
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
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

- [ ] User authentication
- [ ] Bookmarking system
- [ ] Timeline visualization
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Offline mode

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 👏 Acknowledgments

- [Wikipedia](https://www.wikipedia.org/) - Historical data API
- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

<div align="center">

**Made with ❤️ for Tech Fair 2025**

[⬆ Back to Top](#-historical-news)

</div>
