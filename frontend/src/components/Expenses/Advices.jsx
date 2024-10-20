import React from 'react';

const advices = [
  "Always track your income and expenses.",
  "Create a budget and stick to it.",
  "Save at least 20% of your income.",
  "Invest in your education and skills.",
  "Consider getting professional financial advice."
];

const Advices = () => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Financial Advice</h2>
      <ul className="list-disc list-inside">
        {advices.map((advice, index) => (
          <li key={index} className="mb-2">
            {advice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Advices;
