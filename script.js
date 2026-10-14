const $ = (s, r = document) => r.querySelector(s);
const LS = {
  get: (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};
const TYPES = {
  walk: "Прогулка",
  collage: "Коллаж",
  music: "Джем",
  coffee: "Кофе",
};
const IMG = {
  walk: "img/walk.jpg",
  music: "img/jam.jpg",
  coffee: "img/coffee.jpg",
};
const ALT = {
  walk: "Парижская улица: прохожие идут вдоль углового здания",
  music: "Гитары рядом с усилителем в репетиционной",
  coffee: "Сливки льются в чашку чёрного кофе",
};
const P = {
  walk: '<ellipse cx="8" cy="8" rx="2.4" ry="3.6"/><ellipse cx="16" cy="16" rx="2.4" ry="3.6"/>',
  collage:
    '<rect x="3" y="3" width="11" height="11"/><rect x="10" y="10" width="11" height="11"/>',
  music:
    '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  coffee:
    '<path d="M5 9h11v5a5 5 0 01-5 5h-1a5 5 0 01-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 010 5H16M8 3v2M12 3v2"/>',
  pin: '<path d="M12 21s-6-5.5-6-10a6 6 0 0112 0c0 4.5-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  users:
    '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6"/><circle cx="17" cy="9" r="2.3"/><path d="M17 14c2.5 0 4 1.8 4 5"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6"/>',
};
const ico = (n, s = 18) =>
  `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">${P[n]}</svg>`;
const pic = (c) =>
  IMG[c.type]
    ? `<div class="pw"><img class="${c.type}" src="${IMG[c.type]}" alt="${ALT[c.type]}" loading="lazy"></div>`
    : `<div class="pw none">${ico(c.type, 56)}</div>`;
const SEED = [
  {
    id: "1",
    type: "walk",
    title: "Утренняя прогулка по набережной",
    date: "2026-11-07",
    place: "Набережная, у старого моста",
    max: 6,
    author: "Мари",
    desc: "Неспешный маршрут на два часа с остановкой на кофе. Берём фотоаппараты и хорошее настроение.",
  },
  {
    id: "2",
    type: "collage",
    title: "Коллаж из старых журналов",
    date: "2026-11-12",
    place: "Мастерская на Бельвью",
    max: 8,
    author: "Элоди",
    desc: "Режем, клеим и собираем общий большой коллаж. Журналы, ножницы и клей будут, можно принести свои вырезки.",
  },
  {
    id: "3",
    type: "music",
    title: "Вечерний джем: гитара и клавиши",
    date: "2026-11-15",
    place: "Студия «Ла Рю»",
    max: 5,
    author: "Антуан",
    desc: "Свободная импровизация в духе инди-фолка. Подойдёт любой инструмент и любой уровень.",
  },
  {
    id: "4",
    type: "coffee",
    title: "Кофе и разговоры без спешки",
    date: "2026-11-20",
    place: "Кофейня у рынка",
    max: 4,
    author: "Камиль",
    desc: "Неспешная встреча за чашкой кофе: знакомимся, делимся идеями и решаем, какую коллаборацию завяжем дальше.",
  },
];
const all = () => SEED.concat(LS.get("nouer_collabs", []));
const me = () => LS.get("nouer_user", null);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const apps = () => LS.get("nouer_apps", []);
const fmt = (d) => {
  const x = new Date(d);
  return isNaN(x)
    ? d
    : x.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
};

function ticker() {
  const old = $(".ticker");
  if (old) old.remove();
  const one = all()
    .map(
      (c) =>
        `<a href="collab.html?id=${c.id}">${ico(c.type, 16)}${TYPES[c.type]}: ${esc(c.title)}, ${esc(fmt(c.date))}</a>`,
    )
    .join("");
  const t = document.createElement("div");
  t.className = "ticker";
  t.innerHTML = `<div class="track"><div class="set">${one + one}</div><div class="set" aria-hidden="true">${(one + one).replaceAll("<a ", '<a tabindex="-1" ')}</div></div>`;
  document.body.prepend(t);
}
function header() {
  const u = me();
  $("#hd").innerHTML =
    `<a class="logo" href="index.html">nouer</a><nav><a href="index.html#list">Активности</a><a href="create.html">Создать</a>` +
    (u
      ? `<span>${esc(u.name)}</span><a href="#" id="out">Выйти</a>`
      : `<a href="login.html">Войти</a><a class="btn" href="register.html">Регистрация</a>`) +
    `</nav>`;
  const o = $("#out");
  if (o)
    o.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("nouer_user");
      location.href = "index.html";
    };
}
const applyBtn = (id) =>
  apps().includes(id)
    ? `<button class="btn" disabled>Заявка отправлена</button>`
    : `<button class="btn solid" data-apply="${id}">Подать заявку</button>`;
const card = (c) =>
  `<article class="card">${pic(c)}<div class="ct t-${c.type}">${ico(c.type, 22)}${TYPES[c.type]}</div><div class="body"><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p><p class="meta">${ico("cal", 16)}${esc(fmt(c.date))}</p><p class="meta">${ico("pin", 16)}${esc(c.place)}</p><p class="note">Организатор: ${esc(c.author)}, до ${esc(c.max)} участников</p><div class="row">${applyBtn(c.id)}<a class="btn" href="collab.html?id=${c.id}">Посмотреть</a></div></div></article>`;
