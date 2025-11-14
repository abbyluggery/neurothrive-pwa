# MVP Technical Specifications
## Neurodivergent Job Search App - Phase 1

**Version:** 1.0  
**Target Timeline:** 6 months to working MVP  
**Last Updated:** October 18, 2025

---

## Executive Summary

**What We're Building:**
A semi-automated job search platform that aggregates jobs overnight, delivers personalized morning reports via email, tracks user mood/energy patterns, and offers one-click resume tailoring - all designed specifically for neurodivergent executive function challenges.

**Why Email-First MVP:**
- ✅ Simplest to build (no complex UI needed)
- ✅ Familiar interface (everyone checks email)
- ✅ Mobile-friendly by default
- ✅ Reduces development time by 60%
- ✅ Lets us focus on CORE VALUE (aggregation + intelligence)
- ✅ Easy to iterate (just email templates)

**Core User Flow:**
1. User signs up → configures preferences (one-time, 5 min)
2. System runs overnight → aggregates jobs, researches companies
3. Morning email arrives → curated matches with ND-friendly insights
4. User clicks action → "Apply" / "Save" / "Pass"
5. For "Apply" → system tailors resume, user reviews/sends
6. Daily mood check-in → tracks patterns over time
7. Weekly insights → "You're most productive on Tuesdays"

---

## MVP Feature Set (Prioritized)

### Phase 1A: Core Automation (Months 1-2)

**MUST-HAVE (Launch Blockers):**

**1. Job Aggregation**
- Search Indeed, LinkedIn via APIs/scraping
- Basic filters: job title, location, salary, remote
- Deduplication (same job across multiple sites)
- Nightly scheduled runs
- Store in database

**2. Morning Email Reports**
- Personalized to user preferences
- Clean, scannable HTML template
- Top 3-5 matches highlighted
- Match score displayed (0-100%)
- Direct links to apply
- One-click actions: Apply / Save / Pass

**3. User Preferences (Simple Setup)**
- Job titles (keywords)
- Locations or "Remote only"
- Salary range (min/max)
- Must-haves: Remote? Flexible schedule?
- Email delivery time preference
- Stored in database, editable anytime

**SHOULD-HAVE (Important but not blockers):**

**4. ND-Friendly Filtering**
- Flag "fast-paced" / "high-pressure" language (red flag)
- Highlight "flexible" / "remote" / "accommodating" (green flag)
- Filter out unrealistic requirements ("entry level, 10 yrs exp")
- Preference for clear job descriptions

**5. Basic Application Tracking**
- When user clicks "Apply" → log to database
- Status: Applied, Saved, Passed
- View history via simple web page or email digest

**COULD-HAVE (Nice to have, defer if needed):**

**6. Simple Mood Check-In**
- Daily prompt via email: "How are you feeling? 1-5"
- Stores in database
- No analysis yet (just data collection)

### Phase 1B: Intelligence Layer (Months 3-4)

**MUST-HAVE:**

**7. Resume Tailoring (Semi-Automated)**
- User uploads base resume (once)
- User clicks "Tailor for [Company]" from email
- System uses Claude API to:
  - Research company
  - Build recruiter persona
  - Tailor resume for this specific role
- User reviews tailored resume in browser
- User approves → downloads or copies

**8. Company Research Integration**
- For top matches (maybe top 5 per day)
- Basic research: company size, recent news
- ND-specific: Remote policy? Flexibility? Neurodiversity programs?
- Include in morning email: "✅ Remote-first, ✅ Flexible hours"

**SHOULD-HAVE:**

**9. Mood Pattern Insights**
- Weekly summary: "You had 4 high-energy days this week"
- Identify trends: "Your mood tends to be lower on Mondays"
- Correlate with job search: "You applied to more jobs on high-energy days"

**COULD-HAVE:**

**10. ND-Specific Match Scoring**
- Boost score for remote/flexible jobs
- Reduce score for red-flag language
- Factor in company culture research

### Phase 1C: Refinement (Months 5-6)

