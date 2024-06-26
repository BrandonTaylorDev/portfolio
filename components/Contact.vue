<script setup lang="ts">
  import { useReCaptcha } from 'vue-recaptcha-v3';

  useHead({
    script: [
      { src: 'https://www.google.com/recaptcha/api.js' }
    ]
  })

  const name = ref('')
  const email = ref('')
  const subject = ref('')
  const message = ref('')
  const submitted = ref(false)
  const messageSent = ref(false)
  const messageError = ref(false)
  const messageErrorText = ref('')
  const secondsLeft = ref(3)

  // initialize a instance
  const recaptchaInstance = useReCaptcha();

  const bufferAttempts = () => {
    submitted.value = false
    const i = setInterval(() => secondsLeft.value--, 1000)
    const t = setTimeout(() => {
      messageSent.value = false
      messageError.value = false
      secondsLeft.value = 3

      // clear the timers.
      clearInterval(i)
      clearTimeout(t)
    }, 3000)
  }

  const sendMessage = async () => {
    submitted.value = true
    if(name.value === '') {
      messageError.value = true
      messageErrorText.value = "I'd like to know who you are."
      bufferAttempts()
      return
    }

    if(email.value === '') {
      messageError.value = true
      messageErrorText.value = "I can't reply without knowing how to contact you."
      bufferAttempts()
      return
    }

    if(subject.value === '') {
      messageError.value = true
      messageErrorText.value = "Subjects are important to let me know that this message isn't spam."
      bufferAttempts()
      return
    }

    if(message.value === '') {
      messageError.value = true
      messageErrorText.value = "How can I reply if there isn't a message?"
      bufferAttempts()
      return
    }

    // ensure that ReCaptcha is loaded.
    await recaptchaInstance?.recaptchaLoaded();

    // get the token.
    const token = await recaptchaInstance?.executeRecaptcha('contact');

    // send an API call.
    const result = await $fetch(`/api/v1/form/send-message`, { method: 'POST', body: {
      token: token,
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value
    }})

    if(!result.success) {
      messageError.value = true
      messageErrorText.value = 'Failed to send e-mail.'
      bufferAttempts()
      return console.log(result)
    }

    name.value = ''
    email.value = ''
    subject.value = ''
    message.value = ''
    submitted.value = false
    messageSent.value = true
    bufferAttempts()
  }
</script>

<template>
  <section class="flex flex-col gap-4 justify-center items-center mt-8 px-8 lg:border-l-4 lg:border-slate-500 dark:lg:border-teal-600 text-xl md:text-lg">

    <!-- force a loading icon to load since Iconify doesn't support preloading right now. -->
    <icon name="mdi:loading" size="0em" class="absolute w-0 h-0" />

    <span class="text-xl text-slate-900 dark:text-slate-200">
      Want to Reach Out?
    </span>

    <form @submit.prevent="sendMessage" class="text-gray-600 max-w-xl mx-auto">
      <p class="text-gray-400 text-md">
        If you have a proposal, a question, or just want to say hi, I'd love to hear from you.
      </p>

      <text-field
        label="Name"
        rounded
        prepend-icon="mdi:abc"
        v-model="name"
        no-gutters
        type="text"
        class="mt-4 h-14"
      />

      <text-field
        label="E-mail"
        rounded
        prepend-icon="mdi:at"
        v-model="email"
        no-gutters
        type="email"
        class="mt-4 h-14"
      />

      <text-field
        label="Subject"
        rounded
        prepend-icon="mdi:text-subject"
        v-model="subject"
        no-gutters
        type="text"
        class="mt-4 h-14"
      />

      <text-area
        label="Message"
        rounded="xl"
        no-resize
        prepend-icon="mdi:message-text"
        v-model="message"
        no-gutters
        class="mt-4 h-14"
      />

      <span class="text-sm text-slate-300">
        This site is protected by reCAPTCHA and the Google
        <a class="text-teal-500 hover:text-teal-700 dark:text-teal-600 hover:dark:text-teal-500 transition-colors duration-200 hover:underline" href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a class="text-teal-500 hover:text-teal-700 dark:text-teal-600 hover:dark:text-teal-500 transition-colors duration-200 hover:underline" href="https://policies.google.com/terms">Terms of Service</a> apply.
      </span>

      <button :disabled="messageSent || messageError" type="submit" class="disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:text-slate-500 disabled:hover:bg-slate-300 disabled:border-slate-700 disabled:cursor-not-allowed dark:disabled:bg-slate-800 dark:hover:disabled:bg-slate-800 bg-teal-500 hover:bg-teal-600 dark:bg-teal-500/10 hover:dark:bg-teal-500/50 text-teal-50 dark:text-teal-500 hover:dark:text-teal-300 shadow dark:shadow-none dark:border-2 dark:border-teal-800 transition-colors duration-200 mt-4 px-3 py-1 text-sm rounded-full font-medium leading-4 w-full h-12 flex justify-center items-center gap-2">
        <icon :name="submitted ? 'mdi:loading' : 'mdi:email-fast'" :class="submitted ? 'animate-spin' : ''" size="1.75em" />
        <span class="uppercase">
          send message
        </span>
      </button>
    </form>

    <div :class="['bg-slate-900 cursor-default w-96 h-16 fixed top-4 right-4 z-50 rounded-full transition-opacity duration-200', messageSent ? 'opacity-100' : 'opacity-0']">
      <div class="bg-teal-500 hover:bg-teal-600 dark:bg-teal-500/10 hover:dark:bg-teal-500/50 text-teal-50 dark:text-teal-500 hover:dark:text-teal-300 shadow dark:shadow-none dark:border-2 dark:border-teal-800 h-full w-full rounded-full flex flex-col justify-center items-center transition-all duration-200">
        <span>
          Message sent successfully!
        </span>
        <span class="text-xs">
          Disappearing in {{ secondsLeft }} seconds
        </span>
      </div>
    </div>

    <div :class="['bg-slate-900 cursor-default w-96 h-16 fixed top-4 right-4 z-50 rounded-full transition-opacity duration-200', messageError ? 'opacity-100' : 'opacity-0']">
      <div class="bg-red-400 hover:bg-red-500 dark:bg-red-400/10 hover:dark:bg-red-900/50 text-red-50 dark:text-red-400 hover:dark:text-red-300 shadow dark:shadow-none dark:border-2 dark:border-red-900 h-full w-full rounded-full flex flex-col justify-center items-center transition-all duration-200">
        <span>
          Failed to send the message.
        </span>
        <span class="text-xs">
          Disappearing in {{ secondsLeft }} seconds
        </span>
      </div>
    </div>
  </section>
</template>

<style>
  .grecaptcha-badge { visibility: hidden; }
</style>
