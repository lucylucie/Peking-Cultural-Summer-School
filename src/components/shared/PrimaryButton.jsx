import clsx from 'clsx'

export default function PrimaryButton({ children, className, as: Component = 'button', ...props }) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center rounded bg-terracotta px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terracotta/90 disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
