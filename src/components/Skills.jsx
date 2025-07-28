'use client'

import React, { useEffect, useRef } from 'react'
import { portfolioData } from '../data/data'

const Skills = () => {
  const skillsRef = useRef(null)

 useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')

          // Animate progress bars
          const progressBars = entry.target.querySelectorAll('.progress-bar')
          progressBars.forEach((bar, index) => {
            const level = bar.getAttribute('data-level')
            setTimeout(() => {
              bar.style.width = `${level}%`
            }, 300 + index * 100)
          })
        }
      })
    },
    { threshold: 0.1 }
  )

  if (skillsRef.current) {
    observer.observe(skillsRef.current)
  }

  return () => observer.disconnect()
}, [])


  const SkillCategory = ({ title, skills, gradient, icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center text-white font-bold`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{skill.icon}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
              </div>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{skill.level}%</span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`progress-bar h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`}
                data-level={skill.level}
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="skills"  ref={skillsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 opacity-100 transform translate-y-8 transition-all duration-1000 ">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              Skills & Expertise
            </h2>
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Proficiency</span>
          </h3>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise across various technologies and domains.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          <SkillCategory
            title="Programming Languages"
            skills={portfolioData.skills.languages}
            gradient="from-blue-500 to-purple-500"
            icon="💻"
          />

          {/* Frameworks */}
          <SkillCategory
            title="Frameworks & Libraries"
            skills={portfolioData.skills.frameworks}
            gradient="from-purple-500 to-pink-500"
            icon="🔧"
          />

          {/* Data Science */}
          <SkillCategory
            title="Data Science & ML"
            skills={portfolioData.skills.dataScience}
            gradient="from-pink-500 to-red-500"
            icon="🧠"
          />

          {/* Tools */}
          <SkillCategory
            title="Tools & Technologies"
            skills={portfolioData.skills.tools}
            gradient="from-green-500 to-blue-500"
            icon="🛠️"
          />
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Problem Solving",
              description: "Analytical thinking and creative problem-solving approaches",
              icon: "🧩",
              gradient: "from-yellow-500 to-orange-500"
            },
            {
              title: "Team Collaboration",
              description: "Effective communication and teamwork in agile environments",
              icon: "🤝",
              gradient: "from-green-500 to-teal-500"
            },
            {
              title: "Continuous Learning",
              description: "Staying updated with latest technologies and best practices",
              icon: "📚",
              gradient: "from-indigo-500 to-purple-500"
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills