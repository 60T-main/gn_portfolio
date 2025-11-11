// let fadeTimeout: ReturnType<typeof setTimeout> | null = null;

export const fadeBodyBackground = (newUrl: string | null) => {
  const body = document.body;
  !newUrl ? body.style.backgroundImage = `none`:
  body.style.backgroundImage = `url("${newUrl}")`;
  };