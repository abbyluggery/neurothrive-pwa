# Starter Code Package - Getting Started Guide

## Quick Start: Get Your MVP Running in 30 Minutes

This guide will get you from zero to a working job scraper + database in ~30 minutes.

---

## Prerequisites

**Install Python 3.11+:**
```bash
# Check if you have Python installed
python3 --version

# If not, download from python.org
```

**Install pip (Python package manager):**
```bash
# Should come with Python, but verify:
pip3 --version
```

---

## Step 1: Set Up Project (5 minutes)

**Create project directory:**
```bash
mkdir nd-job-search
cd nd-job-search
```

**Create virtual environment:**
```bash
# Create virtualenv
python3 -m venv venv

# Activate it
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# You should see (venv) in your terminal prompt
```

**Create requirements.txt:**
```bash
cat > requirements.txt << 'EOF'
# Web Framework
flask==3.0.0

# Database
flask-sqlalchemy==3.1.1
psycopg2-binary==2.9.9  # PostgreSQL adapter

# Web Scraping
beautifulsoup4==4.12.2
selenium==4.15.2
requests==2.31.0

# Task Scheduling
apscheduler==3.10.4

# Email
sendgrid==6.11.0

# API Clients
anthropic==0.7.7

# Utilities
python-dotenv==1.0.0  # Environment variables
python-dateutil==2.8.2

# Development
pytest==7.4.3
black==23.11.0  # Code formatter
EOF
```

**Install dependencies:**
```bash
pip install -r requirements.txt
```

---

## Step 2: Create Project Structure (5 minutes)

```bash
# Create directories
mkdir -p app/{models,services,templates,static}
mkdir -p tests
mkdir -p data  # For SQLite database during development

# Create __init__.py files
touch app/__init__.py
touch app/models/__init__.py
touch app/services/__init__.py

# Create main files
touch app/config.py
touch app/database.py
touch run.py
touch .env
```

**Your structure should look like:**
```
nd-job-search/
├── venv/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   ├── templates/
│   └── static/
├── data/
├── tests/
├── requirements.txt
├── run.py
└── .env
```

---

## Step 3: Configure Environment (2 minutes)

**Edit `.env` file:**
```bash
# .env
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here-change-this

# Database (SQLite for development)
DATABASE_URL=sqlite:///data/nd_job_search.db

# APIs (add these later when you have them)
ANTHROPIC_API_KEY=your-anthropic-key-here
SENDGRID_API_KEY=your-sendgrid-key-here

# Scraping Settings
INDEED_BASE_URL=https://www.indeed.com
USER_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

---

## Step 4: Set Up Database Models (5 minutes)

**Create `app/config.py`:**
```python
# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///data/nd_job_search.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

**Create `app/database.py`:**
```python
# app/database.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    """Initialize database with app context"""
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
        print("✅ Database initialized successfully!")
```

