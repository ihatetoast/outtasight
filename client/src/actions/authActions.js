import { TEST_DISPATCH } from './types';

// reg user
export const registerUser = userData => {
  return { type: TEST_DISPATCH, payload: userData };
};
