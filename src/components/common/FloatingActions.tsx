'use client'

import Link from 'next/link'
import { Bot, ShoppingCart } from 'lucide-react'
import { floatingActionsConfig } from '@/config/floating-actions'
import { useTranslation } from '@/i18n/useTranslation'
import type { FloatingAction } from '@/types/floating-actions'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  ShoppingCart,
}

function ActionButton({ action }: { action: FloatingAction }) {
  const { t } = useTranslation()
  const Icon = iconMap[action.icon]
  const isOrderNow = action.id === 'order-now'
  
  // Get translated label based on action id
  const getLabel = () => {
    if (action.id === 'order-now') return t.cta.order
    if (action.id === 'ai-assistant') return t.ai.aiAssistant
    return action.label
  }

  return (
    <Link
      href={action.href}
      className={[
        'group flex items-center justify-center transition-all duration-200 ease-out font-medium',
        // Mobile: compact icon-only circle
        'w-10 h-10 rounded-full shadow-lg text-xs',
        // Desktop: vertical stacked buttons
        'lg:flex lg:flex-col lg:w-auto lg:h-auto lg:px-4 lg:py-3 lg:rounded-xl lg:text-xs lg:gap-1.5',
        // Order Now: green background
        isOrderNow
          ? 'bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white hover:from-[#16A34A] hover:to-[#22C55E]'
          // AI Assistant: blue background  
          : 'bg-gradient-to-r from-[#3B82F6] to-[#1E6F5C] text-white hover:from-[#1E6F5C] hover:to-[#3B82F6]',
      ].join(' ')}
      aria-label={getLabel()}
    >
      {Icon && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      )}
      <span className="hidden lg:inline whitespace-nowrap">{getLabel()}</span>
    </Link>
  )
}

export default function FloatingActions() {
  const { actions } = floatingActionsConfig

  if (!actions.length) return null

  return (
    <div
      className={[
        'fixed z-40 flex flex-col gap-2 animate-fade-in',
        // Mobile: bottom right, safe area aware
        'right-4 bottom-[calc(3rem+env(safe-area-inset-bottom,0rem))]',
        // Tablet
        'sm:right-6 sm:bottom-[calc(4rem+env(safe-area-inset-bottom,0rem))]',
        // Desktop: right side, vertically centered, vertical stack
        'lg:flex-col lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:gap-3',
      ].join(' ')}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0rem)',
      }}
    >
      {actions.map((action) => (
        <ActionButton key={action.id} action={action} />
      ))}
    </div>
  )
}
