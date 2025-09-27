const fs = require('fs');
const path = require('path');

function generateEnhancedHTMLReport(platform = 'ios') {
    // Read JSON report based on platform
    const platformReports = {
        ios: 'html-reports/ios/ios-report-0-0.json',
        android: 'html-reports/android/android-report-0-0.json',
        web: 'html-reports/web/web-report-0-0.json'
    };

    const jsonFile = platformReports[platform];
    if (!fs.existsSync(jsonFile)) {
        console.log('❌ JSON report not found:', jsonFile);
        return;
    }

    const reportData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

    // Read test logs
    const logsDir = './test-logs';
    let testLogs = [];

    if (fs.existsSync(logsDir)) {
        const logFiles = fs.readdirSync(logsDir).filter(f => f.endsWith('.json'));
        testLogs = logFiles.map(file => {
            const logData = JSON.parse(fs.readFileSync(path.join(logsDir, file), 'utf8'));
            return {
                filename: file,
                ...logData
            };
        }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    const html = `<!DOCTYPE html>
<html>
<head>
    <title>${reportData.title} - Enhanced Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0; padding: 20px;
            background: #f8f9fa;
            color: #333;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header h1 { margin: 0; font-size: 2.5em; }
        .header p { margin: 5px 0; opacity: 0.9; }

        .metrics {
            background: white;
            padding: 25px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .metric-item {
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            background: #f8f9fa;
        }
        .metric-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .metric-label {
            color: #6c757d;
            font-size: 0.9em;
        }

        .suite {
            background: white;
            margin: 20px 0;
            padding: 0;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .suite-header {
            background: #495057;
            color: white;
            padding: 20px;
            font-size: 1.3em;
            font-weight: bold;
        }
        .test-item {
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
            position: relative;
        }
        .test-item:last-child { border-bottom: none; }
        .test-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .test-title {
            font-size: 1.1em;
            font-weight: 600;
        }
        .test-pass { color: #28a745; }
        .test-fail { color: #dc3545; }
        .test-duration {
            color: #6c757d;
            font-size: 0.9em;
        }

        .logs-section {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #e9ecef;
        }
        .logs-title {
            font-weight: bold;
            margin-bottom: 10px;
            color: #495057;
        }
        .step {
            margin: 8px 0;
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid;
            background: #f8f9fa;
        }
        .step-info { border-left-color: #17a2b8; }
        .step-success { border-left-color: #28a745; background: #d4edda; }
        .step-warning { border-left-color: #ffc107; background: #fff3cd; }
        .step-error { border-left-color: #dc3545; background: #f8d7da; }

        .step-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 5px;
        }
        .step-number {
            background: #495057;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            margin-right: 10px;
            min-width: 30px;
            text-align: center;
        }
        .step-action {
            font-weight: bold;
            margin-right: 10px;
            color: #495057;
        }
        .step-time {
            font-size: 0.8em;
            color: #6c757d;
            margin-left: auto;
        }
        .step-description {
            margin: 5px 0;
            color: #333;
        }
        .step-details {
            background: rgba(0,0,0,0.05);
            padding: 8px;
            border-radius: 4px;
            margin-top: 8px;
            font-size: 0.9em;
            white-space: pre-wrap;
        }
        .screenshot-link {
            display: inline-block;
            margin-top: 8px;
            padding: 6px 12px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.8em;
        }
        .screenshot-link:hover {
            background: #0056b3;
        }
        .toggle-logs {
            background: #6c757d;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
        }
        .toggle-logs:hover {
            background: #545b62;
        }
        .logs-content {
            max-height: 400px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class='header'>
        <h1>📱 ${reportData.title}</h1>
        <p>Platform: ${reportData.info.capabilities.platformName} ${reportData.info.capabilities.platformVersion}</p>
        <p>Device: ${reportData.info.capabilities.deviceName} (${reportData.info.capabilities.udid})</p>
        <p>Test Run: ${new Date(reportData.info.start).toLocaleString()}</p>
    </div>

    <div class='metrics'>
        <div class='metric-item'>
            <div class='metric-number' style='color: #28a745;'>✅ ${reportData.metrics.passed}</div>
            <div class='metric-label'>Passed</div>
        </div>
        <div class='metric-item'>
            <div class='metric-number' style='color: #dc3545;'>❌ ${reportData.metrics.failed}</div>
            <div class='metric-label'>Failed</div>
        </div>
        <div class='metric-item'>
            <div class='metric-number' style='color: #ffc107;'>⏭️ ${reportData.metrics.skipped}</div>
            <div class='metric-label'>Skipped</div>
        </div>
        <div class='metric-item'>
            <div class='metric-number' style='color: #17a2b8;'>⏱️ ${(reportData.metrics.duration/1000).toFixed(2)}s</div>
            <div class='metric-label'>Duration</div>
        </div>
    </div>

    ${reportData.suites.map(suite => `
    <div class='suite'>
        <div class='suite-header'>
            📋 ${suite.title}
        </div>
        ${suite.tests.map(test => {
            // Find matching test logs with better matching logic
            const matchingLogs = testLogs.filter(log => {
                const logName = log.testName.toLowerCase();
                const testTitle = test.title.toLowerCase();

                // Direct substring matching
                if (logName.includes(testTitle) || testTitle.includes(logName)) {
                    return true;
                }

                // Keyword matching for common terms
                const logKeywords = logName.split(/[\s_]+/);
                const testKeywords = testTitle.split(/[\s_]+/);

                // Check for overlapping keywords (at least 2 matches)
                const commonKeywords = logKeywords.filter(keyword =>
                    testKeywords.some(testKeyword =>
                        keyword.length > 3 && testKeyword.includes(keyword)
                    )
                );

                // Special matching for specific test patterns
                if ((logName.includes('launch') && testTitle.includes('launch')) ||
                    (logName.includes('screenshot') && testTitle.includes('screenshot')) ||
                    (logName.includes('app') && testTitle.includes('app'))) {
                    return true;
                }

                return commonKeywords.length >= 1;
            });

            return `
            <div class='test-item'>
                <div class='test-header'>
                    <div class='test-title test-${test.state}'>
                        ${test.state === 'passed' ? '✅' : '❌'} ${test.title}
                    </div>
                    <div class='test-duration'>${test._duration}ms</div>
                </div>

                ${matchingLogs.length > 0 ? `
                <div class='logs-section'>
                    <div class='logs-title'>
                        📝 Test Steps & Logs
                        <button class='toggle-logs' onclick='toggleLogs(this)'>Show Details</button>
                    </div>
                    <div class='logs-content' style='display: none;'>
                        ${matchingLogs.map(log => `
                            <div style='margin-bottom: 20px;'>
                                <strong>📊 ${log.testName}</strong>
                                <span style='color: #6c757d;'>(${log.totalSteps} steps)</span>
                                ${log.steps.map(step => `
                                    <div class='step step-${step.status}'>
                                        <div class='step-header'>
                                            <span class='step-number'>${step.step}</span>
                                            <span class='step-action'>${step.action}</span>
                                            <span class='step-time'>${new Date(step.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <div class='step-description'>${step.description}</div>
                                        ${step.details ? `<div class='step-details'>${typeof step.details === 'object' ? JSON.stringify(step.details, null, 2) : step.details}</div>` : ''}
                                        ${step.screenshot ? `<a href='${step.screenshot}' class='screenshot-link' target='_blank'>📸 View Screenshot</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            `;
        }).join('')}
    </div>
    `).join('')}

    <script>
        function toggleLogs(button) {
            const logsContent = button.parentElement.nextElementSibling;
            if (logsContent.style.display === 'none') {
                logsContent.style.display = 'block';
                button.textContent = 'Hide Details';
            } else {
                logsContent.style.display = 'none';
                button.textContent = 'Show Details';
            }
        }
    </script>
</body>
</html>`;

    const outputPath = `html-reports/${platform}/${platform}-report-enhanced.html`;
    fs.writeFileSync(outputPath, html);
    console.log('✅ Enhanced HTML report created:', outputPath);
    return outputPath;
}

if (require.main === module) {
    const platform = process.argv[2] || 'ios';
    generateEnhancedHTMLReport(platform);
}

module.exports = { generateEnhancedHTMLReport };