**Polish and prepare for beta testing:**

**11. User Dashboard (Simple Web Interface)**
- View all saved jobs
- See application history
- Edit preferences
- View mood tracking graphs
- Export data

**12. Email Improvements**
- A/B test subject lines
- Personalize tone based on user mood
- Better mobile rendering
- Configurable frequency (daily vs. 3x/week vs. weekly)

**13. Beta Testing Preparation**
- Onboarding flow for new users
- Documentation and FAQs
- Feedback mechanism
- Privacy policy and terms

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────┐
│                   USER INTERFACE                     │
│  (Email Client + Simple Web Dashboard)              │
└─────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────┐
│              EMAIL DELIVERY SERVICE                  │
│         (SendGrid / Mailgun / AWS SES)               │
└─────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────┐
│              APPLICATION BACKEND                     │
│                 (Python + Flask/Django)              │
│                                                      │
│  - Job Aggregation Scheduler (runs nightly)         │
│  - Company Research Service (Claude API)             │
│  - Resume Tailoring Service (Claude API)             │
│  - Mood Tracking Service                             │
│  - Email Template Generator                          │
│  - User Preferences Manager                          │
└─────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────┐
│                     DATABASE                         │
│              (PostgreSQL or SQLite)                  │
│                                                      │
│  Tables:                                             │
│  - users                                             │
│  - jobs                                              │
│  - user_preferences                                  │
│  - applications (tracking)                           │
│  - mood_checkins                                     │
│  - company_research (cached)                         │
└─────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                       │
│                                                      │
│  - Indeed API / Scraper                              │
│  - LinkedIn Jobs API / Scraper                       │
│  - Glassdoor (for company research)                  │
│  - Claude API (for resume tailoring & research)      │
└─────────────────────────────────────────────────────┘
```

### Tech Stack Recommendation

**Backend:**
- **Language:** Python 3.11+
- **Framework:** Flask (lightweight) or Django (batteries-included)
- **Task Scheduler:** APScheduler or Celery with Redis
- **Web Scraping:** Beautiful Soup 4 + Selenium (for JavaScript-heavy sites)
- **API Client:** Requests library

**Database:**
- **Development:** SQLite (simple, file-based)
- **Production:** PostgreSQL (scalable, reliable)
- **ORM:** SQLAlchemy (Flask) or Django ORM

**Email:**
- **Service:** SendGrid (generous free tier: 100 emails/day)
- **Alternative:** Mailgun, AWS SES
- **Template Engine:** Jinja2 (for HTML emails)

**Frontend (Minimal):**
- **Dashboard:** Flask templates or Django templates
- **Styling:** Tailwind CSS (via CDN, no build step)
- **Interactivity:** Vanilla JavaScript (keep it simple)

**Hosting:**
- **Application:** Heroku (free tier for testing) or Railway
- **Alternative:** DigitalOcean App Platform, Render.com
- **Database:** Included with Heroku/Railway or separate instance

**Development Tools:**
- **Version Control:** Git + GitHub
- **Environment:** virtualenv or conda
- **API Testing:** Postman or curl
- **Logging:** Python logging module

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- bcrypt hashed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    timezone VARCHAR(50) DEFAULT 'UTC'
);
```

