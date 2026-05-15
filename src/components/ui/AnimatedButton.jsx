import React from 'react'
import { motion } from 'framer-motion'
import { useRipple } from '../../hooks/useRipple.js'

/**
 * AnimatedButton — premium reusable button with ripple + magnetic hover
 *
 * Props:
 *   href       {string}   — renders as <a> when provided
 *   onClick    {fn}
 *   variant    'primary' | 'outline' | 'ghost'
 *   size       'sm' | 'md' | 'lg'   (default 'md')
 *   children
 *   className
 *   target
 *   disabled
 *   type       'button' | 'submit'
 */
export default function AnimatedButton({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  target,
  disabled = false,
  type = 'button',
}) {
  const createRipple = useRipple()

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4.5 text-base',
  }

  const variantClasses = {
    primary:
      'bg-gold-gradient text-charcoal-900 font-bold shadow-gold hover:shadow-gold-lg',
    outline:
      'border border-gold-500/40 text-gold-400 hover:border-gold-400 hover:bg-gold-500/6',
    ghost:
      'text-gold-400 hover:text-gold-300 underline-offset-4 hover:underline',
  }

  const baseClasses = [
    'relative overflow-hidden inline-flex items-center justify-center gap-2',
    'rounded-full font-body font-semibold',
    'transition-all duration-300',
    'ripple-container',
    sizeClasses[size],
    variantClasses[variant],
    disabled ? 'opacity-60 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.04 },
    whileTap:   { scale: disabled ? 1 : 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  }

  const handleClick = (e) => {
    createRipple(e)
    onClick?.(e)
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        onClick={handleClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={baseClasses}
      onClick={handleClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
