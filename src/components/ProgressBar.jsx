import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Personal Details', 'Job Preferences', 'Preview & Submit'];
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1 px-1">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base ${
              index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {index + 1}
            </div>
            <p className="text-[10px] sm:text-xs mt-1 text-center leading-tight max-w-[80px] sm:max-w-none">
              {step}
            </p>
          </div>
        ))}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;