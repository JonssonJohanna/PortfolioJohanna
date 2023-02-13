import Contact from '../components/Contact';

import Nav from '../components/Nav';
import Intro from '../components/Intro';
import { SectionProvider } from '../providers/sectionProvider';
import Education from '../components/Education';
import Work from '../components/Work';
import WorkSamples from '../components/workSamples';

const App = () => (
  <SectionProvider>
    <Nav />
    <Intro />
    <Education />
    <Work />
    <WorkSamples />
    <Contact />
  </SectionProvider>
);

export default App;
