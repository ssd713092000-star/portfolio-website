import "./styles.css";
import { company, education, profile, projects, roles, stats, toolkit } from "./content";

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const pad = (n: number): string => String(n).padStart(2, "0");

// Hand-drawn strokes, reused across sections.
const scribbleUnderline = `<svg class="scribble" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13 C 60 4, 120 17, 180 9 S 270 6, 297 12" /></svg>`;
const scribbleCircle = `<svg class="ring" viewBox="0 0 220 90" preserveAspectRatio="none" aria-hidden="true"><path d="M168 12 C 120 -2, 30 4, 12 36 C -4 66, 70 88, 140 82 C 200 76, 222 50, 206 28 C 196 14, 160 6, 120 8" /></svg>`;
const arrow = `<svg class="arrow" viewBox="0 0 120 80" aria-hidden="true"><path d="M6 10 C 30 60, 70 70, 108 52" /><path d="M94 42 L 110 52 L 96 66" /></svg>`;

const github = profile.links.find((l) => l.label === "GitHub");

const stampText = "Immediate joiner ✺ DE · AI · Freelance ✺ ";

function nav(): string {
  return `
  <header class="nav">
    <a class="mark" href="#top" aria-label="Back to top">s<em>s</em>d<span>.</span></a>
    <nav class="nav-links" aria-label="Sections">
      <a href="#work">Work</a>
      <a href="#path">Path</a>
      <a href="#toolkit">Toolkit</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="nav-end">
      ${github ? `<a class="nav-gh mono" href="${esc(github.href)}" target="_blank" rel="noopener">GitHub <span>↗</span></a>` : ""}
      <p class="clock mono"><span class="dot"></span>BLR <time id="clock">--:--</time> IST</p>
    </div>
  </header>`;
}

function hero(): string {
  return `
  <section class="hero" id="top">
    <p class="hero-meta mono reveal">
      <span>Portfolio, Vol. 04</span><span>Data &amp; AI Engineering</span><span>${esc(profile.location)}</span>
    </p>
    <h1 class="name" aria-label="${esc(`${profile.firstName} ${profile.middleName} ${profile.lastName}`)}">
      <span class="line l1 reveal">${esc(profile.firstName)}</span>
      <span class="line l2 reveal"><em>${esc(profile.middleName)}</em></span>
      <span class="line l3 reveal">${esc(profile.lastName)}<i class="bar" aria-hidden="true"></i></span>
    </h1>

    <figure class="portrait reveal">
      <span class="tape" aria-hidden="true"></span>
      <img src="/portrait.jpg" alt="Portrait of ${esc(profile.firstName)} ${esc(profile.lastName)}" width="640" height="800" />
      <div class="stamp" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs><path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <text><textPath href="#circle" textLength="486" lengthAdjust="spacing">${esc(stampText)}</textPath></text>
      </svg>
      <span>✺</span>
    </div>
      <figcaption class="mono">fig. 01, the engineer in question</figcaption>
    </figure>


    <div class="hero-intro reveal">
      <p class="role mono">(${esc(profile.role)})</p>
      <p class="lede">${esc(profile.intro)
        .replace("quiet machinery", `<span class="circled">quiet machinery${scribbleCircle}</span>`)}</p>
      <a class="cta" href="#work">See the work ${arrow}</a>
    </div>
    <p class="scroll-cue mono" aria-hidden="true">scroll ↓</p>
  </section>`;
}

function ticker(): string {
  const words = ["SQL", "PySpark", "Iceberg", "BigQuery", "Airflow", "ClickHouse", "Trino", "Dataflow", "Polars", "Go", "Pub/Sub", "Databricks"];
  const run = words.map((w, i) => `<span class="${i % 3 === 1 ? "it" : ""}">${esc(w)}</span><b>✱</b>`).join("");
  return `<div class="ticker" aria-hidden="true"><div class="ticker-track">${run}${run}</div></div>`;
}

function about(): string {
  const statHtml = stats
    .map(
      (s) => `
      <li class="stat reveal">
        <p class="figure"><span data-count="${esc(s.figure)}">${esc(s.figure)}</span><sup>${esc(s.unit)}</sup></p>
        <p class="stat-label">${esc(s.label)}</p>
      </li>`
    )
    .join("");
  return `
  <section class="about" id="about">
    <p class="label mono">(01) About</p>
    <div class="about-body">
      <p class="about-lead reveal">${esc(profile.about[0])}</p>
${profile.about.slice(1).map((para) => `      <p class="about-aside reveal">${esc(para)}</p>`).join("")}
    </div>
    <ul class="stats">${statHtml}</ul>
  </section>`;
}

function work(): string {
  const items = projects
    .map(
      (p, i) => `
    <article class="project reveal ${i % 2 ? "shift" : ""}">
      <p class="project-no" aria-hidden="true">${pad(i + 1)}</p>
      <div class="project-head">
        <p class="kicker mono">${esc(p.kicker)}</p>
        <h3>${esc(p.title)}</h3>
      </div>
      <div class="project-cols">
        <div><p class="col-label mono">The problem</p><p>${esc(p.problem)}</p></div>
        <div><p class="col-label mono">What I built</p><p>${esc(p.built)}</p></div>
      </div>
      <ul class="results">
        ${p.result.map((r) => `<li><strong>${esc(r.figure)}</strong><span>${esc(r.label)}</span></li>`).join("")}
      </ul>
      <ul class="stack mono">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      ${p.link ? `<a class="repo mono" href="${esc(p.link)}" target="_blank" rel="noopener">View on GitHub <span>↗</span></a>` : ""}
    </article>`
    )
    .join("");
  return `
  <section class="work" id="work">
    <div class="section-head">
      <p class="label mono">(02) Selected work</p>
      <h2 class="reveal">Things I built, and <em>what they changed</em>.</h2>
    </div>
    ${items}
  </section>`;
}

