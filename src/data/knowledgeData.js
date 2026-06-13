// Data for the Knowledge Garden page

export const knowledgeGardenData = {
  currentFocus: [
    {
      id: "spring-boot",
      topic: "Spring Boot",
      why: "To master enterprise-grade backend development and build robust RESTful APIs & microservices.",
      progress: 75,
      goals: ["Learn Spring Security", "Implement OAuth2 & JWT", "Master Hibernate & JPA caching", "Deploy on AWS ECS"]
    },
    {
      id: "backend-dev",
      topic: "Backend Development",
      why: "To understand database design, caching strategies, message queues, and server-side logic scaling.",
      progress: 70,
      goals: ["Master PostgreSQL indexing", "Incorporate Redis caching", "Explore Docker & Kubernetes containerization", "Learn event-driven design with RabbitMQ"]
    },
    {
      id: "dsa",
      topic: "Data Structures & Algorithms",
      why: "To build strong problem-solving muscles and optimize code runtime and memory consumption.",
      progress: 85,
      goals: ["Solve 150+ more Leetcode problems", "Deepen understanding of Graphs and DP", "Practice competitive programming regularly", "Optimize time/space complexity in project code"]
    },
    {
      id: "real-projects",
      topic: "Building Real Projects",
      why: "Because reading tutorials doesn't compare to solving real-world edge cases, handling errors, and deploying live systems.",
      progress: 80,
      goals: ["Scale Code Arena CP platform", "Build a real-time collaborative workspace", "Integrate automated CI/CD pipelines", "Optimize user experience and load performance"]
    },
    {
      id: "swe-fundamentals",
      topic: "Software Engineering Fundamentals",
      why: "To write clean, readable, modular, and maintainable code that can be easily tested and scaled by teams.",
      progress: 75,
      goals: ["Apply SOLID principles daily", "Master Git branching & clean commits", "Practice Test-Driven Development (TDD)", "Study common Gang of Four design patterns"]
    }
  ],

  books: [
    {
      id: "think-like-a-monk",
      title: "How to Think Like a Monk",
      author: "Jay Shetty",
      status: "Read",
      progress: 100,
      theme: "monk",
      keyLessons: [
        "Train your mind for peace, stillness, and purpose daily.",
        "Detach from external validation and look inside for true alignment.",
        "Transform negativity, anger, and fear into service and compassion."
      ],
      takeaways: "This book completely changed how I handle setbacks. As a developer, code will break and systems will crash. Instead of panicking or finding someone to blame, a monk mindset teaches me to pause, analyze the situation calmly, and focus on the solution.",
      notes: "Jay Shetty details his training as a Vedic monk and translates ancient wisdom into actionable advice for daily habits, relationships, and finding your 'Dharma' (your calling). It focuses on clearing mental clutter, discovering purpose, and practicing gratitude.",
      chapters: [
        {
          chapter: "Chapter 1",
          title: "Identity: I Am What I Think I Am Not",
          summary: "We live in other people's expectations, adopting their desires and values. Monk mindset starts with deep self-awareness: filtering out external noise to discover our core values and authentic self."
        },
        {
          chapter: "Chapter 2",
          title: "Negativity: Curing the Cancer of the Mind",
          summary: "Negativity is a contagion. Classify its sources (complainers, critics, gossipers), protect your mental boundaries through non-reactivity, and practice compassionate detachment."
        },
        {
          chapter: "Chapter 3",
          title: "Fear: Welcome to the Jungle",
          summary: "Fear is an early warning system, not a stop sign. Acknowledge and sit with your fears, understand their roots, and transform them into a useful guide for self-growth."
        },
        {
          chapter: "Chapter 4",
          title: "Intention: The Power of Why",
          summary: "The 'why' behind actions dictates their karmic impact. Strip away intentions driven by fear, greed, or pride; instead, align actions with duty, service, and love."
        },
        {
          chapter: "Chapter 5",
          title: "Purpose: Discovering Your Dharma",
          summary: "Dharma is where passion, skills, and usefulness to the world align. Operating in this zone brings natural flow, high energy, and meaningful fulfillment."
        },
        {
          chapter: "Chapter 6",
          title: "Routine: Location Has Energy, Time Has Memory",
          summary: "Habits structure our mental space. Use consistent times and locations for habits to build automation, starting with mindful, phone-free mornings."
        },
        {
          chapter: "Chapter 7",
          title: "The Mind: The Enemy or the Best Friend?",
          summary: "The mind can be a monkey (reactive, scattered, emotional) or a monk (reflective, focused, intentional). Train it through conscious breathing and meditation."
        },
        {
          chapter: "Chapter 8",
          title: "Ego: The Great Deceiver",
          summary: "Ego is a shield to cover up inner insecurity. True strength is humility, recognizing that we do not know everything, and valuing others as much as ourselves."
        },
        {
          chapter: "Chapter 9",
          title: "Gratitude: The Compounding Asset",
          summary: "Gratitude is a muscle. Practicing it daily rewires the brain to seek opportunities and abundance rather than focus on complaints or lacks."
        },
        {
          chapter: "Chapter 10",
          title: "Relationships: Energy Exchanges",
          summary: "Relationships are energy exchanges. Build deep trust by offering presence, accepting others' limitations, and choosing high-value connections."
        },
        {
          chapter: "Chapter 11",
          title: "Service: The Ultimate Dharma",
          summary: "Selfless giving dissolves the ego, brings deep happiness, and aligns our daily work with a higher collective good."
        }
      ]
    },
    {
      id: "ikigai",
      title: "Ikigai",
      author: "Héctor García & Francesc Miralles",
      status: "Read",
      progress: 100,
      theme: "ikigai",
      keyLessons: [
        "Discover your reason for being—the intersection of what you love, what you're good at, what the world needs, and what you get paid for.",
        "Embrace 'Hara Hachi Bu'—eating until you are 80% full to preserve physical vitality.",
        "Cultivate absolute focus and flow in daily tasks (turning work into a form of active meditation)."
      ],
      takeaways: "Finding 'flow' in software engineering is where high-quality code comes from. The book helped me realize that coding is my Ikigai. The deep focus I feel when solving an algorithmic challenge is not just work; it's a source of energy, longevity, and joy.",
      notes: "A study of the residents of Okinawa, Japan—one of the world's Blue Zones with the longest-living people. It details how physical activity, community support (Moai), diet, and having a clear purpose contribute to long-term happiness.",
      chapters: [
        {
          chapter: "Chapter 1",
          title: "Ikigai: The Art of Staying Young While Growing Old",
          summary: "An active mind and a clear purpose are the cornerstones of youthfulness. Never retire; keep doing what you love and maintain a high-quality connection to life."
        },
        {
          chapter: "Chapter 2",
          title: "Anti-Aging Secrets: Little Things That Add Up",
          summary: "Active lifestyle, minimal stress, a balanced mindset, and positive outlook are the best anti-aging treatments. Small daily habits compile over time."
        },
        {
          chapter: "Chapter 3",
          title: "From Logotherapy to Ikigai: Finding Purpose",
          summary: "Logotherapy helps people discover their unique purpose in life, helping them navigate through existential despair and midlife crises."
        },
        {
          chapter: "Chapter 4",
          title: "Find Flow in Everything: Turn Work into Growth",
          summary: "True flow comes from tasks that challenge you just enough. Focus on one task, eliminate distractions, and lose yourself in the process of building."
        },
        {
          chapter: "Chapter 5",
          title: "Masters of Longevity: Words of Wisdom",
          summary: "Wisdom from Okinawan centenarians: live with a warm heart, laugh often, keep active, and cherish your community relationships."
        },
        {
          chapter: "Chapter 6",
          title: "Lessons from the Centenarians: Traditions & Habits",
          summary: "Community support networks (Moai) and celebratory, relaxed routines are vital to reducing psychological stress and preserving wellness."
        },
        {
          chapter: "Chapter 7",
          title: "The Ikigai Diet: What Longest-Living People Eat",
          summary: "Eat a wide variety of plant-based foods, consume green tea, and practice 'Hara Hachi Bu' (eating until you are 80% full)."
        },
        {
          chapter: "Chapter 8",
          title: "Gentle Movements: Exercises from the East",
          summary: "Longevity is linked to constant, light movement. Practices like Yoga, Tai Chi, Qigong, and Radio Taiso sustain physical flexibility and energy flow."
        },
        {
          chapter: "Chapter 9",
          title: "Resilience and Wabi-Sabi: Face Life without Stress",
          summary: "Accept impermanence and imperfection (Wabi-Sabi). Focus on the present moment, adapt to change, and handle stress with equanimity."
        }
      ]
    },
    {
      id: "rich-dad-poor-dad",
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      status: "Read",
      progress: 100,
      theme: "finance",
      keyLessons: [
        "The rich don't work for money; they make money work for them.",
        "Understand the difference between an asset (puts money in your pocket) and a liability (takes money out).",
        "Financial literacy and continuous learning are far more valuable than a high salary alone."
      ],
      takeaways: "This book shifted my focus from just acquiring technical skills to understanding business, product value, and financial intelligence. Writing code is an asset creation process. By building software projects, I am crafting digital assets that solve real problems.",
      notes: "Robert Kiyosaki contrasts the financial mindset of his highly-educated but financially struggling biological father (Poor Dad) with his friend's entrepreneur father (Rich Dad), exploring how beliefs about money dictate lifetime wealth.",
      chapters: [
        {
          chapter: "Chapter 1",
          title: "Lesson 1: The Rich Don't Work for Money",
          summary: "The middle class works for wages, trapped by fear and greed in the 'Rat Race'. The rich focus on learning and creating assets that produce income."
        },
        {
          chapter: "Chapter 2",
          title: "Lesson 2: Why Teach Financial Literacy?",
          summary: "It's not how much you earn, but how much you keep. Assets put money in your pocket; liabilities (like credit debt or excessive mortgages) take money out."
        },
        {
          chapter: "Chapter 3",
          title: "Lesson 3: Mind Your Own Business",
          summary: "Keep your day job but start building and acquiring assets—like investments, stock options, intellectual property, or side businesses."
        },
        {
          chapter: "Chapter 4",
          title: "Lesson 4: The History of Taxes & Power of Corporations",
          summary: "Learn how the rich use corporations to legally minimize taxes, pay expenses before taxes, and shield assets from lawsuits."
        },
        {
          chapter: "Chapter 5",
          title: "Lesson 5: The Rich Invent Money",
          summary: "Financial intelligence is about seeing opportunities others miss. Cultivate creativity and boldness to structure deals and generate capital."
        },
        {
          chapter: "Chapter 6",
          title: "Lesson 6: Work to Learn—Don't Work for Money",
          summary: "Seek jobs for what you can learn rather than what you can earn. Master communication, sales, marketing, and systems engineering."
        },
        {
          chapter: "Chapter 7",
          title: "Overcoming Obstacles",
          summary: "To succeed, you must manage and overcome five major blocks: fear of losing money, cynicism, laziness, bad habits, and arrogance."
        },
        {
          chapter: "Chapter 8",
          title: "Getting Started: Awakening Your Financial Genius",
          summary: "Start by defining a deep purpose, choosing quality associations, investing in your education, and paying yourself first."
        },
        {
          chapter: "Chapter 9",
          title: "Still Want More? Action Steps",
          summary: "Concrete steps to start immediately: stop doing what isn't working, search for new ideas, take classes, and start making offers."
        }
      ]
    },
    {
      id: "bhagavad-gita",
      title: "Bhagavad Gita",
      author: "Vyasa",
      status: "Currently Reading",
      progress: 45,
      theme: "gita",
      keyLessons: [
        "Karmanye Vadhikaraste—You have a right to perform your prescribed duty, but you are not entitled to the fruits of your actions.",
        "Perform your work with dedication, offering the results to a higher purpose, remaining detached from success and failure.",
        "Self-mastery, focus, and equanimity are the paths to inner peace and ultimate liberation."
      ],
      takeaways: "As an engineer, it's easy to get frustrated when a deployment fails or obsessed with external metrics (likes, stars, grades). The Gita teaches me to focus 100% on the quality of my work (my duty) and let go of the anxiety about outcomes. The process is the reward.",
      notes: "A sacred Hindu text set in a conversation between Prince Arjuna and Lord Krishna on a battlefield. It addresses duty, righteousness, spiritual paths (Yoga), and overcoming existential doubt and mental conflict.",
      chapters: [
        {
          chapter: "Chapter 1",
          title: "Arjuna Vishada Yoga: The Grief of Arjuna",
          summary: "On the battlefield, Prince Arjuna falls into existential despair and grief, refusing to fight and questioning the moral purpose of war."
        },
        {
          chapter: "Chapter 2",
          title: "Sankhya Yoga: The Yoga of Knowledge",
          summary: "Krishna teaches the eternity of the soul (Atman) vs the transient body, introducing detachment, selfless duty, and equanimity of mind."
        },
        {
          chapter: "Chapter 3",
          title: "Karma Yoga: The Yoga of Action",
          summary: "Action is essential. Krishna teaches Nishkama Karma—selfless action done as a duty and sacrifice, detached from personal rewards."
        },
        {
          chapter: "Chapter 4",
          title: "Jnana Karma Sanyasa Yoga: Wisdom and Action",
          summary: "The yoga of wisdom and action. Krishna details the purification of action through spiritual knowledge and selfless intent."
        },
        {
          chapter: "Chapter 5",
          title: "Karma Sanyasa Yoga: Action vs Renunciation",
          summary: "Action vs renunciation. Krishna explains that performing actions in devotion is spiritually superior to abandoning work entirely."
        },
        {
          chapter: "Chapter 6",
          title: "Dhyana Yoga: The Yoga of Meditation",
          summary: "The yoga of meditation. Krishna explains how to control and still the restless mind through regular practice, posture, and self-discipline."
        },
        {
          chapter: "Chapter 7",
          title: "Jnana Vijnana Yoga: Wisdom and Discernment",
          summary: "Wisdom of the Divine. Krishna explains the difference between material nature and the spiritual truth pervading the universe."
        },
        {
          chapter: "Chapter 8",
          title: "Akshara Brahma Yoga: Imperishable Spirit",
          summary: "The path of imperishable spirit. Focuses on the contemplation of the ultimate reality during the final moments of life."
        },
        {
          chapter: "Chapter 9",
          title: "Raja Vidya Raja Guhya Yoga: King of Secrets",
          summary: "The king of sciences and secrets. Krishna reveals that pure devotion (Bhakti) is the direct path to union with God."
        },
        {
          chapter: "Chapter 10",
          title: "Vibhuti Vistara Yoga: Divine Grandeur",
          summary: "Understanding divine grandeur. Krishna explains that all beauty, power, and glory in the universe are but sparks of His splendor."
        },
        {
          chapter: "Chapter 11",
          title: "Vishwarupa Darshana Yoga: Cosmic Vision",
          summary: "Arjuna is granted cosmic vision, seeing Krishna's infinite, awe-inspiring form containing the entire universe."
        },
        {
          chapter: "Chapter 12",
          title: "Bhakti Yoga: The Yoga of Devotion",
          summary: "The path of devotion. Krishna lists the qualities of a devotee dear to Him: compassion, equanimity, selflessness, and surrender."
        },
        {
          chapter: "Chapter 13",
          title: "Kshetra Kshetrajna Vibhaga Yoga: Field and Knower",
          summary: "Discerning the body (the field) from the soul (the knower of the field), revealing true spiritual knowledge."
        },
        {
          chapter: "Chapter 14",
          title: "Gunatraya Vibhaga Yoga: The Three Gunas",
          summary: "The three qualities of nature (Sattva/purity, Rajas/passion, Tamas/ignorance) and how to transcend them for liberation."
        },
        {
          chapter: "Chapter 15",
          title: "Purushottama Yoga: The Supreme Person",
          summary: "The metaphor of the cosmic tree (Ashvattha) and the supreme spirit, urging souls to cut attachment and seek the source."
        },
        {
          chapter: "Chapter 16",
          title: "Daivasura Sampad Vibhaga Yoga: Divine & Demoniac",
          summary: "Contrast between divine qualities (charity, truth, peace) and demoniac traits (ego, greed, anger), guiding behavior."
        },
        {
          chapter: "Chapter 17",
          title: "Shraddhatraya Vibhaga Yoga: Threefold Faith",
          summary: "The three types of faith, food, sacrifice, penance, and charity, determined by a person's inner Guna."
        },
        {
          chapter: "Chapter 18",
          title: "Moksha Sanyasa Yoga: Liberation & Renunciation",
          summary: "The grand synthesis of the Gita. Krishna details liberation through renouncing ego and surrendering all actions to the Divine."
        }
      ]
    }
  ],

  interests: [
    {
      id: "reading",
      label: "Reading",
      icon: "BookOpen",
      description: "Exploring non-fiction, historical accounts, and classic literature.",
      why: "Books are direct access to the minds of the greatest thinkers. It expands my vocabulary, knowledge base, and empathy.",
      influence: "Allows me to gather diverse perspectives and apply mental models from economics, psychology, and history to coding problems."
    },
    {
      id: "philosophy",
      label: "Philosophy",
      icon: "Compass",
      description: "Studying Stoic philosophy (Seneca, Marcus Aurelius) and ancient Eastern philosophy.",
      why: "It provides a clear framework for navigating life's volatility, handling stress, and making ethical choices.",
      influence: "Stoicism teaches control over reaction. It helps me stay calm during production bugs, complex refactors, or challenging project deadlines."
    },
    {
      id: "self-improvement",
      label: "Self Improvement",
      icon: "Sparkles",
      description: "Optimizing habits, focus techniques, fitness, and time management.",
      why: "To unlock personal potential, build self-discipline, and live a balanced, high-energy life.",
      influence: "Helps me implement structured routines (like deep work blocks) which increases my technical output and focus during development."
    },
    {
      id: "anime-manga",
      label: "Anime & Manga",
      icon: "Tv",
      description: "Enjoying narrative storytelling, character growth, and artistic styles.",
      why: "I appreciate the dedication, creative world-building, and themes of perseverance, friendship, and ambition (like Shonen genres).",
      influence: "Characters like Naruto or Goku, who never give up despite impossible odds, inspire me to push through complex debugging sessions and complex algorithms."
    },
    {
      id: "podcasts",
      label: "Podcasts",
      icon: "Mic",
      description: "Listening to tech talk shows, developer diaries, history, and health/wellness podcasts.",
      why: "An excellent way to learn passively during workouts, walks, or commutes.",
      influence: "Keeps me updated on global tech trends, industry standards, and developer mentalities beyond my local community."
    },
    {
      id: "personal-growth",
      label: "Personal Growth",
      icon: "ShieldCheck",
      description: "Reflecting on behavior, emotional intelligence, and continuous self-review.",
      why: "To be a better communicator, a supportive team member, and a well-rounded human being.",
      influence: "Improves my collaboration skills, open-mindedness during code reviews, and ability to give and receive constructive feedback."
    }
  ],

  learningPhilosophy: {
    quote: "Consistency over intensity. Real growth happens in the daily compounding of effort, not the occasional sprint.",
    principles: [
      {
        title: "Continuous Learning",
        description: "Dedicate time every single day to learn. Small daily gains of 1% compound into massive growth over a year.",
        icon: "TrendingUp",
        color: "var(--accent)"
      },
      {
        title: "Consistency Over Intensity",
        description: "Coding for 1 hour every day is infinitely better than coding for 10 hours once a week. Habits build neural pathways.",
        icon: "Clock",
        color: "var(--teal)"
      },
      {
        title: "Building Projects to Learn",
        description: "Tutorial hell is real. The only way to truly learn is to build real applications, break them, and figure out how to fix them.",
        icon: "Wrench",
        color: "var(--green)"
      },
      {
        title: "Learning by Doing",
        description: "Active recall and hands-on experimentation beat passive reading. Type the code, run it, and experiment with changes.",
        icon: "Cpu",
        color: "var(--yellow)"
      },
      {
        title: "Holistic Development",
        description: "A great engineer is not just a coding machine. Combining technical mastery with physical fitness, philosophy, and communication makes you a complete professional.",
        icon: "Activity",
        color: "var(--accent)"
      }
    ]
  },

  exploring: [
    {
      id: "spring-boot-exploring",
      topic: "Spring Boot",
      status: "Deep Dive",
      progress: 75,
      notes: "Implementing security configurations, custom filters, and JPA relationship mappings.",
      futureTopics: ["Microservices with Eureka & Spring Cloud", "Spring WebFlux (Reactive Programming)", "Dockerizing Spring apps"]
    },
    {
      id: "system-design",
      topic: "System Design",
      status: "Exploring",
      progress: 50,
      notes: "Studying load balancers, database replication, vertical/horizontal scaling, and CDN architectures.",
      futureTopics: ["Distributed consensus (Raft/Paxos)", "Message queues (Kafka, RabbitMQ)", "API Gateway design"]
    },
    {
      id: "backend-architecture",
      topic: "Backend Architecture",
      status: "Exploring",
      progress: 60,
      notes: "Understanding MVC, Hexagonal/Clean Architecture, and microservices design patterns.",
      futureTopics: ["Event-driven architectures", "CQRS pattern", "Database sharding and partition schemes"]
    },
    {
      id: "ai-engineering",
      topic: "AI Engineering",
      status: "Exploring",
      progress: 40,
      notes: "Integrating LLM APIs (Gemini, OpenAI), prompt engineering, and utilizing vector databases (Supabase pgvector).",
      futureTopics: ["Retrieval-Augmented Generation (RAG)", "Fine-tuning models", "LangChain & LlamaIndex orchestrations"]
    },
    {
      id: "full-stack",
      topic: "Full Stack Development",
      status: "Deep Dive",
      progress: 80,
      notes: "Creating unified dashboards, managing global state in React, and securing server-client communication.",
      futureTopics: ["Next.js Server Actions", "GraphQL integration", "WebSockets for real-time sync"]
    },
    {
      id: "competitive-programming",
      topic: "Competitive Programming",
      status: "Deep Dive",
      progress: 85,
      notes: "Solving LeetCode and Codeforces challenges, focusing on speed and space-time optimizations.",
      futureTopics: ["Segment Trees & Fenwick Trees", "Network Flow algorithms", "Trie and Advanced String manipulation"]
    }
  ]
};
