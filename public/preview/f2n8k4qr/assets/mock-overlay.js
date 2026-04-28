/**
 * mock-overlay.js
 * Caliber Web Studio — Universal Mock Prototype Overlay
 *
 * Drop <script src="mock-overlay.js"></script> into any mock site's <head> or before </body>.
 *
 * Business name resolution order:
 *   1. window.MOCK_BUSINESS (set in the page: window.MOCK_BUSINESS = "Luxe Aesthetics")
 *   2. <body data-business="Luxe Aesthetics">
 *   3. URL param: ?business=Luxe+Aesthetics
 *   4. Fallback: "Your Business"
 *
 * Walkthrough page resolution:
 *   - window.MOCK_WALKTHROUGH_URL  (override full URL)
 *   - Defaults to: walkthrough.html?business=...  (relative to current page)
 */

(function () {
  'use strict';

  /* ─── Business name ──────────────────────────────────────────── */
  function getBusinessName() {
    if (window.MOCK_BUSINESS && window.MOCK_BUSINESS.trim()) {
      return window.MOCK_BUSINESS.trim();
    }
    var bodyAttr = document.body && document.body.getAttribute('data-business');
    if (bodyAttr && bodyAttr.trim()) return bodyAttr.trim();
    var params = new URLSearchParams(window.location.search);
    var param = params.get('business');
    if (param && param.trim()) return decodeURIComponent(param.trim());
    return 'Your Business';
  }

  function getWalkthroughUrl(businessName) {
    if (window.MOCK_WALKTHROUGH_URL) return window.MOCK_WALKTHROUGH_URL;
    return 'walkthrough.html?business=' + encodeURIComponent(businessName);
  }

  /* ─── Styles ─────────────────────────────────────────────────── */
  function injectStyles(bannerHeight) {
    var css = [
      /* ---------- TOP BANNER ---------- */
      '#cws-mock-banner {',
      '  position: fixed;',
      '  top: 0; left: 0; right: 0;',
      '  z-index: 99999;',
      '  background: #141414;',
      '  height: ' + bannerHeight + 'px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  gap: 20px;',
      '  padding: 0 24px;',
      '  box-shadow: 0 2px 16px rgba(0,0,0,0.35);',
      '  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
      '}',
      '#cws-mock-banner-text {',
      '  color: #e8e8e8;',
      '  font-size: 13px;',
      '  font-weight: 400;',
      '  letter-spacing: 0.01em;',
      '  line-height: 1.4;',
      '  text-align: center;',
      '}',
      '#cws-mock-banner-text strong {',
      '  color: #ffffff;',
      '  font-weight: 600;',
      '}',
      '#cws-mock-banner-btn {',
      '  flex-shrink: 0;',
      '  display: inline-flex;',
      '  align-items: center;',
      '  gap: 6px;',
      '  padding: 8px 18px;',
      '  background: #C9A96E;',
      '  color: #141414;',
      '  font-family: inherit;',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.04em;',
      '  text-transform: uppercase;',
      '  border: none;',
      '  border-radius: 9999px;',
      '  cursor: pointer;',
      '  text-decoration: none;',
      '  transition: background 180ms ease, transform 120ms ease;',
      '  white-space: nowrap;',
      '}',
      '#cws-mock-banner-btn:hover {',
      '  background: #b8944f;',
      '  transform: translateY(-1px);',
      '}',
      /* ---- Close button ---- */
      '#cws-mock-banner-close {',
      '  position: absolute;',
      '  right: 14px;',
      '  top: 50%;',
      '  transform: translateY(-50%);',
      '  background: none;',
      '  border: none;',
      '  cursor: pointer;',
      '  padding: 4px;',
      '  color: #888;',
      '  font-size: 16px;',
      '  line-height: 1;',
      '  transition: color 150ms;',
      '}',
      '#cws-mock-banner-close:hover { color: #fff; }',

      /* ---------- BOTTOM FLOATING BAR ---------- */
      '#cws-mock-floater {',
      '  position: fixed;',
      '  bottom: 28px;',
      '  left: 50%;',
      '  transform: translateX(-50%);',
      '  z-index: 99999;',
      '  background: #141414;',
      '  border: 1px solid rgba(255,255,255,0.08);',
      '  border-radius: 9999px;',
      '  padding: 12px 20px 12px 24px;',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 16px;',
      '  box-shadow: 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3);',
      '  white-space: nowrap;',
      '  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
      '  animation: cwsFloaterIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;',
      '}',
      '@keyframes cwsFloaterIn {',
      '  from { opacity: 0; transform: translateX(-50%) translateY(20px); }',
      '  to   { opacity: 1; transform: translateX(-50%) translateY(0); }',
      '}',
      '#cws-mock-floater-text {',
      '  color: #c0c0c0;',
      '  font-size: 13px;',
      '  font-weight: 400;',
      '  letter-spacing: 0.01em;',
      '}',
      '#cws-mock-floater-text strong {',
      '  color: #ffffff;',
      '  font-weight: 600;',
      '}',
      '#cws-mock-floater-btn {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  gap: 6px;',
      '  padding: 9px 20px;',
      '  background: #ffffff;',
      '  color: #141414;',
      '  font-family: inherit;',
      '  font-size: 12px;',
      '  font-weight: 700;',
      '  letter-spacing: 0.04em;',
      '  text-transform: uppercase;',
      '  border: none;',
      '  border-radius: 9999px;',
      '  cursor: pointer;',
      '  text-decoration: none;',
      '  transition: background 180ms ease, transform 120ms ease;',
      '}',
      '#cws-mock-floater-btn:hover {',
      '  background: #e8e8e8;',
      '  transform: translateY(-1px);',
      '}',

      /* ---------- BODY OFFSET ---------- */
      '.cws-overlay-active {',
      '  padding-top: ' + bannerHeight + 'px !important;',
      '}',

      /* ---------- MOBILE ---------- */
      '@media (max-width: 640px) {',
      '  #cws-mock-banner { flex-direction: column; height: auto; padding: 10px 16px; gap: 8px; }',
      '  #cws-mock-banner-text { font-size: 12px; }',
      '  #cws-mock-banner-btn { font-size: 11px; padding: 7px 14px; }',
      '  #cws-mock-banner-close { top: 8px; transform: none; }',
      '  #cws-mock-floater { bottom: 16px; padding: 10px 14px 10px 18px; gap: 12px; }',
      '  #cws-mock-floater-text { font-size: 12px; }',
      '  #cws-mock-floater-btn { font-size: 11px; padding: 7px 14px; }',
      '}',
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'cws-mock-overlay-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ─── Render ─────────────────────────────────────────────────── */
  function render() {
    var BANNER_HEIGHT = 52;
    var businessName = getBusinessName();
    var walkthroughUrl = getWalkthroughUrl(businessName);

    injectStyles(BANNER_HEIGHT);

    /* ---- Top Banner ---- */
    var banner = document.createElement('div');
    banner.id = 'cws-mock-banner';
    banner.innerHTML =
      '<span id="cws-mock-banner-text">' +
        'Private website preview built for <strong>' + escHtml(businessName) + '</strong>' +
        ' &mdash; Designed by Caliber Web Studio' +
      '</span>' +
      '<a id="cws-mock-banner-btn" href="' + walkthroughUrl + '">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>' +
        'Book My Walkthrough' +
      '</a>' +
      '<button id="cws-mock-banner-close" aria-label="Dismiss preview banner" title="Dismiss">&#x2715;</button>';

    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add('cws-overlay-active');

    /* Close button */
    document.getElementById('cws-mock-banner-close').addEventListener('click', function () {
      banner.style.display = 'none';
      document.body.classList.remove('cws-overlay-active');
      // Re-check height since banner gone
      var floater = document.getElementById('cws-mock-floater');
      if (floater) floater.style.bottom = '28px';
    });

    /* ---- Bottom Floater (delayed entrance) ---- */
    setTimeout(function () {
      var floater = document.createElement('div');
      floater.id = 'cws-mock-floater';
      floater.innerHTML =
        '<span id="cws-mock-floater-text">' +
          'Custom preview built for <strong>' + escHtml(businessName) + '</strong>' +
        '</span>' +
        '<a id="cws-mock-floater-btn" href="' + walkthroughUrl + '">' +
          'Walk Me Through This' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
        '</a>';
      document.body.appendChild(floater);
    }, 800);
  }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ─── Init ───────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
