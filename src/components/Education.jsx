'use client'

import React, { useEffect, useRef } from 'react'
import { Calendar, MapPin, Award, BookOpen, Trophy, Star } from 'lucide-react';
import { portfolioData } from '../data/data';

const Education = () => {
  const educationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (educationRef.current) observer.observe(educationRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={educationRef} className="text-center mb-16 transform translate-y-8 transition-all duration-1000">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              Education & Learning
            </h2>
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Academic <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Journey</span>
          </h3>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My educational background and academic achievements that shaped my expertise in computer science and data analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Education Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{portfolioData.education.degree}</h4>
                <p className="text-purple-600 dark:text-purple-400 font-medium">{portfolioData.education.status}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-300">{portfolioData.education.year}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-300">{portfolioData.education.institution}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-300">GPA: {portfolioData.education.gpa}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Academic Progress</span>
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">75%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Current Focus</h5>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Specializing in data science applications and full-stack development while maintaining academic excellence.
              </p>
            </div>
          </div>

          {/* Coursework & Achievements */}
          <div className="space-y-8">
            {/* Coursework */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Key Coursework</h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {portfolioData.education.coursework.map((course, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Academic Achievements</h4>
              </div>
              
              <div className="space-y-3">
                {portfolioData.education.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Professional <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Certifications</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Continuous learning through professional certifications in data science, AI/ML, and programming.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.education.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                      {cert.name}
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-2">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.year}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {cert.description}
                </p>
                
                {/* Certification Badge */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wider">
                    Certified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Learning */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Self-Directed Learning",
              description: "Continuous learning through online platforms and personal projects",
              icon: "📚",
              gradient: "from-blue-500 to-purple-500"
            },
            {
              title: "Practical Application",
              description: "Applying theoretical knowledge to real-world projects and challenges",
              icon: "💡",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              title: "Community Engagement",
              description: "Active participation in tech communities and open-source projects",
              icon: "🤝",
              gradient: "from-pink-500 to-red-500"
            }
          ].map((item, index) => (
            <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;