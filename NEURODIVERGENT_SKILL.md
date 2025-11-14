# Neurodivergent Job Search Skill

## Overview

This skill extends the **Job Search Skill** with neurodivergent-specific features designed to support individuals with executive function challenges (ADHD, autism, bipolar disorder, TBI, and other neurodivergent conditions) during the job search process.

**Core Philosophy:** "You're not lazy. You just need tools built for how your brain works."

**Foundation:** This skill REQUIRES and builds upon the Job Search Skill. Always read both skills together.

---

## CRITICAL: Read Job Search Skill First

Before using this Neurodivergent Job Search Skill, Claude must read:
- `/mnt/skills/public/job-search/SKILL.md` (or equivalent location)

This skill adds neurodivergent-specific layers on top of the core job search functionality.

---

## Target Users

This skill is designed for job seekers who experience:
- **Executive function challenges:** Task initiation, decision-making, working memory, time management, emotional regulation, energy management
- **Neurodivergent conditions:** ADHD, autism, bipolar disorder, dyslexia, TBI, PTSD, depression, anxiety disorders
- **Mental health challenges:** Imposter syndrome, job search anxiety, mood cycling, burnout
- **Overwhelm from traditional job search:** Too many sites, too many steps, decision paralysis, information overload

---

## Core Differentiators

### What Makes This Different from Standard Job Search Assistance

**Standard job search tools focus on:**
- Application speed and volume
- Resume optimization for ATS
- Generic productivity tips

**This neurodivergent-focused approach addresses:**
- **Cognitive overwhelm** from too many choices and steps
- **Executive function barriers** that make starting/continuing hard
- **Emotional regulation** during a stressful process
- **Energy management** with fluctuating capacity
- **Sensory and environmental** considerations
- **Mental health integration** (mood tracking, anxiety management)
- **Authentic self-presentation** vs. masking

---

## Phase 1: MVP Features (Months 1-12)

### 1. Unified Job Aggregation (Addresses: Decision Fatigue, Task Switching)

**Problem Solved:**
Searching multiple job sites daily is overwhelming for neurodivergent brains. Site-hopping requires constant context switching, each site has different interfaces, and the sheer volume creates decision paralysis.

**Neurodivergent-Specific Implementation:**

**Overnight Automation:**
- Runs while user sleeps (no active effort required)
- Aggregates from: LinkedIn, Indeed, Glassdoor, company career pages
- Unified database eliminates duplicate tracking
- **Key ND Benefit:** User wakes up to curated results instead of facing blank search boxes

**Intelligent Filtering (Reduces Decision Points):**
- Match scoring (0-100%) based on user profile
- Auto-categorization: "Perfect Match" (90-100%), "Good Match" (70-89%), "Worth Considering" (50-69%)
- Red flags highlighted: High turnover, poor reviews, unrealistic requirements
- Green flags highlighted: Neurodiversity programs, flexible schedules, remote work
- **Key ND Benefit:** Decisions are pre-filtered; user chooses from curated list vs. infinite options

**Neurodivergent-Specific Filtering Criteria:**
- Remote/hybrid options (for sensory management, social battery)
- Flexible schedule availability (for energy fluctuations, medical appointments)
- Company size preferences (small startup vs. large enterprise culture)
- Sensory environment indicators (open office vs. quiet spaces)
- Accommodation-friendly employers (ADA compliance history, ND hiring programs)
- Clear job descriptions (vs. vague "rockstar ninja" postings)
- Realistic requirements (filters out "entry level, 10 years experience")

**Configuration Options (Set Once, Run Forever):**
- Simplified setup wizard (5-10 questions max)
- Visual preference sliders (salary range, commute distance)
- Tag-based interests (instead of complex keyword strings)
- "Show me less like this" learning (negative feedback loop)
- **Key ND Benefit:** Minimal ongoing cognitive load; system learns preferences

### 2. Personalized Morning Reports (Addresses: Information Overload, Task Initiation)

**Problem Solved:**
Waking up and facing an empty job search is paralyzing. Where to start? Which site first? Neurodivergent brains often struggle with initiation and need clear, actionable starting points.

**Neurodivergent-Specific Implementation:**

**Email Delivery Format:**
- Arrives at user-specified time (considers morning routine, energy patterns)
- Clean, scannable layout (no visual clutter)
- Summary at top: "5 new matches found today"
- Top 3 highlighted first (decision fatigue reduction)
- **Key ND Benefit:** Concrete starting point delivered automatically

