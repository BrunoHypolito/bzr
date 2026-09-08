import type { SVGProps } from "react"

export type IconName =
  | "search"
  | "heart"
  | "cart"
  | "location"
  | "clock"
  | "star"
  | "check"
  | "lock"
  | "car"
  | "motorcycle"
  | "home"
  | "phone"
  | "laptop"
  | "sofa"
  | "dress"
  | "gamepad"
  | "menu"
  | "calendar"
  | "road"
  | "fuel"
  | "settings"
  | "bolt"
  | "card"
  | "document"

const paths: Record<IconName, string> = {
  search: "M11 19a8 8 0 1 1 5.657-2.343L21 21M16.657 16.657 21 21",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z",
  cart: "M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  location: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  star: "m12 3 2.78 5.63 6.22.9-4.5 4.38 1.06 6.19L12 17.17l-5.56 2.93 1.06-6.19L3 9.53l6.22-.9L12 3Z",
  check: "m5 12 4 4L19 6",
  lock: "M6 10h12v10H6z M8 10V7a4 4 0 0 1 8 0v3",
  car: "m3 11 2-5h14l2 5M5 11h14l1 8H4l1-8Zm2 4h.01M17 15h.01M7 11h10",
  motorcycle: "M5 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm14 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 13h5l-2-4H9l-2 3m6 1 3-4h2",
  home: "m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6",
  phone: "M6 3h4l2 5-2.5 1.5a16 16 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2C10.72 20 4 13.28 4 5a2 2 0 0 1 2-2Z",
  laptop: "M4 5h16v11H4zM2 19h20M9 19h6",
  sofa: "M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 12h16a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2ZM5 18v2m14-2v2",
  dress: "M9 3h6l1 5 4 3-3 3-1-1v8H8v-8l-1 1-3-3 4-3 1-5Z",
  gamepad: "M6 10h12a4 4 0 0 1 3.7 5.5l-1 2.5a2 2 0 0 1-3.5.4L16 16H8l-1.2 2.4a2 2 0 0 1-3.5-.4l-1-2.5A4 4 0 0 1 6 10Zm2 3v4m-2-2h4m8-1h.01M17 16h.01",
  menu: "M4 6h16M4 12h16M4 18h16",
  calendar: "M5 4h14v16H5zM8 2v4m8-4v4M5 9h14",
  road: "M9 3 7 21m8-18 2 18M12 3v3m0 4v3m0 4v4",
  fuel: "M6 21V4h9v17M6 8h9m3-2 2 2v8a2 2 0 0 0 2 2M15 7h2",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-13v2m0 13v2m9-9h-2M5 12H3m15.36-6.36-1.41 1.41M7.05 16.95l-1.41 1.41m12.72 0-1.41-1.41M7.05 7.05 5.64 5.64",
  bolt: "m13 2-9 12h7l-1 8 9-12h-7l1-8Z",
  card: "M3 5h18v14H3zM3 10h18M7 15h4",
  document: "M6 3h9l3 3v15H6zM9 11h6m-6 4h6",
}

export function Icon({ name, size = 18, className = "", ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`text-gray-500 ${className}`}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  )
}
