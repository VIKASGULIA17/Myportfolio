// data for Vikas Gulia's Portfolio
export const portfolioData = {
  personal: {
    name: "Vikas Gulia",
    title: "Data Scientist",
    tagline: "Turning data into stories and code into experiences.",
    email: "vikasgulia17@gmail.com",
    phone: "+91 8527910496",
    location: "Delhi, India",
    github: "https://github.com/VIKASGULIA17",
    linkedin: "https://www.linkedin.com/in/vikas-gulia-b28255298",
    instagram: "https://www.instagram.com/orewa__vikas",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },

  about: {
    description: "I'm a passionate Data Scientist and Web Developer with expertise in turning complex data into actionable insights and building seamless digital experiences. Currently pursuing B.C.A. and constantly exploring the intersection of data science and web technologies.",
    highlights: [
      "2+ years of experience in data science and web development",
      "Built 6+ production-ready applications",
      "Expertise in ML model deployment and web integration",
      "Strong background in Front-end development"
    ],
    stats: [
      { label: "Projects Completed", value: "10+" },
      { label: "Technologies Mastered", value: "15+" },
      { label: "Lines of Code", value: "50K+" },
      { label: "Coffee Cups", value: "∞" }
    ]
  },

  projects: [
    {
    id: 7,
    title: "Laptop Scout",
    description:
      "Built a robust data pipeline with automated weekly updates to analyze Amazon laptop prices, featuring an interactive dashboard with advanced filters and highlights for seamless price comparisons and brand insights.",
    tech: ["Python", "Streamlit", "Serp Api", "SQLite","Plotly"],
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/VIKASGULIA17/Laptop-Price-Tracker",
    live: "https://laptop-scout.streamlit.app/",
    category: "Data Science",
    featured: true
  },
  {
    
    id: 1,
    title: "Ani-gpt",
    description:
      "Developed a responsive AI assistant platform featuring an intuitive and conversational interface. Offers intelligent responses using Gemini API while ensuring seamless UX across devices.",
    tech: ["React", "Javascript", "Tailwind CSS", "Framer Motion", "Shadcn", "Supabase"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
    github: "https://github.com/VIKASGULIA17/Gemini-Clone",
    live: "https://ani-gpt.netlify.app/",
    category: "AI/ML",
    featured: true
  },
  
  {
    id: 3,
    title: "Student Marks Performance Prediction",
    description:
      "Designed an ML model to predict student performance based on input factors. Deployed with Streamlit for user-friendly interaction and visualization.",
    tech: ["Python", "scikit-learn", "Streamlit", "pandas"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    github: "https://github.com/VIKASGULIA17/Student_marks_predictor",
    live: "https://studentmarkspredicter.streamlit.app/",
    category: "Data Science",
    featured: true
  },
  
  {
    id: 4,
    title: "Personal Development Tracker",
    description:
      "A self-growth dashboard to monitor personal progress in areas like skills, health, finances, and mood. Offers time tracking, AI-based suggestions, and dynamic visualizations.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Shadcn"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github: "https://github.com/VIKASGULIA17/Personal-development-tracker",
    live: "https://personal-development-tracker.netlify.app/",
    category: "Full Stack",
    featured: true
  },
  {
    id: 5,
    title: "Movie Recommendation System",
    description:
      "Built a content-based movie recommender with a Streamlit dashboard. Enables users to filter and explore personalized suggestions using ML techniques.",
    tech: ["Python", "Streamlit", "pandas", "scikit-learn"],
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/VIKASGULIA17/Movie-recommendation-system",
    live: "https://movie-recommendation-system-by-vikas.streamlit.app",
    category: "Data Science",
    featured: false
  },
  {
    id: 2,
    title: "Nerverse",
    description:
      "Engineered the official website for IITM Janakpuri's tech society, NexVerse. Highlights events, announcements, member profiles, and collaborations via an interactive and modern UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop",
    github: "https://github.com/tejveer755/Nexverse",
    live: "https://nexverse-lake.vercel.app/",
    category: "Web Development",
    featured: false
  },
  {
    id: 6,
    title: "Portfolio Website",
    description:
      "Crafted a sleek, professional portfolio website to showcase projects, skills, and experiences. Features animated transitions, responsive design, and clean visual hierarchy.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Shadcn"],
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/VIKASGULIA17/PortFolio",
    live: "https://vikasguliaportfolio.netlify.app/",
    category: "Front end",
    featured: false
  },
  
  
]
,

  skills: {
    languages: [
      { name: "Python", level: 95, icon: "🐍" },
      { name: "JavaScript", level: 70, icon: "🟨" },
      { name: "Php", level: 85, icon: "🔷" },
      { name: "C++", level: 90, icon: "⚡" },
      { name: "HTML", level: 95, icon: "🌐" },
      { name: "CSS", level: 90, icon: "🎨" }
    ],
    frameworks: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 60, icon: "▲" },
      { name: "Tailwind CSS", level: 90, icon: "💨" },
      { name: "Streamlit", level: 85, icon: "🎯" }
    ],
    dataScience: [
      { name: "pandas", level: 90, icon: "🐼" },
      { name: "scikit-learn", level: 75, icon: "🤖" },
      { name: "Matplotlib", level: 90, icon: "🧠" },
      { name: "Numpy", level: 95, icon: "🔢" },
      { name: "Seaborn", level: 90, icon: "📊" }
    ],
    tools: [
      { name: "Git/GitHub", level: 95, icon: "🔧" },
      { name: "Supabase", level: 85, icon: "⚡" },
      { name: "Power BI", level: 80, icon: "📊" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Linux", level: 85, icon: "🐧" },
      { name: "Vercel", level: 75, icon: "📉" },
    ]
  },

  education: {
    degree: "Bachelor of Computer Applications",
    institution: "IITM Janakpuri",
    year: "2023 - 2026",
    status: "3rd Year (Currently Pursuing)",
    gpa: "9.5/10",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Machine Learning",
      "Web Development",
      "Software Engineering",
      "Computer Networks",
      "Data Science",
      "Photo Shop",
      "C/C++"
    ],
    achievements: [
      "Tech Society Core Member",
      "Code of Duty Winner(problem solving contest)",
      "Leetcode 350+ Problem solved"
    ],
    certifications: [
      
      {
        name: "Data Science & Analytics",
        issuer: "HP LIFE",
        year: "2025",
        description: "Advanced certification covering statistical analysis, data visualization, and predictive modeling"
      },
      {
        name: "Artificial intelligence and machine learning in python",
        issuer: "ShapeMySkills by Dukat",
        year: "2025",
        description: "Intensive training program covering artificial intelligence algorithms and machine learning techniques"
      },
      {
        name: "Python for Data Science",
        issuer: "IBM / Cognitive Class",
        year: "2025",
        description: "Comprehensive course covering Python programming for data analysis, pandas, numpy, and data visualization"
      },
      {
        name: "Code of Duty Winner",
        issuer: "Techno Sapiens",
        year: "2025",
        description: "A Competitive Programming contest"
      },
    ]
  },

