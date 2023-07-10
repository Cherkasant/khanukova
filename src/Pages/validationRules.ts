/* eslint-disable max-len */
export const validationRules = {
  passwordSignIn: {
    required: 'Please input your password!',
    pattern: {
      value: /^[a-zA-Z0-9_-]{5,15}$/,
      message:
        'Digits and alphabetics (capital and low case) only are allowed. Minimum – 5 symbols. Maximum – 15 symbols.'
    }
  },

  emailSign: {
    required: 'Please input your email!',
    pattern: {
      value: /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      message: 'Digits, alphabetics, symbols “.”, “-”, “_” are allowed.'
    }
  },
  passwordSignUp: {
    required: 'Please input min 9 symbols!',
    pattern: {
      value: /^[a-zA-Z0-9._-]{9,128}$/,
      message:
        'Digits, alphabetics (capital and low case), symbols “.”, “-”, “_” are allowed. Minimum – 9 symbols. Maximum – 128 symbols. '
    }
  },

  passwordConfirmation: {
    required: 'Please input min 9 symbols!'
  },

  fullName: {
    required: 'Please input your full name!',
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^([a-zA-Z\-]{2,160})+([-]?[a-zA-Z\-]{1,160})*$/gm,
      message: 'Alphabetics (Latin) only are allowed (both capital and low case).'
    }
  },

  phone: {
    required: 'Please input your phone number!'
  },

  position: {
    required: 'Please select users role in the project!'
  },
  code: {
    required: 'Please input your code number!'
  }
};
