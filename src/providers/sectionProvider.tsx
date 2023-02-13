import { Context, createContext, useContext, useMemo, useState } from 'react';

export type CurrentSection =
  | 'intro'
  | 'education'
  | 'work'
  | 'work samples'
  | 'contact';

type SectionContextState = {
  currentSection: CurrentSection;
  setCurrentSection: (name: CurrentSection) => void;
};

const SectionContext: Context<SectionContextState> = createContext(
  {} as SectionContextState
);

export const useSectionContext = (): SectionContextState =>
  useContext(SectionContext);

export const SectionProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [currentSection, setCurrentSection] = useState<CurrentSection>('intro');

  const state: SectionContextState = {
    currentSection,
    setCurrentSection,
  };

  return (
    <SectionContext.Provider value={state}>{children}</SectionContext.Provider>
  );
};
