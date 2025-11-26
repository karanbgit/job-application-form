import React, { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import Personal from './components/Personal';
import Preferences from './components/Preferences';
import Preview from './components/Preview';
import { validateEmail, validatePhone, validateFile } from './utils/validation';
import { jobRoles } from './data/jobRoles';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    jobRole: '',
    techStack: '',
    preferredLanguage: '',
    portfolioUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('jobAppForm');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  useEffect(() => {
    const { resume, ...dataToSave } = formData;
    localStorage.setItem('jobAppForm', JSON.stringify(dataToSave));
  }, [formData]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    else if (!validateFile(formData.resume)) newErrors.resume = 'File must be ≤ 2MB';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.jobRole) newErrors.jobRole = 'Job role is required';
    const selectedRole = jobRoles.find(r => r.role === formData.jobRole);
    if (selectedRole) {
      if (selectedRole.fields.includes('techStack') && !formData.techStack.trim()) {
        newErrors.techStack = 'Tech stack is required';
      }
      if (selectedRole.fields.includes('preferredLanguage') && !formData.preferredLanguage.trim()) {
        newErrors.preferredLanguage = 'Preferred language is required';
      }
      if (selectedRole.fields.includes('portfolioUrl') && !formData.portfolioUrl.trim()) {
        newErrors.portfolioUrl = 'Portfolio URL is required';
      }
    }
    return newErrors;
  };

  const handleNext = () => {
    let validationErrors = {};
    if (currentStep === 0) {
      validationErrors = validateStep1();
    } else if (currentStep === 1) {
      validationErrors = validateStep2();
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    localStorage.removeItem('jobAppForm');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 md:py-8 px-3 md:px-4">
      <div className="max-w-3xl mx-auto pb-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-6">
            Job Application Form
          </h1>
          
          <ProgressBar currentStep={currentStep} />
          
          {/* Content Area - Scrollable on small screens */}
          <div className="mt-4 md:mt-6 mb-4 md:mb-6">
            {currentStep === 0 && (
              <Personal 
                formData={formData} 
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {currentStep === 1 && (
              <Preferences 
                formData={formData} 
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {currentStep === 2 && (
              <Preview formData={formData} />
            )}
          </div>
          
          {/* Fixed Navigation Buttons */}
          <div className="flex justify-between gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'
              }`}
            >
              Back
            </button>
            {currentStep < 2 ? (
              <button
                onClick={handleNext}
                className="px-4 md:px-6 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm md:text-base"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 md:px-6 py-2 md:py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 active:bg-green-800 transition-colors text-sm md:text-base"
              >
                Submit
              </button>
            )}
          </div>
        </div>
        
        {showToast && (
          <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg text-sm md:text-base z-50">
            ✓ Application submitted!
          </div>
        )}
      </div>
    </div>
  );
}