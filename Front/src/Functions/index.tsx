function scrollTo(section: string) {
  const element = document.getElementById(section);

  if (element) {
    const offset = -150; // set the offset value
    const options: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    };
    const scrollTop =
      element.getBoundingClientRect().top + window.scrollY + offset;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollTop, ...options });
    });
  }
}

export { scrollTo };
