import React, { useState, useEffect } from 'react';
import { jobRoles } from '../data/jobRoles';

const Preferences = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (formData.jobRole) {
      const role = jobRoles.find(r => r.role === formData.jobRole);
      setSelectedRole(role);
    }
  }, [formData.jobRole]);

  const handleRoleChange = (e) => {
    const role = jobRoles.find(r => r.role === e.target.value);
    setFormData(prev => ({ 
      ...prev, 
      jobRole: e.target.value,
      techStack: '',
      preferredLanguage: '',
      portfolioUrl: ''
    }));
    setSelectedRole(role);
    setErrors(prev => ({ ...prev, jobRole: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Preferences</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Job Role *
        </label>
        <select
          value={formData.jobRole}
          onChange={handleRoleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.jobRole ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Choose a role...</option>
          {jobRoles.map(role => (
            <option key={role.id} value={role.role}>{role.role}</option>
          ))}
        </select>
        {errors.jobRole && <p className="text-red-500 text-sm mt-1">{errors.jobRole}</p>}
      </div>

      {selectedRole && selectedRole.fields.includes('techStack') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack *
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.techStack ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., React, TypeScript, Node.js"
          />
          {errors.techStack && <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>}
        </div>
      )}

      {selectedRole && selectedRole.fields.includes('preferredLanguage') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Language *
          </label>
          <input
            type="text"
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Python, Java, Go"
          />
          {errors.preferredLanguage && <p className="text-red-500 text-sm mt-1">{errors.preferredLanguage}</p>}
        </div>
      )}

      {selectedRole && selectedRole.fields.includes('portfolioUrl') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Portfolio URL *
          </label>
          <input
            type="url"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.portfolioUrl ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://yourportfolio.com"
          />
          {errors.portfolioUrl && <p className="text-red-500 text-sm mt-1">{errors.portfolioUrl}</p>}
        </div>
      )}
    </div>
  );
};

export default Preferences;