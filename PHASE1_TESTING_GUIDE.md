# Phase 1 Testing Guide - OAuth Integration
## NeuroThrive PWA

**Date:** November 14, 2025
**Phase:** 1 - OAuth Integration & Testing
**Status:** ✅ Ready for Testing

---

## 🎯 Testing Objectives

1. Verify OAuth authentication flow works end-to-end
2. Test token storage and refresh mechanisms
3. Validate API calls to Salesforce DailyRoutineAPI
4. Test offline queue and online sync functionality
5. Verify error handling and edge cases

---

## 🔧 Prerequisites

### 1. Salesforce Connected App Setup
- ✅ Connected App created in Salesforce
- ✅ Consumer Key configured in `js/config.js`
- ✅ Consumer Secret configured in `js/config.js`
- ✅ CORS origins added to Salesforce
- ✅ Remote Site Settings configured

### 2. Local Development Server
You need to run a local web server (not just open the HTML file):

**Option 1: Python**
```bash
cd /home/user/neurothrive-pwa
python -m http.server 8080
```

**Option 2: Node.js**
```bash
cd /home/user/neurothrive-pwa
npx http-server -p 8080
```

**Option 3: PHP**
```bash
cd /home/user/neurothrive-pwa
php -S localhost:8080
```

**Access at:** http://localhost:8080

---

## 📋 Test Cases

### Test 1: Initial Page Load
**Objective:** Verify PWA loads without errors

**Steps:**
1. Start local server
2. Open http://localhost:8080 in browser
3. Open Developer Console (F12)

**Expected Results:**
- ✅ No JavaScript errors in console
- ✅ See message: "✅ Salesforce OAuth configuration loaded"
- ✅ See message: "✅ Salesforce API initialized with config"
- ✅ Header shows "Login to Salesforce" button
- ✅ Sync status shows "☁️ Not Synced"

**Pass/Fail:** _________

---

### Test 2: OAuth Login Flow
**Objective:** Verify OAuth authentication works

**Steps:**
1. Click "Login to Salesforce" button in header
2. Should redirect to Salesforce login page
3. Enter credentials:
   - Username: `abbyluggery179@agentforce.com`
   - Password: [Your Salesforce password]
4. Click "Allow" to authorize the app
5. Should redirect back to http://localhost:8080/oauth/callback

**Expected Results:**
- ✅ Redirected to Salesforce login
- ✅ Authorization page shows "NeuroThrive PWA" requesting access
- ✅ After approval, redirected to callback page
- ✅ Callback page shows "Authentication Successful!"
- ✅ Auto-redirects back to main page after 2 seconds
- ✅ Button changes to "Logout"
- ✅ Button gets green highlight (authenticated class)
- ✅ Sync status shows "✓ Online"

**Console Checks:**
```javascript
// Open console and run:
salesforceAPI.isAuthenticated()
// Should return: true

salesforceAPI.tokens
// Should show: { access_token: "...", refresh_token: "...", ... }
```

**Pass/Fail:** _________

---

### Test 3: Token Persistence
**Objective:** Verify tokens persist across page reloads

**Steps:**
1. After successful login, refresh the page (F5)
2. Check authentication status

**Expected Results:**
- ✅ Button still shows "Logout"
- ✅ Still shows authenticated state (green)
- ✅ Console shows "✅ Salesforce API initialized with config"
- ✅ `salesforceAPI.isAuthenticated()` returns `true`

**Pass/Fail:** _________

---

### Test 4: API Call - Get Daily Routine
**Objective:** Test GET request to Salesforce

**Steps:**
1. Ensure you're logged in
2. Open browser console (F12)
3. Run this command:
```javascript
salesforceAPI.getDailyRoutine('2025-11-14').then(console.log).catch(console.error)
```

**Expected Results:**
- ✅ No CORS errors
- ✅ Response shows:
```json
{
  "success": true,
  "message": "No routine found for this date" OR "Routine fetched successfully",
  "data": {
    "routineDate": "2025-11-14",
    "moodEntries": [],
    "wins": []
  }
}
```

**Pass/Fail:** _________

---

### Test 5: API Call - Save Daily Routine
**Objective:** Test POST request to Salesforce

**Steps:**
1. Ensure you're logged in
2. Open browser console
3. Run this command:
```javascript
const testRoutine = {
  routineDate: '2025-11-14',
  mood: 'Good',
  stressLevel: 'Low',
  gratitude: 'OAuth integration working!',
  morningRoutineComplete: true,
  moodEntries: [{
    timeOfDay: 'Morning',
    moodScore: 8,
    energyScore: 7,
    notes: 'Testing OAuth'
  }],
  wins: [{
    winText: 'Successfully implemented OAuth',
    category: 'Personal'
  }]
};

salesforceAPI.upsertDailyRoutine(testRoutine).then(console.log).catch(console.error)
```

**Expected Results:**
- ✅ No errors
- ✅ Response shows:
```json
{
  "success": true,
  "message": "Routine saved successfully",
  "data": {
    "id": "a0Q...",
    "routineDate": "2025-11-14"
  }
}
```

**Verification in Salesforce:**
1. Log into Salesforce UI
2. Navigate to Daily Routines tab
3. Look for record with date 2025-11-14
4. ✅ Record exists with correct data

**Pass/Fail:** _________

---

### Test 6: Offline Queue - Save While Offline
**Objective:** Test offline functionality

**Steps:**
1. Ensure you're logged in
2. Open DevTools → Network tab
3. Click "Offline" checkbox (to simulate offline)
4. In console, run:
```javascript
const offlineRoutine = {
  routineDate: '2025-11-15',
  mood: 'Great',
  gratitude: 'Testing offline mode',
  morningRoutineComplete: false
};

syncManager.saveDailyRoutine(offlineRoutine).then(console.log)
```

