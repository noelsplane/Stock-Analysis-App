/// <reference types="@testing-library/jest-dom" />

declare module '@testing-library/react' {
  export const screen: {
    getByText: (text: string | RegExp) => HTMLElement;
    getByRole: (role: string) => HTMLElement;
    getByTestId: (id: string) => HTMLElement;
    queryByText: (text: string | RegExp) => HTMLElement | null;
    queryByRole: (role: string) => HTMLElement | null;
    queryByTestId: (id: string) => HTMLElement | null;
  };

  export function render(
    ui: React.ReactElement,
    options?: {
      wrapper?: React.ComponentType;
      container?: HTMLElement;
    }
  ): {
    container: HTMLElement;
    baseElement: HTMLElement;
    debug: (element?: HTMLElement) => void;
    rerender: (ui: React.ReactElement) => void;
    unmount: () => void;
    asFragment: () => DocumentFragment;
    findByTestId: (id: string) => Promise<HTMLElement>;
    findByText: (text: string | RegExp) => Promise<HTMLElement>;
    findByRole: (role: string) => Promise<HTMLElement>;
    getByTestId: (id: string) => HTMLElement;
    getByText: (text: string | RegExp) => HTMLElement;
    getByRole: (role: string) => HTMLElement;
    queryByTestId: (id: string) => HTMLElement | null;
    queryByText: (text: string | RegExp) => HTMLElement | null;
    queryByRole: (role: string) => HTMLElement | null;
  };
}

declare module '@testing-library/jest-dom' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveTextContent(text: string | RegExp): R;
    toBeVisible(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toHaveClass(className: string): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}

declare global {
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void): void;
  function expect(value: any): {
    toBeInTheDocument(): void;
    toHaveTextContent(text: string | RegExp): void;
    toBeVisible(): void;
    toBeDisabled(): void;
    toBeEnabled(): void;
    toHaveClass(className: string): void;
    toHaveAttribute(attr: string, value?: string): void;
  };
} 