**Create `app/models/__init__.py`:**
```python
# app/models/__init__.py
from datetime import datetime
from app.database import db

class User(db.Model):
    """User model"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    preferences = db.relationship('UserPreference', backref='user', uselist=False, cascade='all, delete-orphan')
    matches = db.relationship('UserJobMatch', backref='user', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.email}>'


class UserPreference(db.Model):
    """User job search preferences"""
    __tablename__ = 'user_preferences'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Job search criteria
    job_titles = db.Column(db.JSON)  # ["Salesforce Admin", "Data Analyst"]
    locations = db.Column(db.JSON)   # ["Remote", "Jacksonville, FL"]
    salary_min = db.Column(db.Integer)
    salary_max = db.Column(db.Integer)
    
    # ND-specific preferences
    require_remote = db.Column(db.Boolean, default=False)
    require_flexible_schedule = db.Column(db.Boolean, default=False)
    avoid_high_pressure = db.Column(db.Boolean, default=True)
    
    # Email preferences
    email_frequency = db.Column(db.String(20), default='daily')
    email_time = db.Column(db.Time, default=datetime.strptime('08:00', '%H:%M').time())
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Job(db.Model):
    """Job listing"""
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Job details
    title = db.Column(db.String(500), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    salary_min = db.Column(db.Integer)
    salary_max = db.Column(db.Integer)
    description = db.Column(db.Text)
    url = db.Column(db.Text, unique=True, nullable=False)
    
    # Source info
    source = db.Column(db.String(50))  # 'indeed', 'linkedin'
    posted_date = db.Column(db.Date)
    
    # ND-specific flags
    is_remote = db.Column(db.Boolean, default=False)
    is_flexible = db.Column(db.Boolean, default=False)
    has_red_flags = db.Column(db.Boolean, default=False)
    has_green_flags = db.Column(db.Boolean, default=False)
    
    # Tracking
    first_seen = db.Column(db.DateTime, default=datetime.utcnow)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<Job {self.title} at {self.company}>'


class UserJobMatch(db.Model):
    """Match between user and job"""
    __tablename__ = 'user_job_matches'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    
    # Match details
    match_score = db.Column(db.Integer)  # 0-100
    matched_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # User actions
    status = db.Column(db.String(20), default='pending')  # pending, applied, saved, passed
    action_taken_at = db.Column(db.DateTime)
    
    # Company research (cached as JSON)
    company_research = db.Column(db.JSON)
    research_date = db.Column(db.DateTime)
    
    __table_args__ = (db.UniqueConstraint('user_id', 'job_id'),)


class MoodCheckin(db.Model):
    """Daily mood tracking"""
    __tablename__ = 'mood_checkins'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Mood data
    checkin_date = db.Column(db.Date, nullable=False)
    mood_score = db.Column(db.Integer)  # 1-5
    energy_level = db.Column(db.String(20))  # low, moderate, high
    note = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (db.UniqueConstraint('user_id', 'checkin_date'),)
```

---

## Step 5: Create Simple Indeed Scraper (10 minutes)

