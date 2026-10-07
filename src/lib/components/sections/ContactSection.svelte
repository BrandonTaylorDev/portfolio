<script lang="ts">
	import { tick } from 'svelte';

	type Field = 'name' | 'email' | 'subject' | 'message';
	const fields: {
		name: Field;
		label: string;
		autocomplete?: 'name' | 'email';
		placeholder: string;
	}[] = [
		{ name: 'name', label: 'Name', autocomplete: 'name', placeholder: 'Your name' },
		{ name: 'email', label: 'Email', autocomplete: 'email', placeholder: 'you@company.com' },
		{ name: 'subject', label: 'Subject', placeholder: 'What would you like to discuss?' },
		{
			name: 'message',
			label: 'Message',
			placeholder: 'Share your question, idea, or project.'
		}
	];
	const emptyErrors = () => ({ name: '', email: '', subject: '', message: '' });
	let formElement: HTMLFormElement;
	let feedbackElement: HTMLDivElement;
	let errors = $state(emptyErrors());
	let isSubmitting = $state(false);
	let feedback = $state('');
	let feedbackType = $state<'success' | 'error' | ''>('');

	function validate(field: Field, value: string): string {
		if (!value.trim()) {
			return {
				name: 'Please enter your name.',
				email: 'Please enter your email address.',
				subject: 'Please enter a subject.',
				message: 'Please enter a message.'
			}[field];
		}
		if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
			return 'Please enter a valid email address.';
		return '';
	}

	function clearFeedback(field: Field) {
		errors[field] = '';
		feedback = '';
		feedbackType = '';
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (isSubmitting) return;
		const formData = new FormData(formElement);
		const values = {
			name: String(formData.get('name') ?? '').trim(),
			email: String(formData.get('email') ?? '').trim(),
			subject: String(formData.get('subject') ?? '').trim(),
			message: String(formData.get('message') ?? '').trim()
		};
		feedback = '';
		feedbackType = '';
		for (const field of fields) errors[field.name] = validate(field.name, values[field.name]);
		const firstInvalid = fields.find((field) => errors[field.name]);
		if (firstInvalid) {
			await tick();
			formElement.querySelector<HTMLElement>(`#contact-${firstInvalid.name}`)?.focus();
			return;
		}

		isSubmitting = true;
		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(values)
			});
			const payload = (await response.json().catch(() => null)) as {
				ok?: boolean;
				message?: string;
			} | null;
			if (response.ok && payload?.ok) {
				feedbackType = 'success';
				feedback = payload.message ?? 'Thank you. Your message was sent.';
				formElement.reset();
				errors = emptyErrors();
			} else {
				feedbackType = 'error';
				feedback = payload?.message ?? 'Unable to send your message. Please try again.';
			}
		} catch {
			feedbackType = 'error';
			feedback = 'Unable to connect. Please check your connection and try again.';
		} finally {
			isSubmitting = false;
			await tick();
			feedbackElement.focus();
		}
	}
</script>

<section id="contact" class="profile-section contact-section" aria-labelledby="contact-heading">
	<div class="contact-introduction">
		<p class="eyebrow">Let's connect</p>
		<h2 id="contact-heading">Good work starts<br />with a conversation.</h2>
		<p>
			Have a question, an idea to share, or a project to discuss? Send me a message. I'd be glad to
			connect.
		</p>
	</div>
	<form
		bind:this={formElement}
		onsubmit={handleSubmit}
		novalidate
		aria-label="Contact Brandon Taylor"
	>
		<p class="form-note">All fields are required.</p>
		<div class="form-grid">
			{#each fields as field}
				<div
					class="form-field"
					class:full-width={field.name === 'subject' || field.name === 'message'}
				>
					<label for={`contact-${field.name}`}>{field.label}</label>
					{#if field.name === 'message'}
						<textarea
							id={`contact-${field.name}`}
							name={field.name}
							rows="5"
							required
							placeholder={field.placeholder}
							aria-invalid={!!errors[field.name]}
							aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}
							onblur={(event) => {
								if (event.currentTarget.value || errors[field.name])
									errors[field.name] = validate(field.name, event.currentTarget.value);
							}}
							oninput={() => clearFeedback(field.name)}
						></textarea>
					{:else}
						<input
							id={`contact-${field.name}`}
							name={field.name}
							type={field.name === 'email' ? 'email' : 'text'}
							autocomplete={field.autocomplete}
							required
							placeholder={field.placeholder}
							aria-invalid={!!errors[field.name]}
							aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}
							onblur={(event) => {
								if (event.currentTarget.value || errors[field.name])
									errors[field.name] = validate(field.name, event.currentTarget.value);
							}}
							oninput={() => clearFeedback(field.name)}
						/>
					{/if}
					{#if errors[field.name]}<p id={`error-${field.name}`} class="field-error">
							{errors[field.name]}
						</p>{/if}
				</div>
			{/each}
		</div>
		<button
			class="button button-primary"
			type="submit"
			disabled={isSubmitting}
			aria-busy={isSubmitting}
			>{isSubmitting ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button
		>
		<div
			bind:this={feedbackElement}
			tabindex="-1"
			class="form-feedback"
			class:feedback-error={feedbackType === 'error'}
			class:feedback-success={feedbackType === 'success'}
			role="status"
			aria-live="polite"
			aria-atomic="true"
		>
			{feedback}
		</div>
	</form>
</section>
