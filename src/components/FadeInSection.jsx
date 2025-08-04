import React from 'react';
import { useInView } from 'react-intersection-observer';

const FadeInSection = ({ children, alternate, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const backgroundClass = alternate ? 'bg-gray-50' : 'bg-white';

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 transition-opacity duration-1000 ease-in ${
        inView ? 'opacity-100' : 'opacity-0'
      } ${backgroundClass}`}
    >
      {children}
    </section>
  );
};

export default FadeInSection;
