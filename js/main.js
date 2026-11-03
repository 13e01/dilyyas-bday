(function () {
  "use strict";

  var data = window.WISHLIST;
  if (!data) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  // "Dilyyas Bday" -> первая строка прямым начертанием, остальное курсивом
  function splitTitle(title) {
    var parts = String(title).trim().split(/\s+/);
    return { first: parts.shift() || "", rest: parts.join(" ") };
  }

  /* ---------- Тексты ---------- */

  var t = splitTitle(data.title);
  document.title = data.title + " — " + data.tagline;

  var titleEl = document.querySelector("[data-title]");
  if (titleEl) {
    var lines = titleEl.querySelectorAll(".hero__line");
    lines[0].textContent = t.first;
    lines[1].textContent = t.rest;
    if (!t.rest) lines[1].remove();
  }

  var tagEl = document.querySelector("[data-tagline]");
  if (tagEl) tagEl.textContent = data.tagline;

  var footTitle = document.querySelector("[data-footer-title]");
  if (footTitle) {
    footTitle.textContent = t.first + " ";
    if (t.rest) footTitle.appendChild(el("em", null, t.rest));
  }
  var footNote = document.querySelector("[data-footer-note]");
  if (footNote && data.footer) footNote.textContent = data.footer;

  if (data.intro) {
    var introText = document.querySelector("[data-intro-text]");
    if (introText && data.intro.text) introText.textContent = data.intro.text;
  }

  /* ---------- Главное фото ---------- */

  var hero = data.heroPhoto || {};
  if (hero.src) {
    var frame = document.querySelector(".hero__frame");
    var placeholder = document.querySelector("[data-hero-placeholder]");
    var heroImg = el("img", "hero__img");
    if (hero.width && hero.height) {
      heroImg.width = hero.width;
      heroImg.height = hero.height;
    }
    if (hero.srcSmall) {
      heroImg.srcset = hero.srcSmall + " 640w, " + hero.src + " " + (hero.width || 960) + "w";
      heroImg.sizes = "(min-width: 768px) 440px, 72vw";
    }
    heroImg.src = hero.src;
    heroImg.alt = hero.alt || "";
    heroImg.fetchPriority = "high";
    heroImg.addEventListener("load", function () { frame.classList.add("has-photo"); });
    heroImg.addEventListener("error", function () { heroImg.remove(); });
    frame.insertBefore(heroImg, placeholder);
  }

  /* ---------- Оглавление ---------- */

  var contents = document.querySelector("[data-contents]");
  var categoriesRoot = document.querySelector("[data-categories]");

  // подсказки браузеру, какую копию фото грузить (560w или полную)
  var sizesByLayout = {
    stagger: "(min-width: 1100px) 480px, (min-width: 768px) 44vw, 46vw",
    masonry: "(min-width: 1100px) 340px, (min-width: 768px) 30vw, 46vw",
    gallery: "(min-width: 1100px) 340px, (min-width: 768px) 30vw, 86vw"
  };

  data.categories.forEach(function (cat, i) {
    var num = pad(i + 1);

    if (contents) {
      var li = el("li", "contents__item");
      var a = el("a", "contents__link");
      a.href = "#" + cat.id;
      a.appendChild(el("span", "contents__num", num));
      a.appendChild(el("span", "contents__name", cat.title));
      var meta = cat.items && cat.items.length ? cat.items.length + " фото" : cat.label;
      a.appendChild(el("span", "contents__meta", meta));
      li.appendChild(a);
      contents.appendChild(li);
    }

    categoriesRoot.appendChild(renderCategory(cat, num, data.categories.length));
  });

  /* ---------- Разделы ---------- */

  function renderCategory(cat, num, total) {
    var section = el("section", "category category--" + cat.layout);
    section.id = cat.id;
    section.setAttribute("aria-labelledby", cat.id + "-title");

    var inner = el("div", "container category__inner");

    var head = el("header", "category__head reveal");
    var kicker = el("p", "category__kicker");
    kicker.appendChild(el("span", "category__num", num));
    kicker.appendChild(el("span", "category__total", "/ " + pad(total)));
    kicker.appendChild(el("span", "category__label", cat.label));
    head.appendChild(kicker);
    var h2 = el("h2", "category__title", cat.title);
    h2.id = cat.id + "-title";
    head.appendChild(h2);
    inner.appendChild(head);

    if (cat.layout === "envelope") {
      inner.appendChild(renderEnvelope(cat));
    } else {
      inner.appendChild(renderGallery(cat));
    }

    section.appendChild(inner);
    return section;
  }

  function renderGallery(cat) {
    var list = el("ul", "gallery gallery--" + cat.layout);
    var group = [];

    cat.items.forEach(function (item, idx) {
      group.push(item);

      var li = el("li", "gallery__item reveal");
      li.style.setProperty("--i", idx % 3);

      var btn = el("button", "tile");
      btn.type = "button";
      btn.setAttribute("aria-label", "Открыть фото " + (idx + 1) + " из " + cat.items.length + ": " + (item.alt || cat.title));

      var media = el("span", "tile__media");
      if (item.width && item.height) {
        media.style.aspectRatio = item.width + " / " + item.height;
      }

      var img = el("img", "tile__img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = item.alt || "";
      if (item.width && item.height) {
        img.width = item.width;
        img.height = item.height;
      }
      if (item.srcSmall) {
        img.srcset = item.srcSmall + " 560w, " + item.src + " " + (item.width || 1100) + "w";
        img.sizes = sizesByLayout[cat.layout] || "100vw";
      }
      img.src = item.srcSmall || item.src;
      img.addEventListener("load", function () { media.classList.add("is-loaded"); });
      if (img.complete) media.classList.add("is-loaded");

      media.appendChild(img);
      btn.appendChild(media);

      btn.addEventListener("click", function () { openLightbox(group, idx, btn); });

      li.appendChild(btn);
      li.appendChild(el("span", "gallery__caption", "№ " + pad(idx + 1)));
      list.appendChild(li);
    });

    return list;
  }

  function renderEnvelope(cat) {
    var wrap = el("div", "money reveal");
    wrap.innerHTML =
      '<div class="envelope">' +
        '<div class="envelope__back" aria-hidden="true"></div>' +
        '<div class="envelope__flap" aria-hidden="true"></div>' +
        '<div class="envelope__card">' +
          '<span class="envelope__card-kicker"></span>' +
          '<span class="envelope__card-title"></span>' +
          '<span class="envelope__card-line" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="envelope__front" aria-hidden="true"></div>' +
        '<div class="envelope__seal" aria-hidden="true"><span></span></div>' +
      '</div>';
    wrap.querySelector(".envelope__seal span").textContent = t.first.charAt(0);

    var card = wrap.querySelector(".envelope__card");
    var kickerEl = wrap.querySelector(".envelope__card-kicker");
    var titleEl = wrap.querySelector(".envelope__card-title");

    if (cat.phone) {
      card.classList.add("envelope__card--phone");
      kickerEl.textContent = cat.phoneLabel || "";
      titleEl.remove();

      var phoneBtn = el("button", "envelope__phone");
      phoneBtn.type = "button";
      phoneBtn.textContent = cat.phone;
      phoneBtn.setAttribute("aria-label", (cat.phoneLabel ? cat.phoneLabel + ": " : "") + cat.phone + ". Нажмите, чтобы скопировать номер");

      var hint = el("span", "envelope__hint", "нажмите, чтобы скопировать");
      hint.setAttribute("aria-live", "polite");

      card.insertBefore(phoneBtn, card.querySelector(".envelope__card-line"));
      card.appendChild(hint);

      var resetTimer;
      phoneBtn.addEventListener("click", function () {
        copyText(cat.phone.replace(/[^\d+]/g, ""), function (ok) {
          hint.textContent = ok ? "номер скопирован" : "скопируйте номер вручную";
          card.classList.toggle("is-copied", ok);
          clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            hint.textContent = "нажмите, чтобы скопировать";
            card.classList.remove("is-copied");
          }, 2400);
        });
      });
    } else {
      kickerEl.textContent = "for you";
      titleEl.textContent = data.title;
      card.setAttribute("aria-hidden", "true");
    }

    if (cat.text) {
      wrap.appendChild(el("p", "money__text", cat.text));
    }
    return wrap;
  }

  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(legacyCopy(text)); });
    } else {
      done(legacyCopy(text));
    }
  }

  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    area.remove();
    return ok;
  }

  /* ---------- Плавное появление ---------- */

  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (node) { node.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealEls.forEach(function (node) { io.observe(node); });
  }

  /* ---------- Просмотр фото ---------- */

  var dialog = document.querySelector("[data-lightbox]");
  var lbImg = document.querySelector("[data-lightbox-img]");
  var lbCount = document.querySelector("[data-lightbox-count]");
  var lbPrev = document.querySelector("[data-lightbox-prev]");
  var lbNext = document.querySelector("[data-lightbox-next]");
  var lbClose = document.querySelector("[data-lightbox-close]");
  var current = { group: null, index: 0, opener: null };

  function showItem() {
    var item = current.group[current.index];
    lbImg.classList.remove("is-loaded");
    lbImg.onload = function () { lbImg.classList.add("is-loaded"); };
    lbImg.src = item.src;
    lbImg.alt = item.alt || "";
    if (item.width && item.height) {
      lbImg.width = item.width;
      lbImg.height = item.height;
    } else {
      lbImg.removeAttribute("width");
      lbImg.removeAttribute("height");
    }
    if (lbImg.complete) lbImg.classList.add("is-loaded");
    lbCount.textContent = (current.index + 1) + " / " + current.group.length;
    var single = current.group.length < 2;
    lbPrev.hidden = single;
    lbNext.hidden = single;
  }

  function step(delta) {
    var n = current.group.length;
    current.index = (current.index + delta + n) % n;
    showItem();
  }

  function openLightbox(group, index, opener) {
    if (!dialog || typeof dialog.showModal !== "function") {
      window.open(group[index].src, "_blank", "noopener");
      return;
    }
    current = { group: group, index: index, opener: opener };
    showItem();
    dialog.showModal();
    document.documentElement.classList.add("is-locked");
  }

  if (dialog) {
    lbPrev.addEventListener("click", function () { step(-1); });
    lbNext.addEventListener("click", function () { step(1); });
    lbClose.addEventListener("click", function () { dialog.close(); });

    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("is-locked");
      if (current.opener) current.opener.focus({ preventScroll: true });
    });

    // клик по пустому фону закрывает просмотр
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.classList.contains("lightbox__stage")) dialog.close();
    });

    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    // свайп на телефоне
    var startX = null, startY = null;
    dialog.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    dialog.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && current.group.length > 1) {
        step(dx < 0 ? 1 : -1);
      }
      startX = startY = null;
    }, { passive: true });
  }
})();
