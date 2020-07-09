import reducer from './Auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
        idToken: 'something',
        userId: 'something-else'
      })).toEqual({
        token: 'something',
        userId: 'something-else',
        error: null,
        loading: false,
        authRedirectPath: '/'
      });
  })
});