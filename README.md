# README.md

This project is designed to automate the scheduling of events on Calendly using Playwright and Express.js. It allows users to schedule events by sending a GET request to the server with the required parameters such as name, email, description, date, and time.

## How to Use

1. Start the server by running `node index.js` in the terminal.
2. Send a GET request to `http://localhost:3000/` with the following query parameters:
   - `name`: The name of the person scheduling the event.
   - `email`: The email address of the person scheduling the event.
   - `description`: A brief description of the event.
   - `date`: The date of the event in the format `DD-MM-YYYY`.
   - `time`: The time of the event in the format `HH:MMam/pm`.

Example: `http://localhost:3000/?name=John Doe&email=johndoe@example.com&description=Meeting to discuss project details&date=12-09-2023&time=10:00am`

3. The server will handle the scheduling of the event on Calendly and return a response indicating the status of the operation.

## Requirements

- Node.js installed on the system.
- Playwright and Express.js installed as dependencies in the project.
