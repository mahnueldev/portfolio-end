import { CreateCert, RenderCert } from '../components';

const Certifications = () => {
  return (
    <section className='flex'>
      <div className='w-3/6'>
        <CreateCert />
      </div>
      <RenderCert />
    </section>
  );
};

export default Certifications;
