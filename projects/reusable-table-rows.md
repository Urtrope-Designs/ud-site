---
title: Reusable Table Rows for Ad-Sales Dashboards
description: How I turned one-off table rows into shared, configurable components for an enterprise ad-sales dashboard.
context: Professional work · Railroad19
summary: Turning one-off table rows into shared, configurable components for an enterprise ad-sales dashboard.
role: Front-end architecture and implementation
tools: [Angular, TypeScript, Component design]
order: 1
hero:
heroAlt:
---
<!-- DRAFT copy – check details before publishing. NDA-safe: no real screens, client or data. -->

## The problem
At Railroad19 I built dashboard interfaces for a major media company's ad-sales teams, turning complex order data into clear visualizations. Those dashboards helped teams spot and act on $6.6M in mismarked orders – and a lot of that work happens in tables.

As the app grew, each new table type picked up its own row component. The rows became unwieldy: the same display logic, copied with small variations, and every new table meant solving the same problems again.

## What I did
I redesigned the rows as dynamic, reusable components. The display logic lives in one place, and what makes each table different is described rather than re-implemented, so other engineers can build a new table type on top of the same foundation.

## The result
The approach became a pattern other engineers on the team adopted, and new tables stopped starting from scratch.
