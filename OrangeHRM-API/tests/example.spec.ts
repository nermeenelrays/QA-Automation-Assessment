import { test, expect } from '@playwright/test';

test.describe('OrangeHRM API Automation', () => {
  
  test.setTimeout(60000); 
  let candidateId: number;

  test('Add and Delete Candidate via Web API', async ({ page }) => {
    
    // 1. Authenticate via UI to capture session cookies
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard/);

    // 2. Create Candidate via API using browser context
    const addResponse = await page.request.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates', {
      data: {
        firstName: 'Auto',
        middleName: 'API',
        lastName: 'Tester',
        email: 'api.tester@example.com',
        contactNumber: '0123456789',
        keywords: 'automation',
        comment: 'Candidate added via automated API test',
        dateOfApplication: '2024-01-01',
        consentToKeepData: false
      }
    });

    if (!addResponse.ok()) {
        console.error('API Error Response:', await addResponse.text());
    }

    expect(addResponse.ok()).toBeTruthy();
    
    const addResponseBody = await addResponse.json();
    candidateId = addResponseBody.data.id; 

    // 3. Delete Candidate via API
    const deleteResponse = await page.request.delete('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates', {
      data: {
        ids: [candidateId] 
      }
    });

    expect(deleteResponse.ok()).toBeTruthy();
  });

});