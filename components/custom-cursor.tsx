"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [inputHovered, setInputHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
      document.body.classList.add("custom-cursor-active")
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.body.classList.remove("custom-cursor-active")
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement

      // Check if hovering over links or buttons
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")

      setLinkHovered(isLink)

      // Check if hovering over inputs or textareas
      const isInput =
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.getAttribute("contenteditable") === "true"

      setInputHovered(isInput)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    addEventListeners()
    return () => removeEventListeners()
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      animate={{
        x: position.x,
        y: position.y,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 350,
        mass: 0.5,
      }}
    >
      {/* Main cursor */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          left: -8,
          top: -8,
        }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          backgroundColor: linkHovered
            ? "rgba(147, 51, 234, 0.5)"
            : inputHovered
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.3)",
          width: linkHovered ? 40 : inputHovered ? 4 : 16,
          height: linkHovered ? 40 : inputHovered ? 24 : 16,
          borderRadius: linkHovered ? "100%" : inputHovered ? "2px" : "100%",
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
        }}
      >
        {linkHovered && (
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </motion.div>

      {/* Trailing effect */}
      <motion.div
        className="absolute bg-purple-500/20 rounded-full blur-sm"
        style={{
          left: -12,
          top: -12,
        }}
        animate={{
          scale: clicked ? 1.2 : linkHovered ? 2 : 1,
          width: 24,
          height: 24,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.8,
          delay: 0.03,
        }}
      />
    </motion.div>
  )
}
