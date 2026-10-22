/* ==========================================================================
   CHEESE & CLOUD — SITE CONFIGURATION (single source of truth)
   --------------------------------------------------------------------------
   Change anything below and the whole page updates automatically:
   prices, product names, weights, hours, address, contacts, texts (PL + EN).

   Text placeholders you can use inside any string in `text`:
     {brand} {price} {toppingPrice} {dailySlices} {open} {close} {days}
     {street} {city} {district}
     {<productId>.name} {<productId>.price} {<productId>.weight}
     e.g. {cheesecake.price}  ->  "5,99 zł"
   ========================================================================== */
const CONFIG = {
  brand: 'CHEESE & CLOUD',
  siteUrl: 'https://3709966-maker.github.io/Bakeandearn/cheese-and-cloud/',
  defaultLang: 'pl', // 'pl' or 'en'
  dailySlices: 500,
  timeZone: 'Europe/Warsaw',

  hours: {
    open: '10:00',
    close: '22:00',
    days: { pl: 'Codziennie', en: 'Every day' }
  },

  location: {
    street: 'ul. Floriańska 1',
    postalCode: '31-019',
    city: 'Kraków',
    district: { pl: 'Stare Miasto', en: 'Old Town' },
    // Optional: paste the "Embed a map" src from Google Maps. Empty = built from the address.
    mapEmbedUrl: '',
    // Optional: your Google Maps place link. Empty = search link built from the address.
    mapLink: ''
  },

  contact: {
    phone: '+48 000 000 000',   // shown on the page
    whatsapp: '48000000000',    // digits only, with country code, no "+"
    telegram: 'cheeseandcloud', // Telegram username without "@"
    email: 'hello@cheeseandcloud.pl',
    instagram: 'https://www.instagram.com/cheeseandcloud/',
    tiktok: 'https://www.tiktok.com/@cheeseandcloud'
  },

  // Desserts. Add a third object here and a new menu card + form option appear automatically.
  products: [
    {
      id: 'cheesecake',
      price: 5.99,     // per slice, PLN
      weight: 121,     // grams per slice
      image: '',       // e.g. 'img/cheesecake.webp' (4:5 ratio). Empty = elegant placeholder.
      name: { pl: 'Sernik Baskijski', en: 'Basque Cheesecake' },
      altName: { pl: 'Basque Cheesecake', en: 'Sernik Baskijski' },
      desc: {
        pl: 'Karmelizowana, prawie spalona skórka i płynne, kremowe serce, które powoli rozpływa się na łyżeczce. Tylko serek, śmietanka, jajka i cukier — nic więcej.',
        en: 'A caramelised, almost-burnt top and a gooey, molten centre that melts slowly on the spoon. Just cream cheese, cream, eggs and sugar — nothing else.'
      },
      whole: {
        pl: 'Cały sernik · Ø 20 cm · ok. 12 kawałków',
        en: 'Whole cheesecake · Ø 20 cm · approx. 12 slices'
      }
    },
    {
      id: 'roll',
      price: 5.99,
      weight: 100,
      image: '',
      name: { pl: 'Rolada Bezowa', en: 'Classic Meringue Roll' },
      altName: { pl: 'Classic Meringue Roll', en: 'Rolada Bezowa' },
      desc: {
        pl: 'Chrupiąca z zewnątrz, miękka jak chmurka w środku. Zawinięta z lekkim kremem mascarpone i świeżymi owocami sezonowymi.',
        en: 'A crisp, crackly crust with a soft, cloud-like centre. Rolled with light mascarpone cream and fresh seasonal berries.'
      },
      whole: {
        pl: 'Cała rolada · ok. 30 cm · ok. 10 kawałków',
        en: 'Whole roll · approx. 30 cm · approx. 10 slices'
      }
    }
  ],

  toppings: {
    price: 3.5,
    items: [
      { pl: 'Słony karmel', en: 'Salted caramel' },
      { pl: 'Krem pistacjowy', en: 'Pistachio cream' },
      { pl: 'Świeże maliny', en: 'Fresh raspberries' },
      { pl: 'Gorzka czekolada', en: 'Dark chocolate' },
      { pl: 'Kruszonka maślana', en: 'Butter crumble' },
      { pl: 'Sos z marakui', en: 'Passion fruit sauce' }
    ]
  },

  form: {
    // Free key from https://web3forms.com (sent to your e-mail). Leave as is to use messenger only.
    web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
    // Where the order goes if Web3Forms is not set up or fails: 'whatsapp' or 'telegram'.
    fallbackMessenger: 'whatsapp',
    minLeadDays: 1, // earliest order date = today + N days
    maxQuantity: 10
  },

  text: {
    pl: {
      metaTitle: '{brand} — Sernik Baskijski i Rolada Bezowa w Krakowie · {price} za kawałek',
      metaDescription: 'Najkremowszy sernik baskijski i najlżejsza rolada bezowa w Krakowie. {price} za kawałek. Zamów cały deser z dostawą lub odbiorem.',
      skip: 'Przejdź do treści',
      openNow: 'Otwarte teraz',
      closedNow: 'Teraz zamknięte',
      nav: { menu: 'Menu', order: 'Zamów', location: 'Gdzie jesteśmy' },
      hero: {
        eyebrow: 'Fabryka dwóch deserów · {city}',
        title: 'Najkremowszy sernik baskijski i najlżejsza rolada bezowa w Krakowie.',
        priceLine: 'Tylko {price} za kawałek.',
        lead: 'Robimy tylko dwie rzeczy — i robimy je codziennie od rana, na świeżo.',
        ctaFind: 'Zobacz, gdzie jesteśmy',
        ctaOrder: 'Zamów cały deser',
        perSlice: 'za kawałek'
      },
      facts: [
        { k: '{price}', v: 'jedna cena za każdy kawałek' },
        { k: '{dailySlices}', v: 'świeżych kawałków dziennie' },
        { k: '{open}–{close}', v: '{days}, bez przerwy' }
      ],
      menu: {
        eyebrow: 'Menu',
        title: 'Dwa desery. Zero kompromisów.',
        perSlice: 'kawałek',
        orderWhole: 'Zamów całość',
        toppingsTitle: 'Dodatki',
        toppingsLead: 'Dowolny dodatek do każdego kawałka.'
      },
      order: {
        eyebrow: 'Zamówienie',
        title: 'Zamów cały deser',
        lead: 'Na urodziny, do biura albo po prostu dla siebie. Zostaw kontakt — oddzwonimy w ciągu godziny i potwierdzimy cenę oraz termin.',
        perks: ['Dostawa po Krakowie lub odbiór osobisty', 'Pieczemy na konkretny dzień', 'Płatność przy odbiorze'],
        name: 'Imię',
        phone: 'Telefon',
        dessert: 'Deser',
        quantity: 'Ilość',
        method: 'Odbiór czy dostawa?',
        pickup: 'Odbiór osobisty',
        delivery: 'Dostawa po Krakowie',
        address: 'Adres dostawy',
        date: 'Data',
        notes: 'Uwagi (opcjonalnie)',
        notesPh: 'Napis, dodatki, godzina…',
        consent: 'Zgadzam się na kontakt w sprawie zamówienia.',
        submit: 'Wyślij zamówienie',
        sending: 'Wysyłanie…',
        or: 'lub napisz od razu',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        successTitle: 'Dziękujemy! Zamówienie przyjęte.',
        successText: 'Oddzwonimy na numer {phone} w ciągu godziny ({open}–{close}).',
        successMore: 'Chcesz szybciej? Napisz do nas:',
        again: 'Złóż kolejne zamówienie',
        redirecting: 'Otwieramy komunikator z gotową wiadomością…',
        tgCopied: 'Wiadomość skopiowana — wklej ją w czacie Telegram.',
        errorSend: 'Nie udało się wysłać formularza. Otwieramy komunikator…',
        err: {
          name: 'Podaj imię (min. 2 znaki).',
          phone: 'Podaj poprawny numer telefonu.',
          dessert: 'Wybierz deser.',
          quantity: 'Ilość od 1 do {max}.',
          method: 'Wybierz odbiór lub dostawę.',
          address: 'Podaj adres dostawy.',
          date: 'Wybierz datę od {minDate}.',
          consent: 'Potrzebujemy zgody, aby się z Tobą skontaktować.'
        },
        msg: {
          hello: 'Cześć! Chcę zamówić cały deser w {brand}:',
          dessert: 'Deser',
          quantity: 'Ilość',
          method: 'Sposób',
          address: 'Adres',
          date: 'Data',
          name: 'Imię',
          phone: 'Telefon',
          notes: 'Uwagi'
        }
      },
      location: {
        eyebrow: 'Lokalizacja',
        title: 'Znajdziesz nas tutaj',
        scarcity: 'Pieczemy tylko {dailySlices} świeżych kawałków dziennie. Gdy się skończą — zamykamy!',
        hoursLabel: 'Godziny',
        addressLabel: 'Adres',
        contactLabel: 'Kontakt',
        directions: 'Wyznacz trasę',
        call: 'Zadzwoń',
        mapTitle: 'Mapa: {brand}, {street}, {city}'
      },
      footer: {
        tagline: 'Fabryka dwóch deserów w Krakowie.',
        rights: 'Wszelkie prawa zastrzeżone.',
        follow: 'Obserwuj nas'
      },
      sticky: 'Zamów cały deser'
    },

    en: {
      metaTitle: '{brand} — Basque Cheesecake & Meringue Roll in Krakow · {price} a slice',
      metaDescription: 'The creamiest Basque cheesecake and lightest meringue roll in Krakow. {price} per slice. Order a whole dessert for delivery or pickup.',
      skip: 'Skip to content',
      openNow: 'Open now',
      closedNow: 'Closed now',
      nav: { menu: 'Menu', order: 'Order', location: 'Find us' },
      hero: {
        eyebrow: 'The two-dessert factory · {city}',
        title: 'The creamiest Basque cheesecake & lightest meringue roll in Krakow.',
        priceLine: 'Just {price} per slice.',
        lead: 'We make only two things — and we bake them fresh every single morning.',
        ctaFind: 'Where to find us',
        ctaOrder: 'Order whole dessert',
        perSlice: 'per slice'
      },
      facts: [
        { k: '{price}', v: 'one price for every slice' },
        { k: '{dailySlices}', v: 'fresh slices baked daily' },
        { k: '{open}–{close}', v: '{days}, no breaks' }
      ],
      menu: {
        eyebrow: 'Menu',
        title: 'Two desserts. Zero compromises.',
        perSlice: 'slice',
        orderWhole: 'Order whole',
        toppingsTitle: 'Toppings',
        toppingsLead: 'Add any topping to any slice.'
      },
      order: {
        eyebrow: 'Order',
        title: 'Order a whole dessert',
        lead: 'For a birthday, the office or just for you. Leave your details — we call back within an hour to confirm the price and date.',
        perks: ['Delivery across Krakow or pickup', 'Baked fresh for your date', 'Pay on collection'],
        name: 'Name',
        phone: 'Phone',
        dessert: 'Dessert',
        quantity: 'Quantity',
        method: 'Pickup or delivery?',
        pickup: 'Pickup',
        delivery: 'Delivery in Krakow',
        address: 'Delivery address',
        date: 'Date',
        notes: 'Notes (optional)',
        notesPh: 'Lettering, toppings, time…',
        consent: 'I agree to be contacted about my order.',
        submit: 'Send order',
        sending: 'Sending…',
        or: 'or message us directly',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        successTitle: 'Thank you! Your order is in.',
        successText: 'We will call {phone} within an hour ({open}–{close}).',
        successMore: 'Want it faster? Message us:',
        again: 'Place another order',
        redirecting: 'Opening your messenger with a ready message…',
        tgCopied: 'Message copied — paste it into the Telegram chat.',
        errorSend: 'The form could not be sent. Opening your messenger…',
        err: {
          name: 'Please enter your name (min. 2 characters).',
          phone: 'Please enter a valid phone number.',
          dessert: 'Please choose a dessert.',
          quantity: 'Quantity from 1 to {max}.',
          method: 'Please choose pickup or delivery.',
          address: 'Please enter the delivery address.',
          date: 'Please choose a date from {minDate}.',
          consent: 'We need your consent to contact you.'
        },
        msg: {
          hello: 'Hi! I want to order a whole dessert from {brand}:',
          dessert: 'Dessert',
          quantity: 'Quantity',
          method: 'Method',
          address: 'Address',
          date: 'Date',
          name: 'Name',
          phone: 'Phone',
          notes: 'Notes'
        }
      },
      location: {
        eyebrow: 'Location',
        title: 'Come and find us',
        scarcity: "We bake only {dailySlices} fresh slices daily. When we're out, we close!",
        hoursLabel: 'Hours',
        addressLabel: 'Address',
        contactLabel: 'Contact',
        directions: 'Get directions',
        call: 'Call us',
        mapTitle: 'Map: {brand}, {street}, {city}'
      },
      footer: {
        tagline: 'The two-dessert factory in Krakow.',
        rights: 'All rights reserved.',
        follow: 'Follow us'
      },
      sticky: 'Order whole dessert'
    }
  }
};

