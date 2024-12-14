import React from 'react';
// Import Icons
import { FaShippingFast } from 'react-icons/fa';
import { Ri24HoursLine } from 'react-icons/ri';
import { MdPayments } from 'react-icons/md';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import Title from './Title';

function ServiceSection() {
  const services = [
    {
      icon: <FaShippingFast />,
      title: "Fast Shipping",
      description: "Get your products delivered in record time anywhere.",
    },
    {
      icon: <Ri24HoursLine />,
      title: "24/7 Support",
      description: "We're here to help you anytime, day or night.",
    },
    {
      icon: <MdPayments />,
      title: "COD Payment",
      description: "Enjoy the flexibility of cash-on-delivery payments.",
    },
    {
      icon: <AiOutlineSafetyCertificate />,
      title: "100% Safe",
      description: "Shop confidently with our secure platform.",
    },
  ];

  return (
    <div className="py-12 px-6 bg-[#FAFAFA]">
      <div className="text-center uppercase mb-10 text-3xl">
        <Title text1={'Our'} text2={'Services'}/>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-6 max-w-sm bg-white border shadow-sm p-4 rounded-lg transition-transform transform "
          >
            <div className="text-5xl text-[#cba035b3] flex-shrink-0">
              {service.icon}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h4>
              <p className="text-gray-500 text-sm mt-1">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceSection;
