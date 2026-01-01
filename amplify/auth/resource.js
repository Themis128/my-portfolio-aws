import { defineAuth } from '@aws-amplify/backend-auth';
export const auth = defineAuth({
    loginWith: {
        email: {
            otpLogin: true // Enable email OTP
        },
        phone: {
            otpLogin: true // Enable SMS OTP
        },
        webAuthn: {
            relyingPartyId: 'cloudless.gr'
        }
    },
    userAttributes: {
        email: {
            required: true,
            mutable: true,
        },
        givenName: {
            required: false,
            mutable: true,
        },
        familyName: {
            required: false,
            mutable: true,
        },
        phoneNumber: {
            required: false,
            mutable: true,
        },
    },
    multifactor: {
        mode: 'OPTIONAL',
        sms: true,
        totp: true,
    },
});
