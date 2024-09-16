import { Request, Response } from 'express';
import { chromium } from '@playwright/test';
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Start the server
app.get('/', async (req: Request, res: Response) => {
    const { 
        name = 'Default Name', 
        email = 'default@example.com', 
        description = '', 
        date,
        time = '10:00am' 
    } = req.query as {
        name?: string;
        email?: string;
        description?: string;
        date?: string;
        time?: string;
    };
    // send name, email, description, destructured date to playwright test calendly.spec.ts

    const currentYear = new Date().getFullYear();
    const week_day = new Date(`${date},${currentYear}`).getDay()
    const day = DAYS[week_day];

    let finalDate = date

    if (week_day === 2 || week_day === 1) {
        finalDate += ' - Times';
    }

    console.log(`Name: ${name}#`);
    console.log(`Email: ${email}#`);
    console.log(`Description: ${description}#`);
    console.log(`Date: ${finalDate}#`);
    console.log(`Day: ${day}#`);
    console.log(`Time: ${time}#`);


    let response = {};
    let status: number;
    try {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://calendly.com/arpit_k');
        console.log('Page loaded');
        await page.getByRole('button', { name: 'Close' }).click();
        await page.getByRole('link', { name: 'Minute Meeting' }).click();
        try {
            // First attempt: Try clicking the first label
            await page.getByLabel(`${day}, ${finalDate}`).click();
        } catch (error: any) {
            console.log(`First click attempt failed: ${error.message}`);

            // Fallback: If the first attempt fails, try clicking the second label
            try {
                await page.getByLabel(`${day}, ${finalDate} - Times`).click();
            } catch (secondError: any) {
                console.log(`Second click attempt also failed: ${secondError.message}`);
                throw new Error('Both attempts to click the label have failed.');
            }
        }
        console.log('Date clicked');
        await page.getByRole('button', { name: '10:00am' }).click(); //time from params
        console.log('Time clicked');
        await page.getByLabel(`Next ${time}`).click();
        console.log('Next clicked');
        await page.getByLabel('Name *').click();
        await page.getByLabel('Name *').fill(name); // Use name from environment variable
        await page.getByLabel('Email *').click();
        await page.getByLabel('Email *').fill(email); // Use email from environment variable
        await page.getByLabel('Please share anything that').click();
        await page.getByLabel('Please share anything that').fill(description); // Use description from environment variable
        console.log('Form filled');
        await page.getByRole('button', { name: 'Schedule Event' }).click();
        console.log('Event scheduled!');
        response = { message: "Event scheduled successfully" };
        status = 200;

    } catch (error) {
        console.error(error);
        response = { message: "Error scheduling event" };
        status = 500;

    }


    res.status(status).json(response);
});


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});