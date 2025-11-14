# NeuroThrive PWA - Neurodivergent-Friendly Wellness Tracker

**Status**: 🚧 In Development - OAuth Integration Needed
**Live Demo**: Coming Soon (GitHub Pages)
**Backend**: ✅ Deployed to Salesforce
**Frontend**: ⏳ Awaiting OAuth configuration

---

## 📱 What is NeuroThrive?

A Progressive Web App designed specifically for neurodivergent individuals (ADHD, Autism, Bipolar) to track daily wellness routines with offline support and Salesforce synchronization.

### Key Features

✅ **Morning Routine Tracker** - Wake time, sleep hours, water intake
✅ **3x Daily Mood Check-ins** - Morning, afternoon, evening mood + energy scores
✅ **Box Breathing Exercise** - 4-4-4-4 guided breathing for stress reduction
✅ **Daily Wins Journal** - Track accomplishments and build positive momentum
✅ **Imposter Syndrome Therapy Tool** - CBT-based cognitive reframing
✅ **100% Offline Support** - Works without internet via Service Worker
⏳ **Salesforce Sync** - Bidirectional sync with cloud backup (in progress)

---

## 🏗️ Architecture

### Frontend (This Repository)
- **Vanilla JavaScript** - No framework dependencies, fast and lightweight
- **Progressive Web App** - Installable, offline-first, app-like experience
- **IndexedDB** - Local data storage with sync queue
- **Service Worker** - Offline caching and background sync

### Backend (Salesforce)
- **DailyRoutineAPI** - REST endpoint for data sync
- **Custom Objects** - Daily_Routine__c, Mood_Entry__c, Win_Entry__c, Imposter_Syndrome_Session__c
- **OAuth 2.0** - Secure authentication

---

## 🚀 Quick Start

### Prerequisites
- Modern browser (Chrome, Firefox, Safari, Edge)
- Local development server (Python or Node)

### Run Locally

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/neurothrive-pwa.git
cd neurothrive-pwa

# Start local server (choose one)
python -m http.server 8080
# OR
npx http-server -p 8080

# Open browser
http://localhost:8080
```

### OAuth Configuration (Required for Salesforce Sync)

1. **Create Salesforce Connected App** - See `docs/OAUTH_CONNECTED_APP_SETUP.md`
2. **Copy OAuth Credentials** - Consumer Key + Consumer Secret
3. **Create config file**:
   ```bash
   cp js/config.template.js js/config.js
   # Edit js/config.js with your credentials
   ```
4. **Add to .gitignore** - NEVER commit `js/config.js`

---

## 📂 Project Structure

```
neurothrive-pwa/
├── index.html              # Main PWA interface (1,730 lines)
├── sw.js                   # Service worker for offline caching
├── manifest.json           # PWA installation config
├── js/
│   ├── salesforce-api.js   # OAuth 2.0 client & API wrapper
│   ├── sync-manager.js     # Offline queue & background sync
│   └── config.template.js  # OAuth config template
├── css/
│   └── styles.css          # Styling
├── images/
│   └── icons/              # PWA icons (512x512, 192x192)
└── docs/
    ├── OAUTH_CONNECTED_APP_SETUP.md  # Setup guide
    └── PWA_SYNC_DEPLOYMENT_COMPLETE.md # Architecture docs
```

---

## 🧪 Testing

### Manual Testing Checklist

**Offline Functionality**:
- [ ] Save routine while offline
- [ ] Data persists in IndexedDB
- [ ] Reload page - data still there

**OAuth Flow** (requires Salesforce setup):
- [ ] Click login - redirects to Salesforce
- [ ] Authorize app - redirects back
- [ ] Token stored in localStorage
- [ ] `salesforceAPI.isAuthenticated()` returns `true`

**Sync Functionality**:
- [ ] Save routine online - creates record in Salesforce
- [ ] Save offline - queued in IndexedDB
- [ ] Go online - auto-syncs queued items

### Automated Tests (Coming Soon)

```bash
# Unit tests (Jest)
npm test