**Customizable Information Density:**
- **Minimal Mode:** Job title, company, match %, one-click link
- **Standard Mode:** + Salary, location, key requirements summary
- **Detailed Mode:** + Company research snippet, why it matched, application deadline
- **Key ND Benefit:** User controls overwhelm level; can adjust based on energy/capacity that day

**Frequency Options (Energy Management):**
- Daily (for high-energy periods)
- 3x/week (M/W/F - for balanced pace)
- Weekly digest (for low-energy periods or interview-heavy weeks)
- Pause anytime (no guilt, no pressure)
- **Key ND Benefit:** Adapts to user's current capacity, not external "should" pressure

**Action-Oriented Design:**
- Clear next steps: "Apply Now", "Save for Later", "Not Interested"
- One-click decisions (no multi-step processes)
- Progress tracking: "You've reviewed 23/30 matches this week"
- **Key ND Benefit:** Reduces decision-making burden; makes progress visible

**Tone and Messaging:**
- Encouraging but realistic (no toxic positivity)
- Acknowledges hard days: "Only 2 matches today, but quality over quantity!"
- Celebrates small wins: "You applied to 3 jobs this week - that's progress!"
- No shame for pausing: "Taking a break is self-care, not failure"
- **Key ND Benefit:** Emotionally supportive without being patronizing

### 3. Emotion Tracking (Addresses: Mood Cycling, Pattern Recognition, Self-Awareness)

**Problem Solved:**
For neurodivergent individuals (especially with bipolar, ADHD, depression, anxiety), emotions significantly impact job search capacity. Without tracking, patterns go unnoticed, and users can't plan around their energy cycles.

**Neurodivergent-Specific Implementation:**

**Daily Mood Check-In (Simple):**
- Delivered with morning report OR as separate evening prompt
- 1-5 scale: 😞 😐 🙂 😊 😄 (or numerical 1-5)
- Optional brief note: "What's affecting your mood today?"
- Takes <30 seconds to complete
- **Key ND Benefit:** Low-friction data collection; builds self-awareness over time

**Bipolar/ADHD-Specific Tracking:**
- **Energy Level:** Low, Moderate, High, Hypomanic/Manic
- **Focus Quality:** Can't concentrate, Scattered, Normal, Hyperfocus
- **Anxiety Level:** Calm, Mild, Moderate, High, Panic
- **Motivation:** None, Low, Moderate, High, Driven
- **Key ND Benefit:** Captures nuances of mood cycling and executive function fluctuations

**Pattern Recognition (Automated Insights):**
- Weekly summary: "You had 3 high-energy days this week (T/W/F)"
- Monthly trends: "Your mood tends to dip on Mondays"
- Correlation analysis: "You applied to more jobs on high-energy days"
- Warning signs: "You've reported low mood for 5 consecutive days - check in with support system?"
- **Key ND Benefit:** Makes invisible patterns visible; enables data-driven self-management

**Integration with Job Search Activity:**
- Tracks: Applications sent, interviews scheduled, rejections received
- Correlates with mood: "Rejections tend to lower your mood for 2-3 days"
- Identifies optimal windows: "You're most productive applying on Tuesday afternoons"
- Pacing recommendations: "You applied to 10 jobs during last manic episode, then crashed - try spacing out applications"
- **Key ND Benefit:** Helps user understand their own rhythms and work WITH their brain, not against it

**Privacy and Safety:**
- All data stored locally (not shared, not sold)
- Export option for therapist review (user choice)
- Clear crisis resources if mood drops critically
- Prominent disclaimer: "This is self-awareness tool, not therapy"
- **Key ND Benefit:** Safe space to track without judgment or external pressure

**Visualization Options:**
- Weekly mood graph (see ups/downs at a glance)
- Monthly calendar view (color-coded by mood)
- Correlation charts (mood vs. applications vs. interviews)
- Progress over time (trend lines)
- **Key ND Benefit:** Visual learners can see patterns more easily than text summaries

### 4. Resume Tailoring Using Intelligent Company Research (Addresses: Decision-Making, Task Overwhelm)

**Problem Solved:**
Generic resumes get ignored, but tailoring each resume manually is exhausting and time-consuming. Neurodivergent job seekers need automated intelligence that does the research and heavy lifting.

