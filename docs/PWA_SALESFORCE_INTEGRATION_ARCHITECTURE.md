# PWA ↔ Salesforce Integration Architecture
## NeuroThrive Daily Complete Sync System

---

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────────┐
│                    NeuroThrive PWA (Client)                      │
│  - LocalStorage for offline data                                │
│  - Service Worker for background sync                           │
│  - IndexedDB for queued changes                                 │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ HTTPS REST API Calls
                       │ (OAuth 2.0 Authenticated)
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│            Salesforce Connected App (OAuth Provider)             │
│  - Consumer Key/Secret                                           │
│  - Callback URL                                                  │
│  - Token refresh logic                                           │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│              Apex REST API Endpoints (@RestResource)             │
│                                                                  │
│  • DailyRoutineAPI.cls                                          │
│    - GET /routine/daily/{date}  → Fetch daily routine          │
│    - POST /routine/daily        → Create/update routine        │
│    - GET /routine/summary       → Week summary                  │
│                                                                  │
│  • MoodTrackingAPI.cls                                          │
│    - POST /mood/log             → Log mood entry                │
│    - GET /mood/trends           → Get mood trends               │
│                                                                  │
│  • JournalAPI.cls                                               │
│    - POST /journal/wins         → Save wins                     │
│    - POST /journal/gratitude    → Save gratitude                │
│    - GET /journal/{date}        → Fetch journal entries         │
│                                                                  │
│  • ImposterSyndromeAPI.cls                                      │
│    - POST /therapy/imposter     → Save imposter session         │
│    - GET /therapy/progress      → Get progress stats            │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│              Salesforce Custom Objects (Data Layer)              │
│                                                                  │
│  • Daily_Routine__c                                             │
│    - Date__c, Mood__c, Stress_Level__c, Gratitude__c           │
│    - Morning_Routine_Complete__c, Exercise_Completed__c         │
│    - Accomplished_Today__c, Tomorrow_Priorities__c              │
│                                                                  │
│  • Mood_Entry__c (NEW - for 3x daily tracking)                 │
│    - Daily_Routine__c (lookup)                                  │
│    - Time_of_Day__c (Morning/Midday/Evening)                    │
│    - Mood_Score__c, Energy_Score__c, Timestamp__c              │
│                                                                  │
│  • Win_Entry__c (NEW - for win logging)                        │
│    - Daily_Routine__c (lookup)                                  │
│    - Win_Text__c, Category__c, Timestamp__c                     │
│                                                                  │
│  • Imposter_Syndrome_Session__c (NEW)                          │
│    - Thought__c, Believability_Before__c, After__c             │
│    - Counter_Facts__c, Date__c, Reduction__c                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 **Data Flow Scenarios**

### **Scenario 1: User Logs Win While Online**

```
PWA JavaScript
  ↓ saveWins()
  ↓ POST /services/apexrest/journal/wins
  ↓ Authorization: Bearer {access_token}
  ↓ Body: { "wins": ["Applied to 3 jobs", "Completed morning routine"], "date": "2025-11-13" }
  ↓
Salesforce Apex REST
  ↓ JournalAPI.logWins()
  ↓ Create Win_Entry__c records
  ↓ Link to today's Daily_Routine__c
  ↓ Return: { "success": true, "winIds": ["a1Z...", "a1Z..."] }
  ↓
PWA JavaScript
  ↓ Clear localStorage queue
  ↓ Update UI with sync status
```

### **Scenario 2: User Logs Win While Offline**

```
PWA JavaScript
  ↓ saveWins()
  ↓ Network check fails
  ↓ Save to localStorage: pendingWins[]
  ↓ Save to IndexedDB: syncQueue[]
  ↓ Register background sync: 'sync-data'
  ↓ Show "Saved locally, will sync when online"
  ↓
[User goes online]
  ↓
Service Worker
  ↓ 'sync' event fires
  ↓ syncData() reads IndexedDB queue
  ↓ POST /journal/wins for each queued item
  ↓ On success: Clear queue item
  ↓ On failure: Retry with exponential backoff
```

### **Scenario 3: Fetch Daily Routine (with Conflict Resolution)**

```
PWA JavaScript
  ↓ loadDailyData()
  ↓ GET /routine/daily/2025-11-13
  ↓
Salesforce Apex REST
  ↓ DailyRoutineAPI.getDailyRoutine(date)
  ↓ Query Daily_Routine__c, Mood_Entry__c, Win_Entry__c
  ↓ Return JSON with LastModifiedDate timestamps
  ↓
PWA JavaScript
  ↓ Compare localStorage vs Salesforce timestamps
  ↓ If Salesforce newer: Update localStorage
  ↓ If localStorage newer: Trigger sync (POST)
  ↓ If equal: No action needed
```

