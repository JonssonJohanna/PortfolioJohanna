import useScrollDirection from '../hooks/useScrollDirection';
import { useSectionContext } from '../providers/sectionProvider';
import { nav } from '../content';

import { useSpring, a } from '@react-spring/web';
import { to } from 'react-spring';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import { handlePrintPdf } from '../../helpers/handlePrintPdf';

const navItems = ['intro', 'education', 'work', 'work samples', 'contact'];

const Nav: React.FC = () => {
  const exportCVRef = useRef(null);
  const { currentSection } = useSectionContext();
  const scrollDirection = useScrollDirection();
  const [state, toggle] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 10 },
    delay: 1000,
    loop: true,
    config: { duration: 700, mass: 1000, friction: 5 },
  });
  const [scrollChange, setScrollchange] = useState(false);

  const isActive = (name: string) => name === currentSection;

  useEffect(() => {
    const changeNavbarScroll = () => {
      if (window.scrollY >= 2000) {
        setScrollchange(true);
      } else {
        setScrollchange(false);
      }
    };

    return () => {
      window.addEventListener('scroll', changeNavbarScroll);
    };
  });
  const isMobile = useIsMobile();

  return (
    <div style={wrapperStyle(isMobile)}>
      {navItems.map((item, index) => (
        <Item
          key={index}
          isActive={isActive(item)}
          scrollDirection={scrollDirection}
        >
          {item}
        </Item>
      ))}
      <div
        style={{
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '0',
          height: '40px',
          paddingRight: '10px',
          writingMode: isMobile ? 'unset' : 'vertical-rl',
        }}
      >
        <a.div
          className={scrollChange ? 'navbar' : 'navbar scrollChange'}
          style={{
            width: '15px',
            height: '15px',
            marginTop: x.to((value) => `${value}px`),
          }}
        />
      </div>
    </div>
  );
};

const Item: React.FC<{ isActive: boolean; scrollDirection: string }> = ({
  isActive,
  scrollDirection,
  children,
}) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const [{ top, bottom }, api] = useSpring(() => ({
    default: { top: isActive ? 0 : 100, bottom: 0 },
    to: { top: isActive ? 0 : 100, bottom: 0 },
  }));

  const onExit = () => {
    api.start(
      scrollDirection === 'down'
        ? {
            to: { top: 100, bottom: 0 },
            from: { top: 0, bottom: 0 },
          }
        : {
            to: { top: 0, bottom: 100 },
            from: { top: 0, bottom: 0 },
          }
    );
  };

  const onEnter = () => {
    api.start(
      scrollDirection === 'down'
        ? {
            to: { top: 0, bottom: 0 },
            from: { top: 0, bottom: 100 },
          }
        : {
            to: { top: 0, bottom: 0 },
            from: { top: 100, bottom: 0 },
          }
    );
  };

  useEffect(() => {
    if (isActive && !ref.current) {
      onEnter();
    }

    if (!isActive && ref.current) {
      onExit();
    }

    ref.current = isActive;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div style={{ position: 'relative' }}>
      <p style={{ margin: '10px 10px 10px 5px' }}>{children}</p>
      <a.div
        style={{
          ...lineStyle(isMobile),
          top: to(top, (value) => `${value}%`),
          bottom: to(bottom, (value) => `${value}%`),
        }}
      />
    </div>
  );
};

const wrapperStyle: (arg: boolean) => CSSProperties = (isMobile: boolean) => ({
  position: isMobile ? 'sticky' : 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
  writingMode: isMobile ? 'unset' : 'vertical-rl',
  textOrientation: 'mixed',
  zIndex: 3,
  display: 'flex',
  justifyContent: isMobile ? 'space-evenly' : 'unset',
  alignContent: isMobile ? 'space-evenly' : 'unset',
});

const lineStyle: (arg: boolean) => CSSProperties = (isMobile: boolean) => ({
  position: isMobile ? 'unset' : 'absolute',
  left: 0,
  width: '3px',
  backgroundColor: '#dd403a',
});

export default Nav;