**Neurodivergent-Specific Implementation:**

**Leverages Existing Resume Review Prompt (From Job Search Skill):**
- User selects job from morning report
- System automatically runs company research
- Builds adaptive recruiter persona
- Analyzes user's fit for THIS specific company
- Offers to create tailored resume

**Enhanced ND-Specific Company Research:**

Beyond standard research (company size, funding, tech stack), add:

**Neurodivergent-Friendly Culture Indicators:**
- Explicit neurodiversity hiring programs mentioned on website
- Employee reviews mentioning "flexible," "accommodating," "understanding"
- Remote work policies (% remote, hybrid options, full remote)
- Flexible scheduling explicitly stated
- Sensory workplace considerations (office layout mentioned)
- ADA compliance history (lawsuits, settlements, accommodations track record)
- **Output:** "🟢 ND-Friendly Indicators: Remote-first culture, flexible hours, neurodiversity ERG exists"

**Red Flags for Neurodivergent Candidates:**
- "Fast-paced, high-pressure environment" (anxiety triggers)
- "Open office, collaborative workspace" (sensory overload for some)
- "Must thrive in ambiguity" (difficult for some autistic individuals)
- "Weekend and evening availability required" (energy management challenges)
- Glassdoor reviews: "Rigid," "Micromanaging," "No work-life balance"
- **Output:** "⚠️ Potential Challenges: High-pressure culture, open office environment, rigid schedule"

**Disclosure Strategy Recommendations:**
Based on company culture research, suggest:
- **Disclosure-Friendly:** "This company has strong neurodiversity programs; consider disclosing in cover letter to highlight unique strengths"
- **Neutral:** "No clear indicators either way; disclosure is personal choice"
- **Caution Advised:** "Culture seems traditional and rigid; may be safer to wait until post-offer to discuss accommodations"
- **Key ND Benefit:** Informed decision-making about disclosure; reduces anxiety about "should I tell them?"

**Tailored Resume Creation (Automated):**

When user selects "Tailor this resume," system:
1. **Analyzes job requirements** through ND lens (flags unrealistic expectations)
2. **Researches company** (ND-friendly indicators, culture, tech stack)
3. **Builds recruiter persona** adapted to THIS company
4. **Reviews user's resume** as that specific recruiter
5. **Generates tailored version** that:
   - Highlights relevant experience for THIS role
   - Uses company's language and keywords (ATS optimization)
   - Addresses potential concerns proactively
   - Positions neurodivergent traits as strengths when appropriate
   - De-emphasizes gaps or weaknesses intelligently

**User Review and Approval:**
- Shows side-by-side: original vs. tailored
- Highlights changes made (transparency)
- Explains WHY each change matters
- User can accept, reject, or edit
- **Key ND Benefit:** User maintains control; system does heavy lifting

**Reduces Task Initiation Barrier:**
- Instead of "I should tailor this resume" (overwhelming)
- User clicks one button: "Tailor for me"
- System does it in 30-60 seconds
- User reviews and approves
- **Key ND Benefit:** Removes the hardest part (starting); makes tailoring EASY

### 5. Executive Function Support (Addresses: ALL Executive Function Challenges)

**Problem Solved:**
Even with great tools, neurodivergent individuals struggle with: initiating tasks, making decisions, managing time, switching between tasks, remembering what's next, regulating emotions, and managing energy. The job search requires ALL of these functions simultaneously.

**Neurodivergent-Specific Implementation:**

**Note:** While this wasn't marked as "must-have" for MVP, the user indicated ALL executive function challenges are relevant. These features can be simple in MVP and expanded later.

#### A. Task Initiation Support

**The Problem:**
"I know I should apply to jobs, but I can't make myself start."

**The Solution:**
- **Morning report IS the starting point** (removes "where do I begin?" paralysis)
- **One-click actions** from email (no multi-step processes)
- **Tiny first step prompts:** "Just review the top match - no need to apply today"
- **Momentum building:** "You reviewed 3 jobs yesterday - keep the streak going?"
- **External accountability:** Option to share progress with accountability partner
- **Key ND Benefit:** Starting is the hardest part; system makes it as easy as clicking one link

#### B. Decision-Making Support

**The Problem:**
"Should I apply to this? Is this a good fit? What if I'm not qualified enough? What if it's the wrong choice?"

