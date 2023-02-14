import { CSSProperties } from 'react';
import { a, to, useSpring } from 'react-spring';
import Section from './Section';
import ProfileImage from '../../public/Johanna.jpg';
import Image from 'next/image';

const Contact = () => (
  <Section name='contact'>
    <div style={contactStyle}>
      <h1>
        <Link label='email me' href='mailto:johanna_jonson@hotmail.com'></Link>
      </h1>
      <p>or connect on</p>
      <h1>
        <Link
          label='linked In'
          href='https://www.linkedin.com/in/johanna-jönsson-b5155518a'
        />
      </h1>
      <div style={imageStyle}>
        <Image
          alt={'Profile Picture'}
          src={ProfileImage.src}
          width={200}
          height={200}
        />
      </div>
    </div>
  </Section>
);

const Link: React.FC<{ label: string; href: string }> = ({ label, href }) => {
  const [{ width }, api] = useSpring(() => ({
    default: { width: 0 },
    to: { width: 0 },
  }));

  const onLeave = () => {
    api.start({ to: { width: 0 }, from: { width: 100 } });
  };

  const onEnter = () => {
    api.start({ to: { width: 100 }, from: { width: 0 } });
  };

  return (
    <div style={linkStyle}>
      <h1 onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <a href={href}>{label}</a>
      </h1>
      <a.div
        style={{
          width: to(width, (value) => `${value}%`),
          ...linkLineStyle,
        }}
      />
    </div>
  );
};

const contactStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: '90vh',
  position: 'relative',
};

const linkStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  width: 'fit-content',
  color: '#2356d1',
};

const linkLineStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  height: '8px',
  backgroundColor: '#2356d1',
};
const imageStyle: CSSProperties = {
  marginTop: '2rem',
  borderRadius: '50%',
  overflow: 'hidden',
  width: '200px',
  height: '200px',
};

export default Contact;
