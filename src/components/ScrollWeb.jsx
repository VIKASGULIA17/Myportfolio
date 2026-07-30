'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ScrollWaves() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const scrollYRef = useRef(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    // Set canvas size
    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resizeCanvas()

    // Track scroll
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Wave parameters
    let time = 0

    // Get theme colors
    const getColors = () => {
      const isDark = theme === 'dark'
      return {
        wave1: isDark ? 'rgba(255, 161, 22, 0.03)' : 'rgba(224, 136, 0, 0.04)',
        wave2: isDark ? 'rgba(255, 161, 22, 0.05)' : 'rgba(224, 136, 0, 0.06)',
        wave3: isDark ? 'rgba(0, 184, 163, 0.03)' : 'rgba(0, 122, 110, 0.04)',
      }
    }

    // Draw a wave
    const drawWave = (offset, amplitude, frequency, color, yPosition) => {
      ctx.beginPath()
      ctx.moveTo(0, height)

      for (let x = 0; x <= width; x += 5) {
        const y = yPosition + Math.sin((x * frequency + offset) * 0.01) * amplitude
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()

      ctx.fillStyle = color
      ctx.fill()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      const colors = getColors()
      const scroll = scrollYRef.current

      time += 0.5

      // Draw multiple waves with different parameters
      // Wave 1 - Top flowing wave
      drawWave(
        time + scroll * 0.1,
        60,
        2,
        colors.wave1,
        height * 0.2
      )

      // Wave 2 - Middle wave
      drawWave(
        time * 1.5 + scroll * 0.15,
        80,
        1.5,
        colors.wave2,
        height * 0.4
      )

      // Wave 3 - Bottom teal accent wave
      drawWave(
        time * 0.8 + scroll * 0.08,
        70,
        1.8,
        colors.wave3,
        height * 0.6
      )

      // Wave 4 - Very subtle overlay
      drawWave(
        -time * 0.6 + scroll * 0.05,
        50,
        2.5,
        colors.wave1,
        height * 0.8
      )

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    window.addEventListener('resize', resizeCanvas)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resizeCanvas)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [theme, mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

