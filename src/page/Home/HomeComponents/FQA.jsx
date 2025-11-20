import React, { useState } from 'react';

export default function FQA() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How does this posture corrector work?',
      answer:
        'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging proper posture throughout the day.',
    },
    {
      question: 'Is it suitable for all ages and body types?',
      answer:
        'Yes, Posture Pro is designed to be adjustable and comfortable for a wide range of ages and body types.',
    },
    {
      question: 'Does it really help with back pain and posture improvement?',
      answer:
        'Many users report noticeable improvements in posture and reduction in back pain with consistent use.',
    },
    {
      question: 'Does it have smart features like vibration alerts?',
      answer:
        'Some models of Posture Pro include smart vibration alerts to remind you when your posture needs correction.',
    },
    {
      question: 'How will I be notified when the product is back in stock?',
      answer:
        'You can sign up for restock notifications via email on the product page.',
    },
  ];

  return (
    <div className='max-w-5xl my-10 md:my-15 mx-auto'>
      <div className='text-center mb-10 space-y-2'>
        <p className='text-lg sm:text-2xl md:text-3xl font-bold'>Frequently Asked Question (FAQ)</p>
        <p className='text-[#606060] text-xs md:text-sm'>
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
          Achieve proper alignment, reduce <span className='hidden md:inline'><br /></span> pain, and strengthen your body with ease!
        </p>
      </div>

      <div className='space-y-3'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`collapse collapse-arrow border border-base-300 ${
              openIndex === index ? 'bg-[#e6f2f3]' : 'bg-base-100'
            }`}
          >
            <input
              type="radio"
              name="faq-accordion"
              checked={openIndex === index}
              onChange={() => setOpenIndex(index)}
            />
            
            <div className="collapse-title font-semibold">{faq.question}</div>
         
            <div className="collapse-content text-sm">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}