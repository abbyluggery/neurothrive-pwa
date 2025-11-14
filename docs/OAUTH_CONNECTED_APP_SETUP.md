# OAuth Connected App Setup Guide
## NeuroThrive PWA ↔ Salesforce Integration

**Date:** November 14, 2025
**Purpose:** Enable secure authentication between NeuroThrive PWA and Salesforce

---

## Prerequisites

- Salesforce org: `abbyluggery179@agentforce.com`
- PWA deployed (can use localhost for testing)
- DailyRoutineAPI deployed ✅

---

## Step 1: Create Connected App in Salesforce

### Navigate to Setup
1. Log into Salesforce: https://login.salesforce.com
2. Click **Setup** (gear icon, top right)
3. In Quick Find, search for **"App Manager"**
4. Click **New Connected App**

### Basic Information
| Field | Value |
|-------|-------|
| **Connected App Name** | NeuroThrive PWA |
| **API Name** | NeuroThrive_PWA |
| **Contact Email** | abbyluggery179@agentforce.com |
| **Description** | OAuth client for NeuroThrive Progressive Web App - Daily routine sync |

### API (Enable OAuth Settings)
☑ **Enable OAuth Settings**

**Callback URL:**
```
https://localhost:8080/oauth/callback
http://localhost:8080/oauth/callback
https://your-pwa-domain.com/oauth/callback
```
(Add all callback URLs, one per line)

**Selected OAuth Scopes:**
- ☑ Access the identity URL service (id, profile, email, address, phone)
- ☑ Manage user data via APIs (api)
- ☑ Perform requests at any time (refresh_token, offline_access)
- ☑ Access unique user identifiers (openid)

**Require Secret for Web Server Flow:** ☑ Yes
**Require Secret for Refresh Token Flow:** ☑ Yes
**Enable Authorization Code and Credentials Flow:** ☑ Yes

### Save and Continue
Click **Save** → Click **Continue**

---

## Step 2: Retrieve OAuth Credentials

After saving, you'll see:

### Consumer Key (Client ID)
```
Example: 3MVG9A2kN3Bn17hs8siDKdhsGl8r...
```
**Action:** Copy this - you'll need it in the PWA config

### Consumer Secret (Client Secret)
1. Click **"Click to reveal"** next to Consumer Secret
2. Copy the secret

**⚠️ IMPORTANT:** Store these securely. Never commit to Git!

---

## Step 3: Configure CORS (Allow PWA Origin)

### Navigate to CORS Settings
1. Setup → Quick Find: **"CORS"**
2. Click **New** under "CORS Allowed Origins List"

### Add PWA Origins
| Origin URL | Description |
|------------|-------------|
| `http://localhost:8080` | Local development |
| `https://localhost:8080` | Local HTTPS development |
| `https://your-pwa-domain.com` | Production PWA |

Click **Save** for each origin.

---

## Step 4: Configure Remote Site Settings

### Navigate to Remote Site Settings
1. Setup → Quick Find: **"Remote Site Settings"**
2. Click **New Remote Site**

### Add OAuth Token Endpoint
| Field | Value |
|-------|-------|
| **Remote Site Name** | Salesforce_OAuth |
| **Remote Site URL** | https://login.salesforce.com |
| **Description** | OAuth token endpoint |
| **Active** | ☑ Checked |

Click **Save**

---

## Step 5: Create Permission Set (Optional but Recommended)

### Create Permission Set
1. Setup → Quick Find: **"Permission Sets"**
2. Click **New**

### Permission Set Details
| Field | Value |
|-------|-------|
| **Label** | NeuroThrive API Access |
| **API Name** | NeuroThrive_API_Access |
| **Description** | Grants access to NeuroThrive PWA sync APIs |

### Assign Object Permissions
Navigate to: **Object Settings**

**Daily_Routine__c:**
- ☑ Read
- ☑ Create
- ☑ Edit
- ☑ Delete
- ☑ View All
- ☑ Modify All

**Mood_Entry__c:**
- ☑ Read
- ☑ Create
- ☑ Edit
- ☑ Delete

**Win_Entry__c:**
- ☑ Read
- ☑ Create
- ☑ Edit
- ☑ Delete

**Imposter_Syndrome_Session__c:**
- ☑ Read
- ☑ Create
- ☑ Edit

### Assign Apex Class Access
Navigate to: **Apex Class Access** → **Edit**

Add:
- ☑ DailyRoutineAPI

Click **Save**

### Assign to User
1. Go to **Manage Assignments**
2. Click **Add Assignments**
3. Select your user
4. Click **Assign** → **Done**

---

## Step 6: Test OAuth Flow

### Using Postman or cURL

**Step 1: Get Authorization Code**