**Create `app/services/job_scraper.py`:**
```python
# app/services/job_scraper.py
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
import re

class IndeedScraper:
    """Simple Indeed job scraper"""
    
    def __init__(self, base_url="https://www.indeed.com"):
        self.base_url = base_url
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
    
    def search_jobs(self, query, location="Remote", max_results=10):
        """
        Search for jobs on Indeed
        
        Args:
            query (str): Job title or keywords
            location (str): Location or "Remote"
            max_results (int): Maximum number of jobs to return
        
        Returns:
            list: List of job dictionaries
        """
        jobs = []
        
        # Build search URL
        search_url = f"{self.base_url}/jobs"
        params = {
            'q': query,
            'l': location,
            'sort': 'date'  # Sort by most recent
        }
        
        try:
            # Make request
            response = requests.get(search_url, params=params, headers=self.headers)
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find job cards
            # Note: Indeed's HTML structure may change; this is a simple example
            job_cards = soup.find_all('div', class_='job_seen_beacon')
            
            for card in job_cards[:max_results]:
                try:
                    job = self._parse_job_card(card)
                    if job:
                        jobs.append(job)
                        print(f"✅ Found: {job['title']} at {job['company']}")
                except Exception as e:
                    print(f"⚠️ Error parsing job card: {e}")
                    continue
            
            print(f"\n📊 Total jobs found: {len(jobs)}")
            
        except Exception as e:
            print(f"❌ Error scraping Indeed: {e}")
        
        return jobs
    
    def _parse_job_card(self, card):
        """Parse individual job card"""
        job = {}
        
        # Title
        title_elem = card.find('h2', class_='jobTitle')
        if title_elem:
            job['title'] = title_elem.get_text(strip=True)
        else:
            return None
        
        # Company
        company_elem = card.find('span', {'data-testid': 'company-name'})
        if company_elem:
            job['company'] = company_elem.get_text(strip=True)
        
        # Location
        location_elem = card.find('div', {'data-testid': 'text-location'})
        if location_elem:
            job['location'] = location_elem.get_text(strip=True)
        
        # Salary (if available)
        salary_elem = card.find('div', class_='metadata salary-snippet-container')
        if salary_elem:
            salary_text = salary_elem.get_text(strip=True)
            job['salary_text'] = salary_text
            job['salary_min'], job['salary_max'] = self._parse_salary(salary_text)
        
        # Job URL
        link_elem = title_elem.find('a')
        if link_elem and link_elem.get('href'):
            job_url = link_elem['href']
            if not job_url.startswith('http'):
                job_url = f"{self.base_url}{job_url}"
            job['url'] = job_url
        
        # Description snippet
        desc_elem = card.find('div', class_='job-snippet')
        if desc_elem:
            job['description'] = desc_elem.get_text(strip=True)
        
        # Source
        job['source'] = 'indeed'
        job['posted_date'] = datetime.now().date()
        job['first_seen'] = datetime.now()
        
        # Check for ND-relevant keywords
        text_to_check = f"{job.get('title', '')} {job.get('description', '')}".lower()
        job['is_remote'] = 'remote' in text_to_check
        job['is_flexible'] = any(word in text_to_check for word in ['flexible', 'flexibility'])
        job['has_red_flags'] = any(word in text_to_check for word in ['fast-paced', 'high-pressure', 'deadline-driven'])
        job['has_green_flags'] = any(word in text_to_check for word in ['accommodat', 'neurodiver', 'inclusi'])
        
        return job
    
    def _parse_salary(self, salary_text):
        """Extract min/max salary from text like '$80K - $100K'"""
        # Simple regex to extract numbers
        numbers = re.findall(r'[\d,]+', salary_text.replace('K', '000').replace('k', '000'))
        
        if len(numbers) >= 2:
            try:
                salary_min = int(numbers[0].replace(',', ''))
                salary_max = int(numbers[1].replace(',', ''))
                return salary_min, salary_max
            except:
                pass
        
        return None, None


# Test function
def test_scraper():
    """Test the scraper"""
    scraper = IndeedScraper()
    
    print("🔍 Testing Indeed scraper...")
    print("=" * 50)
    
    jobs = scraper.search_jobs(
        query="Salesforce Administrator",
        location="Remote",
        max_results=5
    )
    
    print(f"\n✅ Successfully scraped {len(jobs)} jobs\n")
    
    # Print first job
    if jobs:
        print("Example job:")
        print(f"Title: {jobs[0].get('title')}")
        print(f"Company: {jobs[0].get('company')}")
        print(f"Location: {jobs[0].get('location')}")
        print(f"URL: {jobs[0].get('url')}")
        print(f"Remote: {jobs[0].get('is_remote')}")
        print(f"Red Flags: {jobs[0].get('has_red_flags')}")


if __name__ == '__main__':
    test_scraper()
```

---

## Step 6: Initialize Flask App (3 minutes)

**Create `app/__init__.py`:**
```python
# app/__init__.py
from flask import Flask
from app.config import Config
from app.database import db, init_db

def create_app(config_class=Config):
    """Application factory"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize database
    init_db(app)
    
    return app
```

