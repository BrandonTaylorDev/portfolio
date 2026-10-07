/** Keep the server-rendered page visible; enhance it with one-time scroll reveals. */
export function scrollReveal(node: HTMLElement) {
	const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (preference.matches || !('IntersectionObserver' in window)) return;

	const targets: HTMLElement[] = [];
	for (const section of node.querySelectorAll<HTMLElement>('.profile-section')) {
		const introduction = section.querySelector<HTMLElement>('.contact-introduction');
		introduction?.querySelectorAll<HTMLElement>(':scope > *').forEach((item, index) => {
			item.classList.add('scroll-from-left');
			item.style.setProperty('--scroll-delay', `${index * 100}ms`);
			targets.push(item);
		});
		const heading = section.querySelector<HTMLElement>('.section-heading');
		if (heading) {
			heading.classList.add('scroll-fade');
			targets.push(heading);
		}
		const items = section.querySelectorAll<HTMLElement>(
			'.impact-card, .experience-row, .foundation-item, form'
		);
		items.forEach((item, index) => {
			item.style.setProperty('--scroll-delay', `${200 + index * 100}ms`);
			if (item.matches('.experience-row')) item.classList.add('scroll-fade');
			targets.push(item);
		});
	}

	const pending = new Set(targets);
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const target = entry.target as HTMLElement;
				if (!entry.isIntersecting || !pending.delete(target)) continue;
				target.classList.remove('scroll-pending');
				target.classList.add('scroll-revealed');
				observer.unobserve(target);
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
	);
	for (const target of targets) {
		target.classList.add('scroll-pending');
		observer.observe(target);
	}

	// Reveal focused controls immediately, including when reached before scrolling.
	function revealFocus(event: FocusEvent) {
		for (const target of pending) {
			if (!(event.target instanceof Node) || !target.contains(event.target)) continue;
			target.classList.remove('scroll-pending');
			pending.delete(target);
			observer.unobserve(target);
		}
	}
	function clearMotion() {
		observer.disconnect();
		for (const target of targets) {
			target.classList.remove(
				'scroll-pending',
				'scroll-revealed',
				'scroll-fade',
				'scroll-from-left'
			);
			target.style.removeProperty('--scroll-delay');
		}
		pending.clear();
	}
	function updatePreference() {
		if (preference.matches) clearMotion();
	}
	preference.addEventListener('change', updatePreference);
	node.addEventListener('focusin', revealFocus);

	return {
		destroy() {
			clearMotion();
			preference.removeEventListener('change', updatePreference);
			node.removeEventListener('focusin', revealFocus);
		}
	};
}