### User Preferences Table
```sql
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Job Search Criteria
    job_titles TEXT[],  -- Array of keywords
    locations TEXT[],   -- Array of locations or ["Remote"]
    salary_min INTEGER,
    salary_max INTEGER,
    
    -- ND-Specific Preferences
    require_remote BOOLEAN DEFAULT FALSE,
    require_flexible_schedule BOOLEAN DEFAULT FALSE,
    avoid_high_pressure BOOLEAN DEFAULT TRUE,
    prefer_clear_descriptions BOOLEAN DEFAULT TRUE,
    
    -- Email Preferences
    email_frequency VARCHAR(20) DEFAULT 'daily',  -- daily, 3x_week, weekly
    email_time TIME DEFAULT '08:00:00',
    email_density VARCHAR(20) DEFAULT 'standard',  -- minimal, standard, detailed
    
    -- Other
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    
    -- Job Details
    title VARCHAR(500) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    salary_min INTEGER,
    salary_max INTEGER,
    description TEXT,
    requirements TEXT,
    url TEXT UNIQUE NOT NULL,
    
    -- Source Info
    source VARCHAR(50),  -- 'indeed', 'linkedin', 'glassdoor'
    posted_date DATE,
    
    -- Metadata
    is_remote BOOLEAN DEFAULT FALSE,
    is_flexible BOOLEAN DEFAULT FALSE,
    has_red_flags BOOLEAN DEFAULT FALSE,
    has_green_flags BOOLEAN DEFAULT FALSE,
    
    -- Tracking
    first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### User Job Matches Table
```sql
CREATE TABLE user_job_matches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    
    -- Match Details
    match_score INTEGER,  -- 0-100
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- User Actions
    status VARCHAR(20) DEFAULT 'pending',  -- pending, applied, saved, passed
    action_taken_at TIMESTAMP,
    
    -- Company Research (cached)
    company_research JSONB,  -- Stores research results as JSON
    research_date TIMESTAMP,
    
    UNIQUE(user_id, job_id)
);
```

### Applications Table
```sql
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE SET NULL,
    
    -- Application Details
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tailored_resume_url TEXT,  -- S3 link or file path
    cover_letter_url TEXT,
    
    -- Tracking
    status VARCHAR(50) DEFAULT 'applied',  
    -- applied, phone_screen, interview, offer, rejected, ghosted
    
    -- Communications Log
    communications JSONB,  -- Array of {date, type, notes}
    
    -- Interview Details
    interview_date TIMESTAMP,
    interview_notes TEXT,
    
    -- Offer Details
    offer_salary INTEGER,
    offer_date DATE,
    offer_accepted BOOLEAN
);
```

### Mood Check-ins Table
```sql
CREATE TABLE mood_checkins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Mood Data
    checkin_date DATE NOT NULL,
    mood_score INTEGER,  -- 1-5
    energy_level VARCHAR(20),  -- low, moderate, high, hypomanic
    focus_quality VARCHAR(20),  -- scattered, normal, hyperfocus
    anxiety_level VARCHAR(20),  -- calm, mild, moderate, high, panic
    motivation VARCHAR(20),  -- none, low, moderate, high, driven
    
    -- Optional Note
    note TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, checkin_date)
);
```

### Company Research Cache Table
```sql
CREATE TABLE company_research (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) UNIQUE NOT NULL,
    
    -- Basic Info
    size VARCHAR(50),
    industry VARCHAR(100),
    stage VARCHAR(50),  -- startup, scaleup, established, enterprise
    
    -- ND-Specific
    has_nd_program BOOLEAN DEFAULT FALSE,
    remote_policy VARCHAR(50),  -- none, hybrid, remote_first, fully_remote
    flexible_schedule BOOLEAN DEFAULT FALSE,
    glassdoor_rating DECIMAL(2,1),
    
    -- Research Results (full data)
    research_data JSONB,
    
    -- Cache Management
    researched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,  -- Auto-refresh old data
    
    UNIQUE(company_name)
);
```

---

## API Integrations

### 1. Job Board APIs

**Indeed API:**
- **Status:** No official public API (as of 2025)
- **Alternative:** Web scraping with Beautiful Soup + Selenium
- **Rate Limiting:** Be respectful, cache results
- **Legal:** Review Indeed's Terms of Service

**LinkedIn Jobs:**
- **Status:** Official API restricted to partners
- **Alternative:** LinkedIn Jobs search via Google (workaround) or scraping
- **Rate Limiting:** Use proxies, rotate user agents
- **Legal:** Check LinkedIn's Terms

**Glassdoor:**
- **Status:** No public API
- **Alternative:** Web scraping for company reviews
- **Use:** Company research only (culture, flexibility)

**Recommendation for MVP:**
- Start with Indeed scraping (largest job board)
- Add LinkedIn later if needed
- Cache results aggressively to minimize scraping

### 2. Claude API (Resume Tailoring & Research)

**Endpoint:** `https://api.anthropic.com/v1/messages`

