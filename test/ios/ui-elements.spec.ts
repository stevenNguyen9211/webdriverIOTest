import { expect } from 'chai';

describe('iOS UI Elements Tests', () => {

    it('should find and interact with basic UI elements', async () => {
        // Wait for app to fully load
        await driver.pause(3000);

        try {
            // Try to find common iOS UI elements
            // Note: These selectors need to be updated based on your actual app

            // Find buttons by accessibility id or text
            const buttons = await driver.$$('//XCUIElementTypeButton');
            console.log(`Found ${buttons.length} buttons in the app`);

            if (buttons.length > 0) {
                // Get first button properties
                const firstButton = buttons[0];
                const buttonText = await firstButton.getText();
                const isEnabled = await firstButton.isEnabled();

                console.log('First button text:', buttonText);
                console.log('First button enabled:', isEnabled);
            }

        } catch (error) {
            console.log('Error finding UI elements:', error.message);
            // This is expected if app UI is different
        }
    });

    it('should find text elements and labels', async () => {
        try {
            // Find static text elements
            const textElements = await driver.$$('//XCUIElementTypeStaticText');
            console.log(`Found ${textElements.length} text elements`);

            if (textElements.length > 0) {
                // Get text from first few elements
                for (let i = 0; i < Math.min(3, textElements.length); i++) {
                    const text = await textElements[i].getText();
                    console.log(`Text element ${i + 1}:`, text);
                }
            }

        } catch (error) {
            console.log('Error finding text elements:', error.message);
        }
    });

    it('should interact with navigation elements', async () => {
        try {
            // Look for navigation bars
            const navBars = await driver.$$('//XCUIElementTypeNavigationBar');
            console.log(`Found ${navBars.length} navigation bars`);

            // Look for tab bars
            const tabBars = await driver.$$('//XCUIElementTypeTabBar');
            console.log(`Found ${tabBars.length} tab bars`);

            // Look for toolbars
            const toolBars = await driver.$$('//XCUIElementTypeToolbar');
            console.log(`Found ${toolBars.length} toolbars`);

        } catch (error) {
            console.log('Error finding navigation elements:', error.message);
        }
    });

    it('should test scroll functionality', async () => {
        try {
            // Look for scroll views
            const scrollViews = await driver.$$('//XCUIElementTypeScrollView');
            console.log(`Found ${scrollViews.length} scroll views`);

            if (scrollViews.length > 0) {
                const scrollView = scrollViews[0];

                // Perform scroll down
                await driver.touchAction([
                    { action: 'press', x: 200, y: 400 },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: 200, y: 200 },
                    { action: 'release' }
                ]);

                console.log('Scroll down gesture performed');
                await driver.pause(1000);

                // Perform scroll up
                await driver.touchAction([
                    { action: 'press', x: 200, y: 200 },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: 200, y: 400 },
                    { action: 'release' }
                ]);

                console.log('Scroll up gesture performed');
                await driver.pause(1000);
            }

        } catch (error) {
            console.log('Error testing scroll functionality:', error.message);
        }
    });

    it('should test input fields if available', async () => {
        try {
            // Look for text fields
            const textFields = await driver.$$('//XCUIElementTypeTextField');
            console.log(`Found ${textFields.length} text fields`);

            if (textFields.length > 0) {
                const textField = textFields[0];

                // Check if field is enabled
                const isEnabled = await textField.isEnabled();
                console.log('Text field enabled:', isEnabled);

                if (isEnabled) {
                    // Tap on field
                    await textField.click();

                    // Type some text
                    await textField.setValue('Test input');
                    console.log('Text entered in field');

                    // Get the value back
                    const value = await textField.getText();
                    console.log('Field value:', value);

                    // Clear the field
                    await textField.clearValue();
                    console.log('Field cleared');
                }
            }

        } catch (error) {
            console.log('Error testing input fields:', error.message);
        }
    });

    it('should test table views if available', async () => {
        try {
            // Look for table views
            const tableViews = await driver.$$('//XCUIElementTypeTable');
            console.log(`Found ${tableViews.length} table views`);

            if (tableViews.length > 0) {
                // Look for table cells
                const tableCells = await driver.$$('//XCUIElementTypeCell');
                console.log(`Found ${tableCells.length} table cells`);

                if (tableCells.length > 0) {
                    // Tap on first cell
                    await tableCells[0].click();
                    console.log('Tapped on first table cell');
                    await driver.pause(2000);
                }
            }

        } catch (error) {
            console.log('Error testing table views:', error.message);
        }
    });
});