function path(): string {
  const rows = roles
    .map(
      (r) => `
      <li class="role-row reveal">
        <p class="period mono">${esc(r.period)}</p>
        <div>
          <h3>${esc(r.title)}</h3>
          <ul>${r.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>
      </li>`
    )
    .join("");
  return `
  <section class="path" id="path">
    <p class="label mono">(03) Path</p>
    <div class="path-body">
      <h2 class="reveal">Four and a half years, <em>one company</em>, three roles' worth of problems.</h2>
      <div class="company reveal">
        <p class="company-name">${esc(company.name)}</p>
        <p class="company-blurb">${esc(company.blurb)}</p>
      </div>
      <ol class="roles">${rows}</ol>
    </div>
  </section>`;
}

function toolkitSection(): string {
  const groups = toolkit
    .map(
      (g, i) => `
      <div class="tool-group reveal">
        <p class="tool-letter" aria-hidden="true">${String.fromCharCode(65 + i)}</p>
        <h3 class="mono">${esc(g.group)}</h3>
        <p class="tool-items">${g.items.map(esc).join('<span class="sep"> / </span>')}</p>
      </div>`
    )
    .join("");
  return `
  <section class="toolkit" id="toolkit">
    <p class="label mono">(04) Toolkit, an index</p>
    <div class="tool-grid">${groups}</div>
    <aside class="footnote reveal">
      <p class="mono">† Education</p>
      <p class="degree">${esc(education.degree)}</p>
      <p>${esc(education.school)} · ${esc(education.years)}</p>
      <p class="certs"><span class="mono">${esc(education.certIssuer)}:</span> ${education.certs.map(esc).join(", ")}</p>
    </aside>
  </section>`;
}

function contact(): string {
  const links = profile.links
    .map((l) => `<li><a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} <span>↗</span></a></li>`)
    .join("");
  return `
  <section class="contact" id="contact">
    <p class="label mono">(05) Contact</p>
    <h2 class="contact-title reveal">Got data that <em>won't reconcile?</em></h2>
    <div class="contact-row reveal">
      <a class="email" href="mailto:${esc(profile.email)}">${esc(profile.email)}${scribbleUnderline}</a>
      <button class="copy mono" type="button" data-copy="${esc(profile.email)}">Copy</button>
    </div>
    <ul class="contact-links mono">
      ${links}
      <li><a href="tel:${esc(profile.phone.replace(/\s/g, ""))}">${esc(profile.phone)}</a></li>
      <li><a href="${esc(profile.resume)}" target="_blank" rel="noopener">Résumé (PDF) <span>↓</span></a></li>
    </ul>
    <ul class="open-to">
      ${profile.openTo
        .map((o, i) => `<li class="reveal"><p class="open-kind"><span class="mono">${pad(i + 1)}</span>${esc(o.kind)}</p><p>${esc(o.detail)}</p></li>`)
        .join("")}
    </ul>
    <p class="availability"><span class="dot"></span>${esc(profile.availability)}, open to full-time Data &amp; AI Engineer roles and freelance work.</p>
  </section>
  <footer class="footer mono">
    <p>© ${new Date().getFullYear()} ${esc(profile.firstName)} ${esc(profile.middleName)} ${esc(profile.lastName)}</p>
    <p>Set in Fraunces &amp; Instrument Sans. Hand-built in TypeScript.</p>
    ${github ? `<a href="${esc(github.href)}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
    <a href="#top">Back to top ↑</a>
  </footer>`;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${nav()}
  <main>
    ${hero()}
    ${ticker()}
    ${about()}
    ${work()}
    ${path()}
    ${toolkitSection()}
    ${contact()}
  </main>
  <div class="toast mono" role="status" aria-live="polite"></div>`;

// ---------- Behaviour ----------

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Live Bangalore clock in the nav.
const clock = document.getElementById("clock");
const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone });
const tick = () => {
  if (clock) clock.textContent = fmt.format(new Date());
};
tick();
setInterval(tick, 15_000);

// Reveal on scroll.
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealObserver.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Count-up for the stats.
function countUp(el: HTMLElement): void {
  const target = parseFloat(el.dataset.count ?? "0");
  const decimals = (el.dataset.count ?? "").includes(".") ? 1 : 0;
  if (reduceMotion || !target) return;
  const start = performance.now();
  const dur = 1400;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const countObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        countUp(e.target as HTMLElement);
        countObserver.unobserve(e.target);
      }
    }
  },
  { threshold: 0.6 }
);
document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => countObserver.observe(el));

// Scroll progress hairline + subtle portrait parallax.
const progress = document.querySelector<HTMLElement>(".progress");
const portrait = document.querySelector<HTMLElement>(".portrait");
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      if (portrait && !reduceMotion && window.scrollY < window.innerHeight * 1.2) {
        portrait.style.setProperty("--py", `${window.scrollY * 0.08}px`);
      }
      ticking = false;
    });
  },
  { passive: true }
);

// Copy email.
const toast = document.querySelector<HTMLElement>(".toast");
document.querySelector<HTMLButtonElement>("[data-copy]")?.addEventListener("click", async (ev) => {
  const btn = ev.currentTarget as HTMLButtonElement;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy ?? "");
    if (toast) toast.textContent = "Email copied ✓";
  } catch {
    if (toast) toast.textContent = "Couldn't copy, so long-press the address instead";
  }
  toast?.classList.add("show");
  setTimeout(() => toast?.classList.remove("show"), 2200);
});
