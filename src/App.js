import React, { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import Step1Personal from './components/Step1Personal';
import Step2Preferences from './components/Step2Preferences';
import Step3Preview from './components/Step3Preview';
import { validateEmail, validatePhone, validateFile } from './utils/validation';
import { jobRoles } from './data/jobRoles';

export default function App() {
  // State to track which step we're on (0, 1, or 2)
  const [currentStep, setCurrentStep] = useState(0);
  
  // State to store all form data
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
  
  // State to store validation errors
  const [errors, setErrors] = useState({});
  
  // State to show/hide success toast
  const [showToast, setShowToast] = useState(false);

  // Load saved form data from localStorage when app starts
  useEffect(() => {
    const saved = localStorage.getItem('jobAppForm');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const { resume, ...dataToSave } = formData; // Don't save file
    localStorage.setItem('jobAppForm', JSON.stringify(dataToSave));
  }, [formData]);

  // Validate Step 1 fields
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    } else if (!validateFile(formData.resume)) {
      newErrors.resume = 'File must be ≤ 2MB';
    }
    
    return newErrors;
  };

  // Validate Step 2 fields
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.jobRole) {
      newErrors.jobRole = 'Job role is required';
    }
    
    // Find the selected role
    const selectedRole = jobRoles.find(r => r.role === formData.jobRole);
    
    if (selectedRole) {
      // Check if tech stack is required and filled
      if (selectedRole.fields.includes('techStack') && !formData.techStack.trim()) {
        newErrors.techStack = 'Tech stack is required';
      }
      
      // Check if preferred language is required and filled
      if (selectedRole.fields.includes('preferredLanguage') && !formData.preferredLanguage.trim()) {
        newErrors.preferredLanguage = 'Preferred language is required';
      }
      
      // Check if portfolio URL is required and filled
      if (selectedRole.fields.includes('portfolioUrl') && !formData.portfolioUrl.trim()) {
        newErrors.portfolioUrl = 'Portfolio URL is required';
      }
    }
    
    return newErrors;
  };

  // Handle "Next" button click
  const handleNext = () => {
    let validationErrors = {};
    
    // Validate based on current step
    if (currentStep === 0) {
      validationErrors = validateStep1();
    } else if (currentStep === 1) {
      validationErrors = validateStep2();
    }

    // If there are errors, show them and don't proceed
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // No errors, move to next step
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  // Handle "Back" button click
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    
    // Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Clear localStorage after submission
    localStorage.removeItem('jobAppForm');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Job Application Form
          </h1>
          
          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} />

          {/* Show the current step */}
          <div className="mt-8">
            {currentStep === 0 && (
              <Step1Personal 
                formData={formData} 
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {currentStep === 1 && (
              <Step2Preferences 
                formData={formData} 
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {currentStep === 2 && (
              <Step3Preview formData={formData} />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {/* Back Button */}
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Back
            </button>
            
            {/* Next or Submit Button */}
            {currentStep < 2 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Application submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
}
