// Floating Action Button Types

export interface FloatingAction {
  id: string
  label: string
  href: string
  icon: string
  /** Visual variant: 'primary' gets stronger emphasis, 'secondary' is more subtle */
  variant: 'primary' | 'secondary'
}

export interface FloatingActionsConfig {
  actions: FloatingAction[]
}
