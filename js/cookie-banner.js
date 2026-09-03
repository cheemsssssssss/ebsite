/**
 * Cookie Consent Notification Banner for Google AdSense & GDPR Compliance
 */

(function () {
  'use strict';

  function initCookieBanner() {
    const consent = localStorage.getItem('ie_cookie_consent');
    if (consent) return; // Already accepted or dismissed

    const isEn = window.I18N_LANG === 'en';

    const banner = document.createElement('div');
    banner.id = 'ie-cookie-banner';
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <span class="cookie-consent-icon">🍪</span>
          <span>
            <span data-i18n="cookie_text">本站使用 Cookie 和本地存储技术以保障工具流畅运行并保存您的公式与排版偏好。浏览本站即表示您同意我们的</span>
            <a href="privacy.html" data-i18n="cookie_policy_link" style="text-decoration: underline; color: var(--brand-primary); font-weight: 600;">
              隐私政策
            </a>。
          </span>
        </div>
        <div class="cookie-consent-actions">
          <button id="btn-cookie-accept" class="btn btn-primary btn-sm" data-i18n="cookie_accept">
            同意并接受
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    const acceptBtn = document.getElementById('btn-cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('ie_cookie_consent', 'accepted');
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(20px)';
        setTimeout(() => banner.remove(), 250);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();