**Create `run.py`:**
```python
# run.py
from app import create_app
from app.database import db
from app.models import User, UserPreference, Job, UserJobMatch, MoodCheckin

app = create_app()

@app.route('/')
def index():
    return """
    <h1>ND Job Search MVP</h1>
    <p>Database initialized successfully!</p>
    <p>Next steps:</p>
    <ul>
        <li>Run job scraper: <code>python app/services/job_scraper.py</code></li>
        <li>View this page to confirm app is running</li>
    </ul>
    """

@app.cli.command()
def test_scraper():
    """Test the job scraper"""
    from app.services.job_scraper import IndeedScraper
    
    scraper = IndeedScraper()
    jobs = scraper.search_jobs("Salesforce Administrator", "Remote", 5)
    
    print(f"\n✅ Found {len(jobs)} jobs")
    
    # Save to database
    from app.models import Job as JobModel
    
    for job_data in jobs:
        # Check if job already exists (by URL)
        existing = JobModel.query.filter_by(url=job_data['url']).first()
        
        if not existing:
            job = JobModel(
                title=job_data.get('title'),
                company=job_data.get('company'),
                location=job_data.get('location'),
                description=job_data.get('description'),
                url=job_data.get('url'),
                source=job_data.get('source'),
                salary_min=job_data.get('salary_min'),
                salary_max=job_data.get('salary_max'),
                is_remote=job_data.get('is_remote'),
                is_flexible=job_data.get('is_flexible'),
                has_red_flags=job_data.get('has_red_flags'),
                has_green_flags=job_data.get('has_green_flags')
            )
            db.session.add(job)
    
    db.session.commit()
    print(f"✅ Saved {len(jobs)} jobs to database")


if __name__ == '__main__':
    app.run(debug=True)
```

---

## Step 7: Run It! (2 minutes)

**Initialize database:**
```bash
flask run
# This will create the database and run the app
# Open http://localhost:5000 in your browser
# You should see "Database initialized successfully!"
```

**Test the scraper:**
```bash
# Stop the flask app (Ctrl+C)

# Run scraper test
flask test-scraper

# You should see jobs being scraped and saved to database!
```

---

## Verify It Works

**Check the database:**
```bash
# Install SQLite browser (optional)
# Or use Python:

python3 << 'EOF'
from app import create_app
from app.models import Job

app = create_app()
with app.app_context():
    jobs = Job.query.all()
    print(f"📊 Total jobs in database: {len(jobs)}")
    
    if jobs:
        print(f"\nFirst job:")
        print(f"  Title: {jobs[0].title}")
        print(f"  Company: {jobs[0].company}")
        print(f"  Remote: {jobs[0].is_remote}")
        print(f"  URL: {jobs[0].url}")
EOF
```

---

## 🎉 Success!

If you see jobs in your database, you've successfully:
- ✅ Set up Python environment
- ✅ Created Flask app
- ✅ Initialized database
- ✅ Built working job scraper
- ✅ Saved jobs to database

**You now have the foundation of your MVP!**

---

## Next Steps

**This Week:**
1. [ ] Improve scraper (handle pagination, more robust parsing)
2. [ ] Add LinkedIn scraper
3. [ ] Build basic email template
4. [ ] Test sending email with SendGrid

**Next 2 Weeks:**
1. [ ] Create user registration
2. [ ] Build preference form
3. [ ] Implement match scoring
4. [ ] Schedule nightly job runs

**Month 1:**
1. [ ] Working morning email reports
2. [ ] You receiving daily job matches
3. [ ] Basic click tracking

---

## Troubleshooting

**Problem: "ModuleNotFoundError"**
- Solution: Make sure virtualenv is activated and requirements installed

**Problem: "Indeed HTML structure different"**
- Solution: Web scraping is fragile. Use browser dev tools to inspect current HTML structure

**Problem: "Database errors"**
- Solution: Delete `data/nd_job_search.db` and restart Flask app

**Problem: "No jobs found"**
- Solution: Indeed may be blocking. Try different user agent or add delays between requests

---

## Resources

**Need Help?**
- Flask docs: https://flask.palletsprojects.com/
- BeautifulSoup tutorial: https://realpython.com/beautiful-soup-web-scraper-python/
- SQLAlchemy docs: https://flask-sqlalchemy.palletsprojects.com/

**Questions?**
Ask Claude! Use the prompt:
```
I'm building the ND Job Search MVP. I'm stuck on [PROBLEM]. Here's my code: [CODE]. What should I do?
```

---

**You're officially building your app! 🚀**

Keep the momentum going. Ship something small every week. Your future users (and future you) will thank you!
