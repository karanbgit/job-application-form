import React from 'react';
import { jobRoles } from '../data/jobRoles';

// Step 3: Preview and Submit
const Preview = ({ formData }) => {
  // Find the selected job role
  const selectedRole = jobRoles.find(r => r.role === formData.jobRole);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview & Submit</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        
        {/* Personal Details Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resume</p>
              <p className="font-medium">{formData.resume?.name}</p>
            </div>
          </div>
        </div>

        {/* Job Preferences Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Job Preferences</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Job Role</p>
              <p className="font-medium">{formData.jobRole}</p>
            </div>
            
            {/* Show Tech Stack if Frontend Developer */}
            {selectedRole?.fields.includes('techStack') && formData.techStack && (
              <div>
                <p className="text-sm text-gray-600">Tech Stack</p>
                <p className="font-medium">{formData.techStack}</p>
              </div>
            )}
            
            {/* Show Preferred Language if Backend Developer */}
            {selectedRole?.fields.includes('preferredLanguage') && formData.preferredLanguage && (
              <div>
                <p className="text-sm text-gray-600">Preferred Language</p>
                <p className="font-medium">{formData.preferredLanguage}</p>
              </div>
            )}
            
            {/* Show Portfolio URL if Designer */}
            {selectedRole?.fields.includes('portfolioUrl') && formData.portfolioUrl && (
              <div>
                <p className="text-sm text-gray-600">Portfolio URL</p>
                <p className="font-medium text-blue-600">{formData.portfolioUrl}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;