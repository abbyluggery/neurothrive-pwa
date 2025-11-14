/**
 * Salesforce API Client for NeuroThrive PWA
 * Handles OAuth authentication and API calls to DailyRoutineAPI
 *
 * @author Abby Luggery / Claude Code Assistant
 * @date 2025-11-14
 */

class SalesforceAPI {
    constructor() {
        // Configuration (would come from environment variables in production)
        this.config = {
            clientId: '', // Set from OAuth Connected App
            clientSecret: '', // Set from OAuth Connected App (use only in secure backend)
            instanceUrl: 'https://abbyluggery179.my.salesforce.com',
            loginUrl: 'https://login.salesforce.com',
            redirectUri: window.location.origin + '/oauth/callback',
            apiVersion: 'v65.0'
        };

        this.tokens = this.loadTokens();
        this.authInProgress = false;
    }

    /**
     * Load tokens from IndexedDB or localStorage
     */
    loadTokens() {
        try {
            const stored = localStorage.getItem('sf_tokens');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('Error loading tokens:', e);
            return null;
        }
    }

    /**
     * Save tokens to IndexedDB/localStorage
     */
    saveTokens(tokens) {
        try {
            localStorage.setItem('sf_tokens', JSON.stringify({
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                instance_url: tokens.instance_url,
                issued_at: tokens.issued_at,
                expires_in: tokens.expires_in || 7200 // Default 2 hours
            }));
            this.tokens = tokens;
        } catch (e) {
            console.error('Error saving tokens:', e);
        }
    }

    /**
     * Clear tokens (logout)
     */
    clearTokens() {
        localStorage.removeItem('sf_tokens');
        this.tokens = null;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        if (!this.tokens || !this.tokens.access_token) {
            return false;
        }

        // Check if token is expired
        const issuedAt = parseInt(this.tokens.issued_at);
        const expiresIn = parseInt(this.tokens.expires_in) || 7200;
        const expiryTime = issuedAt + (expiresIn * 1000);
        const now = Date.now();

        return now < expiryTime;
    }

    /**
     * Initiate OAuth login flow
     */
    login() {
        if (this.authInProgress) {
            console.log('Authentication already in progress');
            return;
        }

        this.authInProgress = true;

        // Build authorization URL
        const authUrl = new URL(`${this.config.loginUrl}/services/oauth2/authorize`);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('client_id', this.config.clientId);
        authUrl.searchParams.append('redirect_uri', this.config.redirectUri);
        authUrl.searchParams.append('scope', 'api refresh_token openid');
        authUrl.searchParams.append('state', this.generateState());

        // Redirect to Salesforce login
        window.location.href = authUrl.toString();
    }

    /**
     * Generate random state for CSRF protection
     */
    generateState() {
        const state = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('oauth_state', state);
        return state;
    }

    /**
     * Verify OAuth state
     */
    verifyState(state) {
        const savedState = sessionStorage.getItem('oauth_state');
        sessionStorage.removeItem('oauth_state');
        return state === savedState;
    }

    /**
     * Handle OAuth callback (exchange code for token)
     */
    async handleCallback() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');

        if (error) {
            console.error('OAuth error:', error);
            this.authInProgress = false;
            throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
            console.error('No authorization code received');
            this.authInProgress = false;
            throw new Error('No authorization code received');
        }

        if (!this.verifyState(state)) {
            console.error('Invalid OAuth state');
            this.authInProgress = false;
            throw new Error('Invalid OAuth state - possible CSRF attack');
        }

        // Exchange code for token
        try {
            const tokenResponse = await this.exchangeCodeForToken(code);
            this.saveTokens(tokenResponse);
            this.authInProgress = false;

            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);

            return true;
        } catch (e) {
            this.authInProgress = false;
            throw e;
        }
    }

    /**
     * Exchange authorization code for access token
     * NOTE: In production, this should be done server-side to protect client_secret
     */
    async exchangeCodeForToken(code) {
        const tokenUrl = `${this.config.loginUrl}/services/oauth2/token`;

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret, // NEVER expose in production PWA
            redirect_uri: this.config.redirectUri
        });

        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Token exchange failed: ${error}`);
        }

        return await response.json();
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshAccessToken() {
        if (!this.tokens || !this.tokens.refresh_token) {
            throw new Error('No refresh token available');
        }

        const tokenUrl = `${this.config.loginUrl}/services/oauth2/token`;

        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: this.tokens.refresh_token,
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret
        });

        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
        });

        if (!response.ok) {
            // Refresh token invalid - need to re-authenticate
            this.clearTokens();
            throw new Error('Refresh token expired - please login again');
        }

        const newTokens = await response.json();
        this.saveTokens({
            ...this.tokens,
            access_token: newTokens.access_token,
            issued_at: newTokens.issued_at
        });

        return newTokens;
    }

    /**
     * Make authenticated API call
     */
    async callAPI(endpoint, method = 'GET', data = null) {
        // Ensure authenticated
        if (!this.isAuthenticated()) {
            try {
                await this.refreshAccessToken();
            } catch (e) {
                console.error('Authentication required:', e);
                throw new Error('Please login to sync with Salesforce');
            }
        }

        const url = `${this.tokens.instance_url}${endpoint}`;
        const options = {
            method: method,
            headers: {
                'Authorization': `Bearer ${this.tokens.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);

            if (response.status === 401) {
                // Token expired mid-request - refresh and retry
                await this.refreshAccessToken();
                options.headers['Authorization'] = `Bearer ${this.tokens.access_token}`;
                const retryResponse = await fetch(url, options);

                if (!retryResponse.ok) {
                    throw new Error(`API call failed: ${retryResponse.status} ${retryResponse.statusText}`);
                }

                return await retryResponse.json();
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API call failed: ${response.status} - ${errorText}`);
            }

            return await response.json();
        } catch (e) {
            console.error('API call error:', e);
            throw e;
        }
    }

    /**
     * Get daily routine for specific date
     */
    async getDailyRoutine(date) {
        const endpoint = `/services/apexrest/routine/daily/${date}`;
        return await this.callAPI(endpoint, 'GET');
    }

    /**
     * Create or update daily routine
     */
    async upsertDailyRoutine(routineData) {
        const endpoint = '/services/apexrest/routine/daily';
        return await this.callAPI(endpoint, 'POST', routineData);
    }

    /**
     * Logout and revoke token
     */
    async logout() {
        if (this.tokens && this.tokens.access_token) {
            try {
                // Revoke token
                const revokeUrl = `${this.config.loginUrl}/services/oauth2/revoke`;
                await fetch(revokeUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `token=${this.tokens.access_token}`
                });
            } catch (e) {
                console.error('Error revoking token:', e);
            }
        }

        this.clearTokens();
    }
}

// Export singleton instance
const salesforceAPI = new SalesforceAPI();

// Handle OAuth callback automatically
if (window.location.search.includes('code=')) {
    salesforceAPI.handleCallback()
        .then(() => {
            console.log('OAuth authentication successful');
            // Trigger sync if needed
            if (window.syncManager) {
                window.syncManager.syncAll();
            }
        })
        .catch(e => {
            console.error('OAuth callback error:', e);
            alert('Authentication failed: ' + e.message);
        });
}

// Make available globally
window.salesforceAPI = salesforceAPI;
