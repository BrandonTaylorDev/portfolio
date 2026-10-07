// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		turnstile?: {
			render(
				container: HTMLElement,
				options: {
					sitekey: string;
					theme: 'light' | 'dark' | 'auto';
					size: 'normal' | 'compact' | 'flexible';
					callback: (token: string) => void;
					'expired-callback': () => void;
					'error-callback': () => void;
				}
			): string;
			reset(widgetId: string): void;
			remove(widgetId: string): void;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
