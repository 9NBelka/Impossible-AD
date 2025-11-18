import { useEffect } from 'react';

export default function useAnalytics({ gtagId, adsId, gtmId }) {
  useEffect(() => {
    // Универсальная функция удаления
    const removeEl = (id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };

    // Очищаем старые скрипты
    removeEl('gtag-script');
    removeEl('ads-script');
    removeEl('gtm-script');
    removeEl('gtm-noscript');

    // Инициализация dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    gtag('js', new Date());

    // ============================
    // 1. GA4
    // ============================
    if (gtagId) {
      const script = document.createElement('script');
      script.id = 'gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
      document.head.appendChild(script);

      gtag('config', gtagId);
    }

    // ============================
    // 2. Google Ads
    // ============================
    if (adsId) {
      const script = document.createElement('script');
      script.id = 'ads-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${adsId}`;
      document.head.appendChild(script);

      gtag('config', adsId);
    }

    // ============================
    // 3. Google Tag Manager (script + noscript)
    // ============================
    if (gtmId) {
      // script
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.innerHTML = `
        (function(w,d,s,l,i){
          w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script);

      // noscript iframe в <body>
      const iframeWrap = document.createElement('noscript');
      iframeWrap.id = 'gtm-noscript';
      iframeWrap.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          height="0" width="0"
          style="display:none;visibility:hidden"></iframe>
      `;
      document.body.prepend(iframeWrap);
    }

    // Cleanup
    return () => {
      removeEl('gtag-script');
      removeEl('ads-script');
      removeEl('gtm-script');
      removeEl('gtm-noscript');
    };
  }, [gtagId, adsId, gtmId]);
}