**Authentication:**
```python
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
```

**Example: Company Research**
```python
def research_company(company_name, job_url):
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1500,
        messages=[
            {
                "role": "user",
                "content": f"""Using the Job Search Skill and Neurodivergent Job Search Skill:
                
Research {company_name} and provide:
1. Company size and stage
2. Neurodiversity hiring programs (if any)
3. Remote work policy
4. Flexibility indicators
5. Red flags for neurodivergent candidates
6. Green flags for neurodivergent candidates
7. Overall ND-friendliness rating (1-10)

Job posting URL: {job_url}

Respond in JSON format:
{{
  "size": "...",
  "stage": "...",
  "nd_program": true/false,
  "remote_policy": "...",
  "flexible_schedule": true/false,
  "red_flags": ["..."],
  "green_flags": ["..."],
  "nd_friendliness_score": 1-10,
  "recommendation": "..."
}}

DO NOT include anything other than valid JSON in your response."""
            }
        ]
    )
    
    # Parse JSON response
    import json
    response_text = message.content[0].text
    # Strip markdown code blocks if present
    response_text = response_text.replace("```json", "").replace("```", "").strip()
    return json.loads(response_text)
```

**Example: Resume Tailoring**
```python
def tailor_resume(user_resume, job_description, company_research):
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[
            {
                "role": "user",
                "content": f"""Using the Job Search Skill and Neurodivergent Job Search Skill:

Tailor this resume for the specific job below:

USER'S RESUME:
{user_resume}

JOB DESCRIPTION:
{job_description}

COMPANY RESEARCH:
{json.dumps(company_research, indent=2)}

Create a tailored resume that:
1. Highlights relevant experience for THIS role
2. Uses company's language and keywords
3. Addresses potential concerns proactively
4. Positions neurodivergent traits as strengths (if company is ND-friendly)

Return the tailored resume in markdown format."""
            }
        ]
    )
    
    return message.content[0].text
```

**Cost Estimation:**
- Claude Sonnet 4: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Company research: ~500 input + 500 output tokens = ~$0.01 per request
- Resume tailoring: ~1000 input + 1500 output tokens = ~$0.03 per request
- **Monthly cost for 100 users:** ~$300-500 (if each user tailors 10 resumes/month)

### 3. Email Service (SendGrid)

**Free Tier:** 100 emails/day (3,000/month)

**Setup:**
```python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_morning_report(user_email, matches_html):
    message = Mail(
        from_email='noreply@yourdomain.com',
        to_emails=user_email,
        subject='Your Daily Job Matches 🎯',
        html_content=matches_html
    )
    
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        return response.status_code
    except Exception as e:
        print(f"Error sending email: {e}")
        return None
```

---

## Development Roadmap

### Month 1: Foundation
**Weeks 1-2: Setup & Infrastructure**
- [ ] Set up development environment (Python, virtualenv, Git)
- [ ] Initialize Flask/Django project
- [ ] Set up PostgreSQL database (local dev)
- [ ] Create database schema (all tables)
- [ ] Set up GitHub repository
- [ ] Configure environment variables (.env file)

**Weeks 3-4: Job Aggregation (Basic)**
- [ ] Build Indeed scraper (Beautiful Soup + Selenium)
- [ ] Parse job listings (title, company, location, salary, URL)
- [ ] Store jobs in database
- [ ] Implement deduplication logic
- [ ] Test with sample queries

**Deliverable:** Script that scrapes Indeed and stores jobs in database

### Month 2: Email System
**Weeks 5-6: User Management & Preferences**
- [ ] Create user registration/login (simple, email + password)
- [ ] Build preferences form (job titles, locations, salary)
- [ ] Store user preferences in database
- [ ] Create user dashboard (view/edit preferences)

