import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id: string;
	type: ToastType;
	message: string;
	title?: string;
	durationMs: number;
	createdAt: number;
	pausedAt?: number; // When the toast was paused (undefined if not paused)
	resumedAt?: number; // When the toast was last resumed (or created if never paused)
	elapsedBeforePause: number; // How much time had elapsed before pause
	animationKey: number; // Changes when animation should restart
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
	const { subscribe, update, set } = writable<Toast[]>([]);
	const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

	function makeId() {
		const cryptoAny = globalThis.crypto as Crypto | undefined;
		if (
			cryptoAny &&
			'randomUUID' in cryptoAny &&
			typeof (cryptoAny as any).randomUUID === 'function'
		) {
			return (cryptoAny as any).randomUUID() as string;
		}
		return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
	}

	function scheduleRemoval(id: string, delayMs: number) {
		// Clear any existing timeout for this toast
		const existingTimeout = timeouts.get(id);
		if (existingTimeout) {
			clearTimeout(existingTimeout);
		}

		// Schedule new removal
		const timeoutId = setTimeout(() => {
			update((list) => list.filter((t) => t.id !== id));
			timeouts.delete(id);
		}, delayMs);

		timeouts.set(id, timeoutId);
	}

	function show(input: ToastInput) {
		const id = input.id ?? makeId();
		const now = Date.now();
		const toast: Toast = {
			id,
			type: input.type,
			title: input.title,
			message: input.message,
			durationMs: input.durationMs ?? DEFAULT_DURATION_MS,
			createdAt: input.createdAt ?? now,
			resumedAt: now,
			elapsedBeforePause: 0,
			animationKey: now
		};

		update((list) => [toast, ...list].slice(0, 5));
		scheduleRemoval(id, toast.durationMs);
	}

	function dismiss(id: string) {
		const timeoutId = timeouts.get(id);
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeouts.delete(id);
		}
		update((list) => list.filter((t) => t.id !== id));
	}

	function pause(id: string) {
		update((list) => {
			const toast = list.find((t) => t.id === id);
			if (!toast || toast.pausedAt !== undefined) {
				return list; // Already paused or doesn't exist
			}

			// Clear the timeout
			const timeoutId = timeouts.get(id);
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeouts.delete(id);
			}

			// Calculate elapsed time before pause using resumedAt
			const now = Date.now();
			const currentRunDuration = toast.resumedAt ? now - toast.resumedAt : 0;
			toast.elapsedBeforePause += currentRunDuration;
			toast.pausedAt = now;
			toast.resumedAt = undefined;

			return list;
		});
	}

	function resume(id: string) {
		update((list) => {
			const toast = list.find((t) => t.id === id);
			if (!toast || toast.pausedAt === undefined) {
				return list; // Not paused or doesn't exist
			}

			const now = Date.now();
			// Calculate remaining time
			const remainingMs = toast.durationMs - toast.elapsedBeforePause;

			if (remainingMs > 0) {
				scheduleRemoval(id, remainingMs);
			} else {
				// Time's up, remove immediately
				setTimeout(() => {
					update((innerList) => innerList.filter((t) => t.id !== id));
				}, 0);
			}

			// Update toast state - mark when we resumed and update animation key
			toast.pausedAt = undefined;
			toast.resumedAt = now;
			toast.animationKey = now; // Force animation restart

			return list;
		});
	}

	function clear() {
		// Clear all timeouts
		timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
		timeouts.clear();

		// Clear all toasts
		set([]);
	}

	return { subscribe, show, dismiss, pause, resume, clear };
}

export const toasts = createToastStore();
