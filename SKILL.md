# Job Search Skill

## Overview

This skill provides comprehensive job search assistance including resume optimization, company research, application tracking, and interview preparation. It implements an intelligent, persona-based review system that adapts to specific companies and roles.

## Core Capabilities

1. **Resume Review & Optimization**
2. **Company-Specific Research & Analysis**
3. **Application Tracking & Management**
4. **Interview Preparation**
5. **Cover Letter & Communication Tailoring**

---

## 1. Resume Review & Optimization

### Basic Persona-Based Review

When conducting a general resume review (not company-specific), use this persona:

**Persona:**
```
You are acting as both a Senior Recruiter for a Top Tier International Recruitment Firm and a Senior-level career coach. You are looking for the best professional talent in [USER'S FIELD] in the job market today. It is your job to screen resumes for the best candidates who exhibit a well-rounded professional skill set and background you're looking for.
```

**Review Framework:**
1. **What immediately stands out as strong**
2. **What raises red flags that would make me pass**
3. **What's missing that should be added**
4. **Specific, direct feedback (not generic platitudes)**

**Use this approach when:**
- Building foundational resume strength
- Not targeting a specific company
- Doing initial optimization
- Getting universal best practices feedback

### Company-Specific Resume Review

When targeting a specific role at a specific company, use the enhanced research-driven approach:

**Step 1: Parse Job Posting**
- Read the attached or pasted job posting
- Identify: Company name, role title, key requirements, salary range (if listed)
- Extract: Required skills, nice-to-have skills, company culture indicators

**Step 2: Research the Company**

Search for and compile:
- **Agentforce/AI Implementation**: Are they using cutting-edge Salesforce AI tools?
- **Salesforce Environment**: What's their tech stack? (if publicly available)
- **Company Size & Stage**: Startup, scale-up, mid-market, enterprise?
- **Recent News**: Funding, growth, challenges, pivots, leadership changes
- **Hiring Patterns**: What types of candidates do they typically hire? (check LinkedIn for recent hires in similar roles)
- **Culture Indicators**: Glassdoor reviews, employee testimonials, company blog posts

**Step 3: Build Company-Specific Recruiter Persona**

Create a persona that reflects the SPECIFIC company's needs:

**Persona Elements (adapt based on company research):**

For **Startups/Scale-ups**:
```
You are a hiring manager at [COMPANY], a [STAGE] [INDUSTRY] company with [SIZE] employees. 

You are:
- Frustrated that most applicants don't have [SPECIFIC SKILL] experience
- Concerned about whether candidates can handle a fast-paced, ambiguous environment
- Looking for someone who can wear multiple hats and grow with the company
- Working within budget constraints of [SALARY RANGE]
- Seeking culture add, not just culture fit
```

For **Enterprise/Established Companies**:
```
You are a hiring manager at [COMPANY], a [SIZE]-person [INDUSTRY] company.

You are:
- Looking for someone who can navigate complex, matrixed organizations
- Concerned about whether candidates can handle enterprise-scale systems
- Seeking someone with proven process improvement experience
- Need someone who can manage stakeholders across multiple departments
- Budget: [SALARY RANGE] with room for negotiation based on experience
```

For **Companies Implementing New Tech**:
```
You are a hiring manager at [COMPANY], currently implementing [TECHNOLOGY/PLATFORM].

You are:
- Desperate for candidates with hands-on [SPECIFIC TECH] experience
- Concerned most applicants only have theoretical knowledge
- Looking for someone who can hit the ground running
- Need someone who can train others on the new system
- Willing to pay premium for proven expertise
```

**Note:** Use the word "might" when providing persona examples to give flexibility: "Examples of what the recruiter's persona **might** include:" This signals these are possible concerns to adapt based on actual findings, not rigid requirements.

**Step 4: Conduct Company-Specific Analysis**

Review the candidate's resume through the lens of THIS SPECIFIC COMPANY:

**Analysis Questions:**
1. **Would I interview this candidate?** (Yes/No with reasoning)
2. **What specifically excites me about them for THIS role at THIS company?**
3. **What concerns do I have about their background?**
4. **What would make me say yes vs. no?**
5. **How do they compare to the typical applicant pool for this role?**

**Step 5: Offer Tailored Resume Creation**

After analysis, offer to create a customized resume version:

**Phrasing:**
```
Based on what I found about [COMPANY], I can create a customized resume that:
- Highlights [SPECIFIC STRENGTHS] that matter most to this company
- Addresses [SPECIFIC CONCERNS] identified in the analysis
- Uses language and framing that resonates with [COMPANY TYPE]
- Positions your experience as a solution to their specific challenges

Would you like me to create this tailored version?
```

### Resume Optimization Best Practices

**Formatting:**
- Plain text works fine for analysis (rich text not required)
- Focus on content over formatting during review
- Format matters more for final delivery

**Content Hierarchy:**
- Lead with most relevant experience (even if out of chronological order for strategic positions)
- Quantify achievements (percentages, dollar amounts, time saved)
- Use action verbs and specific outcomes
- Industry-specific keywords for ATS optimization

**Red Flags to Address:**
- Employment gaps (explain only if >1 year or if strategic)
- Job hopping (reframe as diverse experience)
- Lack of specific tech mentioned in posting
- Missing cultural fit indicators

---

## 2. Company Research Methodology

### Research Priority Levels

**Level 1: Quick Assessment (5 minutes)**
- Company website "About" page
- LinkedIn company page (size, industry, recent posts)
- Latest news article or press release

**Level 2: Standard Research (10-15 minutes)**
- Level 1, plus:
- Glassdoor reviews (culture insights, interview experiences)
- Recent hiring patterns (LinkedIn)
- Product/service overview
- Key competitors

**Level 3: Deep Research (20-30 minutes)**
- Levels 1 & 2, plus:
- Recent earnings calls or investor updates (if public)
- Customer case studies
- Employee blog posts or testimonials
- Leadership team backgrounds
- Technology stack (if tech company)
- Industry challenges and trends

### Determining Research Depth

**Use Level 1 for:**
- Initial screening ("Is this worth applying to?")
- High-volume application strategies
- Roles that don't excite you

**Use Level 2 for:**
- Roles you're genuinely interested in
- Companies where you'd be happy working
- Standard application process

**Use Level 3 for:**
- Dream companies
- Perfect-fit roles
- Roles with referrals or connections
- Interview preparation
- Multiple rounds of interviews

### Red Flags During Research

**Company Red Flags:**
- Constant hiring for same role (high turnover)
- Consistently negative Glassdoor reviews on specific topics
- Unclear business model or value proposition
- Recent mass layoffs without explanation
- Leadership team with problematic histories

**Role Red Flags:**
- "Rockstar/Ninja/Guru" language (immature culture)
- Unrealistic requirements ("entry-level, 10 years experience")
- Vague job description
- Extremely wide salary range
- "Wear many hats" for specialized role

---

## 3. Application Tracking

### Tracking System Requirements

**Minimum Viable Tracker:**
- Company Name
- Role Title
- Application Date
- Status (Applied, Phone Screen, Interview, Offer, Rejected, Ghosted)
- Next Action
- Notes

**Enhanced Tracker:**
- Everything above, plus:
- Recruiter/Contact Name
- Salary Range
- Key Requirements Match (%)
- Company Research Summary
- Customization Level (Generic/Tailored/Custom)
- Interview Dates
- Thank You Sent (Y/N)
- Follow-up Dates

**Automation Opportunities:**
- Auto-populate from job posting URL
- Email notifications for follow-ups
- Status change alerts
- Weekly summary reports

### Application Strategy

**Volume vs. Quality Balance:**

**Volume Approach (50+ applications):**
- Use generic, optimized resume
- Level 1 research only
- Focus on speed
- Expect 5-10% response rate
- Good for: Market testing, building confidence, practice

