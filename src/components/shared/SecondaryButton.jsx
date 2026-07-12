import clsx from 'clsx'

export default function SecondaryButton({ children, className, as: Component = 'button', ...props }) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center rounded border border-ink/20 bg-transparent px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5 disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
