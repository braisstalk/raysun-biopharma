import { FloatingActionsConfig } from '@/types/floating-actions'

export const floatingActionsConfig: FloatingActionsConfig = {
  actions: [
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      href: '/ai-assistant',
      icon: 'Bot',
      variant: 'secondary',
    },
    {
      id: 'order-now',
      label: 'Order Now',
      href: '/order-now',
      icon: 'ShoppingCart',
      variant: 'primary',
    },
  ],
}