# E2E tests (Playwright)
npm run test:e2e
```

---

## 📊 API Documentation

### Salesforce DailyRoutineAPI Endpoints

**GET** `/services/apexrest/routine/daily/{date}`
Fetch daily routine for specific date (YYYY-MM-DD)

**POST** `/services/apexrest/routine/daily`
Create or update daily routine

See `docs/PWA_SYNC_DEPLOYMENT_COMPLETE.md` for full API specification.

---

## 🎨 Neurodivergent Design Principles

This PWA follows ND-friendly design patterns:

✅ **Low Cognitive Load** - Simple, uncluttered interface
✅ **Clear Visual Hierarchy** - Important actions are obvious
✅ **Gentle Reminders** - No aggressive notifications
✅ **Offline-First** - No anxiety about losing data
✅ **Forgiving UX** - Easy to undo/edit entries
✅ **Pattern Recognition** - Consistent layout across views
✅ **Validation Without Judgment** - Neutral language throughout

---

## 🔒 Security & Privacy

- **OAuth 2.0** - Industry-standard authentication
- **Token Storage** - Encrypted tokens in localStorage (⚠️ Consider IndexedDB + encryption for production)
- **HTTPS Only** - No plaintext data transmission
- **No Third-Party Analytics** - Your data stays between PWA and Salesforce
- **Offline-First** - Data stored locally until you sync

**⚠️ Current Limitation**: `client_secret` exposed in JavaScript (testing only). Production should use PKCE flow or backend token exchange.

---

## 🛠️ Development Roadmap

### Phase 1: OAuth Integration ⏳
- [ ] Configure Salesforce Connected App
- [ ] Test authentication flow
- [ ] Verify bidirectional sync
- [ ] Document OAuth setup

### Phase 2: UI/UX Polish
- [ ] Mobile responsiveness improvements
- [ ] Dark mode support
- [ ] Accessibility enhancements (ARIA, keyboard nav)
- [ ] Data visualization (mood/energy charts)
- [ ] Improved imposter syndrome detection

### Phase 3: Production Deployment
- [ ] Comprehensive test suite (Jest + Playwright)
- [ ] GitHub Pages deployment
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Analytics integration
- [ ] Custom domain setup (neurothrive.app)

---

## 🤝 Contributing

This is currently a personal project, but suggestions are welcome!

### Reporting Issues
- Check existing issues first
- Provide detailed reproduction steps
- Include browser/OS information

### Feature Requests
- Explain the use case
- Consider ND-friendly design implications
- Reference scientific evidence if applicable

---

## 📜 License

**MIT License** - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Salesforce Platform** - Backend infrastructure
- **Claude Code** - Development assistance
- **ND Community** - Design feedback and testing

---

## 📞 Contact

**Developer**: Abby Luggery
**LinkedIn**: [Your LinkedIn URL]
**Portfolio**: [Your Portfolio URL]
**Email**: abbyluggery179@agentforce.com

---

## 📈 Project Stats

| Metric | Value |
|--------|-------|
| **Lines of Code** | 2,600+ |
| **Files** | 15 |
| **PWA Score** | Coming Soon (Target: 90+) |
| **Test Coverage** | Coming Soon (Target: 80%+) |
| **Load Time** | < 2s (offline after first load) |
| **Bundle Size** | < 500KB |

---

## 🔗 Related Projects

This PWA is part of a larger **Holistic Wellness Platform**:

- **NeuroThrive PWA** (This repo) - Daily routine tracking
- **Meal Planning Platform** - Recipe management + shopping lists
- **Job Search Platform** - Application tracking with AI resume generation

See main repository for complete system architecture.

---

**Built with ❤️ for the neurodivergent community**

*Because wellness tracking shouldn't add more executive function overhead.*
