import { useTrail, a } from '@react-spring/web';
import Section from './Section';
import { CSSProperties } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const sectionName = 'intro';
const items = [
  <h1 key='1'>Johanna</h1>,
  <h1 key='2'>Jönsson</h1>,
  <p
    key='3'
    style={{ marginTop: '50px', maxWidth: '450px', paddingRight: '2rem' }}
  >
    My name is Johanna and I am a Fullstack Developer but frontend development
    is what I find most enjoyable because it is creative, always challenging,
    and never boring. There are always new things to learn. My goal is is to
    explore as many areas and learn as much possible while delivering innovative
    work. From previous work experiences, I have developed skills and experience
    in Next.js, React, TypeScript, Aurelia and MongoDB.
  </p>,
];
const Intro: React.FC<{ open?: boolean }> = ({ open = true }) => {
  const isMobile = useIsMobile();
  const rowHeight = isMobile ? 70 : 135;
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 30,
    height: open ? rowHeight : 0,
    from: { opacity: 0, x: 30, height: 0 },
  });

  return (
    <Section name={sectionName}>
      <div style={introStyle}>
        <div style={lineStyle(isMobile)} />
        <div>
          {trail.map(({ height, ...style }, index) => (
            <a.div key={index} style={{ ...style, height: `${rowHeight}px` }}>
              <a.div
                style={{ height, ...(index < 2 && { overflow: 'hidden' }) }}
              >
                {items[index]}
              </a.div>
            </a.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const introStyle: CSSProperties = {
  height: '110vh',
  padding: '40px',
  display: 'flex',
  position: 'relative',
  fontSize: '18px',
};

const lineStyle: (arg: boolean) => CSSProperties = (isMobile: boolean) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  clipPath: 'polygon(45% 0px, 45.1% 0px, 30.1% 100%, 30% 100%)',
  backgroundColor: '#f06c9b',
  pointerEvents: 'none',
  display: isMobile ? 'none' : 'flex',
});

export default Intro;
