import React, { CSSProperties, useEffect, useState } from 'react';
import {
  CurrentSection,
  useSectionContext,
} from '../providers/sectionProvider';
import Section from './Section';
import { a, to, useSpring } from 'react-spring';
import useIsMobile from '../hooks/useIsMobile';

const sectionName: CurrentSection = 'work';
const experiences = [
  'Intern as Web Developer at Annevo AB, Ongoing',
  'Administrator at Östra Sjukhuset, 2022',
  'Intern at Orkla Foods AB, 2019',
  'Environmental Technician at Renova, 2019-2021',
];

const Education: React.FC = () => {
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
        <h1 style={headingStyle(isMobile)}>{sectionName}</h1>
        <a.div
          style={{
            left: to(left, (value) => `${value}%`),
            ...slideStyle,
          }}
        >
          <div style={shapeStyle} />
          <ul style={wrapperListtyle(isMobile)}>
            {experiences.map((experience, index) => {
              return (
                <li key={index} style={textStyle}>
                  {experience}
                </li>
              );
            })}
          </ul>
        </a.div>
      </div>
    </Section>
  );
};

const wrapperStyle: CSSProperties = {
  background: '#eeeeee',
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
  clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 30% 100%)',
  background: '#dd403a',
};

const headingStyle: (arg: boolean) => CSSProperties = (isMobile: boolean) => ({
  position: 'absolute',
  top: 50,
  left: isMobile ? '25%' : '20vw',
  zIndex: 1,
  color: 'white',
});
const wrapperListtyle: (arg: boolean) => CSSProperties = (
  isMobile: boolean
) => ({
  position: 'absolute',
  right: isMobile ? '15vw' : '40vw',
  top: isMobile ? '180px' : '250px',
  gap: '20px',
  maxWidth: isMobile ? '260px' : '700px',
  color: 'white',
  fontSize: '20px',
});

const textStyle: CSSProperties = {
  paddingBottom: '20px',
};

export default Education;