**The Solution:**
- **Pre-filtered decisions:** Match scores remove 80% of decision points
- **Clear criteria:** "Good match because: 3/3 required skills, salary in range, remote option"
- **Binary choices:** "Apply Now" or "Save for Later" (not infinite options)
- **Decision fatigue tracking:** "You've reviewed 15 jobs today - take a break?"
- **Comparison elimination:** No side-by-side job comparisons (choose one at a time)
- **Key ND Benefit:** Reduces decision burden from hundreds to <10 meaningful choices

#### C. Working Memory Support

**The Problem:**
"Did I already apply here? When did I send that application? Who was the recruiter? What did the job description say?"

**The Solution:**
- **Automatic tracking:** System records everything without user effort
- **Visual status indicators:** Color-coded statuses (Applied=blue, Interview=green, Rejected=gray)
- **Search functionality:** "Show me all Salesforce Admin roles I applied to"
- **Reminders delivered:** "You have an interview tomorrow at 2pm with XYZ Corp"
- **Context restored:** When user clicks job, shows full history (applied date, tailored resume, notes)
- **Key ND Benefit:** External memory system; user doesn't have to remember anything

#### D. Time Management Support

**The Problem:**
"I meant to spend 1 hour job searching, and 5 hours disappeared into a black hole."

**The Solution:**
- **Batched delivery:** Jobs arrive once daily (or 3x/week), not constantly
- **Session boundaries:** "You've been searching for 45 minutes - time for a break?"
- **Hyperfocus awareness:** "You've reviewed 25 jobs in a row - that's a lot! Save some energy."
- **Calendar integration:** Blocks time for job search (treats it like an appointment)
- **Time estimates:** "This application will take ~15 minutes" (sets expectations)
- **Key ND Benefit:** Prevents hyperfocus burnout and time-blindness spirals

#### E. Emotional Regulation Support

**The Problem:**
"I got rejected again and now I feel worthless and want to quit everything."

**The Solution:**
- **Rejection reframing:** "This company said no to your application, not to YOU as a person"
- **Evidence-based reality checks:** "You have 5 years experience and 50+ successful projects - facts"
- **Perspective prompts:** "You've been rejected 12 times and interviewed 3 times - that's a 20% interview rate, which is above average"
- **Emotion validation:** "Rejection hurts. That's normal and okay."
- **Coping strategy suggestions:** "Try: 5-4-3-2-1 grounding, walk in nature, call a friend"
- **Mood-based recommendations:** "Your mood is low today - maybe skip applying and just review matches?"
- **Key ND Benefit:** Validates feelings while providing concrete tools to regulate

#### F. Energy Management Support

**The Problem:**
"Some days I can apply to 10 jobs; other days I can barely read one job description. I can't predict or control this."

**The Solution:**
- **Energy level tracking:** Part of daily mood check-in
- **Adaptive recommendations:** High energy = apply to 5 jobs; low energy = just review 3
- **Pacing reminders:** "You applied to 8 jobs this week - that's great! Rest tomorrow?"
- **Burnout prevention:** "You've been searching hard for 3 weeks - consider a 2-day break"
- **Capacity-based goals:** "Today's goal: Review 3 matches" (not "Apply to 5 jobs")
- **No guilt messaging:** "Taking a break is strategic, not lazy"
- **Key ND Benefit:** Works WITH energy fluctuations instead of fighting them

**MVP Implementation (Simple Version):**
For Phase 1, these can be implemented as:
- Simple prompts/reminders in the morning email
- Basic tracking in the background (decision count, time spent)
- Encouraging messages based on patterns
- Full automation in Phase 2

---

## Phase 2: Advanced Features (Months 12-24+)

### 1. Full Application Tracking System

**Beyond basic tracking, add:**
- Visual kanban board (Applied → Phone Screen → Interview → Offer)
- Follow-up automation (reminds user to follow up 1 week after applying)
- Interview preparation triggers (3 days before interview: "Time to prep!")
- Rejection pattern analysis (identifies weak spots in approach)
- Success pattern analysis (what types of jobs lead to interviews?)

### 2. Company Culture Deep Research

**Automated research on:**
- Neurodiversity hiring programs (explicit or implicit)
- Accommodation request success stories (employee reviews)
- Sensory environment details (office photos, 360° tours)
- Flexibility policies (work-from-home days, flex hours)
- Pace and pressure (reviews mentioning "fast-paced," "deadline-driven")
- Management style (micromanagement vs. autonomy)

