#!/usr/bin/env node
// Збирає сайт з data/*.json у папку dist/. Запуск: node build.js
// Без залежностей, потрібен лише Node.js 18+.
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

const S = read('data/settings.json');
const PRICES = read('data/prices.json');
const GALLERY = read('data/gallery.json');
const LANGS = ['pl', 'uk', 'en'];
const I = Object.fromEntries(LANGS.map((l) => [l, read(`data/i18n/${l}.json`)]));
const CSS = fs.readFileSync(path.join(ROOT, 'src/style.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '');

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const addr = `${S.address.street}, ${S.address.postalCode} ${S.address.city}`;
const vars = {
  deposit: S.deposit, leadTime: S.leadTime, reviews: S.reviewsCount, priceFrom: S.priceFrom,
  company: S.company.name, nip: S.company.nip, regon: S.company.regon, address: addr, email: S.email
};
// Підставляє {deposit} тощо. Тексти з data/i18n довірені (їх пише власник), тому HTML у них дозволений.
const fill = (s) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
const imgExists = (src) => src && fs.existsSync(path.join(ROOT, 'img', src));

// Шляхи сторінок відносно кореня сайту
const pagePath = (lang, sub = '') => (lang === 'pl' ? '' : lang + '/') + sub;
const relRoot = (p) => '../'.repeat(p.split('/').filter(Boolean).length);
// node build.js --local: посилання ведуть прямо на index.html (щоб відкривати файли з диска)
const LOCAL = process.argv.includes('--local');
const href = (lang, sub = '') => pagePath(lang, sub) + (LOCAL ? 'index.html' : '');
const absUrl = (p) => S.siteUrl.replace(/\/$/, '') + '/' + p;

function priceHtml(item, t) {
  if (item.priceText) return esc(item.priceText[t.lang]);
  const unit = item.unit ? ` <small>${t.units.per} ${t.units[item.unit]}</small>` : '';
  return `${item.prefix || ''}${item.price} ${t.units.cur}${unit}`;
}

function itemHtml(item, t) {
  const L = t.lang;
  const meta = [];
  if (item.min) meta.push(`${t.units.from} ${item.min} ${t.units.kg}`);
  if (item.weight) meta.push(item.weight);
  if (item.note) meta.push(esc(item.note[L]));
  return `<li><div class="item-row"><span class="item-name">${esc(item.name[L])}</span><span class="item-price">${priceHtml(item, t)}</span></div>` +
    (meta.length ? `<div class="item-meta">${meta.join(' · ')}</div>` : '') +
    (item.desc ? `<p class="item-desc">${esc(item.desc[L])}</p>` : '') + '</li>';
}

function trackingHead() {
  // Consent Mode v2: усе вимкнено до згоди відвідувача
  let h = `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}` +
    `gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});` +
    `try{if(localStorage.getItem('consent')==='granted')gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'})}catch(e){}</script>`;
  if (S.gtmId) {
    h += `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${esc(S.gtmId)}');</script>`;
  }
  if (S.ga4Id) {
    h += `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(S.ga4Id)}"></script><script>gtag('js',new Date());gtag('config','${esc(S.ga4Id)}');</script>`;
  }
  return h;
}
const hasTracking = () => Boolean(S.gtmId || S.ga4Id || S.metaPixelId);

function head(t, p, title, desc, alternates) {
  const alt = alternates ? LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${absUrl(alternates(l))}">`).join('') +
    `<link rel="alternate" hreflang="x-default" href="${absUrl(alternates('pl'))}">` : '';
  return `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${absUrl(p)}">${alt}
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${absUrl(p)}">${imgExists(GALLERY.hero.src) ? `<meta property="og:image" content="${absUrl('img/' + GALLERY.hero.src)}">` : ''}
<meta name="theme-color" content="#faf7f4">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%238e3b4a'/%3E%3Ctext x='16' y='22' font-size='18' text-anchor='middle' fill='white' font-family='Georgia'%3EB%3C/text%3E%3C/svg%3E">
${trackingHead()}
<style>${CSS}</style></head><body>
${S.gtmId ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${esc(S.gtmId)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : ''}`;
}

function header(t, r, sub) {
  const nav = !sub ? `<nav class="menu" aria-label="Menu"><a href="#how">${t.nav.how}</a><a href="#prices">${t.nav.prices}</a><a href="#faq">${t.nav.faq}</a><a href="#contact">${t.nav.contact}</a></nav>` : '';
  const langs = LANGS.map((l) => `<a href="${r}${href(l, sub)}" hreflang="${l}" lang="${l}" data-lang="${l}"${l === t.lang ? ' aria-current="page"' : ''}>${l === 'uk' ? 'UA' : l.toUpperCase()}</a>`).join('');
  return `<header class="top"><div class="wrap"><a class="logo" href="${r}${href(t.lang)}">${esc(S.brand)}</a>${nav}<div class="langs">${langs}</div>${!sub ? `<a class="btn" href="#order">${t.nav.cta}</a>` : ''}</div></header>`;
}

function footer(t, r) {
  return `<footer><div class="wrap"><span>© ${new Date().getFullYear()} ${esc(S.company.name)} · NIP ${S.company.nip} · REGON ${S.company.regon}</span>
<span><a href="${r}${href(t.lang, 'privacy/')}">${t.footer.privacy}</a>${hasTracking() ? ` · <button type="button" class="linkbtn" id="cookie-settings">${t.footer.cookies}</button>` : ''}</span></div></footer>` +
    (hasTracking() ? `<div class="consent" id="consent" role="dialog" aria-live="polite" hidden><p style="margin:0">${t.consent.text} <a href="${r}${href(t.lang, 'privacy/')}">${t.footer.privacy}</a></p><div class="actions"><button class="btn" id="consent-yes">${t.consent.accept}</button><button class="btn ghost" id="consent-no">${t.consent.reject}</button></div></div>` : '');
}

function clientConfig(t, r) {
  const cfg = {
    lang: t.lang, isRoot: t.lang === 'pl', whatsapp: S.whatsapp, formEndpoint: S.formEndpoint, formAccessKey: S.formAccessKey,
    ga4Id: S.ga4Id, metaPixelId: S.metaPixelId, decimal: t.lang === 'en' ? '.' : ',',
    langUrls: Object.fromEntries(LANGS.map((l) => [l, r + href(l)])),
    t: Object.assign({}, t.calc, t.form, { kg: t.units.kg, cur: t.units.cur })
  };
  return `<script>window.BLISS=${JSON.stringify(cfg).replace(/</g, '\\u003c')}</script><script src="${r}assets/main.js" defer></script>`;
}

function jsonLd(t) {
  const d = {
    '@context': 'https://schema.org', '@type': 'Bakery', name: S.brand, url: absUrl(pagePath(t.lang)),
    telephone: S.phone, email: S.email, priceRange: `${S.priceFrom}+ PLN`,
    address: { '@type': 'PostalAddress', streetAddress: S.address.street, postalCode: S.address.postalCode, addressLocality: S.address.city, addressCountry: 'PL' },
    sameAs: [S.instagram, S.facebook, S.mapsUrl].filter(Boolean)
  };
  if (imgExists(GALLERY.hero.src)) d.image = absUrl('img/' + GALLERY.hero.src);
  return `<script type="application/ld+json">${JSON.stringify(d)}</script>`;
}

function homePage(lang) {
  const t = I[lang];
  const p = pagePath(lang);
  const r = relRoot(p);
  const wa = `https://wa.me/${S.whatsapp}`;
  const tel = 'tel:' + S.phone.replace(/\s/g, '');
  const cakes = PRICES.categories.find((c) => c.calculator) || PRICES.categories[0];
  const hero = imgExists(GALLERY.hero.src) ? GALLERY.hero : null;
  const photos = GALLERY.photos.filter((ph) => imgExists(ph.src));
  const stars = S.rating ? `<span class="stars">★★★★★</span> <b>${esc(S.rating)}</b> · ` : '<span class="stars">★★★★★</span> ';
  const sel = (name, label, opts, extra = '') => `<div class="field"><label for="f-${name}">${label}</label><select id="f-${name}" name="${name}" data-label="${esc(label)}"${extra}>${opts}</select></div>`;
  const opts = (arr) => arr.map((o) => `<option>${esc(o)}</option>`).join('');
  const flavorOpts = cakes.items.map((it) => `<option value="${esc(it.name[lang])}" data-price="${it.price}" data-min="${esc(it.min || '2')}">${esc(it.name[lang])} – ${it.price} ${t.units.cur}/${t.units.kg}</option>`).join('');

  return head(t, p, t.metaTitle, fill(t.metaDescription), (l) => pagePath(l)) + header(t, r, '') + `
<main>
<section class="hero${hero ? ' has-img' : ''}"><div class="wrap"><div>
<div class="eyebrow">${t.hero.eyebrow}</div>
<h1>${t.hero.title}</h1>
<p class="lead">${fill(t.hero.lead)}</p>
<div class="actions"><a class="btn" href="#order">${t.hero.cta}</a><a class="btn ghost" href="${wa}" target="_blank" rel="noopener">${t.hero.ctaSecondary}</a></div>
<ul class="facts">${t.hero.facts.map((f) => `<li>${fill(f)}</li>`).join('')}</ul>
<a class="rating" href="${esc(S.reviewsUrl)}" target="_blank" rel="noopener">${stars}${fill(t.hero.reviews)}</a>
</div>${hero ? `<div class="hero-img"><img src="${r}img/${hero.src}" alt="${esc(hero.alt[lang])}" width="900" height="1125" fetchpriority="high"></div>` : ''}</div></section>

${photos.length ? `<section class="alt" id="gallery"><div class="wrap"><h2>${t.gallery.title}</h2>
<div class="gallery">${photos.map((ph) => `<img src="${r}img/${ph.src}" alt="${esc(ph.alt[lang])}" width="600" height="750" loading="lazy" decoding="async">`).join('')}</div>
<a class="btn ghost" href="${esc(S.instagram)}" target="_blank" rel="noopener">${t.gallery.more} ${esc(S.instagramHandle)}</a></div></section>` : ''}

<section id="why"><div class="wrap"><h2>${t.why.title}</h2>
<div class="grid">${t.why.items.map((it) => `<div class="card"><h3>${fill(it.t)}</h3><p>${fill(it.d)}</p></div>`).join('')}</div></div></section>

<section class="alt" id="how"><div class="wrap"><h2>${t.steps.title}</h2>
<div class="grid">${t.steps.items.map((it, i) => `<div class="card"><div class="step-n">${i + 1}</div><h3>${fill(it.t)}</h3><p>${fill(it.d)}</p></div>`).join('')}</div>
<div class="actions"><a class="btn" href="#order">${t.hero.cta}</a></div></div></section>

<section id="calculator"><div class="wrap narrow"><h2>${t.calc.title}</h2><p class="lead">${t.calc.lead}</p>
<div class="calc" id="calc"><div>
<div class="field"><label for="c-guests">${t.calc.guests}</label><input id="c-guests" type="number" min="1" max="500" value="15" inputmode="numeric"></div>
<div class="field"><label for="c-flavor">${t.calc.flavor}</label><select id="c-flavor">${flavorOpts}</select></div>
</div><div class="out" aria-live="polite">
<div class="small">${t.calc.weight}</div><div class="big" id="c-kg">—</div>
<div class="small" style="margin-top:12px">${t.calc.price}</div><div class="big" id="c-price">—</div>
<div class="small" id="c-note"></div><div class="small">${t.calc.decor}</div>
<a class="btn" id="c-go" href="#order" style="margin-top:14px;width:100%">${t.calc.cta}</a>
</div></div></div></section>

<section class="alt" id="prices"><div class="wrap narrow"><h2>${t.prices.title}</h2><p class="lead">${t.prices.lead}</p>
<div class="rules">${t.prices.rules.map((it) => `<div><b>${fill(it.t)}</b><span>${fill(it.d)}</span></div>`).join('')}</div>
${PRICES.categories.map((c, i) => `<details class="cat"${i === 0 ? ' open' : ''} id="p-${c.id}"><summary>${esc(c.title[lang])}</summary>${c.note ? `<p class="cat-note">${esc(c.note[lang])}</p>` : ''}<ul class="items">${c.items.map((it) => itemHtml(it, t)).join('')}</ul></details>`).join('')}
<div class="actions"><a class="btn" href="#order">${t.hero.cta}</a></div></div></section>

<section id="reviews"><div class="wrap narrow"><h2>${t.reviews.title}</h2><p class="lead">${t.reviews.lead}</p>
<a class="rating" href="${esc(S.reviewsUrl)}" target="_blank" rel="noopener">${stars}${fill(t.reviews.cta)} →</a></div></section>

<section class="alt" id="order"><div class="wrap narrow"><h2>${t.form.title}</h2><p class="lead">${t.form.lead}</p>
<form class="form" id="lead" novalidate>
<div class="row2">
<div class="field"><label for="f-name">${t.form.name} *</label><input id="f-name" name="name" autocomplete="name" required data-label="${esc(t.form.name)}"></div>
<div class="field"><label for="f-phone">${t.form.phone} *</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required data-label="${esc(t.form.phone)}"></div>
${sel('via', t.form.contactVia, opts(t.form.contactOptions))}
<div class="field"><label for="f-date">${t.form.date} *</label><input id="f-date" name="date" type="date" required data-label="${esc(t.form.date)}"></div>
${sel('product', t.form.product, opts(t.form.productOptions))}
<div class="field"><label for="f-guests">${t.form.guests}</label><input id="f-guests" name="guests" data-label="${esc(t.form.guests)}"></div>
${sel('flavor', t.form.flavor, `<option value="${esc(t.form.flavorAny)}">${esc(t.form.flavorAny)}</option>` + cakes.items.map((it) => `<option>${esc(it.name[lang])}</option>`).join(''))}
${sel('delivery', t.form.delivery, opts(t.form.deliveryOptions))}
</div>
<div class="field"><label for="f-design">${t.form.design}</label><textarea id="f-design" name="design" placeholder="${esc(t.form.designPh)}" data-label="${esc(t.form.design)}"></textarea></div>
<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
<label class="check"><input type="checkbox" name="consent" required> <span>${t.form.consent} <a href="${r}${href(lang, 'privacy/')}">${t.form.privacy}</a></span></label>
<button class="btn" type="submit" style="width:100%;margin-top:16px">${t.form.submit}</button>
<div class="err" id="lead-err" role="alert"></div>
<p class="note">${t.form.note}</p>
</form>
<div class="form-msg" id="lead-ok" hidden><h3>${t.form.okTitle}</h3><p>${t.form.okText}</p><a class="btn" id="lead-wa" href="${wa}" target="_blank" rel="noopener">WhatsApp</a></div>
</div></section>

<section class="faq" id="faq"><div class="wrap narrow"><h2>${t.faq.title}</h2>
${t.faq.items.map((it) => `<details><summary>${fill(it.q)}</summary><p>${fill(it.a)}</p></details>`).join('')}
</div></section>

<section class="alt" id="contact"><div class="wrap"><h2>${t.contact.title}</h2>
<div class="contacts">
<div><h3>${t.contact.phone}</h3><p><a href="${tel}">${esc(S.phone)}</a><br><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a>${S.telegram ? ` · <a href="https://t.me/${esc(S.telegram)}" target="_blank" rel="noopener">Telegram</a>` : ''}</p></div>
<div><h3>${t.contact.address}</h3><p>${esc(S.address.place)}<br>${esc(addr)}<br><a href="${esc(S.mapsUrl)}" target="_blank" rel="noopener">${t.contact.map}</a></p></div>
<div><h3>${t.contact.email}</h3><p><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p></div>
<div><h3>${t.contact.social}</h3><p><a href="${esc(S.instagram)}" target="_blank" rel="noopener">Instagram ${esc(S.instagramHandle)}</a><br><a href="${esc(S.facebook)}" target="_blank" rel="noopener">Facebook</a></p></div>
</div></div></section>
</main>
<div class="mbar"><a class="btn ghost" href="${wa}" target="_blank" rel="noopener">WhatsApp</a><a class="btn" href="#order">${t.nav.cta}</a></div>
` + footer(t, r) + jsonLd(t) + clientConfig(t, r) + '</body></html>\n';
}

function privacyPage(lang) {
  const t = I[lang];
  const p = pagePath(lang, 'privacy/');
  const r = relRoot(p);
  return head(t, p, `${t.privacyPage.title} – ${S.brand}`, t.privacyPage.title, (l) => pagePath(l, 'privacy/')) + header(t, r, 'privacy/') +
    `<main><section><div class="wrap narrow"><h1>${t.privacyPage.title}</h1>${t.privacyPage.body.map((b) => `<p>${esc(fill(b))}</p>`).join('')}
<p><a href="${r}${href(lang)}">← ${t.privacyPage.back}</a></p></div></section></main>` + footer(t, r) + clientConfig(t, r) + '</body></html>\n';
}

// ---------- Запис файлів ----------
fs.rmSync(OUT, { recursive: true, force: true });
const write = (p, content) => {
  const f = path.join(OUT, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};
for (const l of LANGS) {
  write(pagePath(l, 'index.html'), homePage(l));
  write(pagePath(l, 'privacy/index.html'), privacyPage(l));
}
write('assets/main.js', fs.readFileSync(path.join(ROOT, 'src/main.js'), 'utf8'));
if (fs.existsSync(path.join(ROOT, 'img'))) fs.cpSync(path.join(ROOT, 'img'), path.join(OUT, 'img'), { recursive: true, filter: (f) => !/README/i.test(f) });
// Окремий сайт CHEESE & CLOUD: копіюється як є в dist/cheese-and-cloud/
if (fs.existsSync(path.join(ROOT, 'cheese-and-cloud'))) fs.cpSync(path.join(ROOT, 'cheese-and-cloud'), path.join(OUT, 'cheese-and-cloud'), { recursive: true });
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${absUrl('sitemap.xml')}\n`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  LANGS.map((l) => `<url><loc>${absUrl(pagePath(l))}</loc></url>`).join('\n') + '\n</urlset>\n');
if (S.customDomain) write('CNAME', S.customDomain + '\n');
write('.nojekyll', '');

const size = fs.statSync(path.join(OUT, 'index.html')).size;
console.log(`Готово: dist/ (${LANGS.join(', ')}), index.html ${(size / 1024).toFixed(1)} КБ`);
if (!S.formAccessKey) console.log('Увага: formAccessKey порожній – заявки відкриватимуться у WhatsApp.');
if (!hasTracking()) console.log('Увага: gtmId / ga4Id / metaPixelId порожні – аналітика вимкнена.');