Open browser and navigate to:
```
https://login.salesforce.com/services/oauth2/authorize?
  response_type=code&
  client_id=YOUR_CONSUMER_KEY&
  redirect_uri=http://localhost:8080/oauth/callback&
  scope=api%20refresh_token
```

**Step 2: Exchange Code for Token**

```bash
curl -X POST https://login.salesforce.com/services/oauth2/token \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTH_CODE" \
  -d "client_id=YOUR_CONSUMER_KEY" \
  -d "client_secret=YOUR_CONSUMER_SECRET" \
  -d "redirect_uri=http://localhost:8080/oauth/callback"
```

**Expected Response:**
```json
{
  "access_token": "00D...",
  "refresh_token": "5Aep...",
  "signature": "...",
  "scope": "refresh_token api",
  "id_token": "...",
  "instance_url": "https://abbyluggery179.my.salesforce.com",
  "id": "https://login.salesforce.com/id/00Dg5000000Q2uDEAS/005g5000000Q2uDAAQ",
  "token_type": "Bearer",
  "issued_at": "1731554089000"
}
```

**Step 3: Test API Call**

```bash
curl -X GET "https://abbyluggery179.my.salesforce.com/services/apexrest/routine/daily/2025-11-14" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "No routine found for this date",
  "data": {
    "routineDate": "2025-11-14",
    "moodEntries": [],
    "wins": []
  }
}
```

---

## Step 7: Store Credentials Securely

### For PWA Development
Create `.env` file (DO NOT COMMIT):

```env
SALESFORCE_CLIENT_ID=your_consumer_key_here
SALESFORCE_CLIENT_SECRET=your_consumer_secret_here
SALESFORCE_INSTANCE_URL=https://abbyluggery179.my.salesforce.com
SALESFORCE_REDIRECT_URI=http://localhost:8080/oauth/callback
```

### For Production
Use environment variables or secure configuration service:
- Azure Key Vault
- AWS Secrets Manager
- GitHub Secrets (for GitHub Pages deployment)

---

## OAuth Flow Diagram

```
┌─────────────┐                 ┌─────────────────┐                ┌──────────────┐
│             │                 │                 │                │              │
│  NeuroThrive│  1. Auth Request│   Salesforce    │  3. Auth Code  │  NeuroThrive │
│     PWA     ├────────────────→│  Login & Consent├───────────────→│     PWA      │
│             │                 │                 │                │              │
└─────────────┘                 └─────────────────┘                └──────┬───────┘
                                                                          │
                                                                          │ 4. Exchange
                                                                          │    Code for
                                                                          │    Token
                                                                          ▼
                                ┌─────────────────┐                ┌──────────────┐
                                │                 │                │              │
                                │   Salesforce    │  5. Tokens     │  NeuroThrive │
                                │  Token Endpoint │◀───────────────┤     PWA      │
                                │                 │                │              │
                                └─────────────────┘                └──────┬───────┘
                                                                          │
                                                                          │ 6. Call API
                                                                          │    with Token
                                                                          ▼
                                ┌─────────────────┐                ┌──────────────┐
                                │                 │                │              │
                                │ DailyRoutineAPI │  7. Response   │  NeuroThrive │
                                │   @RestResource │◀───────────────┤     PWA      │
                                │                 │                │              │
                                └─────────────────┘                └──────────────┘
```

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution:** Ensure callback URL in PWA exactly matches one configured in Connected App

### Error: "invalid_client_id"
**Solution:** Copy Consumer Key again - ensure no extra spaces

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution:** Add PWA origin to CORS Allowed Origins List

### Error: 401 Unauthorized
**Solution:** Token expired - use refresh token to get new access token

### Refresh Token Flow
```bash
curl -X POST https://login.salesforce.com/services/oauth2/token \
  -d "grant_type=refresh_token" \
  -d "refresh_token=YOUR_REFRESH_TOKEN" \
  -d "client_id=YOUR_CONSUMER_KEY" \
  -d "client_secret=YOUR_CONSUMER_SECRET"
```

---

## Security Best Practices

1. **Never commit credentials to Git**
   - Add `.env` to `.gitignore`
   - Use environment variables

2. **Use HTTPS in production**
   - No plain HTTP callback URLs
   - Enable HSTS headers

3. **Implement token rotation**
   - Refresh tokens before expiry
   - Store tokens encrypted in IndexedDB

4. **Validate redirect URIs**
   - Whitelist exact URLs
   - No wildcards in production

5. **Monitor API usage**
   - Check Login History in Salesforce
   - Review API usage limits

---

## Next Steps

1. ✅ Complete this OAuth setup
2. ⏳ Implement PWA authentication module
3. ⏳ Build API client wrapper
4. ⏳ Add background sync logic
5. ⏳ Test offline-to-online sync

---

**Status:** Ready for implementation
**Estimated Setup Time:** 30 minutes
**Prerequisites:** Admin access to Salesforce org

