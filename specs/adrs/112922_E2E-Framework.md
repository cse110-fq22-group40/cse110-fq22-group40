---
    status: {Accepted}
    date: {2022-11-29}
    last update: {2022-10-3}
    deciders: {Sailor Eichhorn, Katherine Wopng, Billy Sudirdja, Ben Snowbarger}
    consulted: {Allison Turner, Malcolm McSwain}
    informed: {Rest of Team}
---
# ADR - E2E Framework

## Context and Problem Statement:

A few written lines describing the issue or a question to be answered by the team

After working on Unit Testing, we moved to E2E testing, and we were initially running Puppeteer, the API introduced in lab8. Part way through the development of this testing, I began running into errors that had no fixes I could find. Upon investigating, I realized Puppeteer has no support for Electron, the desktop platform our app runs on. Puppeteer supports webpages running javascript, but testing for an app on a platform like Electron has to be done using a different approach than the Puppeteer API. There were two options for E2E testing suggested by [Electron itself](https://www.electronjs.org/docs/latest/tutorial/automated-testing), but only one of them had native support for Electron (Microsoft Playwright, though more similar to Puppeteer, only offers experimental support for Electron)

## Considered Options:

- Add a list of considerations here
- Selenium (built on [Webdriver.io](http://Webdriver.io) which has native Electron support)
- Microsoft Playwright

## Decision Outcomes:

**The final decision here**

Scrap the puppeteer work and instead choose Selenium because of its native support for Electron, because of its larger amount of Electron focused documentation

Update 12/8:

We decided to use Playwright instead. This is because it allows us to test our app through Electron. Initially we tried Selenium with WebDriverIO but it became difficult to open our app because we didn't have our app downloaded as a binary executable. Right now we have E2E tests written for creating, updating, deleting Type F and Type A folders, and we decided not to test the Audio File creation because Playwright doesn't have a non-faulty way of uploading a file through automated testing. That is something that our team will look to in the future. 