blogs: [
  {
    id: 1,
    title: "A Beginner's Guide to Python Data Types",
    excerpt: "Build a solid programming foundation by mastering Python's core data types including integers, strings, and lists.",
    date: "2025-01-11",
    readTime: "6 min read",
    category: "Python",
    image: "https://images.unsplash.com/photo-1690683789978-3cf73960d650?q=80&w=1809&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "https://dev.to/vikas_gulia/exploring-python-data-types-a-beginners-guide-fe2",
    tags: ["Python", "Programming", "Data Types", "Beginners"] 
  },
  {
    id: 2,
    title: "A Practical Guide to Web Scraping with Python",
    excerpt: "Learn to extract useful data from websites using BeautifulSoup and Requests in this hands-on web scraping tutorial.",
    date: "2025-06-22",
    readTime: "9 min read",
    category: "Webscraping",
    image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "https://dev.to/vikas_gulia/web-scraping-in-python-a-practical-guide-for-data-scientists-4012",
    tags: ["Python", "Web Scraping", "BeautifulSoup", "Data Extraction"] 
  },
  {
    id: 3,
    title: "Univariate Analysis in Data Science: From Beginner to Expert",
    excerpt: "Explore techniques to analyze individual features using descriptive statistics and visualization tools in Python.",
    date: "2025-06-24",
    readTime: "10 min read",
    category: "Data Cleaning",
    image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "https://dev.to/vikas_gulia/univariate-analysis-in-data-science-a-complete-beginner-to-pro-guide-5e81",
    tags: ["Data Science", "Analysis", "Statistics", "Python"] 
  },
  {
    id: 4,
    title: "Mastering Multivariate Analysis in Data Science",
    excerpt: "Unlock complex relationships between multiple variables to gain deeper insights through multivariate analysis.",
    date: "2025-06-25",
    readTime: "11 min read",
    category: "Machine Learning",
    image: "https://plus.unsplash.com/premium_photo-1661270415926-37a9d24aff30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "https://dev.to/vikas_gulia/mastering-multivariate-analysis-a-guide-for-data-science-enthusiasts-1gdk",
    tags: ["Data Science", "Multivariate Analysis", "Machine Learning", "Statistics"] 
  },
  {
    id: 5,
    title: "Feature Scaling in ML: What, Why & How",
    excerpt: "Enhance model performance with proper feature scaling using Python's sklearn—normalize, standardize, and succeed.",
    date: "2025-06-25",
    readTime: "7 min read",
    category: "EDA",
    image: "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "https://dev.to/vikas_gulia/feature-scaling-in-machine-learning-why-it-matters-and-how-to-do-it-45m5",
    tags: ["Machine Learning", "Feature Scaling", "Sklearn", "Preprocessing"] 
  },
  {
    id: 6,
    title: "Efficient Data Preprocessing with ColumnTransformer & Pipelines",
    excerpt: "Streamline your preprocessing workflows with ColumnTransformer and Pipelines for scalable machine learning models.",
    date: "2025-06-26",
    readTime: "8 min read",
    category: "Data Preprocessing",
    image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "https://dev.to/vikas_gulia/columntransformer-and-pipelines-in-scikit-learn-clean-scalable-and-powerful-preprocessing-3mff",
    tags: ["Machine Learning", "Preprocessing", "Sklearn", "Pipelines"] 
  },
  {
    id: 7, // Also fix the duplicate ID from 6 to 7
    title: "Mastering Linear Regression with Scikit-Learn",
    excerpt: "Dive into the fundamentals of Linear Regression and build predictive models using Scikit-Learn.",
    date: "2025-06-26",
    readTime: "8 min read",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    slug: "https://dev.to/vikas_gulia/linear-regression-in-machine-learning-the-simplest-yet-most-powerful-start-44k8",
    tags: ["Machine Learning", "Linear Regression", "Sklearn", "Predictive Modeling"] 
  }
]

};