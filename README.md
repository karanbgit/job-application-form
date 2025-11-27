# 📝 Multi-Step Job Application Form

A modern, responsive job application form built with React.js and Tailwind CSS that fetches job roles dynamically from MockAPI.

1. ![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react) 

2. ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css) 

3. ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)

## 📸 Screenshots

Step 1: Personal Details |
<img width="1907" height="961" alt="Personal Details" src="https://github.com/user-attachments/assets/9b0941f5-c59b-49b7-ab85-8b89cb03d7b7" />

Step 2: Job Preferences |
<img width="1918" height="970" alt="Job Preferences" src="https://github.com/user-attachments/assets/2a71ed9d-f418-441c-8976-33215e74aaae" />

Step 3: Preview & Submit |
<img width="1918" height="976" alt="Preview and submit" src="https://github.com/user-attachments/assets/67dc85d6-8b25-4be5-9089-571609ec7b70" />


![Step 2](./screenshots/step2-job-preferences.png) | 
![Step 1](./screenshots/step1-personal-details.png) |
![Step 3](./screenshots/step3-preview-submit.png) |

## ✨ Features

- 🎯 Multi-step form with visual progress bar
- 🔄 Dynamic fields based on selected job role
- 🌐 Real-time API integration with MockAPI.io
- ✅ Form validation with inline error messages
- 📱 Fully responsive (mobile, tablet, desktop)
- 💾 Auto-save with localStorage
- 📄 File upload with validation (max 2MB)
- 🎉 Success toast notifications

## 🚀 Quick Start
```bash
# Clone repository
git clone https://github.com/karanbgit/job-application-form.git
cd job-application-form

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Form Steps

**Step 1: Personal Details** - Name, Email (valid format), Phone (10 digits), Resume (PDF/DOC, ≤2MB)

**Step 2: Job Preferences** - Select job role (fetched from API), dynamic fields appear based on selection:
- Frontend Developer → Tech Stack
- Backend Developer → Preferred Language  
- Designer → Portfolio URL
- Full Stack Developer → Tech Stack + Preferred Language
- DevOps Engineer → Preferred Language

**Step 3: Preview & Submit** - Review all data, edit if needed, submit form

## 🛠️ Tech Stack

- React.js - UI library
- Tailwind CSS - Styling framework
- MockAPI.io - Mock REST API
- LocalStorage - Form data persistence
- JavaScript ES6+ - Modern JavaScript

## 📦 Project Structure
```
src/
├── api/
│   └── jobApi.js           # API integration
├── components/
│   ├── ProgressBar.js      # Progress indicator
│   ├── Personal.js         # Step 1 form
│   ├── Preferences.js      # Step 2 form with API
│   └── Preview.js          # Step 3 preview
├── utils/
│   └── validation.js       # Validation functions
├── App.js                  # Main component
├── index.js                # Entry point
└── index.css               # Global styles
```

## 🔧 Configuration

The API endpoint is configured in `src/api/jobApi.js`:
```javascript
const API_URL = 'https://6927655db35b4ffc5011d54a.mockapi.io/jobRoles';
```

**Expected API Response:**
```json
[
  { "id": "1", "role": "Frontend Developer", "fields": ["techStack"] },
  { "id": "2", "role": "Backend Developer", "fields": ["preferredLanguage"] }
]
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 768px  
- Desktop: > 768px

## ✅ Validation Rules

| Field | Rule |
|-------|------|
| Name | Required, non-empty |
| Email | Required, valid format |
| Phone | Required, exactly 10 digits |
| Resume | Required, ≤2MB |
| Job Role | Required selection |
| Dynamic Fields | Required based on role |

## 🧪 Testing

1. Fill Step 1 with valid data → Click "Next"
2. Select job role in Step 2 → Fill dynamic fields → Click "Next"  
3. Review data in Step 3 → Click "Submit"
4. Check browser console (F12) to see submitted data

## 🤝 Contributing

Contributions welcome! Fork the repo, create a feature branch, commit changes, and open a pull request.
```bash
git checkout -b feature/your-feature
git commit -m 'Add feature'
git push origin feature/your-feature
```

## 🔮 Future Enhancements

- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] PDF export of application
- [ ] Unit & E2E tests
- [ ] Multi-language support

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 👤 Author

**Karan Barale**

- GitHub: [@karanbgit](https://github.com/karanbgit)
- LinkedIn: [Karan Barale](https://www.linkedin.com/in/karan-barale)
- Email: karanbarale7047@gmail.com
- Phone: +91 9503087047

## 🙏 Acknowledgments

- React Team for React.js
- Tailwind Labs for Tailwind CSS
- MockAPI.io for free API services

---

⭐ **If this project helped you, please give it a star!** ⭐

Made with ❤️ by [Karan Barale](https://github.com/karanbgit)
