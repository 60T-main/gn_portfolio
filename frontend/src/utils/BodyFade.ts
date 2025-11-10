let fadeTimeout: ReturnType<typeof setTimeout> | null = null;

export const fadeBodyBackground = (newUrl: string) => {
    const body = document.body;
    if (fadeTimeout) {
    clearTimeout(fadeTimeout);
    fadeTimeout = null;
  }
    if (newUrl === "none") {
        body.style.backgroundImage = "none";
        body.classList.remove("fade-bg")
        body.style.removeProperty("--next-bg");
        body.style.removeProperty("--after-bg");
        body.style.removeProperty("--current-bg");
        body.style.removeProperty("--before-bg");
    return;
  }
    body.classList.add("fade-bg");
    body.style.setProperty("--next-bg", `url(${newUrl})`);
    body.style.setProperty("--current-bg", body.style.backgroundImage);

    // Set the pseudo-element's background
    body.style.setProperty("--after-bg", `url(${newUrl})`);
    body.style.setProperty("--before-bg", body.style.backgroundImage);

    // After the fade duration, set the real background and remove the class
fadeTimeout = setTimeout(() => {
  body.style.backgroundImage = `url(${newUrl})`;
  body.classList.remove("fade-bg");
  fadeTimeout = null;
}, 700); // match the CSS transition duration
  };