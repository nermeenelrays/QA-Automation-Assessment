import { remote } from 'webdriverio';
import { expect } from 'chai';
import FormPage from './formPage';
import * as userData from './userData.json';

describe('General Store Mobile Automation', function () {
    let driver: any;

    before(async function () {
        this.timeout(60000);

        // Connect to the Android Emulator via Appium
        driver = await remote({
            path: '/',
            port: 4723,
            capabilities: {
                platformName: 'Android',
                'appium:automationName': 'UiAutomator2',
                'appium:app': process.cwd() + '/General-Store.apk',
                'appium:appWaitActivity': '*' // <-- THE MAGIC WILDCARD!
            }
        });
        
        // Setup global variable for locators
        (global as any).$ = (selector: string) => driver.$(selector);
    });

    it('should login and navigate to products', async function () {
        this.timeout(60000);

        // 1. Fill out the form using data from JSON
        await FormPage.fillForm(userData.name);
        
        // 2. Wait a moment to see the next page load
        await driver.pause(3000);

        // 3. Assert we made it to the Products page
        const toolbarTitle = await driver.$('id:com.androidsample.generalstore:id/toolbar_title');
        const titleText = await toolbarTitle.getText();
        expect(titleText).to.equal('Products');
    });

    after(async function () {
        // Close the app when finished
        if (driver) {
            await driver.deleteSession();
        }
    });
});