**Weeks 7-8: Morning Email Reports**
- [ ] Design HTML email template (clean, scannable)
- [ ] Implement match scoring logic (basic: keyword matching)
- [ ] Build email generation system (top 5 matches)
- [ ] Integrate SendGrid
- [ ] Create scheduler (APScheduler) for nightly job run + morning email
- [ ] Test end-to-end flow

**Deliverable:** Working email system that sends daily job matches

### Month 3: Intelligence Layer (Part 1)
**Weeks 9-10: ND-Friendly Filtering**
- [ ] Implement red flag detection (regex for "fast-paced", "high-pressure")
- [ ] Implement green flag detection ("remote", "flexible", "accommodating")
- [ ] Filter unrealistic requirements (heuristics)
- [ ] Enhance match scoring with ND criteria
- [ ] Update email template to show flags

**Weeks 11-12: Basic Application Tracking**
- [ ] Add click tracking to email links (Apply/Save/Pass)
- [ ] Log user actions to applications table
- [ ] Create simple application history page
- [ ] Test tracking flow

**Deliverable:** ND-enhanced matching + click tracking

### Month 4: Intelligence Layer (Part 2)
**Weeks 13-14: Company Research**
- [ ] Integrate Claude API for company research
- [ ] Build company research cache (avoid re-researching)
- [ ] Research top 5 matches per user per day
- [ ] Store research results in database
- [ ] Add research snippets to email ("✅ Remote-first")

**Weeks 15-16: Resume Tailoring (Semi-Automated)**
- [ ] Build resume storage (user uploads base resume)
- [ ] Create "Tailor Resume" workflow (user clicks from email)
- [ ] Integrate Claude API for resume tailoring
- [ ] Build review page (show original vs. tailored)
- [ ] Implement download/copy functionality

**Deliverable:** Company research + resume tailoring working

### Month 5: Mood Tracking & Insights
**Weeks 17-18: Mood Check-ins**
- [ ] Add daily mood prompt to email
- [ ] Build mood check-in form (1-5 scale + optional note)
- [ ] Store mood data in database
- [ ] Create mood history view

**Weeks 19-20: Pattern Analysis**
- [ ] Build weekly mood summary
- [ ] Identify trends (mood by day of week)
- [ ] Correlate mood with job search activity
- [ ] Add insights to weekly digest email

**Deliverable:** Mood tracking + pattern insights

### Month 6: Polish & Beta Prep
**Weeks 21-22: User Dashboard Improvements**
- [ ] Better UI/UX for dashboard (Tailwind CSS)
- [ ] Add mood tracking graphs (Chart.js)
- [ ] Improve application tracking (status updates)
- [ ] Mobile responsive design

**Weeks 23-24: Beta Testing Preparation**
- [ ] Write user documentation (how to use the system)
- [ ] Create onboarding flow for new users
- [ ] Add feedback mechanism (in-app + email)
- [ ] Write privacy policy and terms of service
- [ ] Test with yourself extensively
- [ ] Invite 1-2 beta testers from your 3+ group
- [ ] Fix bugs based on feedback

**Deliverable:** Beta-ready MVP with 2-3 active testers

---

## MVP Success Metrics

### Technical Metrics
- [ ] 99%+ uptime for scheduled jobs
- [ ] <5 second page load times
- [ ] <10% email bounce rate
- [ ] Zero data breaches
- [ ] Successful daily job aggregation

### User Metrics (Per Beta Tester)
- [ ] 80%+ email open rate
- [ ] 50%+ click-through rate (user takes action)
- [ ] 10+ applications sent per month
- [ ] 3+ mood check-ins per week
- [ ] Positive qualitative feedback

### Business Metrics
- [ ] 3+ active beta testers by end of Month 6
- [ ] 1+ success story (beta tester gets interview/job)
- [ ] <$100/month operating costs
- [ ] Validated product-market fit

---

## Cost Breakdown (Monthly)

