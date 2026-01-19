import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id: string;
	type: ToastType;
	message: string;
	title?: string;
	durationMs: number;
	createdAt: number;
};

export type ToastInput = {
	type: ToastType;
	message: string;
	title?: string;
	durationMs?: number;
	id?: string;
	createdAt?: number;
};

const DEFAULT_DURATION_MS = 4500;

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	function makeId() {
		const cryptoAny = globalThis.crypto as Crypto | undefined;
		if (cryptoAny && 'randomUUID' in cryptoAny && typeof (cryptoAny as any).randomUUID === 'function') {
			return (cryptoAny as any).randomUUID() as string;
		}
		return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
	}

	function show(input: ToastInput) {
		const id = input.id ?? makeId();
		const toast: Toast = {
			id,
			type: input.type,
			title: input.title,
			message: input.message,
			durationMs: input.durationMs ?? DEFAULT_DURATION_MS,
			createdAt: input.createdAt ?? Date.now()
		};

		update((list) => [toast, ...list].slice(0, 5));

		setTimeout(() => {
			update((list) => list.filter((t) => t.id !== id));
		}, toast.durationMs);
	}

	function dismiss(id: string) {
		update((list) => list.filter((t) => t.id !== id));
	}

	function clear() {
		update(() => []);
	}

	return { subscribe, show, dismiss, clear };
}

export const toasts = createToastStore();
