export function useElementVisibility() {
  const isVisible = ref(false);
  const elementRef = ref<HTMLElement | null>(null);

  let observer: IntersectionObserver;

  const observeElement = () => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry.isIntersecting;
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    observer.observe(elementRef.value);
  };

  onMounted(() => {
    observeElement();
  });

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
    }
  });

  return { elementRef, isVisible };
}
