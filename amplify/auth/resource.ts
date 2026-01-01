import { defineAuth } from "@aws-amplify/backend"

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      otpLogin: true // Enable email OTP for passwordless authentication
    },
    phone: {
      otpLogin: true // Enable SMS OTP for passwordless authentication
    },
    webAuthn: {
      relyingPartyId: 'cloudless.gr', // Use your domain for WebAuthn
      userVerification: 'preferred' // Allow but don't require user verification
    } // Enable WebAuthn passkeys for passwordless authentication
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
    mode: 'OPTIONAL', // Can be 'OFF', 'OPTIONAL', or 'REQUIRED'
    sms: true,
    totp: true,
  },
})