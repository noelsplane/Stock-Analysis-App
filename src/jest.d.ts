/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="@testing-library/react" />
/// <reference types="@types/react-router-dom" />

import '@testing-library/jest-dom';

declare module '@testing-library/react' {
  export const render: (ui: React.ReactElement) => RenderResult;
  export const screen: {
    getByText: (text: string | RegExp) => HTMLElement;
    getByRole: (role: string) => HTMLElement;
  };
}

declare module '@testing-library/jest-dom' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveTextContent(text: string | RegExp): R;
    // Add other matchers as needed
  }
}

declare global {
  namespace jest {
    interface Matchers<R = void, T = unknown> extends jest.Matchers<R, T> {
      toBeVisible(): R;
      toBeInTheDocument(): R;
    }
  }

  // Declare global Jest functions
  const describe: jest.Describe;
  const it: jest.It;
  const expect: jest.Expect;
} 
