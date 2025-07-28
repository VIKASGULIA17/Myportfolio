'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Trophy,
    Target,
    TrendingUp,
    User,
    Code,
    Clock,
    Award,
    BarChart3,
    GitBranch,
    RefreshCw
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import leetcodeApi from '../components/leetcodeApi';

const LeetCode = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState('loading'); // 'real', 'mock', 'loading'

    const username = 'vikas_gulia';

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);
            setDataSource('loading');

            console.log('🔄 Starting data fetch...');
            const data = await leetcodeApi.getAllUserData(username);

            // Determine if we got real data or mock data
            const isRealData = data.profile && !data.errors.profile;
            setDataSource(isRealData ? 'real' : 'mock');

            setUserData(data);
            console.log(`✅ Data loaded successfully (${isRealData ? 'REAL' : 'MOCK'} data)`);
        } catch (err) {
            setError(err.message);
            setDataSource('error');
            console.error('❌ Failed to load data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchUserData();
        setRefreshing(false);
    };

    // Prepare chart data
    const getStatsData = () => {
        if (!userData?.profile?.matchedUser?.submitStats?.acSubmissionNum) return [];

        const stats = userData.profile.matchedUser.submitStats.acSubmissionNum;
        return stats
            .filter(item => item.difficulty !== 'All')
            .map(item => ({
                difficulty: item.difficulty,
                solved: item.count,
                color: item.difficulty === 'Easy' ? '#00b894' :
                    item.difficulty === 'Medium' ? '#fdcb6e' : '#e84393'
            }));
    };

    const getSubmissionCalendarData = () => {
        if (!userData?.calendar?.matchedUser?.userCalendar?.submissionCalendar) return [];

        const calendar = JSON.parse(userData.calendar.matchedUser.userCalendar.submissionCalendar);
        return Object.entries(calendar).map(([timestamp, count]) => ({
            date: new Date(parseInt(timestamp) * 1000),
            count: count
        }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={fetchUserData}
                        className="btn-gradient"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const profile = userData?.profile?.matchedUser;
    const calendar = userData?.calendar?.matchedUser?.userCalendar;
    const submissions = userData?.submissions?.recentAcSubmissionList;
    const statsData = getStatsData();
    const calendarData = getSubmissionCalendarData();

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pt-28"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container-custom section-padding">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-12"
                    variants={itemVariants}
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                            LeetCode Dashboard
                        </h1>
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 disabled:opacity-50"
                            title="Refresh data"
                        >
                            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                       My coding journey and achievements
                    </p>
                    {/* Data Source Indicator */}
                    <div className="flex items-center justify-center gap-2 pt-18">
                        {dataSource === 'real' && (
                            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Live Data
                            </span>
                        )}
                        {dataSource === 'mock' && (
                            <span className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                Demo Data (CORS Limited)
                            </span>
                        )}
                        {dataSource === 'loading' && (
                            <span className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                Loading...
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    className="card-glass p-8 mb-8"
                    variants={itemVariants}
                >
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                            <img
                                src='/leetcode_profile.jpeg'
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover bg-white"
                            />
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {"Vikas Gulia"}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                @{profile?.username || username}
                            </p>
                            <div className="flex text-black dark:text-white flex-wrap justify-center lg:justify-start gap-4 text-sm mb-4">
                                <span className="flex items-center gap-1">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    Ranking: #{profile?.profile?.ranking || '285,330'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Award className="w-4 h-4 text-purple-500" />
                                    {'9 Badges'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4 text-blue-500" />
                                    {'India'}
                                </span>
                            </div>
                            {/* Skill Tags */}
                            {profile?.profile?.skillTags && profile.profile.skillTags.length > 0 && (
                                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                    {profile.profile.skillTags.map((skill, index) => (
                                        <motion.span
                                            key={skill}
                                            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium border border-purple-500/20"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    variants={itemVariants}
                >
                    {/* Total Solved */}
                    <motion.div
                        className="card-glass p-6 text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {statsData.reduce((sum, item) => sum + item.solved, 0)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">Problems Solved</p>
                    </motion.div>

                    {/* Current Streak */}
                    <motion.div
                        className="card-glass p-6 text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {calendar?.streak || 84}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">Max Streak</p>
                    </motion.div>

                    {/* Active Days */}
                    <motion.div
                        className="card-glass p-6 text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {calendar?.totalActiveDays || 244}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">Total Active Days</p>
                    </motion.div>

                    {/* Reputation */}
                    <motion.div
                        className="card-glass p-6 text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Award className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {'1,514'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">Contest Rating</p>
                    </motion.div>
                </motion.div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Problem Difficulty Distribution */}
                    <motion.div
                        className="card-glass p-6"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6" />
                            Problem Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statsData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="solved"
                                    label={({ difficulty, solved }) => `${difficulty}: ${solved}`}
                                >
                                    {statsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Problem Difficulty Bar Chart */}
                    <motion.div
                        className="card-glass p-6"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6" />
                            Solved vs Difficulty
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={statsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="difficulty" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="solved" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Problem Accuracy Section */}
                <motion.div
                    className="card-glass p-6 mb-8"
                    variants={itemVariants}
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6" />
                        Problem Solving Accuracy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statsData.map((stat, index) => {
                            const totalSubmissions = userData?.profile?.matchedUser?.submitStats?.totalSubmissionNum?.find(
                                item => item.difficulty === stat.difficulty
                            )?.count || stat.solved;
                            const accuracy = totalSubmissions > 0 ? ((stat.solved / totalSubmissions) * 100).toFixed(1) : 0;

                            return (
                                <motion.div
                                    key={stat.difficulty}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="relative w-20 h-20 mx-auto mb-3">
                                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                className="text-gray-300 dark:text-gray-600"
                                                d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                            <path
                                                className="text-purple-500"
                                                d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeDasharray={`${accuracy}, 100`}
                                                style={{ color: stat.color }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                {accuracy}%
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white" style={{ color: stat.color }}>
                                        {stat.difficulty}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.solved} / {totalSubmissions} solved
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Skills & Achievements Section */}
                <motion.div
                    className="card-glass p-6 mb-8"
                    variants={itemVariants}
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6" />
                        Skills & Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Dynamic Skill Cards */}
                        {[
                            { skill: "Dynamic Programming", level: 68, icon: "🧠", color: "from-blue-500 to-purple-500" },
                            { skill: "Data Structures", level: 78, icon: "🌳", color: "from-green-500 to-teal-500" },
                            { skill: "Hash Table", level: 89, icon: "⚡", color: "from-yellow-500 to-orange-500" },
                            { skill: "Binary Tree", level: 65, icon: "🕸️", color: "from-purple-500 to-pink-500" },
                            { skill: "Binary Search", level: 90, icon: "🔍", color: "from-indigo-500 to-blue-500" },
                            { skill: "Recursion", level: 75, icon: "🔄", color: "from-pink-500 to-red-500" }
                        ].map((item, index) => (
                            <motion.div
                                key={item.skill}
                                className={`p-4 rounded-lg bg-gradient-to-r ${item.color} bg-opacity-10 border border-white/20 dark:border-gray-700/20`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{item.icon}</span>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {item.skill}
                                    </h4>
                                </div>
                                <div className="w-full bg-gray-600 dark:bg-gray-700 rounded-full h-2">
                                    <motion.div
                                        className={`h-2  bg-white rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.level}%` }}
                                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                                    />
                                </div>
                                <p className="text-xs text-gray-100 mt-1">
                                    {item.level}% Mastery
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Coding Journey Timeline */}
                <motion.div
                    className="card-glass p-6 mb-8"
                    variants={itemVariants}
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <GitBranch className="w-6 h-6" />
                        Coding Journey Timeline
                    </h3>
                    <div className="space-y-4">
                        {[
                            {
                                date: "July 2025",
                                title: "Advanced Problem Solving",
                                description: "Mastering complex algorithms and data structures",
                                problems: 25,
                                color: "bg-gradient-to-r from-purple-500 to-pink-500",
                                icon: "🎯"
                            },
                            {
                                date: "Febrary 2025",
                                title: "Dynamic Programming Focus",
                                description: "Deep dive into DP patterns and optimization",
                                problems: 36,
                                color: "bg-gradient-to-r from-blue-500 to-purple-500",
                                icon: "🧠"
                            },
                            {
                                date: "January 2025",
                                title: "Binary Trees & BST",
                                description: "Tree traversal and manipulation techniques",
                                problems: 47,
                                color: "bg-gradient-to-r from-yellow-500 to-green-500",
                                icon: "🌳"
                            },
                            {
                                date: "December 2024",
                                title: "Recursion & Backtracking",
                                description: "Understanding recursive algorithms and backtracking",
                                problems: 38,
                                color: "bg-gradient-to-r from-green-500 to-blue-500",
                                icon: "🕸️"
                            },
                            {
                                date: "October 2024",
                                title: "Binary Search ",
                                description: "Binary search and its applications",
                                problems: 32,
                                color: "bg-gradient-to-r from-orange-500 to-purple-500",
                                icon: "🔎"
                            },
                            {
                                date: "August & September 2024",
                                title: "Array & String Mastery",
                                description: "Foundation building with core data structures",
                                problems: 150,
                                color: "bg-gradient-to-r from-pink-500 to-yellow-500",
                                icon: "📊"
                            }
                        ].map((milestone, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-lg bg-white/5 dark:bg-gray-800/5 border border-white/10 dark:border-gray-700/10"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={`w-12 h-12 ${milestone.color} rounded-full flex items-center justify-center text-xl flex-shrink-0`}>
                                    {milestone.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {milestone.title}
                                        </h4>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {milestone.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {milestone.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                                            <Target className="w-3 h-3" />
                                            {milestone.problems} problems solved
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Dynamic Problem Categories */}
                <motion.div
                    className="card-glass p-6 mb-8"
                    variants={itemVariants}
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Code className="w-6 h-6" />
                        Problem Categories Mastered
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { category: "Arrays", count: 202, icon: "📊", difficulty: "Easy" },
                            { category: "Linked Lists", count: 9, icon: "🔗", difficulty: "Easy" },
                            { category: "Binary Trees", count: 38, icon: "🌳", difficulty: "Medium" },
                            { category: "Dynamic Programming", count: 44, icon: "🧠", difficulty: "Hard" },
                            { category: "Graphs", count: 18, icon: "🕸️", difficulty: "Hard" },
                            { category: "Hash Tables", count: 71, icon: "🗂️", difficulty: "Medium" },
                            { category: "DFS", count: 46, icon: "📈", difficulty: "Medium" },
                            { category: "Stacks & Queues", count: 23, icon: "📚", difficulty: "Easy" },
                            { category: "Sorting", count: 40, icon: "🔄", difficulty: "Easy" }
                        ].map((category, index) => (
                            <motion.div
                                key={category.category}
                                className="p-4 rounded-lg bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/10 dark:to-gray-800/5 border border-white/20 dark:border-gray-700/20 text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                                }}
                            >
                                <div className="text-3xl mb-2">{category.icon}</div>
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                    {category.category}
                                </h4>
                                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                    {category.count}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded-full ${category.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                                    category.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                                        'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                    }`}>
                                    {category.difficulty}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Interactive Achievement Badges */}
                <motion.div
                    className="card-glass p-6"
                    variants={itemVariants}
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Award className="w-6 h-6" />
                        Achievement Badges
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                title: "Problem Solver",
                                description: "Solved 300+ problems",
                                icon: "🥇",
                                unlocked: true,
                                gradient: "from-pink-500 to-red-600",
                            },
                            {
                                title: "Streak Master",
                                description: "80+ day solving streak",
                                icon: "🧩",
                                unlocked: true,
                                gradient: "from-cyan-400 to-blue-600",
                            },
                            {
                                title: "100 Days Badge in 2025",
                                description: "Solving 100 days in 2025",
                                icon: "🚀",
                                unlocked: true,
                                gradient: "from-green-400 to-teal-600",
                            },
                            {
                                title: "50 Days Badge in 2025",
                                description: "Solving 50 days in 2025",
                                icon: "🛡️",
                                unlocked: true,
                                gradient: "from-yellow-400 to-yellow-600",
                            },
                            {
                                title: "100 Days Badge in 2024",
                                description: "Solving 100 days in 2024",
                                icon: "💡",
                                unlocked: true,
                                gradient: "from-purple-400 to-indigo-600",
                            },
                            {
                                title: "50 Days Badge in 2024",
                                description: "Solving 50 days in 2024",
                                icon: "📅",
                                unlocked: true,
                                gradient: "from-red-400 to-pink-600",
                            },
                            {
                                title: "DCC March 2025",
                                description: "Solved problem of the day whole March,2025",
                                icon: "🏆",
                                unlocked: true,
                                gradient: "from-orange-400 to-amber-600",
                            },
                            {
                                title: "DCC Feb 2025",
                                description: "Solved problem of the day whole February,2025",
                                icon: "🎖️",
                                unlocked: true,
                                gradient: "from-sky-400 to-blue-600",
                            },
                            {
                                title: "DCC August 2024",
                                description: "Solved problem of the day whole August,2024",
                                icon: "🔔",
                                unlocked: true,
                                gradient: "from-lime-400 to-green-600",
                            },
                        ].map((badge, index) => (
                            <motion.div
                                key={badge.title}
                                className={`p-4 rounded-lg text-center ${badge.unlocked
                                    ? `bg-gradient-to-br ${badge.gradient} text-white shadow-lg`
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: badge.unlocked ? 1.05 : 1.02,
                                    rotate: badge.unlocked ? 5 : 0
                                }}
                            >
                                <div className="text-3xl mb-2">{badge.icon}</div>
                                <h4 className="font-semibold text-sm mb-1">{badge.title}</h4>
                                <p className="text-xs opacity-80">{badge.description}</p>
                                {!badge.unlocked && (
                                    <div className="mt-2 text-xs opacity-60">🔒 Locked</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LeetCode;