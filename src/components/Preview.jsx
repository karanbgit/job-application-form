import React from 'react';

const Preview = ({ formData }) => {
  const showTechStack = ['Frontend Developer', 'Full Stack Developer'].includes(formData.jobRole);
  const showPreferredLanguage = ['Backend Developer', 'Full Stack Developer', 'DevOps Engineer'].includes(formData.jobRole);
  const showPortfolioUrl = formData.jobRole === 'Designer';

  return (
    
    // Preview component to display entered data before submission
    <div className="space-y-4 md:space-y-6 w-full">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Preview & Submit</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
        
        <div className="pb-4 border-b border-gray-300">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Name</p>
              <p className="font-medium text-sm md:text-base break-words">{formData.name}</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Email</p>
              <p className="font-medium text-sm md:text-base break-all">{formData.email}</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Phone</p>
              <p className="font-medium text-sm md:text-base">{formData.phone}</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Resume</p>
              <p className="font-medium text-sm md:text-base break-words">{formData.resume?.name}</p>
            </div>
          </div>
        </div>

        // Job Preferences Section
        <div className="pt-2">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4">Job Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Job Role</p>
              <p className="font-medium text-sm md:text-base break-words">{formData.jobRole}</p>
            </div>
            
            {showTechStack && formData.techStack && (
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Tech Stack</p>
                <p className="font-medium text-sm md:text-base break-words">{formData.techStack}</p>
              </div>
            )}
            
            {showPreferredLanguage && formData.preferredLanguage && (
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Preferred Language</p>
                <p className="font-medium text-sm md:text-base break-words">{formData.preferredLanguage}</p>
              </div>
            )}
            
            {showPortfolioUrl && formData.portfolioUrl && (
              <div className="min-w-0 col-span-1 sm:col-span-2">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Portfolio URL</p>
                <p className="font-medium text-blue-600 text-sm md:text-base break-all">{formData.portfolioUrl}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;