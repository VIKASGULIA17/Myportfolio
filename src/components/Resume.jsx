import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram, 
  Calendar, 
  Award, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  BookOpen,
  Star,
  ExternalLink,
  User,
  Target,
  Brain,
  Zap
} from 'lucide-react';
import { portfolioData } from '../data/data';

const Resume = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const SkillBar = ({ skill, index, delay = 0 }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {skill.name}
          </span>
        </div>
        <span className="text-sm text-purple-600 dark:text-purple-400 font-bold">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ delay: delay + index * 0.1, duration: 1, ease: "easeOut" }}
          className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              delay: delay + index * 0.1 + 0.5,
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Modern Header Section */}
          <motion.div
            variants={itemVariants}
            className="relative mb-12"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-30"></div>
            <div className="absolute inset-0 opacity-50">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 dark:border-gray-700/20">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Profile Image */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                    <img 
                      src='/image.png' 
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </motion.div>

                {/* Header Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                  >
                    {portfolioData.personal.name}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-600 dark:text-gray-300 mb-4 font-medium"
                  >
                    {portfolioData.personal.title}
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl"
                  >
                    {portfolioData.personal.tagline}
                  </motion.p>

                  {/* Contact Info Cards */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  >
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {portfolioData.personal.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                      <Phone className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {portfolioData.personal.phone}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {portfolioData.personal.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap justify-center lg:justify-start gap-4"
                  >
                    <a href='/vikas_resume.pdf' target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download Resume</span>
                      </motion.button>
                    </a>

                    {/* Social Links */}
                    <div className="flex space-x-3">
                      {[
                        { icon: Github, url: portfolioData.personal.github, color: 'hover:bg-gray-100' },
                        { icon: Linkedin, url: portfolioData.personal.linkedin, color: 'hover:bg-blue-100' },
                        { icon: Instagram, url: portfolioData.personal.instagram, color: 'hover:bg-pink-100' }
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 bg-white dark:bg-gray-700 rounded-lg ${social.color} dark:hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg`}
                        >
                          <social.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {portfolioData.about.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-purple-500 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl">
                    <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Me</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {portfolioData.about.description}
                </p>
                <div className="space-y-3">
                  {portfolioData.about.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Education Section */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                </div>
                
                <div className="border-l-4 border-gradient-to-b from-purple-500 to-pink-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="mb-4">
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {portfolioData.education.degree}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4" />
                        <span>{portfolioData.education.year}</span>
                      </div>
                    </div>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                      {portfolioData.education.institution}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {portfolioData.education.status}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      GPA: <span className="font-bold text-green-600 dark:text-green-400">{portfolioData.education.gpa}</span>
                    </p>
                  </div>

                  {/* Coursework */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                      Key Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.education.coursework.map((course, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + index * 0.05 }}
                          className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-sm text-gray-700 dark:text-gray-300 rounded-full border border-purple-100 dark:border-purple-800"
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                      Achievements
                    </h4>
                    <div className="space-y-2">
                      {portfolioData.education.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 + index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                        >
                          <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Projects Section */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl">
                    <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioData.projects.filter(project => project.featured).slice(0, 4).map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                      className="group p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-700"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-xs text-purple-700 dark:text-purple-300 rounded font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live Demo
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium transition-colors"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-8">
              {/* Skills Section */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl">
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h2>
                </div>
                
                {/* Programming Languages */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Code2 className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Languages
                  </h3>
                  {portfolioData.skills.languages.slice(0, 4).map((skill, index) => (
                    <SkillBar key={index} skill={skill} index={index} delay={2} />
                  ))}
                </div>

                {/* Frameworks */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                    Frameworks
                  </h3>
                  {portfolioData.skills.frameworks.map((skill, index) => (
                    <SkillBar key={index} skill={skill} index={index} delay={2.5} />
                  ))}
                </div>

                {/* Data Science */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                    Data Science
                  </h3>
                  {portfolioData.skills.dataScience.slice(0, 4).map((skill, index) => (
                    <SkillBar key={index} skill={skill} index={index} delay={3} />
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl">
                    <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Certifications</h2>
                </div>
                
                <div className="space-y-4">
                  {portfolioData.education.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.5 + index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-100 dark:border-green-800"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                          {cert.name}
                        </h3>
                        <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {cert.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;