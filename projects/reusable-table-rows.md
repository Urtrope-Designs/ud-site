---
title: Reusable Table Rows for Ad-Sales Dashboards
description: How I turned one-off table rows into shared, configurable components for an enterprise ad-sales dashboard.
context: Professional work · Railroad19
summary: Turning one-off table rows into shared, configurable components for an enterprise ad-sales dashboard.
role: Front-end architecture and implementation
tools: [Angular, TypeScript, PrimeNG]
order: 1
hero: /media/reusable-table-rows/hero.svg
heroAlt: "Before and after diagram. Before: about 13 table-specific row components, each checking every column's field name with ngIf. After: each column config names a cell component, and one generic ConfigurableRow creates it from a shared set: date, currency, link, status badge, editable notes, formatted text, or plain text by default."
---
<!-- DRAFT copy – check details before publishing. NDA-safe: no real screens, client or data. -->

## The problem
At Railroad19 I built dashboard interfaces for a major media company's ad-sales teams, turning complex order data into clear visualizations. Those dashboards helped teams spot and act on $6.6M in mismarked orders – and a lot of that work happens in tables.

Each table was already driven by a column config – header label, field, default width, default visibility – so users could show, hide, reorder and resize columns. But every table type also had its own row component, about 13 of them by the time we changed course. Each row template looped over the columns and checked the field name with a chain of `*ngIf`s to decide how to format each cell. The same display logic was copied with small variations from table to table, and the rendered markup was littered with `<!--ngIf false-->` comments for every check that didn't match, in every cell.

## What I did
I replaced the per-table rows with one generic configurable row. The column config gained a single optional field: the cell component to render. The row hands that component to Angular's `ViewContainerRef.createComponent`, then passes in the column config and row data. If a column names no component, its value shows as plain text.

The cells come from a shared set: dates, currency, links, several kinds of status badges, editable notes and formatted text. When a table needs something specific, its parent component passes custom data and event handlers into the row, keyed by field, and the row wires them to the matching cells. The display logic lives in one place, and other engineers can build a new table type on top of the same foundation.

## The result
The approach became a pattern other engineers on the team adopted. We added another 8–10 table types after the switch, and none of them needed a new row component – new tables no longer duplicated display logic for common cell types.