### Free Tier Options
- **Hosting:** Heroku Free Tier or Railway ($0)
- **Database:** Heroku PostgreSQL Hobby Dev ($0)
- **Email:** SendGrid Free (100 emails/day) ($0)
- **Claude API:** Pay-as-you-go (~$50-100 for 10 users)

**Total for MVP with 10 users: $50-100/month**

### Paid Tier (When Scaling)
- **Hosting:** Heroku Hobby ($7) or Railway Pro ($20)
- **Database:** Heroku Hobby Basic ($9)
- **Email:** SendGrid Essentials (40,000 emails/month, $20)
- **Claude API:** ~$300-500 for 100 users

**Total for 100 users: ~$350-550/month**

---

## Risk Mitigation

### Technical Risks

**Risk 1: Job Board Scraping Breaks**
- **Mitigation:** Build scraper adaptively, monitor daily, have fallback to manual job input
- **Plan B:** Use RSS feeds where available, partner with job boards

**Risk 2: Claude API Costs Too High**
- **Mitigation:** Cache research results aggressively, limit tailoring to user-initiated only
- **Plan B:** Use cheaper models (Claude Haiku) for research, reserve Sonnet for tailoring

**Risk 3: Email Deliverability Issues**
- **Mitigation:** Follow email best practices (SPF, DKIM, DMARC), avoid spam triggers
- **Plan B:** Use transactional email service with better deliverability (AWS SES)

### Product Risks

**Risk 4: Users Don't Engage with Emails**
- **Mitigation:** A/B test subject lines, personalize content, optimize send times
- **Plan B:** Add push notifications, SMS option

**Risk 5: Resume Tailoring Quality Not Good Enough**
- **Mitigation:** Iterate prompts, add human review step, gather user feedback
- **Plan B:** Offer human review service (manual, paid)

### Business Risks

**Risk 6: Can't Monetize (If Needed)**
- **Mitigation:** Keep costs ultra-low, build for free/pay-once model from start
- **Plan B:** Freemium model (basic free, advanced paid)

---

## Next Steps

### This Week
1. [ ] Choose framework: Flask or Django?
2. [ ] Set up development environment
3. [ ] Initialize project structure
4. [ ] Create database schema
5. [ ] Build simple Indeed scraper prototype

### Next 2 Weeks
1. [ ] Complete job aggregation script
2. [ ] Store jobs in database
3. [ ] Test with real searches
4. [ ] Document code

### Month 1 Goal
- [ ] Working job aggregation that runs on schedule
- [ ] Basic email system (even if just plain text)
- [ ] You receiving daily emails with job matches

---

## Resources & Tools

### Learning Resources
- **Flask Tutorial:** https://flask.palletsprojects.com/tutorial/
- **Django Tutorial:** https://docs.djangoproject.com/en/stable/intro/tutorial01/
- **Web Scraping:** https://realpython.com/beautiful-soup-web-scraper-python/
- **Claude API Docs:** https://docs.anthropic.com/

### Development Tools
- **Code Editor:** VS Code with Python extension
- **Database Tool:** pgAdmin (PostgreSQL GUI)
- **API Testing:** Postman or Insomnia
- **Version Control:** GitHub Desktop or git CLI

### Community/Support
- **r/learnprogramming** - For coding questions
- **Stack Overflow** - For specific technical issues
- **Anthropic Discord** - For Claude API questions
- **Your 3+ Beta Testers** - For product feedback

---

## Conclusion

This MVP spec gives you a clear, actionable path to building the first version of your Neurodivergent Job Search app in 6 months.

**Key Principles:**
1. ✅ **Start simple** - Email-first, no complex UI
2. ✅ **Focus on core value** - Job aggregation + intelligence
3. ✅ **Build for yourself first** - You're user #1
4. ✅ **Iterate based on real usage** - Your beta testers guide development
5. ✅ **Keep costs low** - Free tiers as long as possible

**Success = Helping neurodivergent job seekers (starting with you) find jobs while managing mental health.**

Let's build this! 🚀
