import { useRef, useEffect } from 'react';
import {
  CurrentSection,
  useSectionContext,
} from '../providers/sectionProvider';

const IO_OPTIONS = {
  threshold: [0.5],
  root: null,
  rootMargin: '0%',
};

const Section: React.FC<{
  name: CurrentSection;
  children: any;
}> = ({ name, children }) => {
  const { setCurrentSection, currentSection } = useSectionContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    if (entry.intersectionRatio > 0.5) {
      setCurrentSection(name);
    }
  };

  useEffect(() => {
    const node = ref?.current;
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport || !node) return;
    const observer = new IntersectionObserver(updateEntry, IO_OPTIONS);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <div ref={ref}>
      <div style={{ margin: 'auto' }}>{children}</div>
    </div>
  );
};

export default Section;
