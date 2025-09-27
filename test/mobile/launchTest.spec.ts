import { expect } from 'chai';

describe('Basic Android Interactions', () => {

    it('should get device information', async () => {
        const deviceInfo = await driver.getDeviceTime();
        console.log('Device time:', deviceInfo);
        expect(deviceInfo).to.be.a('string');
    });
});