# Eng-Learning

This project was build to help recognizing english word's meaning with score system.
Score will increase by pressing next button (ต่อไป) without pressing show answer button
(เฉลย). Will show score result when finished all words and also have save system for playing later.

## Setup

Forking the project. Open Command Prompt, then use the following command in the desire directory:

```bash
git clone https://github.com/<your-github-name>/eng-learning.git
```

Then, use the following command in cloned project folder to install modules:

```bash
npm install
```

## Changing Google Sheet for Storing Data

First, duplicate this google sheet: https://docs.google.com/spreadsheets/d/1SMrtUHsHCzi5tyO_NTIBRTV3LY63QQuk0ZspYtHOkdQ/edit?usp=sharing. Feel free to add 
or remove words in column A.

In `src\components\global\constant.tsx` change `SHEET_ID` into your duplicated google sheet url ID.
You can find your google sheet ID in https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID

## Automated Deploy

This project auto build and deploy to gh-pages branch after main branch updated.
Reject build on failed test.

## Unit Test

To execute unit tests with the Vitest, use the following command:

```bash
npm test
```
