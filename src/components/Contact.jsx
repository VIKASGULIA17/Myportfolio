import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/data';

const TELEGRAM_API = 'https://api.telegram.org/bot7556029899:AAG3EogGPdL17WImWlbIT18R5eNU81U9IAA/sendMessage';
const TELEGRAM_CHAT_ID = 6974520564;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
      });
    }, { threshold: 0.1 });

    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const { name, email, subject, message } = formData;

    if (name.length < 2 || message.length < 10 || !email.includes('@')) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const telegramMessage = `📬 New Contact Form Submission:\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Subject: ${subject || 'N/A'}\n💬 Message: ${message}`;

    try {
      const response = await fetch(TELEGRAM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramMessage }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.description);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Telegram Error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={contactRef} className="text-center mb-16 transform translate-y-8 transition-all duration-1000">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              Get In Touch
            </h2>
            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Connect</span>
          </h3>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to discuss your next project or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Talk</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'm always open to discussing new opportunities, collaborations, or just connecting with fellow developers and data enthusiasts.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                    <a href={`mailto:${portfolioData.personal.email}`} className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300">
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone</p>
                    <a href={`tel:${portfolioData.personal.phone}`} className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300">
                      {portfolioData.personal.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-300">{portfolioData.personal.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Follow Me</h5>
              <div className="flex space-x-4">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={portfolioData.personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Response */}
            <div className= "bg-gradient-to-r from-purple-500 to-pink-500 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 rounded-xl p-6 text-white">              
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-lg font-semibold dark:text-white">Available for Projects</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-slate-200">
                I'm currently accepting new freelance projects and full-time opportunities.
              </p>
            </div>
          
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg ">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h4>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent"
                    placeholder="Your Name"
                  />
                  <label className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm">
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent"
                    placeholder="Your Email"
                  />
                  <label className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm">
                    Your Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent"
                  placeholder="Subject"
                />
                <label className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm">
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent resize-none"
                  placeholder="Your Message"
                />
                <label className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm">
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg">
                  ❌ Failed to send message. Please try again or contact me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;