# Phase 2 Testing Guide - UI/UX & Accessibility
## NeuroThrive PWA

**Date:** November 14, 2025
**Phase:** 2 - UI/UX Polish & Features
**Status:** ✅ Ready for Testing

---

## 🎯 Testing Objectives

Validate that Phase 2 UI/UX enhancements work correctly:
1. Dark mode toggle and persistence
2. Mobile responsiveness (375px - 768px)
3. Accessibility features (ARIA, keyboard nav, screen readers)
4. Enhanced imposter syndrome detection
5. Visual design improvements
6. Chart.js integration readiness

---

## 🔧 Prerequisites

Server should still be running from Phase 1 testing:
- **URL:** http://localhost:8080
- **Browser:** Chrome, Firefox, or Safari
- **DevTools:** Open (F12)
- **Responsive Mode:** For mobile testing

If server stopped, restart:
```bash
cd /home/user/neurothrive-pwa
python -m http.server 8080
```

---

## 📋 Test Cases

### Test 1: Dark Mode Toggle
**Objective:** Verify dark mode works and persists

**Steps:**
1. Refresh page: http://localhost:8080
2. Check console for: "✅ Dark mode initialized: light"
3. Click 🌙 button in header

**Expected Results:**
- ✅ Button changes to ☀️
- ✅ Background turns dark (#121212)
- ✅ Text turns light (#E0E0E0)
- ✅ All cards update to dark theme
- ✅ Header background updates
- ✅ Smooth transition animation

**Test Persistence:**
1. Refresh page (F5)
2. ✅ Should remain in dark mode
3. Click ☀️ to return to light mode
4. ✅ Should persist light mode on refresh

**Console Check:**
```javascript
darkModeManager.getCurrentTheme()
// Should return: "dark" or "light"

localStorage.getItem('neurothrive-theme')
// Should return: "dark" or "light"
```

**Pass/Fail:** _________

---

### Test 2: System Preference Detection
**Objective:** Test automatic theme detection

**Steps (Chrome/Firefox):**
1. Open DevTools (F12) → Console
2. Run:
```javascript
darkModeManager.clearPreference()
```
3. Go to DevTools → 3-dot menu → More tools → Rendering
4. Find "Emulate CSS media feature prefers-color-scheme"
5. Select "prefers-color-scheme: dark"

**Expected Results:**
- ✅ PWA automatically switches to dark mode
- ✅ No manual toggle needed
- ✅ Changes in real-time

**Cleanup:**
Set back to "prefers-color-scheme: light" or "no emulation"

**Pass/Fail:** _________

---

### Test 3: Mobile Responsiveness - Phone (375px)
**Objective:** Test layout on iPhone SE / small phones

**Steps:**
1. Open DevTools (F12)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select "iPhone SE" or set to 375x667
4. Scroll through all tabs

**Expected Results:**

**Header:**
- ✅ Logo shows 🧠 only (no "Daily" text)
- ✅ Sync status shows icon only (no text)
- ✅ Buttons are touch-friendly (44px min height)
- ✅ All elements readable and not overlapping

**Navigation:**
- ✅ Tabs scroll horizontally
- ✅ Active tab indicator visible
- ✅ Smooth scrolling

**Content:**
- ✅ Cards stack vertically
- ✅ Quick actions show 1 column
- ✅ Mood trackers stack vertically
- ✅ All text readable (not too small)
- ✅ Forms and inputs usable
- ✅ Buttons large enough to tap

**Pass/Fail:** _________

---

### Test 4: Mobile Responsiveness - Tablet (768px)
**Objective:** Test layout on iPad / tablets

**Steps:**
1. Set DevTools to "iPad Mini" or 768x1024
2. Check layout in portrait and landscape
3. Navigate all tabs

**Expected Results:**
- ✅ Quick actions show 2 columns
- ✅ Mood trackers show side-by-side
- ✅ Nav tabs visible without scrolling
- ✅ Content uses available space well
- ✅ Charts render correctly
- ✅ No awkward gaps or stretching

**Pass/Fail:** _________

---

### Test 5: Keyboard Navigation
**Objective:** Verify full keyboard accessibility

**Steps:**
1. Click in address bar
2. Press Tab repeatedly
3. Navigate through ALL interactive elements

**Expected Results:**

**Tab Order:**
1. ✅ Skip link ("Skip to main content") appears on Tab
2. ✅ Dark mode toggle
3. ✅ Auth button
4. ✅ Install button (if visible)
5. ✅ Each nav tab
6. ✅ All form inputs
7. ✅ All buttons
8. ✅ All links

**Visual Indicators:**
- ✅ Clear focus outline (3px colored border)
- ✅ Focus visible on all elements
- ✅ No "lost focus" moments

**Functionality:**
- ✅ Enter/Space activates buttons
- ✅ Arrow keys navigate sliders
- ✅ Tab moves between form fields
- ✅ Escape closes modals (if any)

**Pass/Fail:** _________

---

### Test 6: Skip Link (Accessibility)
**Objective:** Test skip to main content

**Steps:**
1. Reload page
2. Press Tab once (don't click anything)
3. A "Skip to main content" link should appear

**Expected Results:**
- ✅ Link appears at top of page
- ✅ Link is visible and readable
- ✅ Pressing Enter jumps to main content
- ✅ Focus moves to main content area
- ✅ Works in both light and dark mode

**Pass/Fail:** _________

---

### Test 7: ARIA Labels & Screen Reader
**Objective:** Verify screen reader support

**Manual Check (Inspect Elements):**
Right-click elements and inspect:

**Header:**
```html
<header role="banner">
<button aria-label="Toggle dark mode">
<button aria-label="Login to Salesforce">
<button aria-label="Install app">
```

**Navigation:**
```html
<nav role="navigation" aria-label="Main navigation">
<button role="tab" aria-selected="true">Dashboard</button>
```

**Main:**
```html
<main id="main-content" role="main">
```

**Expected Results:**
- ✅ All interactive elements have aria-label or meaningful text
- ✅ Role attributes present
- ✅ aria-selected updates on tab change
- ✅ No "clickable div" anti-patterns

**Optional Screen Reader Test (NVDA/JAWS/VoiceOver):**
- ✅ Can navigate by headings
- ✅ Can navigate by landmarks
- ✅ Buttons announced correctly
- ✅ Form labels read properly

**Pass/Fail:** _________

---

### Test 8: Enhanced Imposter Syndrome Detection
**Objective:** Test improved pattern matching

**Steps:**
1. Navigate to "Therapy" tab
2. Find the imposter syndrome detection input
3. Test with these phrases:

**Test Input 1:** "I'm such a fraud"
```javascript
imposterDetector.detect("I'm such a fraud")
```

**Expected:**
```json
{
  "detected": true,
  "score": 3,
  "severity": "moderate",
  "matches": [{ "category": "identity", "weight": 3 }]
}
```

**Test Input 2:** "I just got lucky, anyone could have done this"
```javascript
imposterDetector.detect("I just got lucky, anyone could have done this")
```

**Expected:**
```json
{
  "detected": true,
  "score": 4,
  "severity": "moderate",
  "matches": [
    { "category": "luck", "weight": 2 },
    { "category": "minimizing", "weight": 2 }
  ]
}
```

**Test Input 3:** "I'm not good enough for this role"
```javascript
imposterDetector.detect("I'm not good enough for this role")
```

**Expected:**
```json
{
  "detected": true,
  "score": 3,
  "severity": "moderate",
  "matches": [{ "category": "competence", "weight": 3 }]
}
```

**Test Input 4:** "I'm feeling great today!" (should NOT trigger)
```javascript
imposterDetector.detect("I'm feeling great today!")
```

**Expected:**
```json
{
  "detected": false,
  "score": 0,
  "severity": "none",
  "matches": []
}
```

**Console Checks:**
```javascript
// Get severity emoji
imposterDetector.getSeverityEmoji('severe')  // Should return: 🚨
imposterDetector.getSeverityEmoji('moderate') // Should return: ⚠️
imposterDetector.getSeverityEmoji('mild')     // Should return: 💛
imposterDetector.getSeverityEmoji('none')     // Should return: ✅

// Get encouragement
imposterDetector.getEncouragement('moderate')
// Should return helpful message
```

**Pass/Fail:** _________

---

### Test 9: Visual Design - Loading States
**Objective:** Test loading skeletons and spinners

**In Console:**
```javascript
// Create loading skeleton
const skeleton = document.createElement('div');
skeleton.className = 'loading-skeleton';
skeleton.style.height = '20px';
skeleton.style.width = '200px';
document.querySelector('.card').appendChild(skeleton);

// Create spinner
const spinner = document.createElement('div');
spinner.className = 'spinner';
document.querySelector('.card').appendChild(spinner);
```

**Expected Results:**
- ✅ Skeleton shows animated gradient
- ✅ Spinner rotates smoothly
- ✅ Both work in dark mode
- ✅ Animation respects prefers-reduced-motion

**Pass/Fail:** _________

---

### Test 10: Chart.js Integration
**Objective:** Verify Chart.js is loaded and ready

**In Console:**
```javascript
// Check Chart.js is loaded
typeof Chart
// Should return: "function"

Chart.version
// Should return: "4.4.0" or similar

// Test creating a chart
const ctx = document.createElement('canvas');
document.querySelector('.card').appendChild(ctx);

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            label: 'Mood',
            data: [7, 8, 6],
            borderColor: 'rgb(107, 70, 193)',
            backgroundColor: 'rgba(107, 70, 193, 0.1)'
        }]
    }
});
```

**Expected Results:**
- ✅ Chart.js loaded successfully
- ✅ Chart renders on page
- ✅ Chart responsive to container
- ✅ Works in dark mode

**Pass/Fail:** _________

---

### Test 11: CSS Transitions & Animations
**Objective:** Verify smooth animations

**Elements to Test:**
1. **Card Hover:**
   - Hover over any card
   - ✅ Smooth lift animation (translateY)
   - ✅ Shadow increases smoothly

2. **Button Hover:**
   - Hover over buttons
   - ✅ Color change smooth
   - ✅ Transform on hover
   - ✅ No jank or flicker

3. **Tab Switch:**
   - Click different nav tabs
   - ✅ Content fades in smoothly
   - ✅ Tab indicator slides
   - ✅ No layout shift

4. **Dark Mode Toggle:**
   - Toggle dark/light mode
   - ✅ Smooth color transitions
   - ✅ No jarring flash

**Reduced Motion Test:**
DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion: reduce
- ✅ Animations nearly instant
- ✅ No spinning or sliding

**Pass/Fail:** _________

---

### Test 12: Mobile Touch Interactions
**Objective:** Test touch-friendly design

**Steps:**
1. Set DevTools to mobile device
2. Enable touch simulation
3. Test interactions

**Tap Targets:**
- ✅ All buttons at least 44x44px
- ✅ Nav tabs easy to tap
- ✅ Form inputs large enough
- ✅ No accidental adjacent taps

**Scrolling:**
- ✅ Smooth momentum scrolling
- ✅ No horizontal overflow
- ✅ Nav tabs swipe smoothly

**Forms:**
- ✅ Inputs show correct keyboard
- ✅ Zoom on focus disabled (viewport meta)
- ✅ Submit buttons accessible

**Pass/Fail:** _________

---

### Test 13: Print Styles
**Objective:** Test print stylesheet

**Steps:**
1. Open Print Preview (Ctrl+P or Cmd+P)
2. Check print layout

**Expected Results:**
- ✅ Header hidden
- ✅ Navigation hidden
- ✅ Buttons hidden
- ✅ Content formatted for print
- ✅ Cards have print-friendly borders
- ✅ Page breaks avoid splitting cards
- ✅ Black text on white background

**Pass/Fail:** _________

---

### Test 14: Browser Compatibility
**Objective:** Test across browsers

**Test in each browser:**
- Chrome/Edge
- Firefox
- Safari

**For each browser check:**
- ✅ Dark mode works
- ✅ Layouts correct
- ✅ Animations smooth
- ✅ Fonts render correctly
- ✅ No console errors
- ✅ Touch/click works
- ✅ Forms functional

**Known Issues:**
- Safari may have slight font rendering differences (expected)
- Firefox may handle some CSS slightly differently (should still work)

**Pass/Fail:** _________

---

## ✅ Phase 2 Completion Checklist

- [ ] Test 1: Dark mode toggle ✓
- [ ] Test 2: System preference detection ✓
- [ ] Test 3: Mobile (375px) ✓
- [ ] Test 4: Tablet (768px) ✓
- [ ] Test 5: Keyboard navigation ✓
- [ ] Test 6: Skip link ✓
- [ ] Test 7: ARIA & screen readers ✓
- [ ] Test 8: Enhanced imposter detection ✓
- [ ] Test 9: Loading states ✓
- [ ] Test 10: Chart.js integration ✓
- [ ] Test 11: Animations & transitions ✓
- [ ] Test 12: Touch interactions ✓
- [ ] Test 13: Print styles ✓
- [ ] Test 14: Browser compatibility ✓

**All tests passing?** ✅ Phase 2 Complete! Ready for Phase 3.

---

## 📊 Test Results Summary

**Date Tested:** ___________
**Tester:** ___________
**Browser(s):** ___________
**Device(s):** ___________

**Tests Passed:** ___ / 14
**Tests Failed:** ___ / 14

**Critical Issues Found:**
1.
2.
3.

**Minor Issues:**
1.
2.

**Notes:**


---

## 🎨 Visual Regression Checks

Compare before/after:
- Take screenshots in light mode
- Take screenshots in dark mode
- Check mobile layouts
- Verify no broken layouts
- Check color contrast

---

## 🚀 Next Steps

After all tests pass:
1. ✅ Document any browser-specific issues
2. ✅ Fix any critical bugs
3. ✅ Proceed to Phase 3: Production Deployment & Testing
4. ✅ Add automated tests (Jest + Playwright)
5. ✅ Deploy to GitHub Pages

---

## 🐛 Common Issues & Solutions

### Issue 1: Dark mode not persisting
**Solution:**
- Check localStorage is enabled
- Clear cache and reload
- Check console for errors

### Issue 2: Chart.js not loading
**Solution:**
- Check internet connection (CDN link)
- Check console for 404 errors
- Verify script tag in index.html

### Issue 3: Mobile layout broken
**Solution:**
- Check viewport meta tag
- Clear cache
- Verify CSS files loaded
- Check console for CSS errors

### Issue 4: Keyboard focus not visible
**Solution:**
- Ensure not using mouse
- Press Tab multiple times
- Check browser's default focus styles not overridden

---

**Created by:** Claude Code Assistant
**Last Updated:** November 14, 2025
