import React, { CSSProperties, useEffect, useState } from 'react';
import {
  CurrentSection,
  useSectionContext,
} from '../providers/sectionProvider';
import Section from './Section';
import { a, to, useSpring } from 'react-spring';
import useIsMobile from '../hooks/useIsMobile';
import { getConvertDate } from 'helpers/convertDate';
import axios from 'axios';

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
  const { projects, isLoading, hasError } = useGitProjects([
    'vigilant-guacamole',
    'bureau-racks',
    'Playdate',
    'eastgbg',
  ]);
  console.log('gitprojects', projects);

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
          <div style={wrapperListtyle(isMobile)}>
            {projects &&
              projects.map(
                (
                  project: {
                    title: string | undefined;
                    text: string | undefined;
                    language: string | undefined;
                    updated: string | number | Date;
                    repoUrl: any;
                    homePage: any;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      maxWidth: '400px',
                      margin: '0 auto',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'right',
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        {getConvertDate(project.updated)}
                      </p>
                      <a
                        style={{ margin: '5px 0', fontFamily: 'Roboto' }}
                        href={project.repoUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Repositroy
                      </a>
                      <a
                        style={{ margin: '5px 0', fontFamily: 'Roboto' }}
                        href={project.homePage}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Homepage
                      </a>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingBottom: 0,
                        textAlign: 'left',
                      }}
                    >
                      <h3
                        style={{
                          marginBottom: '3px',
                          marginTop: '0',
                          paddingRight: '15px',
                        }}
                      >
                        {project.title}
                      </h3>
                      <p style={{ fontSize: '14px', marginTop: '0' }}>
                        {project.language}
                      </p>
                    </div>
                  </div>
                )
              )}
          </div>
        </a.div>
      </div>
    </Section>
  );
};

const wrapperStyle: CSSProperties = {
  background: '#f06c9b',
  position: 'relative',
  minHeight: '130vh',
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

const BASE_URL = 'https://api.github.com/repos/JonssonJohanna/';

const useGitProjects = (repositoryList: string[]) => {
  const [projects, setProjects] = useState<any>();
  const [hasError, setError] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const projects = await fetchProjects(repositoryList);

      setProjects(projects);
    } catch (e) {
      setError(true);
    }
  };

  return { projects, hasError, isLoading: !hasError && !projects };
};

const fetchProjects = async (cards: string[]): Promise<any[]> =>
  Promise.all(cards.map((card) => fetchProject(card)));

const fetchProject = async (repo: string): Promise<any> => {
  const apiUrl = `${BASE_URL}${repo}`;

  try {
    const { data } = await axios.get(apiUrl);

    return {
      title: data.name,
      text: data.description,
      language: data.language,
      updated: data.pushed_at,
      repoUrl: data.html_url,
      homepage: data.homepage,
    };
  } catch (e) {
    console.error(`Failed to fetch resource from ${apiUrl}`);
  }
};

export default WorkSamples;