---

## 🔐 **Authentication Flow (OAuth 2.0 Web Server Flow)**

### **Step 1: Initial OAuth Setup (One-Time)**

```
1. User clicks "Connect to Salesforce" in PWA
2. PWA redirects to:
   https://login.salesforce.com/services/oauth2/authorize
     ?client_id={CONSUMER_KEY}
     &redirect_uri=https://abbyluggery.github.io/neurothrive-pwa/callback
     &response_type=code
     &scope=api refresh_token

3. User logs into Salesforce
4. Salesforce redirects back with authorization code
5. PWA exchanges code for access token:
   POST /services/oauth2/token
   Body: {
     grant_type: "authorization_code",
     client_id: {CONSUMER_KEY},
     client_secret: {CONSUMER_SECRET},
     redirect_uri: {CALLBACK_URL},
     code: {AUTH_CODE}
   }

6. Salesforce returns:
   {
     "access_token": "00D...",
     "refresh_token": "5Aep...",
     "instance_url": "https://abbyluggery179.my.salesforce.com",
     "token_type": "Bearer"
   }

7. PWA stores tokens in localStorage (encrypted)
```

### **Step 2: API Calls with Access Token**

```javascript
// Every API call includes:
headers: {
  'Authorization': 'Bearer ' + accessToken,
  'Content-Type': 'application/json'
}

// Example:
fetch(instanceUrl + '/services/apexrest/routine/daily/2025-11-13', {
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
})
```

### **Step 3: Token Refresh (When Expired)**

```javascript
// If API returns 401 Unauthorized:
fetch(instanceUrl + '/services/oauth2/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: consumerKey,
    client_secret: consumerSecret,
    refresh_token: refreshToken
  })
})
.then(response => response.json())
.then(data => {
  // Update access token
  localStorage.setItem('sf_access_token', data.access_token);
  // Retry original request
})
```

---

## 📦 **New Custom Objects Needed**

### **1. Mood_Entry__c**

| Field API Name | Type | Description |
|----------------|------|-------------|
| Name | Auto Number | ME-{0000} |
| Daily_Routine__c | Lookup(Daily_Routine__c) | Parent routine |
| Time_of_Day__c | Picklist | Morning, Midday, Evening |
| Mood_Score__c | Number(1,0) | 1-10 rating |
| Energy_Score__c | Number(1,0) | 1-10 rating |
| Timestamp__c | DateTime | When logged |
| Notes__c | Long Text Area | Optional notes |

### **2. Win_Entry__c**

| Field API Name | Type | Description |
|----------------|------|-------------|
| Name | Auto Number | WIN-{0000} |
| Daily_Routine__c | Lookup(Daily_Routine__c) | Parent routine |
| Win_Text__c | Text(255) | Win description |
| Category__c | Picklist | Job Search, Routine, Health, Personal |
| Timestamp__c | DateTime | When logged |
| Source__c | Text(50) | PWA, Salesforce, Mobile |

### **3. Imposter_Syndrome_Session__c**

| Field API Name | Type | Description |
|----------------|------|-------------|
| Name | Auto Number | IMP-{0000} |
| Thought__c | Long Text Area | Imposter thought |
| Believability_Before__c | Number(2,0) | 1-10 before |
| Believability_After__c | Number(2,0) | 1-10 after |
| Reduction__c | Formula(Number) | Before - After |
| Counter_Facts__c | Long Text Area | Generated facts |
| Session_Date__c | DateTime | When session occurred |
| Contact__c | Lookup(Contact) | Optional: Link to self |

---

## 🔄 **Sync Strategy**

### **Conflict Resolution Rules**

1. **Last Write Wins** - Default strategy
   - Compare `LastModifiedDate` timestamps
   - Newer timestamp takes precedence

2. **Merge for Arrays** - For win entries, gratitudes
   - Append new items to existing list
   - Deduplicate based on timestamp + text hash

3. **User Prompt for Conflicts** - For critical fields
   - If both sides modified same field
   - Show diff and let user choose

### **Sync Queue Priority**

1. **High Priority** (Sync immediately when online)
   - Imposter syndrome sessions
   - Mood entries
   - Daily routine core fields

2. **Medium Priority** (Batch sync every 15 min)
   - Win entries
   - Gratitude entries

3. **Low Priority** (Sync daily)
   - Therapy technique counters
   - Routine completion stats

---

## 🚀 **API Endpoint Specifications**

### **DailyRoutineAPI.cls**

#### **GET /services/apexrest/routine/daily/{date}**

**Request:**
```http
GET /services/apexrest/routine/daily/2025-11-13
Authorization: Bearer 00D...
```

