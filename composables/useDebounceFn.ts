// useDebounceFn.ts
import { onBeforeUnmount } from 'vue'

type Timeout = ReturnType<typeof setTimeout>

interface DebounceOptions {
  leading?: boolean
  trailing?: boolean  // default true
}

export function useDebounceFn<F extends (...args: any[]) => unknown>(
  fn: F,
  wait = 200,
  opts: DebounceOptions = {}
) {
  const { leading = false, trailing = true } = opts
  let timer: Timeout | null = null
  let lastArgs: Parameters<F> | null = null
  let pending = false

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const flush = () => {
    if (trailing && lastArgs) {
      const args = lastArgs
      lastArgs = null
      pending = false
      fn(...args)
    }
    clear()
  }

  const debounced = ((...args: Parameters<F>) => {
    lastArgs = args
    pending = true

    const callLeading = leading && !timer
    clear()

    if (callLeading) {
      pending = false
      fn(...args)
    }

    if (trailing || !callLeading) {
      timer = setTimeout(flush, wait)
    }
  }) as ((...args: Parameters<F>) => void) & {
    cancel: () => void
    flush: () => void
    pending: () => boolean
  }

  debounced.cancel = () => {
    lastArgs = null
    pending = false
    clear()
  }
  debounced.flush = flush
  debounced.pending = () => pending

  onBeforeUnmount(() => debounced.cancel())

  return debounced
}