const renderGrid = () => {
  const l = all();
  $("#grid").innerHTML = l.length
    ? l.map(card).join("")
    : '<p class="empty">Пока нет активностей. Создайте первую.</p>';
};

document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="collab.html?id="]');
    if (!link) return;

    const url = new URL(link.href, location.origin);
    const activityId = url.searchParams.get('id');

    // Добавляем в очередь — выполнится, когда top100Counter будет готов
    (window._top100q = window._top100q || []).push(function() {
        if (window.top100Counter && window.top100Counter.trackEvent) {
            window.top100Counter.trackEvent('view_activity', {
                activity_id: activityId
            });
        }
    });
});

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-apply]");
  if (!b) return;

  const activityId = b.dataset.apply;
  const isAuthorized = !!me();

  // Отправляем событие через очередь — выполнится, когда top100Counter будет готов
  (window._top100q = window._top100q || []).push(function() {
    if (window.top100Counter && window.top100Counter.trackEvent) {
      window.top100Counter.trackEvent("click_apply_button", {
        activity_id: activityId,
        authorized: isAuthorized,
      });
    }
  });

  if (!isAuthorized) {
    location.href = "login.html";
    return;
  }

  LS.set("nouer_apps", apps().concat(activityId));
  b.outerHTML = '<button class="btn" disabled>Заявка отправлена</button>';
});
function guard(form, fn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $(".err", form);
    err.textContent = "";
    if (!form.checkValidity()) {
      err.textContent = "Заполните все поля корректно.";
      return;
    }
    const m = fn(Object.fromEntries(new FormData(form)));
    if (m) err.textContent = m;
  });
}
function bindCreate(form) {
  guard(form, (v) => {
    if (!me()) {
      location.href = "login.html";
      return;
    }
    const l = LS.get("nouer_collabs", []);
    l.push({
      id: "u" + Date.now(),
      type: v.type,
      title: v.title.trim(),
      date: v.date,
      place: v.place.trim(),
      max: +v.max,
      desc: v.desc.trim(),
      author: me().name,
    });
    LS.set("nouer_collabs", l);
    if (document.body.dataset.page === "home") {
      form.reset();
      renderGrid();
      ticker();
      $("#list").scrollIntoView();
    } else location.href = "index.html";
  });
}
function reveal() {
  const els = document.querySelectorAll(".rv");
  if (
    !("IntersectionObserver" in window) ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  document.documentElement.classList.add("js");
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 },
  );
  els.forEach((e) => io.observe(e));
}
const pages = {
  home() {
    renderGrid();
    bindCreate($("#f"));
    reveal();
    if (!me())
      $("#hint").innerHTML =
        'Чтобы опубликовать активность, <a href="login.html">войдите</a> или <a href="register.html">зарегистрируйтесь</a>.';
  },
  detail() {
    const c = all().find(
        (x) => x.id === new URLSearchParams(location.search).get("id"),
      ),
      d = $("#detail");
    if (!c) {
      d.innerHTML =
        "<h1>Активность не найдена</h1><p>Вернитесь на главную и выберите другую.</p>";
      return;
    }
    document.title = c.title + " — nouer";
    d.innerHTML =
      (IMG[c.type]
        ? `<img class="dimg ${c.type}" src="${IMG[c.type]}" alt="${ALT[c.type]}">`
        : `<div class="big">${ico(c.type, 44)}</div>`) +
      `<h1>${esc(c.title)}</h1><dl><dt>${ico(c.type, 18)}Тип</dt><dd>${TYPES[c.type]}</dd><dt>${ico("cal", 18)}Дата</dt><dd>${esc(fmt(c.date))}</dd><dt>${ico("pin", 18)}Место</dt><dd>${esc(c.place)}</dd><dt>${ico("users", 18)}Участников</dt><dd>до ${esc(c.max)}</dd><dt>${ico("user", 18)}Организатор</dt><dd>${esc(c.author)}</dd></dl><p>${esc(c.desc)}</p><div class="row">${applyBtn(c.id)}</div><p class="note">Подать заявку можно после входа в аккаунт.</p>`;
  },
  create() {
    if (!me()) {
      location.href = "login.html";
      return;
    }
    bindCreate($("#f"));
  },
  reg() {
    guard($("#f"), (v) => {
      if (v.pass.length < 6) return "Пароль должен быть не короче 6 символов.";
      if (v.pass !== v.pass2) return "Пароли не совпадают.";
      const u = LS.get("nouer_users", []),
        email = v.email.trim().toLowerCase();
      if (u.some((x) => x.email === email))
        return "Этот адрес уже зарегистрирован. Войдите в аккаунт.";
      u.push({ name: v.name.trim(), email, pass: v.pass });
      LS.set("nouer_users", u);
      LS.set("nouer_user", { name: v.name.trim(), email });
      location.href = "index.html";
    });
  },
  login() {
    guard($("#f"), (v) => {
      const u = LS.get("nouer_users", []).find(
        (x) => x.email === v.email.trim().toLowerCase() && x.pass === v.pass,
      );
      if (!u) return "Неверная почта или пароль.";
      LS.set("nouer_user", { name: u.name, email: u.email });
      location.href = "index.html";
    });
  },
};
ticker();
header();
(pages[document.body.dataset.page] || (() => {}))();
