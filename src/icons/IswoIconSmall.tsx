import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

export const IswoIconSmall = ({ className }: Props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="192pt"
      height="192pt"
      viewBox="0 0 192 192"
      preserveAspectRatio="xMidYMid meet"
      className={cn(className)}
    >
      <g
        transform="translate(0,192) scale(0.1,-0.1)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M845 1894 c-88 -14 -204 -48 -269 -77 -272 -126 -463 -361 -531 -657
          -27 -116 -23 -299 9 -422 133 -516 661 -817 1171 -666 324 95 578 372 646 703
          102 491 -199 968 -690 1096 -75 20 -271 33 -336 23z m370 -671 c73 -24 148
          -102 171 -178 41 -144 -20 -284 -151 -346 -51 -25 -72 -29 -140 -29 -55 0 -92
          6 -120 19 l-40 18 65 5 c141 12 243 111 244 240 1 69 -20 103 -86 136 -53 27
          -98 23 -151 -12 -121 -81 -63 -266 85 -266 27 0 62 7 78 15 38 19 38 7 3 -28
          -40 -37 -111 -67 -163 -67 -127 0 -230 121 -216 252 21 201 209 309 421 241z
          m-480 -268 l0 -280 -65 0 -65 0 -3 215 c-2 177 -5 216 -17 223 -16 8 -22 107
          -8 121 4 4 41 5 83 4 l75 -3 0 -280z"
        />
      </g>
    </svg>
  )
}
