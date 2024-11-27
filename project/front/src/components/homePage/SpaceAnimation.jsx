import React from 'react';

const LuxuryKitchenShowcase = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      {/* Left side: Image */}
      <div className="md:w-2/3 h-1/2 md:h-full bg-cover bg-center" style={{backgroundImage: "url('/api/placeholder/1200/800')"}}>
<img src="https://images.pexels.com/photos/5256523/pexels-photo-5256523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />      </div>
      
      {/* Right side: Text content */}
      <div className="md:w-1/3 h-1/2 md:h-full bg-olive-800 text-white p-8 flex flex-col justify-center bg-black">
        <h2 className="text-2xl font-light mb-6">A HOME ATTUNED TO YOU, AND YOURS</h2>
        <p className="text-sm leading-relaxed mb-6">
          Imagine a home that feels as effortless as you. It's precious one of the
          rarest. It inspires the heart with ease from the start, welcoming together or
          solitude. It enhances with precision the people we love. It satisfies,
          delights, enriches.
        </p>
        <p className="text-sm leading-relaxed mb-6 bg-black">
          Best of all, it celebrates your favorite rituals and family memories,
          elevating them to works of art. You recognize, embrace, and
          relish this as home at last from the start. That's the beauty of great
          design.
        </p>
        <a href="#" className="text-sm uppercase tracking-wider hover:underline">explore kitchens</a>
      </div>
    </section>
  );
};

export default LuxuryKitchenShowcase;