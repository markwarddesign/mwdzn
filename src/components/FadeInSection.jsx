import React from 'react';
import { useInView } from 'react-intersection-observer';

const FadeInSection = ({ children, alternate, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Alternate between two dark backgrounds
  const backgroundClass = alternate
    ? 'bg-[#23283a] text-white'
    : 'bg-[#181c24] text-white';

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 transition-opacity duration-1000 ease-in ${
        inView ? 'opacity-100' : 'opacity-0'
      } ${backgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default FadeInSection;
