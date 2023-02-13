const intro = {
  name: 'intro' as const,
  items: [
    <h1 key='1'>Lorem</h1>,
    <h1 key='2'>Ipsum</h1>,
    <p key='3' style={{ marginTop: '50px', maxWidth: '500px' }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem doloremque
      iusto, obcaecati numquam id, quam voluptas rerum facere expedita
      voluptates, tempore eum necessitatibus! Iusto eos mollitia aperiam itaque
      laudantium voluptate?
    </p>,
  ],
};
const education = {
  name: 'education' as const,
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem doloremque
  iusto, obcaecati numquam id, quam voluptas rerum facere expedita
  voluptates, tempore eum necessitatibus! Iusto eos mollitia aperiam itaque
  laudantium voluptate?`,
};
const experience = {
  name: 'experience',
};
const contact = {};
const nav = ['intro', 'education', 'work', 'work samples', 'contact'];

export { intro, education, experience, contact, nav };
