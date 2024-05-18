# Valhalla Foundation Bot

## Description
Valhalla Foundation Bot is a tool for automating the completion and claiming of quests on the Infinigods platform. The bot fetches available quests and processes them using bearer tokens provided in the `accounts.json` file.

## Features
- Automatically completes and claims social and seasonal quests.
- Supports multiple accounts via bearer tokens.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/dante4rt/valhalla-foundation-bot.git
    cd valhalla-foundation-bot
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Setup
1. Create an `accounts.json` file in the root directory. This file should contain an array of bearer tokens for the accounts you want to automate. Example:
    ```json
    [
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIwMUhZ...",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIwMUhZ..."
    ]
    ```

2. To obtain your bearer token:
    1. Open your web browser and log in to the Infinigods platform.
    2. Open the Developer Tools (Right-click on the page and select "Inspect" or press `Ctrl+Shift+I`).
    3. Go to the "Network" tab.
    4. Perform an action that sends a network request, such as navigating to a different page.
    5. Look for a request with an `Authorization` header in the request headers.
    6. Copy the value of the `Authorization` header. It should start with `Bearer`.

3. Paste the copied bearer tokens into the `accounts.json` file.

## Usage
Start the bot by running:
```bash
npm start
```