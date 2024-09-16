import { test } from '@playwright/test';

export async function populate(name: string, email: string, description: string = "", day: string, date: string, time: string) {


    test('calendly', async ({ page }) => {
        //   const name = process.env.NAME ||"test user"; // Get name from environment variable
        //   const email = process.env.EMAIL || "test@test.com"; // Get email from environment variable
        //   const description = process.env.DESCRIPTION || "test description"; // Get description from environment variable
        //   const day = process.env.DAY; // Wednesday (if Monday or Tuesday, append "- Times " to Date
        //   const date = process.env.DATE; // September 18
        //   const time = process.env.TIME; // 10:00am

        await page.goto('https://calendly.com/arpit_k');
        await page.getByRole('button', { name: 'Close' }).click();
        await page.getByRole('link', { name: 'Minute Meeting' }).click();
        await page.getByLabel(`${date}, ${day} -`).click(); // Use date from environment variable
        await page.getByRole('button', { name: '10:00am' }).click(); //time from params
        await page.getByLabel(`Next ${time}`).click();
        await page.getByLabel('Name *').click();
        await page.getByLabel('Name *').fill(name); // Use name from environment variable
        await page.getByLabel('Email *').click();
        await page.getByLabel('Email *').fill(email); // Use email from environment variable
        await page.getByLabel('Please share anything that').click();
        await page.getByLabel('Please share anything that').fill(description); // Use description from environment variable
        await page.getByRole('button', { name: 'Schedule Event' }).click();
    });
}
