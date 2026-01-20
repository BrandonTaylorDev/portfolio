// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		turnstile?: {
			render: (
				container: HTMLElement,
				options: {
					sitekey: string;
					theme?: 'light' | 'dark' | 'auto';
					size?: 'normal' | 'compact';
					callback?: (token: string) => void;
					'error-callback'?: () => void;
					'expired-callback'?: () => void;
				}
			) => string;
			reset: (widgetId: string) => void;
			remove: (widgetId: string) => void;
			getResponse: (widgetId: string) => string | undefined;
		};
	}
}

export {};
