import React, { CSSProperties, useEffect, useState } from 'react';
import {
  CurrentSection,
  useSectionContext,
} from '../providers/sectionProvider';
import Section from './Section';
import { a, to, useSpring } from 'react-spring';
import useIsMobile from '../hooks/useIsMobile';

const sectionName: CurrentSection = 'education';
const educations = [
  'Web Developer, YRGO 2021-Ongoing',
  'Biology, Uppsala University 2020-2021',
  'Bachlor Environmental Science, Malmö University 2017–2020',
  'Sigrid Rudebecks Gymnasium, Gothenburg 2010–2013',
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
            {educations.map((education, i) => {
              return (
                <li key={i} style={textStyle}>
                  {education}
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
  clipPath: 'polygon(10% 0, 50% 0, 40% 100%, 0% 100%)',
  background: '#2356d1',
};

const wrapperListtyle: (arg: boolean) => CSSProperties = (
  isMobile: boolean
) => ({
  position: 'absolute',
  right: isMobile ? '6vh' : '50vh',
  top: '280px',
  gap: '20px',
  maxWidth: isMobile ? '260px' : '700px',
  fontSize: '20px',
});
const textStyle: CSSProperties = {
  zIndex: 1,
  paddingBottom: '20px',
};

const headingStyle: (arg: boolean) => CSSProperties = (isMobile: boolean) => ({
  position: 'absolute',
  top: 50,
  right: isMobile ? '12%' : '15vw',
  zIndex: 1,
});

export default Education;
