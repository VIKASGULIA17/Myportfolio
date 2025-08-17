# 🚀 Vikas Gulia - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Data Scientist and Full-Stack Developer. Built with cutting-edge technologies and featuring stunning animations, dark/light theme support, and comprehensive project showcase.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-blue)

## ✨ Features

- **🎨 Modern Design**: Gradient-based UI with purple/pink aesthetic
- **🌓 Dark/Light Theme**: Seamless theme switching with persistent preferences
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🎭 Advanced Animations**: Framer Motion powered smooth transitions
- **⚡ Performance Optimized**: Fast loading with Next.js 15 and Turbopack
- **🎯 Interactive Elements**: Hover effects, particle animations, and scroll animations
- **📊 Dynamic Content**: Real-time LeetCode stats and project showcase
- **🔍 SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.4.4 with App Router
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4.1.11
- **Animations**: Framer Motion 12.23.9
- **Icons**: Lucide React 0.526.0
- **Charts**: Recharts 3.1.0

### Development Tools
- **Language**: TypeScript/JavaScript
- **Build Tool**: Turbopack
- **Linting**: ESLint
- **Package Manager**: npm

### External APIs
- **LeetCode API**: For coding statistics

## 📂 Project Structure

```
📦 portfolio/
├── 📁 public/
│   ├── 🖼️ image.png              # Profile image
│   ├── 📄 vikas_resume.pdf       # Resume file
│   └── 🖼️ leetcode_profile.jpeg  # LeetCode profile
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 layout.js          # Root layout
│   │   ├── 📄 page.js            # Home page
│   │   ├── 📄 globals.css        # Global styles
│   │   └── 📄 client-layout.jsx  # Client wrapper
│   ├── 📁 components/
│   │   ├── 🧩 Header.jsx         # Navigation header
│   │   ├── 🎯 Hero.jsx           # Hero section
│   │   ├── 👤 About.jsx          # About section
│   │   ├── 💼 Projects.jsx       # Projects showcase
│   │   ├── 🛠️ Skills.jsx         # Skills display
│   │   ├── 🎓 Education.jsx      # Education section
│   │   ├── ✍️ Blog.jsx           # Blog posts
│   │   ├── 📞 Contact.jsx        # Contact form
│   │   ├── 🌓 ThemeToggle.jsx    # Theme switcher
│   │   └── 🦶 Footer.jsx         # Footer
│   ├── 📁 data/
│   │   └── 📊 data.js            # Portfolio content
│   ├── 📁 hooks/
│   │   └── 🪝 use-toast.js       # Toast notifications
│   └── 📁 lib/
│       └── 🔧 utils.js           # Utility functions
├── 📄 package.json               # Dependencies
├── 📄 tailwind.config.js         # Tailwind configuration
├── 📄 next.config.mjs            # Next.js configuration
└── 📄 README.md                  # You are here!
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VIKASGULIA17/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theme Colors
The portfolio uses a purple/pink gradient theme. To customize:

1. **Update Tailwind Colors** in `tailwind.config.js`
2. **Modify CSS Variables** in `src/app/globals.css`
3. **Update Gradient Classes** throughout components

### Content Updates
Update your information in `src/data/data.js`:

```javascript
export const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    // ... other fields
  },
  // ... other sections
}
```

### Adding New Sections
1. Create component in `src/components/`
2. Import and add to `src/app/page.js`
3. Update navigation in `src/components/Header.jsx`

## 🌟 Key Features Breakdown

### Animation System
- **Particle Effects**: Floating animated particles in hero section
- **Scroll Animations**: IntersectionObserver-based fade-in effects
- **Hover Effects**: Interactive buttons and cards
- **Theme Transitions**: Smooth color transitions between themes

### Performance Features
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-built pages for faster loading
- **Font Optimization**: Google Fonts with next/font

## 📊 Sections Overview

### 🎯 Hero Section
- Animated introduction with gradient text
- Professional profile image
- Call-to-action buttons
- Floating skill badges (AI, ML, 📊)

### 👤 About Section  
- Personal description and highlights
- Statistics showcase
- Skill icons with animations
- "Always Learning" badge

### 💼 Projects Section
- Featured project cards
- Technology stack displays
- Live demo and GitHub links
- Category-based filtering

### 🛠️ Skills Section
- Animated progress bars
- Category-wise skill grouping
- Interactive hover effects
- Proficiency percentages

### 🎓 Education Section
- Academic background
- Coursework highlights
- Achievements and certifications
- Institution details

### ✍️ Blog Section
- Latest blog posts from Dev.to
- Read time estimates
- Category tags
- External link integration

### 📞 Contact Section
- Contact form
- Social media links
- Location information
- Professional email

## 🔧 Advanced Features

### LeetCode Integration
```javascript
// Displays real-time coding statistics
const leetcodeStats = {
  problemsSolved: "350+",
  contests: "Participated in multiple",
  ranking: "Active contributor"
}
```

### Resume Download
- Direct PDF download functionality
- Hosted resume file
- Accessibility-friendly button

### Mobile Optimization
- Hamburger menu navigation
- Touch-friendly interactions
- Responsive typography
- Mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploy on commits

### Other Platforms
- **Netlify**: Drag & drop build folder
- **GitHub Pages**: Use `next export`
- **Railway**: Connect GitHub repository

## 📈 Performance Metrics

- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons
- **Unsplash** - For high-quality images

## 📬 Connect With Me

- **Portfolio**: [vikasguliaportfolio.netlify.app](https://vikasguliaportfolio.netlify.app/)
- **GitHub**: [@VIKASGULIA17](https://github.com/VIKASGULIA17)
- **LinkedIn**: [Vikas Gulia](https://www.linkedin.com/in/vikas-gulia-b28255298)
- **Email**: vikasgulia17@gmail.com
- **Blog**: [Dev.to Profile](https://dev.to/vikas_gulia)

---

⭐ **Star this repository if you found it helpful!** ⭐

*Built with ❤️ by Vikas Gulia*