/* ==========================================================================
   APPLICATION CODE — no need to edit below this line
   ========================================================================== */
(function () {
  'use strict';

  var LANGS = Object.keys(CONFIG.text);
  var lang = pickLang();
  var T = CONFIG.text[lang];
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- helpers ---------- */
  function pickLang() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && CONFIG.text[fromUrl]) return fromUrl;
    try {
      var saved = localStorage.getItem('cc-lang');
      if (saved && CONFIG.text[saved]) return saved;
    } catch (e) { /* storage blocked */ }
    return CONFIG.defaultLang;
  }

  function money(n) {
    var num = new Intl.NumberFormat(lang === 'pl' ? 'pl-PL' : 'en-GB', {
      minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2
    }).format(n);
    return lang === 'pl' ? num + ' zł' : num + ' PLN';
  }

  function local(v) { return v && typeof v === 'object' ? (v[lang] || v[CONFIG.defaultLang] || '') : (v == null ? '' : String(v)); }

  function getPath(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }

  function vars() {
    var v = {
      brand: CONFIG.brand,
      price: money(Math.min.apply(null, CONFIG.products.map(function (p) { return p.price; }))),
      toppingPrice: money(CONFIG.toppings.price),
      dailySlices: String(CONFIG.dailySlices),
      open: CONFIG.hours.open,
      close: CONFIG.hours.close,
      days: local(CONFIG.hours.days),
      street: CONFIG.location.street,
      city: CONFIG.location.city,
      district: local(CONFIG.location.district),
      phone: CONFIG.contact.phone
    };
    CONFIG.products.forEach(function (p) {
      v[p.id + '.name'] = local(p.name);
      v[p.id + '.price'] = money(p.price);
      v[p.id + '.weight'] = p.weight + ' g';
    });
    return v;
  }

  function fill(str, extra) {
    var v = vars();
    if (extra) Object.keys(extra).forEach(function (k) { v[k] = extra[k]; });
    return String(str).replace(/\{([\w.]+)\}/g, function (m, k) { return k in v ? v[k] : m; });
  }

  function t(key, extra) {
    var s = getPath(T, key);
    return s == null ? '' : fill(s, extra);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function track(event, data) {
    window.dataLayer = window.dataLayer || [];
    var payload = { event: event };
    Object.keys(data || {}).forEach(function (k) { payload[k] = data[k]; });
    window.dataLayer.push(payload);
  }

  function addressLine() {
    var L = CONFIG.location;
    return L.street + ', ' + L.postalCode + ' ' + L.city;
  }

  function mapLink() {
    return CONFIG.location.mapLink || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.brand + ', ' + addressLine());
  }

  function warsawNow() {
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: CONFIG.timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    return { date: o.year + '-' + o.month + '-' + o.day, minutes: (+o.hour) * 60 + (+o.minute) };
  }

  function toMinutes(hhmm) { var p = hhmm.split(':'); return (+p[0]) * 60 + (+p[1]); }

  function addDays(isoDate, n) {
    var d = new Date(isoDate + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function humanDate(iso) {
    return new Intl.DateTimeFormat(lang === 'pl' ? 'pl-PL' : 'en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC'
    }).format(new Date(iso + 'T12:00:00Z'));
  }

  /* ---------- static bindings ---------- */
  function renderStatic() {
    document.documentElement.lang = lang;
    document.title = t('metaTitle');
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('metaDescription'));
    var ogT = $('meta[property="og:title"]');
    if (ogT) ogT.setAttribute('content', t('metaTitle'));
    var ogD = $('meta[property="og:description"]');
    if (ogD) ogD.setAttribute('content', t('metaDescription'));

    // <el data-t="hero.title">  -> text from CONFIG.text[lang]
    $$('[data-t]').forEach(function (n) { n.textContent = t(n.getAttribute('data-t')); });
    // <el data-t-attr="placeholder:order.notesPh">
    $$('[data-t-attr]').forEach(function (n) {
      n.getAttribute('data-t-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        n.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    // <el data-cfg="hours"> -> derived values
    var derived = {
      brand: CONFIG.brand,
      hours: CONFIG.hours.open + '–' + CONFIG.hours.close,
      days: local(CONFIG.hours.days),
      city: CONFIG.location.city,
      district: local(CONFIG.location.district),
      street: CONFIG.location.street,
      address: addressLine(),
      phone: CONFIG.contact.phone,
      email: CONFIG.contact.email,
      price: vars().price,
      toppingPrice: '+' + money(CONFIG.toppings.price),
      year: String(new Date().getFullYear())
    };
    $$('[data-cfg]').forEach(function (n) {
      var k = n.getAttribute('data-cfg');
      if (k in derived) n.textContent = derived[k];
    });

    // <a data-link="instagram">
    var links = {
      instagram: CONFIG.contact.instagram,
      tiktok: CONFIG.contact.tiktok,
      whatsapp: 'https://wa.me/' + CONFIG.contact.whatsapp,
      telegram: 'https://t.me/' + CONFIG.contact.telegram,
      phone: 'tel:' + CONFIG.contact.phone.replace(/[^\d+]/g, ''),
      email: 'mailto:' + CONFIG.contact.email,
      map: mapLink()
    };
    $$('[data-link]').forEach(function (a) {
      var url = links[a.getAttribute('data-link')];
      if (url) a.setAttribute('href', url);
    });

    // Language switcher state
    $$('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });

    renderFacts();
    renderMenu();
    renderToppings();
    renderMap();
    renderFormOptions();
    renderSchema();
    updateOpenStatus();
  }

  function renderFacts() {
    var list = $('#facts');
    if (!list) return;
    list.innerHTML = '';
    (T.facts || []).forEach(function (f) {
      list.appendChild(el('li', { class: 'fact' }, [
        el('span', { class: 'fact__k', text: fill(f.k) }),
        el('span', { class: 'fact__v', text: fill(f.v) })
      ]));
    });
  }

  var SLICE_SVG = '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path d="M18 78 98 46v28L18 102z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 78 70 30l28 16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 78v24" stroke="currentColor" stroke-width="1.5"/></svg>';

  function renderMenu() {
    var grid = $('#menu-grid');
    if (!grid) return;
    grid.innerHTML = '';
    CONFIG.products.forEach(function (p, i) {
      var media;
      if (p.image) {
        media = el('img', {
          src: p.image, alt: local(p.name), width: '800', height: '1000',
          loading: 'lazy', decoding: 'async', class: 'card__img'
        });
      } else {
        media = el('div', { class: 'card__placeholder', role: 'img', 'aria-label': local(p.name) });
        media.innerHTML = SLICE_SVG + '<span>' + local(p.name) + '</span>';
      }
      var cta = el('a', {
        href: '#order', class: 'btn btn--dark btn--block',
        'data-track': 'order-' + p.id + '-click', 'data-product': p.id,
        text: t('menu.orderWhole') + ' — ' + local(p.name)
      });
      grid.appendChild(el('article', { class: 'card', id: 'product-' + p.id }, [
        el('figure', { class: 'card__media' }, [media]),
        el('div', { class: 'card__body' }, [
          el('p', { class: 'card__index', text: String(i + 1).padStart(2, '0') + ' / ' + local(p.altName) }),
          el('h3', { class: 'card__title', text: local(p.name) }),
          el('div', { class: 'card__meta' }, [
            el('span', { class: 'card__weight', text: p.weight + ' g · ' + t('menu.perSlice') }),
            el('span', { class: 'card__price', text: money(p.price) })
          ]),
          el('p', { class: 'card__desc', text: local(p.desc) }),
          el('p', { class: 'card__whole', text: local(p.whole) }),
          cta
        ])
      ]));
    });
  }

  function renderToppings() {
    var list = $('#toppings-list');
    if (!list) return;
    list.innerHTML = '';
    CONFIG.toppings.items.forEach(function (item) {
      list.appendChild(el('li', { class: 'chip', text: local(item) }));
    });
  }

  function renderMap() {
    var frame = $('#map-frame');
    if (!frame) return;
    var src = CONFIG.location.mapEmbedUrl ||
      'https://www.google.com/maps?q=' + encodeURIComponent(addressLine()) + '&z=16&output=embed';
    frame.setAttribute('title', t('location.mapTitle'));
    // Load the iframe only when the map is near the viewport (keeps the page fast).
    if (frame.getAttribute('src') === src) return;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { frame.setAttribute('src', src); io.disconnect(); }
      }, { rootMargin: '400px' });
      io.observe(frame);
    } else {
      frame.setAttribute('src', src);
    }
  }

  function renderFormOptions() {
    var select = $('#f-dessert');
    if (!select) return;
    var current = select.value;
    select.innerHTML = '';
    select.appendChild(el('option', { value: '', text: '—' }));
    CONFIG.products.forEach(function (p) {
      select.appendChild(el('option', { value: p.id, text: local(p.whole) }));
    });
    select.value = current;
    var qty = $('#f-quantity');
    if (qty) qty.setAttribute('max', String(CONFIG.form.maxQuantity));
    var date = $('#f-date');
    if (date) {
      var now = warsawNow();
      date.setAttribute('min', addDays(now.date, CONFIG.form.minLeadDays));
      date.setAttribute('max', addDays(now.date, 90));
    }
  }

  function renderSchema() {
    var node = $('#schema');
    if (!node) return;
    var data = {
      '@context': 'https://schema.org',
      '@type': 'Bakery',
      name: CONFIG.brand,
      url: CONFIG.siteUrl,
      telephone: CONFIG.contact.phone,
      email: CONFIG.contact.email,
      priceRange: money(Math.min.apply(null, CONFIG.products.map(function (p) { return p.price; }))),
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONFIG.location.street,
        postalCode: CONFIG.location.postalCode,
        addressLocality: CONFIG.location.city,
        addressCountry: 'PL'
      },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: CONFIG.hours.open,
        closes: CONFIG.hours.close
      }],
      sameAs: [CONFIG.contact.instagram, CONFIG.contact.tiktok],
      hasMenu: {
        '@type': 'Menu',
        hasMenuItem: CONFIG.products.map(function (p) {
          return {
            '@type': 'MenuItem',
            name: local(p.name),
            description: local(p.desc),
            offers: { '@type': 'Offer', price: p.price.toFixed(2), priceCurrency: 'PLN' }
          };
        })
      }
    };
    node.textContent = JSON.stringify(data);
  }

  function updateOpenStatus() {
    var now = warsawNow().minutes;
    var open = toMinutes(CONFIG.hours.open);
    var close = toMinutes(CONFIG.hours.close);
    var isOpen = close > open ? (now >= open && now < close) : (now >= open || now < close);
    $$('[data-status]').forEach(function (n) {
      n.textContent = isOpen ? t('openNow') : t('closedNow');
      n.classList.toggle('is-open', isOpen);
      n.classList.toggle('is-closed', !isOpen);
    });
  }

  /* ---------- language switch ---------- */
  function setLang(next) {
    if (!CONFIG.text[next] || next === lang) return;
    lang = next;
    T = CONFIG.text[lang];
    try { localStorage.setItem('cc-lang', lang); } catch (e) { /* storage blocked */ }
    var url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
    renderStatic();
    clearErrors();
  }

  /* ---------- order form ---------- */
  var form, statusBox;

  function fieldValue(name) {
    var f = form.elements[name];
    if (!f) return '';
    if (f.type === 'checkbox') return f.checked;
    return (f.value || '').trim();
  }

  function selectedProduct() {
    var id = fieldValue('dessert');
    for (var i = 0; i < CONFIG.products.length; i++) if (CONFIG.products[i].id === id) return CONFIG.products[i];
    return null;
  }

  function setError(name, message) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    if (!wrap) return;
    var msg = wrap.querySelector('.field__error');
    var inputs = wrap.querySelectorAll('input, select, textarea');
    wrap.classList.toggle('has-error', !!message);
    if (msg) msg.textContent = message || '';
    Array.prototype.forEach.call(inputs, function (i) {
      if (message) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid');
    });
  }

  function clearErrors() {
    if (!form) return;
    $$('[data-field]', form).forEach(function (w) { setError(w.getAttribute('data-field'), ''); });
  }

  function validate() {
    var errors = {};
    var minDate = $('#f-date').getAttribute('min');
    if (fieldValue('name').length < 2) errors.name = t('order.err.name');
    var digits = fieldValue('phone').replace(/\D/g, '');
    if (!/^\+?[\d\s()-]{9,20}$/.test(fieldValue('phone')) || digits.length < 9 || digits.length > 15) errors.phone = t('order.err.phone');
    if (!selectedProduct()) errors.dessert = t('order.err.dessert');
    var q = parseInt(fieldValue('quantity'), 10);
    if (!(q >= 1 && q <= CONFIG.form.maxQuantity)) errors.quantity = t('order.err.quantity', { max: CONFIG.form.maxQuantity });
    var method = fieldValue('method');
    if (method !== 'pickup' && method !== 'delivery') errors.method = t('order.err.method');
    if (method === 'delivery' && fieldValue('address').length < 5) errors.address = t('order.err.address');
    var d = fieldValue('date');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d < minDate) errors.date = t('order.err.date', { minDate: humanDate(minDate) });
    if (!fieldValue('consent')) errors.consent = t('order.err.consent');

    $$('[data-field]', form).forEach(function (w) {
      var n = w.getAttribute('data-field');
      setError(n, errors[n] || '');
    });
    var first = Object.keys(errors)[0];
    if (first) {
      var input = form.querySelector('[data-field="' + first + '"] input, [data-field="' + first + '"] select');
      if (input) input.focus();
    }
    return !first;
  }

  function orderData() {
    var p = selectedProduct();
    var method = fieldValue('method');
    return {
      name: fieldValue('name'),
      phone: fieldValue('phone'),
      dessert: p ? local(p.whole) : '',
      dessertId: p ? p.id : '',
      quantity: fieldValue('quantity'),
      method: method === 'delivery' ? t('order.delivery') : t('order.pickup'),
      address: method === 'delivery' ? fieldValue('address') : '',
      date: fieldValue('date') ? humanDate(fieldValue('date')) + ' (' + fieldValue('date') + ')' : '',
      notes: fieldValue('notes')
    };
  }

  function orderMessage(d) {
    var m = T.order.msg;
    var lines = [fill(m.hello), ''];
    var add = function (label, value) { if (value) lines.push('• ' + label + ': ' + value); };
    add(m.dessert, d.dessert);
    add(m.quantity, d.quantity);
    add(m.method, d.method);
    add(m.address, d.address);
    add(m.date, d.date);
    add(m.name, d.name);
    add(m.phone, d.phone);
    add(m.notes, d.notes);
    return lines.join('\n');
  }

  function showStatus(text, kind) {
    statusBox.textContent = text || '';
    statusBox.className = 'form__status' + (kind ? ' is-' + kind : '');
  }

  function openMessenger(channel, message) {
    if (channel === 'telegram') {
      // Telegram cannot pre-fill a direct chat via link, so the message is copied first.
      var go = function () { window.open('https://t.me/' + CONFIG.contact.telegram, '_blank', 'noopener'); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(message).then(function () { showStatus(t('order.tgCopied'), 'info'); go(); }, go);
      } else {
        go();
      }
    } else {
      window.open('https://wa.me/' + CONFIG.contact.whatsapp + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
    }
  }

  function web3formsReady() {
    var key = CONFIG.form.web3formsAccessKey;
    return !!key && key.indexOf('YOUR_') !== 0;
  }

  function showSuccess(d) {
    var box = $('#order-success');
    $('#order-success-text').textContent = t('order.successText', { phone: d.phone });
    form.hidden = true;
    box.hidden = false;
    box.focus();
  }

  function sendWeb3Forms(d, message) {
    var payload = {
      access_key: CONFIG.form.web3formsAccessKey,
      subject: CONFIG.brand + ' — ' + d.dessert + ' × ' + d.quantity + ' — ' + d.date,
      from_name: CONFIG.brand + ' website',
      botcheck: form.elements.botcheck.checked,
      name: d.name,
      phone: d.phone,
      dessert: d.dessert,
      quantity: d.quantity,
      method: d.method,
      address: d.address || '-',
      date: d.date,
      notes: d.notes || '-',
      language: lang,
      message: message
    };
    return fetch(form.getAttribute('action'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); }).then(function (res) {
      if (!res || !res.success) throw new Error(res && res.message ? res.message : 'Web3Forms error');
      return res;
    });
  }

  function handleSubmit(e, channel) {
    if (e) e.preventDefault();
    showStatus('');
    if (!validate()) return;

    var d = orderData();
    var message = orderMessage(d);
    var leadInfo = { dessert: d.dessertId, quantity: Number(d.quantity), fulfilment: fieldValue('method') };

    // Direct messenger buttons
    if (channel) {
      leadInfo.method = channel;
      track('generate_lead', leadInfo);
      openMessenger(channel, message);
      showSuccess(d);
      return;
    }

    // Main submit: Web3Forms, with messenger fallback
    var fallback = CONFIG.form.fallbackMessenger;
    if (!web3formsReady()) {
      leadInfo.method = fallback;
      track('generate_lead', leadInfo);
      showStatus(t('order.redirecting'), 'info');
      openMessenger(fallback, message);
      showSuccess(d);
      return;
    }

    var btn = $('#f-submit');
    btn.disabled = true;
    btn.textContent = t('order.sending');
    sendWeb3Forms(d, message).then(function () {
      leadInfo.method = 'web3forms';
      track('generate_lead', leadInfo);
      showSuccess(d);
    }).catch(function () {
      leadInfo.method = fallback;
      track('generate_lead', leadInfo);
      showStatus(t('order.errorSend'), 'error');
      openMessenger(fallback, message);
      showSuccess(d);
    }).then(function () {
      btn.disabled = false;
      btn.textContent = t('order.submit');
    });
  }

  function toggleAddress() {
    var wrap = $('[data-field="address"]');
    var isDelivery = fieldValue('method') === 'delivery';
    wrap.hidden = !isDelivery;
    $('#f-address').required = isDelivery;
    if (!isDelivery) setError('address', '');
  }

  function initForm() {
    form = $('#order-form');
    if (!form) return;
    statusBox = $('#form-status');

    form.addEventListener('submit', function (e) { handleSubmit(e, null); });
    $$('[data-send]', form).forEach(function (b) {
      b.addEventListener('click', function () { handleSubmit(null, b.getAttribute('data-send')); });
    });
    $$('input[name="method"]', form).forEach(function (r) { r.addEventListener('change', toggleAddress); });

    // Re-validate a field once the user fixes it
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('[data-field]');
      if (wrap && wrap.classList.contains('has-error')) setError(wrap.getAttribute('data-field'), '');
    });

    var started = false;
    form.addEventListener('focusin', function () {
      if (!started) { started = true; track('form_start', { form: 'whole-dessert-order' }); }
    });

    $('#order-again').addEventListener('click', function () {
      form.reset();
      toggleAddress();
      showStatus('');
      $('#order-success').hidden = true;
      form.hidden = false;
      $('#f-name').focus();
    });

    toggleAddress();
  }

  /* ---------- global interactions ---------- */
  function initInteractions() {
    document.addEventListener('click', function (e) {
      var tracked = e.target.closest('[data-track]');
      if (tracked) track('cta_click', { cta_id: tracked.getAttribute('data-track'), cta_text: tracked.textContent.trim().slice(0, 80) });

      var langBtn = e.target.closest('[data-lang]');
      if (langBtn) setLang(langBtn.getAttribute('data-lang'));

      // "Order whole" on a menu card pre-selects that dessert in the form
      var prod = e.target.closest('[data-product]');
      if (prod && form) {
        $('#f-dessert').value = prod.getAttribute('data-product');
        setError('dessert', '');
      }
    });

    // Hide the mobile sticky CTA while the order section is on screen
    var sticky = $('.sticky-cta');
    var orderSection = $('#order');
    if (sticky && orderSection && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        sticky.classList.toggle('is-hidden', entries[0].isIntersecting);
      }, { threshold: 0.15 }).observe(orderSection);
    }
  }

  function init() {
    if (LANGS.indexOf(lang) < 0) lang = LANGS[0];
    renderStatic();
    initForm();
    initInteractions();
    setInterval(updateOpenStatus, 60000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
