/**
 * Cloudflare Turnstile for OEM RFQ native Shopify contact form (#oem-rfq-contact-form).
 * Gates POST until Turnstile returns a token (client-side). Shopify still handles the form.
 */
(function () {
  'use strict';

  var form = document.getElementById('oem-rfq-contact-form');
  var mount = document.getElementById('oem-turnstile-mount');
  if (!form || !mount) return;

  var siteKey = mount.getAttribute('data-sitekey');
  if (!siteKey) return;

  var mode = (mount.getAttribute('data-widget') || 'invisible').toLowerCase();
  var errEl = document.getElementById('oem-turnstile-error');
  var allowSubmit = false;
  var widgetId = null;
  var scriptRequested = false;
  var invisibleRanOnce = false;

  function showError(msg) {
    if (!errEl) return;
    errEl.textContent = msg || 'Security verification failed. Please try again.';
    errEl.hidden = false;
  }

  function hideError() {
    if (!errEl) return;
    errEl.hidden = true;
    errEl.textContent = '';
  }

  function setResponseToken(token) {
    var input = form.querySelector('input[name="cf-turnstile-response"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'cf-turnstile-response';
      form.appendChild(input);
    }
    input.value = token;
  }

  function clearResponseToken() {
    var input = form.querySelector('input[name="cf-turnstile-response"]');
    if (input) input.remove();
  }

  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve();
    if (scriptRequested) {
      return new Promise(function (resolve, reject) {
        var n = 0;
        var t = setInterval(function () {
          if (window.turnstile) {
            clearInterval(t);
            resolve();
          } else if (++n > 120) {
            clearInterval(t);
            reject(new Error('timeout'));
          }
        }, 50);
      });
    }
    scriptRequested = true;
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = function () {
        resolve();
      };
      s.onerror = function () {
        scriptRequested = false;
        reject(new Error('script'));
      };
      document.head.appendChild(s);
    });
  }

  function renderManaged() {
    return loadTurnstile().then(function () {
      if (widgetId !== null) return widgetId;
      widgetId = window.turnstile.render('#oem-turnstile-mount', {
        sitekey: siteKey,
        appearance: 'interaction-only',
        size: 'flexible',
        callback: function (token) {
          hideError();
          setResponseToken(token);
        },
        'error-callback': function () {
          showError('Could not complete the security check. Please refresh and try again.');
        },
        'expired-callback': function () {
          clearResponseToken();
          if (widgetId !== null) window.turnstile.reset(widgetId);
        },
      });
      return widgetId;
    });
  }

  function renderInvisible() {
    return loadTurnstile().then(function () {
      if (widgetId !== null) return widgetId;
      widgetId = window.turnstile.render('#oem-turnstile-mount', {
        sitekey: siteKey,
        size: 'invisible',
        callback: function (token) {
          hideError();
          setResponseToken(token);
          allowSubmit = true;
          if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
          } else {
            form.submit();
          }
        },
        'error-callback': function () {
          showError('Could not verify the request. Please check your connection and try again.');
        },
        'expired-callback': function () {
          clearResponseToken();
          if (widgetId !== null) window.turnstile.reset(widgetId);
        },
      });
      return widgetId;
    });
  }

  function submitWithManagedToken() {
    var token = widgetId !== null ? window.turnstile.getResponse(widgetId) : '';
    if (!token) {
      showError('Security check is still finishing. Please wait a moment and try again.');
      return;
    }
    setResponseToken(token);
    allowSubmit = true;
    if (typeof form.requestSubmit === 'function') {
      form.requestSubmit();
    } else {
      form.submit();
    }
  }

  form.addEventListener(
    'submit',
    function (e) {
      if (allowSubmit) {
        allowSubmit = false;
        return;
      }

      e.preventDefault();
      hideError();

      if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
        return;
      }

      if (mode === 'managed') {
        if (widgetId === null) {
          showError('Security check is still loading. Please try again in a moment.');
          return;
        }
        submitWithManagedToken();
        return;
      }

      /* invisible */
      renderInvisible()
        .then(function (wid) {
          clearResponseToken();
          if (invisibleRanOnce) {
            window.turnstile.reset(wid);
          }
          invisibleRanOnce = true;
          window.turnstile.execute(wid);
        })
        .catch(function () {
          showError('Could not load security verification. Please try again.');
        });
    },
    false
  );

  if (mode === 'managed') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        renderManaged().catch(function () {
          showError('Could not load security verification. Please refresh the page.');
        });
      });
    } else {
      renderManaged().catch(function () {
        showError('Could not load security verification. Please refresh the page.');
      });
    }
  }
})();