### 3. Interview Preparation (ND-Focused)

**Helps with:**
- STAR story preparation (examples from resume)
- Anticipated questions based on company research
- Sensory planning (what to wear, what to bring, office environment)
- Disclosure strategy (if/when/how to disclose neurodivergence)
- Accommodation requests (how to ask for what you need)
- Post-interview debrief (what went well, what to improve)

### 4. Gentle Reminder System

**Configurable reminders:**
- Application deadlines approaching
- Follow-up emails to send
- Interview preparation milestones
- Self-care check-ins
- Respects user's capacity (can snooze or disable)
- Tone: Supportive, not nagging

### 5. Community & Peer Support Integration

**Optional features:**
- Anonymous neurodivergent job seeker community
- Success stories and strategies
- Accountability partners (opt-in)
- Mentor matching (employed ND professionals help job seekers)
- Celebration of wins (share anonymously)

### 6. Clinical Mental Health Integration (WITH Oversight)

**Only with licensed clinical partnerships:**
- Crisis intervention routing (not handling)
- Teletherapy scheduling integration
- Therapist data export (for those in therapy)
- CBT-based modules (with clinical review)
- Anxiety management protocols (evidence-based)

**Critical Requirements:**
- Licensed clinical oversight
- HIPAA compliance (if handling health data)
- Professional liability insurance
- Clear boundaries (supportive, not therapeutic)
- Crisis resources prominently displayed

---

## Using This Skill with Claude

### Workflow for Neurodivergent Job Seekers

**Step 1: Initial Setup (One-Time)**

User provides:
- Job search criteria (titles, locations, salary range, ND-specific preferences)
- Resume and background
- Executive function challenges (which ones affect them most)
- Mental health considerations (bipolar, ADHD, anxiety, etc.)
- Communication preferences (email frequency, tone, information density)
- Energy patterns (when are they typically high/low energy?)

**Step 2: Daily/Regular Interaction**

**Morning (Automated):**
- User receives morning report email
- Mood check-in prompt (optional, <30 seconds)
- Top matches highlighted with context

**User Actions (When Capacity Allows):**
- Reviews matches (clicks "Apply," "Save," or "Pass")
- For "Apply" selections: System offers to tailor resume
- User reviews tailored resume, approves or edits
- User applies (or system applies if fully automated in Phase 2)

**Evening (Optional):**
- Reflection prompt: "How did today's job search feel?"
- Progress summary: "You reviewed 5 matches and applied to 2 - great work!"
- Tomorrow's plan: "3 new matches expected tomorrow"

**Step 3: Ongoing Optimization**

System learns:
- Which jobs user tends to apply to vs. pass on
- Optimal times for job search (energy patterns)
- Tone and messaging that resonates
- Red flags that matter most to this user
- Success patterns (which applications lead to interviews)

**Step 4: Pattern Insights (Weekly/Monthly)**

User receives:
- Weekly summary: Applications sent, interviews scheduled, mood patterns
- Monthly insights: Trends, suggestions, celebrating progress
- Adjustment recommendations: "You seem to prefer remote roles - want to filter out all in-office positions?"

### Prompt Templates for Neurodivergent Users

**Setup Prompt:**
```
I'm a neurodivergent job seeker with [ADHD/autism/bipolar/etc.] looking for work in [FIELD]. 

I struggle with: [task initiation/decision-making/working memory/time management/emotional regulation/energy management].

Please use the Neurodivergent Job Search Skill to:
1. Help me set up my job search automation
2. Configure morning reports that won't overwhelm me
3. Set up mood tracking to help me understand my patterns
4. Plan how to use your resume tailoring system

My preferences:
- Energy: [morning/afternoon/evening] person
- Information density: [minimal/standard/detailed]
- Report frequency: [daily/3x week/weekly]
- Current mood/energy: [describe]

[Attach resume if available]
```

**Daily Check-In Prompt:**
```
Good morning! Here's my mood check-in for [DATE]:

Mood: [1-5 or emoji]
Energy: [low/moderate/high]
Focus: [scattered/normal/hyperfocus]
Anxiety: [calm/mild/moderate/high]

Anything affecting me today: [optional note]

Show me today's job matches and let's decide which to pursue.
```

