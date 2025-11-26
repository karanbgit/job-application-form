import React, { useState, useEffect } from 'react';
import { fetchJobRoles } from '../api/jobApi';

const Preferences = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job roles from MockAPI when component loads
  useEffect(() => {
    const loadJobRoles = async () => {
      try {
        setLoading(true);
        setError(null);
        const roles = await fetchJobRoles();
        setJobRoles(roles);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching job roles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJobRoles();
  }, []);

  useEffect(() => {
    if (formData.jobRole) {
      const role = jobRoles.find(r => r.role === formData.jobRole);
      setSelectedRole(role);
    }
  }, [formData.jobRole, jobRoles]);

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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchJobRoles()
      .then(roles => setJobRoles(roles))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Job Preferences</h2>
      
      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading job roles...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">Error loading job roles</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                onClick={handleRetry}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Preferences;