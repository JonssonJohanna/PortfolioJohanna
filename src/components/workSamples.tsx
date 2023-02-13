import React, { CSSProperties, useEffect, useState } from 'react';
import {
  CurrentSection,
  useSectionContext,
} from '../providers/sectionProvider';
import Section from './Section';
import { a, to, useSpring } from 'react-spring';
import useIsMobile from '../hooks/useIsMobile';

const sectionName: CurrentSection = 'work samples';

const WorkSamples: React.FC = () => {
  const { currentSection } = useSectionContext();
  const [isAnimated, setAnimated] = useState(false);

  const [{ left }, api] = useSpring(() => ({
    default: { left: 50 },
    to: { left: 50 },
  }));

  useEffect(() => {
    if (!isAnimated && currentSection === sectionName) {
      onEnter();
      setAnimated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  const onEnter = () => {
    api.start({
      config: { mass: 4, tension: 800, friction: 200 },
      to: { left: -40 },
      from: { left: 50 },
    });
  };
  const isMobile = useIsMobile();
  return (
    <Section name={sectionName}>
      <div style={wrapperStyle}>
        <h1 style={headingStyle}>{sectionName}</h1>
        <a.div
          style={{
            left: to(left, (value) => `${value}%`),
            ...slideStyle,
          }}
        >
          <div style={shapeStyle} />
          <ul style={wrapperListtyle(isMobile)}>
            <li style={textStyle}>
              <a
                href='https://bureau-racks-d4fj.vercel.app/'
                target='_blank'
                rel='noreferrer'
              >
                Byrårackor
              </a>
            </li>
            <li style={textStyle}>
              <a
                href='https://snake-game-pixi.netlify.app/'
                target='_blank'
                rel='noreferrer'
              >
                Snake Game
              </a>
            </li>
            <li style={textStyle}>
              <a
                href='https://eastgbg-aogaygyr1-jonssonjohanna.vercel.app/'
                target='_blank'
                rel='noreferrer'
              >
                Love Calculator
              </a>
            </li>
          </ul>
        </a.div>
      </div>
    </Section>
  );
};

const wrapperStyle: CSSProperties = {
  background: '#f06c9b',
  position: 'relative',
  minHeight: '100vh',
  width: '100vw',
  overflow: 'hidden',
};

const slideStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '140%',
  height: '100%',
  display: 'flex',
};

const shapeStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 70% 100%)',
  background: '#eeeeee',
};

const headingStyle: CSSProperties = {
  position: 'absolute',
  top: 50,
  left: '20vw',
  zIndex: 1,
};
const wrapperListtyle: (arg: boolean) => CSSProperties = (
  isMobile: boolean
) => ({
  position: 'absolute',
  right: isMobile ? '20vw' : '40vw',
  top: '250px',
  gap: '20px',
  fontSize: '20px',
});

const textStyle: CSSProperties = {
  paddingBottom: '20px',
};

export default WorkSamples;
