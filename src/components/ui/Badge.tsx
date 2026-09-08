type BadgeProps = {
  label: string
  color: string
}

export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className={`${color} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide`}
    >
      {label}
    </span>
  )
}