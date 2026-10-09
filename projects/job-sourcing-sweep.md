---
title: Job Sourcing Sweep
description: A weekly pipeline of Claude agents that searches job boards, verifies each posting through the boards' own APIs, and screens leads against my written criteria.
tags:
  - python
  - ai
  - agents
summary: A weekly pipeline of Claude agents that searches job boards, verifies every posting, and screens each lead against my criteria before it reaches my tracker.
role: Solo – design and development
tools: [Python, Claude API, Pydantic, Google Sheets API]
order: 3
hero: /media/job-sourcing-sweep/hero.svg
heroAlt: "Before and after diagram. Before: for each of 7 job sources, search, then open every posting by hand – checking for empty pages, closed jobs, remote policy, pay and backend load – and copy it into the tracker. After: one research agent per source, 7 in all, 3 at a time. Each agent has server tools Anthropic runs (web search and web fetch) and client tools my code runs (list company jobs and get job posting) against the Ashby, Greenhouse, Lever and Workday job APIs. Findings pass through extract (Claude), dedup (code), liveness (code) and screen (Claude Opus), then land in a Sweep inbox tab in Google Sheets as priority, candidate or exclude."
---
[Source on GitHub](https://github.com/scunningham777/job-sourcing-sweep)

## The problem
A job search means checking the same boards every week: company boards on Ashby, Greenhouse and Lever, Hacker News "Who is hiring?", Built In, staffing agencies, and local employers on Workday. Most of the time doesn't go into finding postings – it goes into opening them, only to learn the job is closed, hybrid, underpaid or mostly backend, or that it's already in my tracker.

I wanted something that does that legwork every week and hands me a short list, judged against the same written criteria I'd use myself. It was also a chance to build an agent system by hand – without a framework – so I'd understand every moving part.

## How it works
Each run fans out one research agent per job source on Claude Sonnet, three at a time. Each agent searches the web, opens the promising postings, and writes up what it found. From there:

- **Extract.** A separate structured-output call turns each write-up into validated leads, using a Pydantic schema as the contract. Splitting research from extraction lets the research prompt think freely, and extraction can be re-run cheaply without searching again.
- **Dedup.** Plain code compares leads against my tracker sheet by normalized URL, and catches the same role posted on two boards by normalized company and title.
- **Liveness.** Plain code checks that every posting is still open. Agents can't reliably tell, because some boards keep serving the full description of a closed job.
- **Screen.** Claude Opus judges every remaining lead against my written criteria – priority, candidate or exclude – ties each reason to a specific criterion, and writes notes in the same voice as my tracker.

Results are appended to a "Sweep inbox" tab in my Google Sheet. Promoting a lead to the tracker stays my call. Separate tracks – remote full-time roles, or local contract work – each have their own criteria file and their own sources.

## Giving the agents better tools
Early runs dropped good leads. Ashby and Workday posting pages are rendered by JavaScript, so when an agent fetched one it often got back an empty "Jobs" page and couldn't verify the posting. No prompt change can fix that.

Every one of those applicant-tracking systems serves the same postings as JSON, though. So I gave the agents two tools of my own: `list_company_jobs` lists a company's open postings, filtered by title, and `get_job_posting` returns one posting's full description and pay range – or tells the agent it's closed. Unlike web search, Anthropic doesn't run these tools: the model asks for a call, my code makes the request and sends back trimmed JSON, and the loop carries on. Errors go back the same way, so a wrong company name is something the agent can recover from instead of a crash.

On the first run with the new tools, the Ashby agent made 16 API calls and no page fetches at all, and checked every posting it reported against the board itself. The same API client now powers the liveness check, so Workday leads no longer come back "unconfirmed".

## Keeping it cheap and checkable
- **Deterministic work stays out of the model.** Dedup, liveness and URL checks are plain code with offline unit tests – cheaper, faster and predictable.
- **Every agent has a budget.** Searches, page fetches and API calls are capped per source, and results are trimmed, because everything a tool returns is paid for as input on the next turn.
- **Every run prices itself.** The sweep reads the API's usage numbers and prints a cost breakdown – a full run across five sources costs about $2–3 – and logs per-source stats, so I can see which sources actually turn up leads worth applying to.

## What's next
The job-board client has no dependency on Claude, by design. Next I'll move it into its own MCP server, so any agent – not just this one – can search company job boards directly.
