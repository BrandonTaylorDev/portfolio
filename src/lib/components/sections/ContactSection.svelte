<script lang="ts">
  import ParallaxGroup from '$lib/components/parallax/ParallaxGroup.svelte';
  import ParallaxLayerBase from '$lib/components/parallax/ParallaxLayerBase.svelte';
  import ParallaxContent from '$lib/components/parallax/ParallaxContent.svelte';
  import Icon from '@iconify/svelte';
  import { toasts } from '$lib/stores/toast';

  let formElement: HTMLFormElement | undefined;
  let isSubmitting = false;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!formElement) return;

    const formData = new FormData(formElement);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name || !email || !subject || !message) {
      toasts.show({ type: 'error', message: 'Please fill out all fields before sending.' });
      return;
    }

    isSubmitting = true;
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (response.ok && payload?.ok) {
        toasts.show({ type: 'success', message: payload.message ?? "Thanks! Your message was sent." });
        formElement.reset();
      } else {
        toasts.show({
          type: 'error',
          message: payload?.message ?? 'Sorry — I could not send your message. Please try again.'
        });
      }
    } catch {
      toasts.show({ type: 'error', message: 'Network error — please try again.' });
    } finally {
      isSubmitting = false;
    }
  }
</script>

<ParallaxGroup>
  <ParallaxLayerBase>
    <ParallaxContent>
      <div class="relative z-50 mx-auto max-w-2xl px-6 py-12">
        <!-- Form Header -->
        <div class="mb-8 text-center">
          <h2 class="animate-fade-in-bottom mb-4 text-3xl font-bold text-teal-400">
            Get In Touch
          </h2>
          <p class="animate-fade-in-bottom animation-delay-100 text-zinc-300 font-light">
            Have a question or want to work together? Fill out the form below.
          </p>
        </div>

        <!-- Form -->
        <form
          bind:this={formElement}
          on:submit={handleSubmit}
          class="animate-fade-in-bottom animation-delay-200 rounded-lg border-2 border-zinc-700 bg-zinc-800/70 p-8 shadow-lg transition-all duration-300 hover:border-teal-500"
        >
          <!-- User Info Section -->
          <section class="mb-6">
            <div class="mb-4">
              <label for="name" class="mb-2 block text-left text-sm font-medium text-zinc-300">
                Name <span class="text-teal-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                required
                class="w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div class="mb-4">
              <label for="email" class="mb-2 block text-left text-sm font-medium text-zinc-300">
                Email <span class="text-teal-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                required
                class="w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </section>

          <!-- Message Info Section -->
          <section class="mb-6">
            <div class="mb-4">
              <label for="subject" class="mb-2 block text-left text-sm font-medium text-zinc-300">
                Subject <span class="text-teal-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="What's this about?"
                required
                class="w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div class="mb-4">
              <label for="message" class="mb-2 block text-left text-sm font-medium text-zinc-300">
                Message <span class="text-teal-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me more..."
                required
                rows="6"
                class="w-full resize-none rounded-lg border-2 border-zinc-700 bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 transition-all duration-200 focus:border-teal-500 focus:outline-none"
              ></textarea>
            </div>
          </section>

          <!-- Form Actions -->
          <div class="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              class="group cursor-pointer inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-teal-600/50 px-8 py-4 text-lg font-medium text-zinc-100 shadow-lg transition-all duration-200 hover:bg-teal-500/70 hover:shadow-teal-500/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Sending…' : 'Send'}</span>
              <Icon 
                icon={isSubmitting ? "mdi:loading" : "mdi:send"} 
                class="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1 {isSubmitting ? 'animate-spin' : ''}" 
              />
            </button>
          </div>
        </form>
      </div>
    </ParallaxContent>
  </ParallaxLayerBase>
</ParallaxGroup>
