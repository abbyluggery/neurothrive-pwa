/**
 * Salesforce OAuth Configuration Template for NeuroThrive PWA
 *
 * INSTRUCTIONS:
 * 1. Copy this file to js/config.js
 * 2. Replace placeholder values with your actual OAuth credentials
 * 3. Never commit js/config.js to Git (it's in .gitignore)
 *
 * HOW TO GET CREDENTIALS:
 * 1. Log into Salesforce Setup
 * 2. Go to App Manager → Find "NeuroThrive PWA" Connected App
 * 3. View Details → Copy Consumer Key and Consumer Secret
 *
 * @date 2025-11-14
 */

window.SALESFORCE_CONFIG = {
    // OAuth credentials from Connected App
    clientId: 'YOUR_CONSUMER_KEY_HERE',
    clientSecret: 'YOUR_CONSUMER_SECRET_HERE',

    // Salesforce instance details
    instanceUrl: 'https://YOUR_INSTANCE.my.salesforce.com',
    loginUrl: 'https://login.salesforce.com',

    // OAuth callback URL (must match Connected App settings)
    redirectUri: window.location.origin + '/oauth/callback',

    // API version
    apiVersion: 'v65.0',

    // OAuth scopes
    scopes: 'api refresh_token openid'
};

console.log('⚠️ Using template configuration - please update with real credentials');
