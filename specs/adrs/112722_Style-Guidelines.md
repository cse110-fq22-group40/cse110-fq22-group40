---
  status: {Accepted}
  date: {2022-11-27}
  last update: {2022-11-27}
  deciders: {Ben Snowbarger, Billy Sudirdja, Kat Wong, Emmanuel Serrano, Bennett Zhang}
  consulted: {Allison Turner}
  informed: {Rest of Team}
---

# ADR - Style Guide

## Context and Problem Statement:

A few written lines describing the issue or a question to be answered by the team

Style guidelines for our code include method, class, and file headers, as well as in line commenting and various choices (ie `===` as opposed to `==` and `“string”` as opposed to `‘string’`. The indentation and choices help create more readable code while proper documentation ensures future people studying the code understand itls purpose and how to properly implement it. The headers for file, class, and method are all dictated by JavaScript best practices. The style guidelines are based heavily off of Codacy to ensure both the code uses common practices for styling and to simplify the checking of pushed code’s style. The full style guideline documentation can be found at can at `/specs/`

## Considered Options:

- Allow different approaches for logic comparisons and declaring strings
- Standardize those practices
- Have headers be done completely in plain text
- Have headers utilize the built in `@` functionality for expected inputs, outputs, and errors
- Have style guidelines line up with Codacy to simplify style checking

## Decision Outcomes:

**The final decision here**

We decided to have our standardized style guidelines adhere to Codacy
