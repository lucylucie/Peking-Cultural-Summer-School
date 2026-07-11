import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding'), 1500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <button
      onClick={() => navigate('/onboarding')}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-ink text-cream"
    >
      <span className="font-serif text-4xl">LA</span>
      <span className="mt-2 h-px w-10 bg-terracotta" aria-hidden="true" />
      <p className="mt-4 text-sm text-cream/70">A living archive, co-authored</p>
    </button>
  )
}