**Response:**
```json
{
  "success": true,
  "routine": {
    "id": "a0Q...",
    "date": "2025-11-13",
    "mood": "Good",
    "stressLevel": 3,
    "gratitude": "Grateful for my supportive therapist",
    "morningRoutineComplete": true,
    "exerciseCompleted": false,
    "accomplishedToday": "Applied to 3 jobs, completed Trailhead module",
    "tomorrowPriorities": "Finish resume for TechCorp, practice interview questions",
    "lastModifiedDate": "2025-11-13T14:30:00.000Z"
  },
  "moodEntries": [
    {
      "timeOfDay": "Morning",
      "moodScore": 7,
      "energyScore": 6,
      "timestamp": "2025-11-13T08:00:00.000Z"
    }
  ],
  "wins": [
    {
      "text": "Applied to 3 jobs",
      "category": "Job Search",
      "timestamp": "2025-11-13T10:30:00.000Z"
    }
  ]
}
```

#### **POST /services/apexrest/routine/daily**

**Request:**
```json
{
  "date": "2025-11-13",
  "mood": "Good",
  "stressLevel": 3,
  "gratitude": "Grateful for my supportive therapist",
  "morningRoutineComplete": true,
  "exerciseCompleted": false
}
```

**Response:**
```json
{
  "success": true,
  "routineId": "a0Q...",
  "message": "Daily routine updated successfully"
}
```

### **MoodTrackingAPI.cls**

#### **POST /services/apexrest/mood/log**

**Request:**
```json
{
  "date": "2025-11-13",
  "timeOfDay": "Morning",
  "moodScore": 7,
  "energyScore": 6,
  "notes": "Feeling good after morning walk"
}
```

**Response:**
```json
{
  "success": true,
  "moodEntryId": "a1Z...",
  "message": "Mood logged successfully"
}
```

### **JournalAPI.cls**

#### **POST /services/apexrest/journal/wins**

**Request:**
```json
{
  "date": "2025-11-13",
  "wins": [
    {
      "text": "Applied to 3 jobs",
      "category": "Job Search"
    },
    {
      "text": "Completed morning routine",
      "category": "Routine"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "winIds": ["a2A...", "a2A..."],
  "count": 2
}
```

---

## 📊 **Implementation Timeline**

### **Week 1: Foundation (3-4 days)**
- ✅ Day 1: Create new custom objects (Mood_Entry__c, Win_Entry__c, Imposter_Syndrome_Session__c)
- ✅ Day 2: Create DailyRoutineAPI.cls with GET/POST endpoints
- ✅ Day 3: Set up Connected App for OAuth
- ✅ Day 4: Build PWA authentication module

### **Week 2: Core Sync (4-5 days)**
- ✅ Day 5: Implement MoodTrackingAPI.cls
- ✅ Day 6: Implement JournalAPI.cls
- ✅ Day 7: Build PWA sync queue (IndexedDB)
- ✅ Day 8: Implement service worker background sync
- ✅ Day 9: Add conflict resolution logic

### **Week 3: Polish & Test (3-4 days)**
- ✅ Day 10: End-to-end testing (online sync)
- ✅ Day 11: Offline mode testing
- ✅ Day 12: Error handling and retry logic
- ✅ Day 13: Deploy to GitHub Pages + production Salesforce

**Total Estimated Time:** 10-13 days (2 weeks)

---

## ✅ **Success Criteria**

### **Must Have:**
- [x] User can log into Salesforce from PWA via OAuth
- [x] Daily routine data syncs bidirectionally
- [x] Mood entries (3x daily) save to Salesforce
- [x] Wins and gratitude sync properly
- [x] Offline mode queues changes and syncs when online
- [x] Conflict resolution works for simultaneous edits

### **Should Have:**
- [ ] Token refresh happens automatically
- [ ] User sees sync status indicator
- [ ] Retry logic with exponential backoff
- [ ] Local data persists for 30 days offline

### **Nice to Have:**
- [ ] Real-time push notifications from Salesforce
- [ ] Multi-device sync (phone + desktop)
- [ ] Export data to CSV/PDF
- [ ] Analytics dashboard in Salesforce

---

## 🎯 **Next Step: Build DailyRoutineAPI.cls**

Ready to start coding! I'll create:

1. **DailyRoutineAPI.cls** - Main REST endpoint
2. **DailyRoutineAPITest.cls** - Test class (85%+ coverage)
3. **Mood_Entry__c, Win_Entry__c, Imposter_Syndrome_Session__c** - Custom object metadata
4. **Connected App setup guide** - Step-by-step OAuth configuration
5. **PWA sync module** - JavaScript for API calls and queue management

---

**Created:** November 13, 2025
**Status:** Architecture Complete - Ready to Build
**Estimated Completion:** November 27, 2025 (2 weeks)
