import React from 'react';

// This component shows which step the user is on
const ProgressBar = ({ currentStep }) => {
  const steps = ['Personal Details', 'Job Preferences', 'Preview & Submit'];
  
  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <div className="mb-8">
      {/* Step circles */}
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            {/* Circle with number */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {index + 1}
            </div>
            {/* Step name */}
            <p className="text-xs mt-1 text-center">{step}</p>
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
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