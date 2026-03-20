import { redirect } from 'next/navigation'
import { i18n } from '@/i18n/config'

// Root page redirects to default locale
// The middleware handles this for most cases, but this is a fallback
export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`)
}