**Resume Tailoring Request:**
```
I'm interested in applying to [JOB TITLE] at [COMPANY].

Using the Neurodivergent Job Search Skill + Job Search Skill:
1. Research this company (including ND-friendly indicators)
2. Analyze if this is a good fit for me
3. Check for red flags or green flags
4. Suggest disclosure strategy (should I mention my ADHD/autism/etc.?)
5. Tailor my resume for this specific role

[Paste job posting or provide URL]
```

**Energy Management Prompt:**
```
I'm feeling [overwhelmed/burned out/low energy/hypomanic] today.

Based on my patterns and current state:
1. Should I be job searching today or taking a break?
2. If searching, what's a realistic goal for today?
3. What self-care should I prioritize?
4. Remind me of my progress so far (I'm losing perspective)
```

**Pattern Analysis Prompt:**
```
It's been [week/month] since I started job searching with your help.

Using my emotion tracking and application data:
1. What patterns do you see in my mood and job search activity?
2. When am I most productive?
3. What triggers my anxiety or low moods?
4. How can I optimize my job search based on these insights?
5. What progress have I made? (I need a reality check)
```

---

## Integration with Job Search Skill

### How the Two Skills Work Together

**Job Search Skill provides:**
- Core resume review methodology
- Company research framework
- Interview preparation strategies
- Cover letter guidance
- Salary negotiation tactics
- Application tracking fundamentals

**Neurodivergent Job Search Skill adds:**
- Executive function support wrappers
- Emotion tracking and mental health integration
- Energy-aware pacing and recommendations
- ND-specific filtering and research criteria
- Overwhelm reduction strategies
- Automation to reduce cognitive load
- Disclosure strategy guidance
- Sensory and environmental considerations

**Together they create:**
A comprehensive job search system designed specifically for neurodivergent brains that combines best-practice job search strategies with executive function support and mental health awareness.

---

## Critical Safety & Ethical Guidelines

### Mental Health Boundaries

**This Skill WILL:**
- Provide emotional support and validation
- Offer evidence-based coping strategies
- Track mood patterns for self-awareness
- Suggest when to seek professional help
- Provide crisis resources prominently
- Maintain appropriate boundaries

**This Skill will NOT:**
- Diagnose mental health conditions
- Prescribe or recommend medications
- Provide trauma therapy or crisis counseling
- Make promises about "curing" anything
- Encourage dependency on the tool
- Replace professional mental health support

**Crisis Resources Always Displayed:**
- 988 Suicide & Crisis Lifeline (US)
- Crisis Text Line: Text HOME to 741741
- SAMHSA National Helpline: 1-800-662-4357
- Encourage user to contact therapist, doctor, or trusted person

### Privacy and Data