**Quality Approach (5-20 applications):**
- Tailored resume for each
- Level 2-3 research
- Customized cover letters
- Expect 20-40% response rate
- Good for: Targeted career moves, specific companies

**Hybrid Approach (Recommended):**
- 70% quality applications to good-fit roles
- 30% volume applications to stretch roles
- Build both confidence and opportunities

---

## 4. Interview Preparation

### Pre-Interview Research

**Company-Specific Preparation:**
1. **Re-read all previous research**
2. **Review interviewer LinkedIn profiles**
   - Find common ground (schools, interests, connections)
   - Understand their background and perspective
   - Anticipate their priorities
3. **Study recent company news** (last 30 days)
4. **Identify 3-5 company challenges** you could help solve
5. **Prepare 5-7 questions** that show business understanding

### The STAR Method (Situation, Task, Action, Result)

**Template:**
```
Situation: [Context - where, when, what was happening]
Task: [Your responsibility or challenge]
Action: [Specific steps YOU took]
Result: [Quantifiable outcome, what changed]
```

**Example:**
```
Situation: At Macquarie Capital, our CRM data had inconsistencies affecting reporting
Task: I was tasked with improving data integrity while maintaining user adoption
Action: I implemented validation rules, created automated workflows, and trained 50+ users
Result: Achieved 99% data integrity within 3 months and reduced manual cleanup time by 40%
```

### Question Categories to Prepare

