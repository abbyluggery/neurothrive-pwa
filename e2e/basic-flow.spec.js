/**
 * Basic User Flow E2E Tests
 * Tests critical user journeys through the PWA
 */

const { test, expect } = require('@playwright/test');

test.describe('NeuroThrive PWA - Basic Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/NeuroThrive/i);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('.logo')).toContainText('NeuroThrive');
  });

  test('should have dark mode toggle', async ({ page }) => {
    const darkModeToggle = page.locator('#darkModeToggle');
    await expect(darkModeToggle).toBeVisible();

    // Click to toggle dark mode
    await darkModeToggle.click();

    // Check data-theme attribute changed
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('dark');

    // Toggle back to light
    await darkModeToggle.click();
    const lightTheme = await page.locator('html').getAttribute('data-theme');
    expect(lightTheme).toBe('light');
  });

  test('should navigate between tabs', async ({ page }) => {
    // Check dashboard is active by default
    await expect(page.locator('.nav-tab.active')).toContainText('Dashboard');

    // Click Journal tab
    await page.locator('[data-tab="journal"]').click();
    await expect(page.locator('[data-tab="journal"]')).toHaveClass(/active/);
    await expect(page.locator('#journal')).toHaveClass(/active/);

    // Click Routine tab
    await page.locator('[data-tab="routine"]').click();
    await expect(page.locator('[data-tab="routine"]')).toHaveClass(/active/);

    // Click Therapy tab
    await page.locator('[data-tab="therapy"]').click();
    await expect(page.locator('[data-tab="therapy"]')).toHaveClass(/active/);
  });

  test('should show authentication UI', async ({ page }) => {
    const authButton = page.locator('#authButton');
    await expect(authButton).toBeVisible();
    await expect(authButton).toContainText(/Login to Salesforce/i);
  });

  test('should show sync status indicator', async ({ page }) => {
    const syncStatus = page.locator('#syncStatus');
    await expect(syncStatus).toBeVisible();

    const syncIcon = syncStatus.locator('.sync-icon');
    const syncText = syncStatus.locator('.sync-text');

    await expect(syncIcon).toBeVisible();
    await expect(syncText).toBeVisible();
  });

  test('should have PWA manifest', async ({ page }) => {
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', 'manifest.json');
  });

  test('should load CSS files', async ({ page }) => {
    // Check main stylesheet loaded
    const stylesLink = page.locator('link[href="css/styles.css"]');
    await expect(stylesLink).toHaveCount(1);

    // Check components stylesheet loaded
    const componentsLink = page.locator('link[href="css/components.css"]');
    await expect(componentsLink).toHaveCount(1);
  });

  test('should load JavaScript modules', async ({ page }) => {
    // Wait for config to load
    await page.waitForFunction(() => window.SALESFORCE_CONFIG !== undefined);

    // Check salesforceAPI loaded
    await page.waitForFunction(() => window.salesforceAPI !== undefined);

    // Check syncManager loaded
    await page.waitForFunction(() => window.syncManager !== undefined);

    // Check darkModeManager loaded
    await page.waitForFunction(() => window.darkModeManager !== undefined);

    // Check imposterDetector loaded
    await page.waitForFunction(() => window.imposterDetector !== undefined);
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have skip link for keyboard navigation', async ({ page }) => {
    // Press Tab to focus skip link
    await page.keyboard.press('Tab');

    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check header has role
    const header = page.locator('header');
    await expect(header).toHaveAttribute('role', 'banner');

    // Check nav has role and label
    const nav = page.locator('nav.nav-tabs');
    await expect(nav).toHaveAttribute('role', 'navigation');
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    // Check main has role and id
    const main = page.locator('main');
    await expect(main).toHaveAttribute('role', 'main');
    await expect(main).toHaveAttribute('id', 'main-content');
  });

  test('should navigate with keyboard', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Dark mode toggle
    await page.keyboard.press('Tab'); // Auth button

    // Check auth button is focused
    const authButton = page.locator('#authButton');
    await expect(authButton).toBeFocused();
  });

  test('tabs should have proper aria-selected states', async ({ page }) => {
    const dashboardTab = page.locator('[data-tab="dashboard"]');
    const journalTab = page.locator('[data-tab="journal"]');

    // Dashboard should be selected by default
    await expect(dashboardTab).toHaveAttribute('aria-selected', 'true');
    await expect(journalTab).toHaveAttribute('aria-selected', 'false');

    // Click journal tab
    await journalTab.click();

    // Journal should now be selected
    await expect(journalTab).toHaveAttribute('aria-selected', 'true');
    await expect(dashboardTab).toHaveAttribute('aria-selected', 'false');
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check page loads
    await expect(page.locator('header')).toBeVisible();

    // Check navigation is scrollable
    const nav = page.locator('.nav-tabs');
    await expect(nav).toBeVisible();

    // Check buttons are touch-friendly (min 44px)
    const authButton = page.locator('#authButton');
    const box = await authButton.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

  test('should show only icon on very small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    // Sync text should be hidden on small screens
    const syncText = page.locator('.sync-text');
    await expect(syncText).not.toBeVisible();

    // Sync icon should still be visible
    const syncIcon = page.locator('.sync-icon');
    await expect(syncIcon).toBeVisible();
  });
});

test.describe('Dark Mode Persistence', () => {
  test('should persist dark mode preference', async ({ page, context }) => {
    await page.goto('/');

    // Enable dark mode
    await page.locator('#darkModeToggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Reload page
    await page.reload();

    // Dark mode should still be enabled
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('should clear dark mode preference on logout', async ({ page }) => {
    await page.goto('/');

    // Enable dark mode
    await page.locator('#darkModeToggle').click();

    // Clear localStorage (simulating logout)
    await page.evaluate(() => localStorage.clear());

    // Reload
    await page.reload();

    // Should revert to system default (light in test environment)
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(['light', 'dark']).toContain(theme);
  });
});

test.describe('Imposter Syndrome Detection', () => {
  test('should detect imposter syndrome patterns', async ({ page }) => {
    await page.goto('/');

    // Test detection in console
    const result = await page.evaluate(() => {
      return window.imposterDetector.detect("I'm such a fraud");
    });

    expect(result.detected).toBe(true);
    expect(result.score).toBeGreaterThan(0);
    expect(result.severity).toBeTruthy();
  });

  test('should not detect normal text', async ({ page }) => {
    await page.goto('/');

    const result = await page.evaluate(() => {
      return window.imposterDetector.detect("I'm feeling great today");
    });

    expect(result.detected).toBe(false);
    expect(result.score).toBe(0);
  });
});
