interface TestStep {
    step: number;
    action: string;
    description: string;
    timestamp: string;
    status: 'info' | 'success' | 'warning' | 'error';
    details?: any;
    screenshot?: string;
}

class TestLogger {
    private steps: TestStep[] = [];
    private currentStep = 0;
    private testName = '';

    startTest(testName: string) {
        this.testName = testName;
        this.steps = [];
        this.currentStep = 0;
        this.logStep('START', `Test started: ${testName}`, 'info');
    }

    logStep(action: string, description: string, status: 'info' | 'success' | 'warning' | 'error' = 'info', details?: any) {
        this.currentStep++;
        const step: TestStep = {
            step: this.currentStep,
            action,
            description,
            timestamp: new Date().toISOString(),
            status,
            details
        };

        this.steps.push(step);

        // Also log to console with emoji
        const emoji = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        }[status];

        console.log(`${emoji} Step ${this.currentStep}: ${action} - ${description}`);
        if (details) {
            console.log(`   Details:`, details);
        }
    }

    async logStepWithScreenshot(action: string, description: string, status: 'info' | 'success' | 'warning' | 'error' = 'info', details?: any) {
        const screenshotPath = `./screenshots/step_${this.currentStep + 1}_${Date.now()}.png`;

        try {
            await driver.saveScreenshot(screenshotPath);
            this.logStep(action, description, status, details);
            this.steps[this.steps.length - 1].screenshot = screenshotPath;
        } catch (error) {
            this.logStep(action, `${description} (Screenshot failed: ${error})`, status, details);
        }
    }

    endTest(status: 'passed' | 'failed', error?: any) {
        this.logStep('END', `Test completed: ${status.toUpperCase()}`, status === 'passed' ? 'success' : 'error', error);
    }

    getSteps(): TestStep[] {
        return [...this.steps];
    }

    saveToFile() {
        const fs = require('fs');
        const path = require('path');

        const logsDir = './test-logs';
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        const filename = `${this.testName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.json`;
        const filepath = path.join(logsDir, filename);

        fs.writeFileSync(filepath, JSON.stringify({
            testName: this.testName,
            totalSteps: this.steps.length,
            timestamp: new Date().toISOString(),
            steps: this.steps
        }, null, 2));

        console.log(`📋 Test logs saved to: ${filepath}`);
        return filepath;
    }
}

// Global instance
const testLogger = new TestLogger();

export { testLogger, TestStep };