**Expected Results:**
- ✅ Response shows:
```json
{
  "success": true,
  "message": "Saved locally - will sync when online",
  "offline": true
}
```
- ✅ Sync status shows "⚠ Offline"

**Check Queue:**
```javascript
syncManager.getSyncStatus().then(console.log)
```
- ✅ `pendingCount` should be 1 or more
- ✅ `isOnline` should be `false`

**Pass/Fail:** _________

---

### Test 7: Background Sync - Reconnect Online
**Objective:** Test automatic sync when going back online

**Steps:**
1. After Test 6, uncheck "Offline" in DevTools
2. Wait 5 seconds
3. Check console for sync messages

**Expected Results:**
- ✅ See message: "Network connection restored - triggering sync"
- ✅ See message: "Syncing X pending items..."
- ✅ See message: "Sync complete: X synced, 0 failed"
- ✅ Sync status changes to "✓ Synced"

**Verify in Salesforce:**
- ✅ Routine with date 2025-11-15 now exists

**Pass/Fail:** _________

---

### Test 8: Token Refresh
**Objective:** Test token refresh before expiry

**Steps:**
1. Ensure logged in
2. In console, manually trigger refresh:
```javascript
salesforceAPI.refreshAccessToken().then(console.log).catch(console.error)
```

**Expected Results:**
- ✅ No errors
- ✅ New access token returned
- ✅ Still authenticated: `salesforceAPI.isAuthenticated()` returns `true`

**Pass/Fail:** _________

---

### Test 9: Logout
**Objective:** Test logout functionality

**Steps:**
1. Click "Logout" button
2. Confirm logout in dialog
3. Check authentication status

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ After confirming, see "Logged out successfully" alert
- ✅ Button changes to "Login to Salesforce"
- ✅ Sync status shows "☁️ Not Synced"
- ✅ `salesforceAPI.isAuthenticated()` returns `false`
- ✅ localStorage cleared: `localStorage.getItem('sf_tokens')` returns `null`

**Pass/Fail:** _________

---

### Test 10: CORS Validation
**Objective:** Ensure CORS is configured correctly

**Steps:**
1. Without logging in, try API call:
```javascript
fetch('https://abbyluggery179.my.salesforce.com/services/apexrest/routine/daily/2025-11-14')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

**Expected Results:**
- ✅ Should get 401 Unauthorized (not CORS error)
- ✅ Error message about missing authorization, NOT about CORS

**If you see CORS error:**
- ⚠️ CORS not configured correctly in Salesforce
- Go back to Setup → CORS → Add http://localhost:8080

**Pass/Fail:** _________

---

## 🐛 Common Issues & Solutions

### Issue 1: "SALESFORCE_CONFIG not found"
**Symptom:** Error on page load about missing config
**Solution:**
```bash
# Ensure config.js exists
ls -la js/config.js

# If missing, create from template
cp js/config.template.js js/config.js
# Then edit with your credentials
```

---

### Issue 2: "redirect_uri_mismatch"
**Symptom:** OAuth error after login
**Solution:**
1. Check Connected App callback URLs
2. Ensure `http://localhost:8080/oauth/callback` is listed
3. Also add `http://localhost:8080/` as fallback

---

### Issue 3: CORS Policy Error
**Symptom:** "No 'Access-Control-Allow-Origin' header"
**Solution:**
1. Salesforce Setup → Quick Find → "CORS"
2. Add origin: `http://localhost:8080`
3. Save and retry

---

### Issue 4: Token Expired
**Symptom:** 401 errors on API calls
**Solution:**
- Automatic refresh should handle this
- If not working, logout and login again
- Check console for refresh errors

---

### Issue 5: Callback Page Not Loading
**Symptom:** 404 error on /oauth/callback
**Solution:**
- Ensure file exists at: `/home/user/neurothrive-pwa/oauth/callback`
- Check web server is serving all files
- Try accessing directly: http://localhost:8080/oauth/callback

---

## ✅ Phase 1 Completion Checklist

- [ ] Test 1: Initial page load ✓
- [ ] Test 2: OAuth login flow ✓
- [ ] Test 3: Token persistence ✓
- [ ] Test 4: GET API call ✓
- [ ] Test 5: POST API call ✓
- [ ] Test 6: Offline queue ✓
- [ ] Test 7: Background sync ✓
- [ ] Test 8: Token refresh ✓
- [ ] Test 9: Logout ✓
- [ ] Test 10: CORS validation ✓

**All tests passing?** ✅ Phase 1 Complete! Ready for Phase 2.

**Some tests failing?** Debug using the "Common Issues" section above.

---

## 📊 Test Results Summary

**Date Tested:** ___________
**Tester:** ___________
**Browser:** ___________
**Tests Passed:** ___ / 10
**Tests Failed:** ___ / 10

**Critical Issues Found:**
1.
2.
3.

**Notes:**


---

## 🚀 Next Steps

After all tests pass:
1. ✅ Document any issues encountered
2. ✅ Commit changes to Git
3. ✅ Push to repository
4. ✅ Move to Phase 2: UI/UX Polish & Features

---

**Need Help?**
- Check browser console for detailed error messages
- Review `docs/OAUTH_CONNECTED_APP_SETUP.md`
- Verify Salesforce Connected App settings
- Check that DailyRoutineAPI is deployed in Salesforce

---

**Created by:** Claude Code Assistant
**Last Updated:** November 14, 2025
