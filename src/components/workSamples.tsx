import React, { CSSProperties, useEffect, useState } from 'react';
import {
  CurrentSection,
  useSectionContext,
} from '../providers/sectionProvider';
import Section from './Section';
import { a, to, useSpring } from 'react-spring';
import useIsMobile from '../hooks/useIsMobile';
import Image from 'next/image';
import Love from '../../public/lovecalculator.png';
import Snake from '../../public/snake.png';
import Byrarackor from '../../public/byrå.png';

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
            <div style={imageWrapper}>
              <li style={textStyle}>
                <a
                  href='https://bureau-racks-d4fj.vercel.app/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Byrårackor <br></br> As a final part of the program this was a
                  group assignment. The website is built using Next.js,
                  Firestore and styled components for styling. The project also
                  includes the Google maps Api.
                </a>
              </li>
              {/* <div style={imageStyle}>
                <Image
                  alt={'Profile Picture'}
                  src={Byrarackor.src}
                  width={200}
                  height={100}
                />
              </div> */}
            </div>
            <li style={textStyle}>
              <a
                href='https://snake-game-pixi.netlify.app/'
                target='_blank'
                rel='noreferrer'
              >
                Snake Game <br></br> This was a group assignment, the purpose
                was to create a game or an experience using JavaScript. The
                project had to utilize a third-party WebGL framework, we chose
                to create Snake using Pixi.js.
              </a>
            </li>
            <li style={textStyle}>
              <a
                href='https://eastgbg-aogaygyr1-jonssonjohanna.vercel.app/'
                target='_blank'
                rel='noreferrer'
              >
                Love Calculator <br></br> This assignment was our first React
                project. The project also includes an Api with fun quotes.
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
  right: isMobile ? '15vw' : '30vw',
  top: isMobile ? '190px' : '250px',
  gap: '20px',
  fontSize: isMobile ? '18px' : '20px',
  width: isMobile ? '300px' : '700px',
});

const textStyle: CSSProperties = {
  paddingBottom: '20px',
};
const imageWrapper: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export default WorkSamples;
