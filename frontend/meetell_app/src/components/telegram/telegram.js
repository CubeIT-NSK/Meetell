export const loadTelegramWebApp = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      script.onload = () => {
        if (window.Telegram && window.Telegram.WebApp) {
          resolve();
        } else {
          reject(new Error('Telegram WebApp not available'));
        }
      };
      script.onerror = () => reject(new Error(`Failed to load script ${script.src}`));
      document.head.appendChild(script);
    });
  };
  