**All emotion tracking and personal data:**
- Stored locally only (user's device/account)
- Encrypted if technically possible
- NEVER sent to external servers without explicit consent
- User can delete all data anytime
- Export option for sharing with therapist (user choice only)

### Accommodation and Disclosure

**Guidance on disclosure:**
- Always frames as personal choice, not obligation
- Provides pros/cons based on company research
- Never pressures to disclose or not disclose
- Acknowledges legal protections (ADA in US)
- Suggests timing options (pre-interview, post-offer, after probation)
- Respects that user knows their situation best

### Avoiding Ableism

**Language and tone:**
- Never implies neurodivergence is "deficiency" or "disorder" to be "overcome"
- Frames challenges as executive function differences, not personal failures
- Celebrates neurodivergent strengths (pattern recognition, hyperfocus, creative thinking, attention to detail)
- Avoids inspiration porn or toxic positivity
- Respects that some users view neurodivergence as disability, others as difference
- User's terminology preferences are always respected

---

## Success Metrics

### For Individual Users

**Quantitative:**
- Applications submitted per week (sustainable pace, not burnout-inducing)
- Interview rate (% of applications leading to interviews)
- Time from application to interview (measure of targeting)
- Offer rate (% of interviews leading to offers)
- Time to job acceptance

**Qualitative:**
- Reduced overwhelm and anxiety (self-reported)
- Increased self-awareness (pattern recognition)
- Better work-life balance during job search
- Maintained mental health throughout process
- Found job that's good fit (not just any job)
- Improved executive function management skills

### For the Platform/Tool

**Adoption:**
- Active users (daily/weekly engagement)
- Retention rate (users still active after 1/3/6 months)
- Completion rate (users who successfully find jobs)
- Time to first application (how quickly users start applying)

**Quality:**
- User satisfaction (NPS score, qualitative feedback)
- Mental health impact (tracked mood improvements)
- Pattern insights accuracy (do predictions match reality?)
- Resume tailoring effectiveness (interview rate for tailored vs. generic)

**Community Impact:**
- Success stories shared
- Peer support engagement
- Reduced stigma around neurodivergent job seeking
- Employer education and advocacy

---

## Future Enhancements (Phase 3+)

### Advanced Automation
- Natural language preference updates ("show me fewer startups")
- Intelligent application timing (sends applications at optimal times)
- Follow-up automation (personalized, not template-based)
- Interview scheduling negotiation (handles back-and-forth)

### AI-Powered Insights
- Predictive modeling (which jobs most likely to result in interview?)
- Weakness identification (why aren't you getting interviews?)
- Strength highlighting (what's working in your approach?)
- Market analysis (is your salary expectation realistic for your experience?)

### Expanded Mental Health
- Integration with therapy scheduling platforms
- Evidence-based CBT modules (with clinical oversight)
- Peer support matching (employed ND mentors)
- Group coaching and community calls

### Employer Education
- Resources for hiring managers on neurodivergent hiring
- Model job descriptions (clear, realistic, ND-friendly)
- Accommodation request templates for both sides
- Success stories and case studies

### Accessibility Expansion
- Screen reader optimization
- Voice control integration
- Dyslexia-friendly typography options
- Customizable visual themes (dark mode, high contrast)
- Multi-language support
- Translation for non-native English speakers

---

## Technical Implementation Notes

### Platform Considerations

**Web App:**
- Responsive design (mobile, tablet, desktop)
- Progressive Web App (works offline)
- Accessible (WCAG 2.1 AA compliance)
- Fast loading (reduces waiting-induced anxiety)

**Email System:**
- Plain text + HTML versions (user choice)
- Customizable templates
- Reliable delivery (SPF/DKIM configured)
- Unsubscribe option (no guilt)

**CLI Tool (If Using Claude Code):**
- Slash commands for common actions
- Local data storage
- Integration with terminal workflow
- Git hooks for tracking applications

**Browser Extension:**
- One-click save jobs from any site
- Auto-fill applications
- Company research overlay
- Mood check-in reminders

**Mobile App:**
- Push notifications (configurable)
- Quick actions (apply, save, pass)
- Offline mode
- Accessibility features (text-to-speech, voice input)

### Data Architecture

**User Profile:**
- Resume/background
- Job preferences
- ND-specific needs
- Communication preferences
- Energy patterns

**Job Database:**
- Aggregated listings
- Company research results
- Match scores
- User actions (applied, saved, passed)

**Emotion Tracking:**
- Daily check-ins
- Pattern analysis
- Correlations with job search activity
- Visualizations

**Application Tracking:**
- Status pipeline
- Communications log
- Interview schedules
- Offer details

---

## Conclusion

This Neurodivergent Job Search Skill transforms job searching from an overwhelming, anxiety-inducing process into a manageable, supportive experience designed specifically for how neurodivergent brains work.

**Core Principles:**
1. **Reduce cognitive load** - Automate everything that can be automated
2. **Support executive function** - Provide structure and scaffolding
3. **Integrate mental health** - Acknowledge the emotional reality of job searching
4. **Respect neurodivergent differences** - Work WITH the brain, not against it
5. **Maintain authenticity** - Built by and for the neurodivergent community
6. **Prioritize wellbeing** - A sustainable job search is better than a fast one

**When working with Claude using this skill:**
1. Always read BOTH Job Search Skill and Neurodivergent Job Search Skill
2. Adapt recommendations to user's specific executive function challenges
3. Track patterns and provide data-driven insights
4. Maintain supportive, non-judgmental tone
5. Respect boundaries around mental health and privacy
6. Celebrate progress, no matter how small
7. Remember: The goal is finding the RIGHT job, not just ANY job

**Success looks like:**
- Neurodivergent job seekers feeling supported, not overwhelmed
- Sustainable job search practices that don't lead to burnout
- Better job matches through ND-specific filtering and research
- Improved self-awareness through pattern tracking
- A job that's actually a good fit, not just desperate acceptance
- **Helping thousands of people find work while maintaining mental health**

---

**"You're not lazy. You just need tools built for how your brain works."**

This skill provides those tools. 💙
