export interface WaveDividerProps {
  color?: 'white' | 'offwhite' | 'navy' | 'gold';
  flip?: boolean;
  height?: number;
  variant?: 'wave' | 'curve' | 'organic';
}

const paths = {
  white: 'fill-white',
  offwhite: 'fill-[#FAFAFA]',
  navy: 'fill-[#0D2558]',
  gold: 'fill-[#C89D1C]',
};

const svgPaths = {
  wave: 'M0,20 C240,60 480,0 720,30 C960,60 1200,10 1440,40 L1440,60 L0,60 Z',
  curve: 'M0,40 C360,0 720,60 1080,20 C1260,0 1380,10 1440,30 L1440,60 L0,60 Z',
  organic: 'M0,30 C180,55 360,5 540,35 C720,65 900,15 1080,40 C1260,55 1380,25 1440,35 L1440,60 L0,60 Z',
};

export default function WaveDivider({ color = 'white', flip = false, height = 60, variant = 'wave' }: WaveDividerProps) {
  return (
    <div
      className={`wave-divider ${flip ? 'bottom-0' : 'top-0'}`}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: `${height}px` }}
      >
        <path d={svgPaths[variant]} className={paths[color]} />
      </svg>
    </div>
  );
}
