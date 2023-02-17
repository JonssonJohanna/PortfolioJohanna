type ResumeItemProps = {
  duration: string;
  title: string;
  company: string;
  description?: string;
};

const Resume: React.FC<{ items: ResumeItemProps[] }> = ({ items }) => (
  <>
    {items.map((item, i) => (
      <ResumeItem {...item} key={i} />
    ))}
  </>
);

const ResumeItem: React.FC<ResumeItemProps> = ({
  duration,
  title,
  company,
  description,
}) => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '80px', flexShrink: 0, paddingRight: '15px' }}>
      <p style={{ fontSize: '14px' }}>{duration}</p>
    </div>
    <div>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <h3 style={{ margin: '5px 0', fontFamily: 'Roboto' }}>{company}</h3>
      <p style={{ marginTop: 0, fontSize: '14px' }}>{description}</p>
    </div>
  </div>
);

export default Resume;
