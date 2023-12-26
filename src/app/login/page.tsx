import React from 'react';

interface Props {}

export default function LoginPage({}: Props) {
  return (
    <div>
      <form>
        <div>
          <label>Email</label>
          <input name='email' />
        </div>
        <div>
          <label>Password</label>
          <input name='password' />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}