**Technical Questions:**
- Prepare 3-5 detailed examples of technical work
- Be ready to discuss methodologies and tools
- Know your resume inside-out (they'll ask about anything listed)

**Behavioral Questions:**
- Prepare STAR stories for: conflict, failure, success, leadership, teamwork
- Have examples that show growth and learning
- Be honest about challenges but focus on solutions

**Situational Questions:**
- "What would you do if..." scenarios
- Framework: Clarify → Analyze → Propose → Adapt
- Show thought process, not just answer

**Culture Fit Questions:**
- Research company values before interview
- Prepare authentic examples of alignment
- Don't fake cultural fit - assess if YOU fit THEM

### Post-Interview Follow-Up

**Thank You Email Template:**
```
Subject: Thank you - [Your Name] - [Position] Interview

Dear [Interviewer Name],

Thank you for taking the time to speak with me today about the [Position] role at [Company]. 

[SPECIFIC CALLBACK TO CONVERSATION - reference something unique you discussed]

Our conversation reinforced my interest in [COMPANY/ROLE] particularly [SPECIFIC ASPECT THAT EXCITED YOU].

[OPTIONAL: Brief reinforcement of how you'd solve specific challenge they mentioned]

I look forward to hearing about next steps. Please let me know if you need any additional information from me.

Best regards,
[Your Name]
```

**Timing:**
- Send within 24 hours of interview
- Personalize for each interviewer if panel interview
- Keep it concise (3-4 short paragraphs max)

---

## 5. Cover Letter & Communication

### When to Write Cover Letters

**Always write a cover letter when:**
- Application specifically requests one
- Applying to smaller companies (<200 employees)
- Career change or explaining unusual background
- Referred by someone at the company
- Addressing employment gaps or concerns proactively

**Cover letter optional when:**
- Large company with ATS screening only
- Role clearly states "cover letter optional"
- Quick-apply platforms (LinkedIn Easy Apply)
- You're applying to 50+ roles (prioritize applications over letters)

### Cover Letter Structure

**Paragraph 1: The Hook**
- Why this company specifically (not generic)
- Reference specific company initiative, challenge, or value
- Immediately establish you've done research

**Paragraph 2: The Proof**
- One specific achievement that maps to their needs
- Quantifiable result
- Shows you can solve their problems

**Paragraph 3: The Fit**
- Why you're excited about THIS role at THIS company
- What you'd bring beyond the resume
- Forward-looking (what you'd accomplish in first 90 days)

**Paragraph 4: The Close**
- Express enthusiasm
- Clear call to action
- Professional sign-off

**Length:** 250-400 words (fits on one page with proper formatting)

### Email Communication Best Practices

**Subject Lines:**
- Specific and professional
- Include position and your name
- Example: "Application: Senior Salesforce Administrator - Abby Luggery"

**Body Structure:**
- Clear, scannable paragraphs (2-3 sentences each)
- Professional but warm tone
- Proofread obsessively (typos = instant rejection for many)

**Attachments:**
- Name files professionally: "FirstName_LastName_Resume.pdf"
- Use PDF for resume (unless otherwise specified)
- Keep total attachment size under 5MB

---

## 6. Salary Negotiation

### Research Phase

**Before any conversation about salary:**
- Research market rate for role (Glassdoor, Levels.fyi, Salary.com)
- Know your minimum ("walk-away number")
- Know your target ("happy number")
- Know your stretch ("amazing number")

**Factors affecting salary:**
- Company size and stage
- Location (even for remote roles, some companies adjust)
- Your experience level vs. posted requirements
- Company's funding situation
- Your unique skills/experience

### Negotiation Tactics

**Rule #1: Never give a number first**
- Deflect: "I'd like to learn more about the role first"
- Redirect: "What's the budgeted range for this position?"
- If forced: Give range with 20% spread ("$100K-$120K based on full scope")

**Rule #2: Negotiate total compensation, not just salary**
- Base salary
- Bonus/commission structure
- Equity/stock options
- Benefits (healthcare, 401k match, PTO)
- Professional development budget
- Remote work flexibility
- Signing bonus

**Rule #3: Wait for the offer**
- Don't negotiate before you have written offer
- Take 24-48 hours to review (even if excited)
- Get everything in writing

### Negotiation Scripts

**When asked for salary expectations early:**
```
"I'm more focused on finding the right fit than a specific number. Could you share the budgeted range for this position? That would help me understand if we're in the same ballpark."
```

**When you have the offer but want more:**
```
"Thank you for the offer - I'm excited about the opportunity. Based on my research and the value I'd bring with [SPECIFIC SKILL/EXPERIENCE], I was hoping for something closer to [NUMBER]. Is there flexibility in the offer?"
```

**When offer is at bottom of your range:**
```
"I appreciate the offer. Given my [X YEARS EXPERIENCE] and [SPECIFIC ACHIEVEMENTS], I was hoping for [NUMBER]. Can we find a path to get there, either through base salary, signing bonus, or earlier performance review?"
```

---

## 7. Special Considerations

### Employment Gaps

**When to address:**
- Gap > 12 months
- Multiple gaps
- Recent gap (last 6 months)

**How to address:**
- Be honest but brief
- Focus on what you learned/did during gap
- Pivot quickly to what you can do for them now
- Consider functional resume format if gaps are significant

**What NOT to do:**
- Over-explain or sound defensive
- Lie or obscure dates
- Focus on negative reasons for gap

### Career Changes

**Transferable skills framework:**
1. **Identify overlapping skills** (communication, analysis, project management)
2. **Reframe experience** using target industry language
3. **Bridge the gap** with courses, certifications, side projects
4. **Address directly** in cover letter (turn potential concern into strength)

### Neurodivergent Considerations

**Disclosing neurodivergence:**
- Personal choice - no right answer
- Consider only after offer to negotiate accommodations
- Frame as strength if you choose to disclose
- Know your legal rights (ADA protection in US)

**Interview accommodations you can request:**
- Written questions in advance
- Breaks during long interviews
- Quiet interview environment
- Extra time to process complex questions

---

## 8. Using This Skill with Claude

### Recommended Workflow

**Phase 1: Foundation Building**
1. Use basic persona for general resume review
2. Optimize foundational content
3. Create strong base resume

**Phase 2: Targeted Applications**
1. Find 3-5 priority roles
2. Request company-specific research and review
3. Get tailored resume created
4. Write customized cover letter

**Phase 3: Interview Prep**
1. Request deep company research
2. Prepare STAR stories
3. Develop company-specific questions
4. Practice responses to likely questions

**Phase 4: Post-Interview**
1. Debrief what went well/poorly
2. Request help with thank-you emails
3. Prepare for next round

### Prompt Templates

**Basic Resume Review:**
```
Please review my resume as a senior recruiter in [FIELD]. Focus on:
1. Immediate strengths
2. Red flags
3. Missing elements
4. Specific improvements

[Attach resume]
```

**Company-Specific Review:**
```
I'm applying to [POSITION] at [COMPANY]. 

Step 1: Read this job posting and identify the company and key requirements
[Paste job posting]

Step 2: Research this company:
- Agentforce/AI implementation
- Salesforce environment
- Company size and stage
- Recent news/challenges
- Typical hiring patterns

Step 3: Review my resume as THEIR recruiter:
- What are they struggling to hire for?
- What makes me stand out?
- What concerns might they have?

Step 4: Tell me:
1. Would you interview me?
2. What excites you?
3. What concerns you?
4. What tips the decision yes vs. no?

Step 5: Offer to create tailored resume addressing these insights.

[Attach resume]
```

**Interview Prep:**
```
I have an interview with [COMPANY] for [ROLE] on [DATE].

Please:
1. Search for recent company news/challenges
2. Review typical interview questions for this role
3. Help me prepare STAR stories for likely behavioral questions
4. Suggest 5-7 insightful questions I should ask them
5. Identify top 3 concerns they might have about my candidacy and how to address them

[Attach resume and job posting]
```

---

## 9. Success Metrics

### Track These KPIs

**Application Phase:**
- Applications submitted per week
- Response rate (callbacks/interviews per applications)
- Time from application to first contact
- Ghosting rate

**Interview Phase:**
- Phone screens to on-site interviews conversion
- On-site to offer conversion
- Average time from first interview to offer
- Offer acceptance rate

**Quality Metrics:**
- Average match score (how well does role fit your goals?)
- Company culture fit (based on research)
- Salary vs. target
- Commute/remote situation

**Targets (industry averages):**
- Response rate: 10-25% for volume applications, 30-50% for tailored
- Phone screen to offer: ~30%
- Time to offer: 2-8 weeks
- Multiple offers: Aim for 2-3 competing offers when possible

---

## 10. Common Mistakes to Avoid

### Application Mistakes
1. **Spray and pray** - Applying to everything without research
2. **Resume typos** - Automatic rejection for many companies
3. **Generic cover letters** - "Dear Hiring Manager" + template = weak
4. **Not following instructions** - If they ask for salary requirements, provide them
5. **Overqualified applications** - Applying to roles 2+ levels below your experience

### Interview Mistakes
1. **Not researching company** - Shows lack of interest
2. **Badmouthing previous employers** - Red flag for culture fit
3. **No questions prepared** - Signals low engagement
4. **Not following up** - Thank you emails matter
5. **Accepting first offer** - Without understanding full compensation picture

### Communication Mistakes
1. **Slow response times** - Reply within 24-48 hours
2. **Unprofessional email addresses** - Use firstname.lastname@email.com
3. **Phone interview in noisy location** - Find quiet, professional space
4. **Not testing video setup** - Technical issues look unprofessional
5. **Oversharing** - Keep it professional, especially early in process

---

## Conclusion

This skill provides a comprehensive framework for effective job searching, from initial application through offer negotiation. The key to success is balancing volume with quality, being strategic about where to invest time, and maintaining authentic communication throughout the process.

**Remember:**
- Every application is a learning opportunity
- Rejection is redirection (not personal failure)
- The job search is a marathon, not a sprint
- Your goal is mutual fit, not just getting hired
- You're interviewing them as much as they're interviewing you

**When working with Claude using this skill:**
1. Be specific about your goals and constraints
2. Provide complete context (resume, job posting, background)
3. Ask follow-up questions when something isn't clear
4. Iterate on outputs (first draft is rarely final)
5. Combine this skill with your domain expertise

Good luck with your job search! 🎯
