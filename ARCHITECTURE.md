# TOSDetective Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • React 19      │    │ • Express       │    │ • Google Gemini │
│ • Tailwind CSS  │    │ • Multer        │    │ • Clerk Auth    │
│ • Framer Motion │    │ • PDF Parse     │    │ • Railway       │
│ • React Router  │    │ • File System   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Core Components

### Frontend Architecture
```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx           # Navigation with auth
│   │   └── Footer.jsx           # Site footer
│   ├── Analysis/
│   │   ├── FileUploader.jsx     # Document upload
│   │   └── ResultsDisplay.jsx   # Analysis results
│   ├── ComprehensiveTOSComparison/
│   │   ├── PlainEnglishTranslator.jsx  # AI translation
│   │   ├── TOSEvolutionPredictor.jsx   # Future predictions
│   │   ├── SummaryReport.jsx           # Analysis summary
│   │   ├── SideBySideView.jsx          # Document comparison
│   │   ├── VisualizationDashboard.jsx  # Charts & graphs
│   │   └── ExportShare.jsx             # Export functionality
│   └── Auth/
│       └── ClerkProvider.jsx    # Authentication wrapper
├── pages/
│   ├── HomePage.jsx             # Landing page
│   ├── AnalyzePage.jsx          # Single document analysis
│   ├── ComparePage.jsx          # Document comparison
│   └── FuturePredictorPage.jsx  # Prediction features
├── services/
│   ├── geminiService.js         # AI API integration
│   ├── pdfService.js           # PDF processing
│   └── tosComparisonApi.js     # Backend communication
└── utils/
    ├── fileHelpers.js          # File manipulation
    └── formatters.js           # Data formatting
```

### Backend Architecture
```
server/
├── index.js                    # Express server setup
├── routes/
│   ├── analysis.js            # Document analysis endpoints
│   ├── comparison.js          # Comparison endpoints
│   └── prediction.js          # AI prediction endpoints
├── services/
│   ├── geminiService.js       # Google Gemini integration
│   ├── textSimplifier.js      # Plain English translation
│   └── advancedTextAnalysis.js # Document processing
├── middleware/
│   ├── auth.js                # Authentication middleware
│   ├── fileUpload.js          # File handling
│   └── errorHandler.js        # Error management
└── utils/
    ├── pdfParser.js           # PDF text extraction
    └── textAnalyzer.js        # Text analysis utilities
```

## 🔄 Data Flow

### Document Analysis Flow
1. **Upload**: User uploads documents via React Dropzone
2. **Validation**: Frontend validates file types and sizes
3. **API Call**: Files sent to backend via multipart/form-data
4. **Processing**: Backend extracts text using PDF-Parse
5. **AI Analysis**: Text sent to Google Gemini API
6. **Response**: Processed results returned to frontend
7. **Display**: Results rendered in interactive components

### Authentication Flow
1. **Clerk Integration**: User signs up/logs in via Clerk
2. **JWT Token**: Clerk provides authentication token
3. **Protected Routes**: Frontend checks auth state
4. **API Security**: Backend validates tokens for protected endpoints

## 🧠 AI Integration

### Google Gemini API Usage
```javascript
// Plain English Translation
const translateToPlainEnglish = async (legalText) => {
  const prompt = `
    Translate this legal text to plain English:
    "${legalText}"
    
    Provide:
    1. Simple explanation
    2. Risk level (high/medium/low)
    3. What this means for users
  `;
  
  return await geminiAPI.generateContent(prompt);
};

// Future Predictions
const predictChanges = async (tosText, industry) => {
  const prompt = `
    Analyze this TOS and predict future changes based on:
    - Regulatory trends (GDPR, CCPA, EU AI Act)
    - Industry standards for ${industry}
    - Recent legal developments
    
    TOS: "${tosText}"
  `;
  
  return await geminiAPI.generateContent(prompt);
};
```

## 🎨 UI/UX Architecture

### Design System
- **Color Palette**: Tailwind CSS with custom dark theme
- **Typography**: System fonts with proper hierarchy
- **Components**: Reusable, accessible components
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design approach

### State Management
- **React Hooks**: useState, useEffect for local state
- **Context API**: Authentication state management
- **Props Drilling**: Minimal, well-structured component tree

## 🔒 Security Architecture

### Frontend Security
- **Input Validation**: Client-side validation for all inputs
- **XSS Prevention**: Proper sanitization of user content
- **HTTPS Only**: All communications over secure connections
- **CSP Headers**: Content Security Policy implementation

### Backend Security
- **File Upload Security**: Type validation, size limits
- **API Rate Limiting**: Prevent abuse of endpoints
- **Error Handling**: No sensitive information in error messages
- **Environment Variables**: Secure storage of API keys

## 📊 Performance Optimization

### Frontend Optimization
- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Proper image formats and sizes
- **Bundle Analysis**: Webpack bundle analyzer for optimization
- **Caching**: Browser caching for static assets

### Backend Optimization
- **File Processing**: Efficient PDF parsing and text extraction
- **API Caching**: Cache frequently requested analyses
- **Error Recovery**: Graceful handling of API failures
- **Resource Management**: Proper cleanup of temporary files

## 🚀 Deployment Architecture

### Railway Deployment
```yaml
# railway.toml
[build]
  builder = "nixpacks"
  buildCommand = "npm run build"

[deploy]
  startCommand = "npm start"
  healthcheckPath = "/api/health"
  healthcheckTimeout = 300
  restartPolicyType = "on_failure"
```

### Environment Configuration
- **Production**: Railway with environment variables
- **Development**: Local .env files
- **Staging**: Separate Railway environment (optional)

## 📈 Monitoring & Analytics

### Application Monitoring
- **Health Checks**: API endpoint monitoring
- **Error Tracking**: Console error logging
- **Performance Metrics**: Load time tracking
- **User Analytics**: Usage pattern analysis

### Deployment Monitoring
- **Build Status**: GitHub Actions CI/CD
- **Uptime Monitoring**: Railway health checks
- **Performance**: Lighthouse CI integration

## 🔧 Development Workflow

### Local Development
1. Clone repository
2. Install dependencies (frontend + backend)
3. Set up environment variables
4. Start development servers
5. Access at localhost:5173

### Production Deployment
1. Push to master branch
2. GitHub Actions runs tests
3. Railway auto-deploys on success
4. Health checks verify deployment
5. Live at production URL

## 📚 Technology Decisions

### Why React 19?
- Latest features and performance improvements
- Excellent ecosystem and community support
- Strong TypeScript integration potential
- Modern hooks and concurrent features

### Why Node.js + Express?
- JavaScript full-stack consistency
- Rich ecosystem for file processing
- Easy integration with AI APIs
- Scalable architecture

### Why Google Gemini?
- Advanced language understanding
- Cost-effective for document analysis
- Reliable API with good documentation
- Strong performance for legal text processing

### Why Railway?
- Simple deployment process
- Automatic scaling
- Built-in CI/CD integration
- Cost-effective for small to medium projects

## 🎯 Future Architecture Considerations

### Scalability Improvements
- **Database Integration**: PostgreSQL for user data persistence
- **Caching Layer**: Redis for improved performance
- **Microservices**: Split into smaller, focused services
- **CDN Integration**: Global content delivery

### Feature Enhancements
- **Real-time Collaboration**: WebSocket integration
- **Advanced Analytics**: Machine learning insights
- **API Versioning**: Backward compatibility
- **Multi-language Support**: Internationalization

This architecture provides a solid foundation for a production-ready application while maintaining simplicity and developer experience.
