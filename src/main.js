// Скрипт сторінки: калькулятор, форма заявки, згода на cookies, події для аналітики.
// Налаштування приходять з window.BLISS (генерується з data/settings.json під час збірки).
(function () {
  var C = window.BLISS || {};
  var T = C.t || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  // ---------- Аналітика ----------
  // Кожна подія йде в dataLayer (для GTM) і в gtag/fbq, якщо вони підключені напряму.
  function track(name, params) {
    params = params || {};
    window.dataLayer = window.dataLayer || [];
    var o = { event: name };
    for (var k in params) o[k] = params[k];
    window.dataLayer.push(o);
    if (C.ga4Id && window.gtag) window.gtag('event', name, params);
    if (window.fbq) {
      if (name === 'generate_lead') window.fbq('track', 'Lead');
      if (name === 'contact_click') window.fbq('track', 'Contact');
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    var method = h.indexOf('wa.me') > -1 ? 'whatsapp' : h.indexOf('tel:') === 0 ? 'phone'
      : h.indexOf('mailto:') === 0 ? 'email' : h.indexOf('instagram.com') > -1 ? 'instagram'
      : h.indexOf('t.me') > -1 ? 'telegram' : h.indexOf('facebook.com') > -1 ? 'facebook' : '';
    if (method) track('contact_click', { method: method });
    if (a.hasAttribute('data-lang')) store('lang', a.getAttribute('data-lang'));
  });

  // ---------- Згода на cookies (Google Consent Mode v2) ----------
  var GRANTED = { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' };
  var DENIED = { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

  function loadPixel() {
    if (!C.metaPixelId || window.fbq) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', C.metaPixelId);
    window.fbq('track', 'PageView');
  }

  function setConsent(ok) {
    store('consent', ok ? 'granted' : 'denied');
    if (window.gtag) window.gtag('consent', 'update', ok ? GRANTED : DENIED);
    track('consent_update', { consent: ok ? 'granted' : 'denied' });
    if (ok) loadPixel();
    var b = $('#consent'); if (b) b.hidden = true;
  }

  var banner = $('#consent');
  if (banner) {
    var saved = store('consent');
    if (saved === 'granted') loadPixel();
    else if (saved !== 'denied') banner.hidden = false;
    $('#consent-yes').addEventListener('click', function () { setConsent(true); });
    $('#consent-no').addEventListener('click', function () { setConsent(false); });
    var open = $('#cookie-settings');
    if (open) open.addEventListener('click', function () { banner.hidden = false; });
  }

  // ---------- Мова за замовчуванням (лише на головній польській) ----------
  if (C.isRoot && !store('lang') && !/bot|crawl|spider|lighthouse|google|bing|facebook/i.test(navigator.userAgent)) {
    var langs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.slice(0, 2).toLowerCase(); });
    var pick = null;
    for (var i = 0; i < langs.length && !pick; i++) {
      if (langs[i] === 'pl') pick = 'pl';
      else if (langs[i] === 'uk' || langs[i] === 'ru') pick = 'uk';
      else if (langs[i] === 'en') pick = 'en';
    }
    store('lang', pick || 'pl');
    if (pick && pick !== 'pl' && C.langUrls && C.langUrls[pick]) location.replace(C.langUrls[pick]);
  }

  // ---------- Калькулятор ----------
  var calc = $('#calc');
  function num(n) { return (Math.round(n * 10) / 10).toString().replace('.', C.decimal || ','); }
  function updCalc() {
    var g = parseInt($('#c-guests').value, 10) || 0;
    var opt = $('#c-flavor').selectedOptions[0];
    var price = parseFloat(opt.getAttribute('data-price')) || 0;
    var min = parseFloat((opt.getAttribute('data-min') || '2').split(/[–-]/)[0].replace(',', '.')) || 2;
    if (g < 1) { $('#c-kg').textContent = '—'; $('#c-price').textContent = '—'; return; }
    var lo = Math.max(min, g * 0.15), hi = Math.max(min, g * 0.2);
    lo = Math.round(lo * 10) / 10; hi = Math.round(hi * 10) / 10;
    $('#c-kg').textContent = (lo === hi ? num(lo) : num(lo) + '–' + num(hi)) + ' ' + T.kg;
    var plo = Math.round(lo * price / 5) * 5, phi = Math.round(hi * price / 5) * 5;
    $('#c-price').textContent = (plo === phi ? plo : plo + '–' + phi) + ' ' + T.cur;
    var note = T.min + ': ' + opt.getAttribute('data-min') + ' ' + T.kg;
    if (hi >= 8.5) note += ' · ' + T.tier3; else if (hi >= 5) note += ' · ' + T.tier2;
    $('#c-note').textContent = note;
  }
  if (calc) {
    $('#c-guests').addEventListener('input', updCalc);
    $('#c-flavor').addEventListener('change', updCalc);
    updCalc();
    $('#c-go').addEventListener('click', function () {
      var f = $('#lead');
      f.elements.guests.value = $('#c-guests').value + ' (' + $('#c-kg').textContent + ')';
      f.elements.flavor.value = $('#c-flavor').value;
      track('calculator_use', { guests: $('#c-guests').value });
    });
  }

  // ---------- Форма заявки ----------
  var form = $('#lead');
  if (!form) return;
  var started = false;
  form.addEventListener('input', function () {
    if (!started) { started = true; track('form_start'); }
  });

  function collect() {
    var out = [], els = form.querySelectorAll('[data-label]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], v = (el.value || '').trim();
      if (v) out.push([el.getAttribute('data-label'), v]);
    }
    return out;
  }
  function waLink(rows) {
    var text = T.waIntro + '\n' + rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(text);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('#lead-err');
    err.textContent = '';
    if (form.elements.website.value) return; // пастка для спам-ботів
    if (!form.elements.name.value.trim() || !form.elements.phone.value.trim() || !form.elements.date.value) {
      err.textContent = T.required; return;
    }
    if (!form.elements.consent.checked) { form.elements.consent.focus(); return; }

    var rows = collect();
    var wa = waLink(rows);
    var params = { form_product: form.elements.product.value, form_contact: form.elements.via.value };

    function done() {
      track('generate_lead', params);
      form.hidden = true;
      var ok = $('#lead-ok');
      $('#lead-wa').href = wa;
      ok.hidden = false;
      ok.scrollIntoView({ block: 'center' });
    }

    if (!C.formAccessKey) {
      track('generate_lead', params);
      window.open(wa, '_blank');
      form.hidden = true;
      $('#lead-wa').href = wa;
      $('#lead-ok').hidden = false;
      return;
    }

    var payload = {
      access_key: C.formAccessKey,
      subject: 'Bliscake: ' + form.elements.name.value + ' – ' + form.elements.date.value,
      from_name: 'Bliscake website (' + C.lang + ')'
    };
    rows.forEach(function (r) { payload[r[0]] = r[1]; });

    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = T.sending;
    fetch(C.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      done();
    }).catch(function () {
      btn.disabled = false; btn.textContent = T.submit;
      err.innerHTML = T.err + ' <a href="' + wa + '" target="_blank" rel="noopener">WhatsApp</a>';
    });
  });
})();
