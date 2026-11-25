export type ProjectGraphicId =
  | 'asc'
  | 'myolcf'
  | 'rats'
  | 'bofa-nlp'
  | 'turio'
  | 'podcast'
  | 'ecommerce'
  | 'anthologia'
  | 'cadenza'
  | 'kalshi'
  | 'hoa'

interface ProjectGraphicProps {
  id: ProjectGraphicId
  tag: string
  wide?: boolean
}

const ProjectGraphic = ({ id, tag, wide = false }: ProjectGraphicProps) => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-32 overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/50 to-muted/20 dark:from-white/[0.04] dark:to-transparent select-none"
    >
      {/* Subtle architectural micro-grid */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Corner technical tag */}
      <span className="absolute top-2.5 right-3 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 dark:text-white/45">
        {tag}
      </span>

      {/* Bespoke vector diagram */}
      <svg
        viewBox="0 0 480 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1] w-full h-full text-foreground"
        preserveAspectRatio={wide ? 'xMidYMid meet' : 'xMidYMid slice'}
      >
        {id === 'asc' && (
          <g>
            {/* Multi-facility federated mesh */}
            <circle
              cx="240"
              cy="64"
              r="46"
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray="3 4"
            />
            <circle
              cx="240"
              cy="64"
              r="26"
              stroke="currentColor"
              strokeOpacity="0.22"
            />
            {/* Enclave links */}
            <line
              x1="112"
              y1="42"
              x2="218"
              y2="58"
              stroke="currentColor"
              strokeOpacity="0.28"
            />
            <line
              x1="124"
              y1="96"
              x2="218"
              y2="72"
              stroke="currentColor"
              strokeOpacity="0.28"
            />
            <line
              x1="364"
              y1="40"
              x2="262"
              y2="58"
              stroke="currentColor"
              strokeOpacity="0.28"
            />
            <line
              x1="354"
              y1="94"
              x2="262"
              y2="72"
              stroke="currentColor"
              strokeOpacity="0.28"
            />
            {/* Peripheral facility enclaves */}
            {[
              { x: 112, y: 42 },
              { x: 124, y: 96 },
              { x: 364, y: 40 },
              { x: 354, y: 94 },
            ].map((n, i) => (
              <g key={i}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="11"
                  fill="currentColor"
                  fillOpacity="0.06"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="2.5"
                  fill="currentColor"
                  fillOpacity="0.7"
                />
              </g>
            ))}
            {/* Authoritative central hub */}
            <circle
              cx="240"
              cy="64"
              r="14"
              fill="currentColor"
              fillOpacity="0.1"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="240" cy="64" r="4" fill="#d97706" />
          </g>
        )}

        {id === 'myolcf' && (
          <g>
            {/* Telemetry burn-down & GPU utilization chart */}
            {[28, 52, 76, 100].map(y => (
              <line
                key={y}
                x1="36"
                y1={y}
                x2="444"
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
              />
            ))}
            {/* Area under utilization curve */}
            <path
              d="M36 96 L92 84 L148 70 L204 76 L260 50 L316 42 L372 56 L444 30 L444 108 L36 108 Z"
              fill="currentColor"
              fillOpacity="0.06"
            />
            {/* Burn-down target dashed line */}
            <path
              d="M36 34 L444 96"
              stroke="currentColor"
              strokeOpacity="0.22"
              strokeDasharray="4 4"
            />
            {/* Primary metric curve */}
            <path
              d="M36 96 L92 84 L148 70 L204 76 L260 50 L316 42 L372 56 L444 30"
              stroke="currentColor"
              strokeOpacity="0.72"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            {/* Peak node */}
            <circle
              cx="316"
              cy="42"
              r="7"
              fill="#d97706"
              fillOpacity="0.18"
              stroke="#d97706"
              strokeWidth="1.25"
            />
            <circle cx="316" cy="42" r="2.5" fill="#d97706" />
            <circle
              cx="444"
              cy="30"
              r="3"
              fill="currentColor"
              fillOpacity="0.8"
            />
          </g>
        )}

        {id === 'rats' && (
          <g>
            {/* Exascale scheduler policy fan-out (central canonical state -> 4 cluster racks) */}
            <rect
              x="44"
              y="40"
              width="78"
              height="48"
              rx="6"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="#d97706"
              strokeWidth="1.4"
            />
            <line
              x1="56"
              y1="56"
              x2="110"
              y2="56"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <line
              x1="56"
              y1="66"
              x2="96"
              y2="66"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <circle cx="109" cy="74" r="3" fill="#d97706" />

            {/* Policy fan-out bus */}
            {[24, 50, 78, 104].map((y, idx) => (
              <g key={y}>
                <path
                  d={`M122 64 C168 64, 172 ${y}, 220 ${y}`}
                  stroke="currentColor"
                  strokeOpacity={idx === 0 ? 0.55 : 0.25}
                  strokeWidth="1.25"
                />
                {/* Cluster rack blocks */}
                {[0, 1, 2, 3, 4].map(col => (
                  <rect
                    key={col}
                    x={224 + col * 42}
                    y={y - 9}
                    width="34"
                    height="18"
                    rx="3"
                    fill="currentColor"
                    fillOpacity={idx === 0 && col === 0 ? 0.14 : 0.05}
                    stroke="currentColor"
                    strokeOpacity={idx === 0 && col === 0 ? 0.5 : 0.22}
                  />
                ))}
                <circle
                  cx="232"
                  cy={y}
                  r="2"
                  fill={idx === 0 ? '#d97706' : 'currentColor'}
                  fillOpacity={idx === 0 ? 1 : 0.45}
                />
              </g>
            ))}
          </g>
        )}

        {id === 'bofa-nlp' && (
          <g>
            {/* Unstructured document -> NLP entity extraction -> structured schema */}
            <rect
              x="44"
              y="24"
              width="86"
              height="80"
              rx="6"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.28"
            />
            {[40, 52, 64, 76, 88].map((y, i) => (
              <line
                key={y}
                x1="56"
                y1={y}
                x2={i === 1 || i === 3 ? 116 : 104}
                y2={y}
                stroke={i === 1 || i === 3 ? '#d97706' : 'currentColor'}
                strokeOpacity={i === 1 || i === 3 ? 0.85 : 0.28}
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
            {/* Pipeline connectors */}
            <path
              d="M134 64 L196 64"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeDasharray="3 3"
            />
            <polygon
              points="210,36 266,36 280,64 266,92 210,92 196,64"
              fill="currentColor"
              fillOpacity="0.07"
              stroke="#d97706"
              strokeWidth="1.25"
            />
            <circle cx="238" cy="64" r="4" fill="#d97706" />
            <path
              d="M280 64 L334 64"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeDasharray="3 3"
            />
            {/* Extracted structured entity pills */}
            {[32, 54, 76, 98].map((y, i) => (
              <g key={y}>
                <rect
                  x="338"
                  y={y - 8}
                  width={i % 2 === 0 ? 96 : 78}
                  height="16"
                  rx="8"
                  fill="currentColor"
                  fillOpacity="0.06"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                />
                <circle
                  cx="348"
                  cy={y}
                  r="2.2"
                  fill={i === 0 ? '#d97706' : 'currentColor'}
                  fillOpacity={i === 0 ? 1 : 0.5}
                />
              </g>
            ))}
          </g>
        )}

        {id === 'turio' && (
          <g>
            {/* 3-level modular hydroponic rack cross-section */}
            <rect
              x="72"
              y="18"
              width="156"
              height="92"
              rx="5"
              fill="currentColor"
              fillOpacity="0.03"
              stroke="currentColor"
              strokeOpacity="0.26"
            />
            {/* Three active growing levels with trays & LED bars */}
            {[36, 58, 80].map((y, idx) => (
              <g key={y}>
                <line
                  x1="82"
                  y1={y - 9}
                  x2="218"
                  y2={y - 9}
                  stroke="#d97706"
                  strokeOpacity={idx === 1 ? 0.65 : 0.25}
                  strokeWidth="1.2"
                  strokeDasharray="6 4"
                />
                <rect
                  x="84"
                  y={y}
                  width="132"
                  height="7"
                  rx="2"
                  fill="currentColor"
                  fillOpacity={idx === 1 ? 0.14 : 0.08}
                  stroke="currentColor"
                  strokeOpacity={idx === 1 ? 0.45 : 0.25}
                />
                {[98, 128, 158, 188].map(tx => (
                  <circle
                    key={tx}
                    cx={tx}
                    cy={y - 2}
                    r="2.2"
                    fill={idx === 1 && tx === 188 ? '#d97706' : 'currentColor'}
                    fillOpacity={idx === 1 && tx === 188 ? 0.95 : 0.4}
                  />
                ))}
              </g>
            ))}
            {/* Shared recirculating nutrient reservoir */}
            <rect
              x="92"
              y="95"
              width="116"
              height="10"
              rx="2.5"
              fill="currentColor"
              fillOpacity="0.1"
              stroke="currentColor"
              strokeOpacity="0.32"
            />
            <path
              d="M72 100 L56 100 L56 36 L72 36"
              stroke="currentColor"
              strokeOpacity="0.24"
              strokeDasharray="3 3"
            />

            {/* VLA perception cone & articulated robotic arm */}
            <path
              d="M204 56 L278 36 L278 76 Z"
              fill="#d97706"
              fillOpacity="0.08"
              stroke="#d97706"
              strokeOpacity="0.3"
              strokeDasharray="3 3"
            />
            {/* Grasp target indicator */}
            <circle
              cx="204"
              cy="56"
              r="7"
              fill="#d97706"
              fillOpacity="0.15"
              stroke="#d97706"
              strokeWidth="1.2"
            />
            <circle cx="204" cy="56" r="2.3" fill="#d97706" />

            {/* Articulated 6-DOF arm linkages */}
            <path
              d="M368 102 L346 66 L296 42 L252 56"
              stroke="currentColor"
              strokeOpacity="0.65"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Base pedestal */}
            <rect
              x="348"
              y="98"
              width="40"
              height="10"
              rx="3"
              fill="currentColor"
              fillOpacity="0.12"
              stroke="currentColor"
              strokeOpacity="0.35"
            />
            {/* Arm joints */}
            {[
              { x: 368, y: 100, accent: false },
              { x: 346, y: 66, accent: false },
              { x: 296, y: 42, accent: true },
              { x: 252, y: 56, accent: false },
            ].map((j, i) => (
              <circle
                key={i}
                cx={j.x}
                cy={j.y}
                r={j.accent ? 4.5 : 3.5}
                fill={j.accent ? '#d97706' : 'currentColor'}
                fillOpacity={j.accent ? 0.95 : 0.75}
              />
            ))}
            {/* End-effector gripper */}
            <path
              d="M252 56 L239 50 M252 56 L239 62"
              stroke="#d97706"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        )}

        {id === 'podcast' && (
          <g>
            {/* Symmetric audio waveform + RSS broadcast arcs */}
            {[
              10, 18, 28, 16, 42, 60, 34, 74, 52, 86, 62, 40, 78, 54, 30, 64,
              44, 24, 38, 18, 12,
            ].map((h, i) => {
              const x = 68 + i * 14
              const isPeak = h >= 74
              return (
                <rect
                  key={i}
                  x={x}
                  y={64 - h / 2}
                  width="5"
                  height={h}
                  rx="2.5"
                  fill={isPeak ? '#d97706' : 'currentColor'}
                  fillOpacity={isPeak ? 0.9 : 0.28 + (h / 100) * 0.35}
                />
              )
            })}
            {/* Broadcast arcs */}
            <path
              d="M390 48 A22 22 0 0 1 390 80"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M402 38 A36 36 0 0 1 402 90"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="380" cy="64" r="4" fill="#d97706" />
          </g>
        )}

        {id === 'ecommerce' && (
          <g>
            {/* Automated catalog generation grid */}
            {[0, 1, 2, 3].map(col => (
              <g key={col}>
                <rect
                  x={52 + col * 98}
                  y={24}
                  width="76"
                  height="80"
                  rx="8"
                  fill="currentColor"
                  fillOpacity={col === 2 ? 0.08 : 0.04}
                  stroke={col === 2 ? '#d97706' : 'currentColor'}
                  strokeOpacity={col === 2 ? 0.85 : 0.24}
                  strokeWidth={col === 2 ? 1.4 : 1}
                />
                <rect
                  x={62 + col * 98}
                  y={34}
                  width="56"
                  height="38"
                  rx="4"
                  fill="currentColor"
                  fillOpacity="0.07"
                />
                <line
                  x1={62 + col * 98}
                  y1={82}
                  x2={104 + col * 98}
                  y2={82}
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1={62 + col * 98}
                  y1={92}
                  x2={88 + col * 98}
                  y2={92}
                  stroke="currentColor"
                  strokeOpacity="0.2"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
        )}

        {id === 'anthologia' && (
          <g>
            {/* Multi-agent narrative storyboard sequence */}
            <path
              d="M90 64 C135 28, 175 28, 220 64 C265 100, 305 100, 350 64 L410 64"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1.4"
            />
            {[
              { x: 64, y: 46, active: false },
              { x: 184, y: 46, active: true },
              { x: 304, y: 46, active: false },
              { x: 392, y: 46, active: false },
            ].map((frame, i) => (
              <g key={i}>
                <rect
                  x={frame.x}
                  y={frame.y}
                  width="56"
                  height="36"
                  rx="5"
                  fill="currentColor"
                  fillOpacity={frame.active ? 0.1 : 0.05}
                  stroke={frame.active ? '#d97706' : 'currentColor'}
                  strokeOpacity={frame.active ? 0.9 : 0.3}
                  strokeWidth={frame.active ? 1.5 : 1}
                />
                <polygon
                  points={`${frame.x + 24},${frame.y + 12} ${frame.x + 24},${frame.y + 24} ${frame.x + 35},${frame.y + 18}`}
                  fill={frame.active ? '#d97706' : 'currentColor'}
                  fillOpacity={frame.active ? 0.9 : 0.35}
                />
              </g>
            ))}
          </g>
        )}

        {id === 'cadenza' && (
          <g>
            {/* Generative harmonic spectrum + vinyl rings */}
            <circle
              cx="116"
              cy="64"
              r="40"
              stroke="currentColor"
              strokeOpacity="0.22"
            />
            <circle
              cx="116"
              cy="64"
              r="28"
              stroke="currentColor"
              strokeOpacity="0.14"
            />
            <circle
              cx="116"
              cy="64"
              r="16"
              stroke="#d97706"
              strokeOpacity="0.8"
              strokeWidth="1.4"
            />
            <circle cx="116" cy="64" r="3.5" fill="#d97706" />

            {/* Harmonic sine ribbons */}
            <path
              d="M174 64 Q212 22, 250 64 T326 64 T402 64 T446 64"
              stroke="currentColor"
              strokeOpacity="0.65"
              strokeWidth="1.6"
            />
            <path
              d="M174 64 Q212 96, 250 64 T326 64 T402 64 T446 64"
              stroke="#d97706"
              strokeOpacity="0.6"
              strokeWidth="1.25"
            />
            <path
              d="M174 64 Q212 42, 250 64 T326 64 T402 64 T446 64"
              stroke="currentColor"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
          </g>
        )}

        {id === 'kalshi' && (
          <g>
            {/* Probability threshold bands & event market signal */}
            <rect
              x="36"
              y="42"
              width="408"
              height="44"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <line
              x1="36"
              y1="42"
              x2="444"
              y2="42"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeDasharray="4 4"
            />
            <line
              x1="36"
              y1="86"
              x2="444"
              y2="86"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeDasharray="4 4"
            />
            {/* Signal line */}
            <path
              d="M36 82 L84 74 L126 88 L174 58 L220 66 L268 38 L314 52 L362 30 L404 46 L444 26"
              stroke="currentColor"
              strokeOpacity="0.72"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            {/* Execution trigger points */}
            {[
              { x: 174, y: 58 },
              { x: 268, y: 38 },
              { x: 362, y: 30 },
            ].map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="6"
                  fill="#d97706"
                  fillOpacity="0.18"
                  stroke="#d97706"
                  strokeWidth="1.2"
                />
                <circle cx={pt.x} cy={pt.y} r="2.2" fill="#d97706" />
              </g>
            ))}
          </g>
        )}

        {id === 'hoa' && (
          <g>
            {/* Modular community / multi-tenant property blocks */}
            <rect
              x="58"
              y="26"
              width="120"
              height="76"
              rx="6"
              fill="currentColor"
              fillOpacity="0.06"
              stroke="currentColor"
              strokeOpacity="0.3"
            />
            <rect
              x="70"
              y="38"
              width="44"
              height="24"
              rx="3"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="#d97706"
              strokeOpacity="0.8"
            />
            <rect
              x="122"
              y="38"
              width="44"
              height="24"
              rx="3"
              fill="currentColor"
              fillOpacity="0.07"
            />
            <rect
              x="70"
              y="70"
              width="96"
              height="20"
              rx="3"
              fill="currentColor"
              fillOpacity="0.07"
            />

            {/* Secondary community cards */}
            {[204, 318].map((x, i) => (
              <g key={x}>
                <rect
                  x={x}
                  y="32"
                  width="96"
                  height="64"
                  rx="6"
                  fill="currentColor"
                  fillOpacity="0.04"
                  stroke="currentColor"
                  strokeOpacity="0.22"
                />
                <line
                  x1={x + 14}
                  y1="50"
                  x2={x + 76}
                  y2="50"
                  stroke="currentColor"
                  strokeOpacity="0.38"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1={x + 14}
                  y1="64"
                  x2={x + 62}
                  y2="64"
                  stroke="currentColor"
                  strokeOpacity="0.22"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx={x + 80}
                  cy="80"
                  r="3"
                  fill={i === 0 ? '#d97706' : 'currentColor'}
                  fillOpacity={i === 0 ? 0.9 : 0.35}
                />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}

export default ProjectGraphic
