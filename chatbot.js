/* iTechLink Chatbot — drop-in widget. Add before </body>:  <script src="chatbot.js"></script> */
(function () {
  if (document.getElementById("itlBot")) return;

  var ZOHO_APPS = "54"; // number of apps quoted for Zoho One; change here if it differs
  var PHONE = "+2348149360338", PHONE_TXT = "+234 814 936 0338",
      EMAIL = "info@itechlink.com.ng", WA = "https://wa.me/2348149360338";

  var css = `
#itlBot{position:fixed;right:22px;bottom:calc(22px + env(safe-area-inset-bottom,0px));z-index:6000;font-family:"Inter",sans-serif}
#itlBot *{box-sizing:border-box}
.itl-fab{width:60px;height:60px;border:0;border-radius:50%;cursor:pointer;background:linear-gradient(120deg,#3fd0ff,#7c6cff);color:#04060a;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 34px rgba(63,208,255,.35);transition:transform .25s;position:relative}
.itl-fab:hover{transform:translateY(-3px) scale(1.05)}
.itl-fab svg{width:27px;height:27px}
.itl-fab::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #3fd0ff;animation:itlPulse 2.4s ease-out infinite}
@keyframes itlPulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.6);opacity:0}}
.itl-panel{position:absolute;right:0;bottom:76px;width:370px;max-width:calc(100vw - 28px);height:520px;max-height:calc(100vh - 130px);display:flex;flex-direction:column;background:#161c2a;border:1px solid rgba(255,255,255,.12);border-radius:20px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.55);opacity:0;visibility:hidden;transform:translateY(16px) scale(.97);transform-origin:bottom right;transition:opacity .25s,transform .25s,visibility .25s}
#itlBot.open .itl-panel{opacity:1;visibility:visible;transform:none}
.itl-head{display:flex;align-items:center;gap:12px;padding:16px 18px;background:linear-gradient(120deg,rgba(63,208,255,.16),rgba(124,108,255,.16));border-bottom:1px solid rgba(255,255,255,.1)}
.itl-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(120deg,#3fd0ff,#7c6cff);color:#04060a;display:flex;align-items:center;justify-content:center;font:700 13px "Space Grotesk",sans-serif}
.itl-head strong{display:block;color:#eef1f6;font:600 14px "Space Grotesk",sans-serif}
.itl-head span{display:flex;align-items:center;gap:6px;color:#8a93a6;font-size:11px;margin-top:2px}
.itl-head span::before{content:"";width:7px;height:7px;border-radius:50%;background:#34d399}
.itl-x{margin-left:auto;background:none;border:0;color:#8a93a6;font-size:22px;cursor:pointer;line-height:1}
.itl-x:hover{color:#eef1f6}
.itl-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}
.itl-m{max-width:86%;padding:10px 14px;border-radius:16px;font-size:13px;line-height:1.6;animation:itlIn .3s ease}
@keyframes itlIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.itl-m.bot{align-self:flex-start;background:#1b2233;color:#dfe4ee;border:1px solid rgba(255,255,255,.08);border-bottom-left-radius:4px}
.itl-m.me{align-self:flex-end;background:linear-gradient(120deg,#3fd0ff,#7c6cff);color:#04060a;font-weight:500;border-bottom-right-radius:4px}
.itl-m a{color:#3fd0ff;text-decoration:underline}
.itl-typing{display:flex;gap:4px;padding:13px 14px}
.itl-typing i{width:6px;height:6px;border-radius:50%;background:#8a93a6;animation:itlDot 1s infinite}
.itl-typing i:nth-child(2){animation-delay:.15s}.itl-typing i:nth-child(3){animation-delay:.3s}
@keyframes itlDot{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}
.itl-chips{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 12px}
.itl-chip{background:rgba(63,208,255,.07);border:1px solid rgba(63,208,255,.28);color:#cfeeff;border-radius:100px;padding:7px 13px;font:500 11.5px "Inter",sans-serif;cursor:pointer;transition:.2s}
.itl-chip:hover{background:linear-gradient(120deg,#3fd0ff,#7c6cff);color:#04060a;border-color:transparent}
.itl-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.1);background:#111621}
.itl-form input{flex:1;min-width:0;background:#1b2233;border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:11px 16px;color:#eef1f6;font:13px "Inter",sans-serif;outline:none}
.itl-form input:focus{border-color:#3fd0ff}
.itl-form button{width:42px;height:42px;flex:none;border:0;border-radius:50%;cursor:pointer;background:linear-gradient(120deg,#3fd0ff,#7c6cff);color:#04060a;display:flex;align-items:center;justify-content:center}
.itl-form button svg{width:18px;height:18px}
@media(max-width:560px){#itlBot{right:14px}.itl-panel{position:fixed;right:14px;left:14px;width:auto;bottom:calc(88px + env(safe-area-inset-bottom,0px));height:min(560px,calc(100vh - 150px))}}
@media(prefers-reduced-motion:reduce){.itl-fab::after,.itl-m,.itl-typing i{animation:none}.itl-panel{transition:none}}
`;
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var root = document.createElement("div"); root.id = "itlBot";
  root.innerHTML =
    '<div class="itl-panel" role="dialog" aria-label="iTechLink chat assistant">' +
      '<div class="itl-head"><div class="itl-av">iT</div><div><strong>iTechLink Assistant</strong><span>Online · replies instantly</span></div><button class="itl-x" aria-label="Close chat">&times;</button></div>' +
      '<div class="itl-msgs" aria-live="polite"></div>' +
      '<div class="itl-chips"></div>' +
      '<form class="itl-form"><input type="text" placeholder="Type your question…" aria-label="Your message" autocomplete="off"><button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></form>' +
    '</div>' +
    '<button class="itl-fab" aria-label="Open chat" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/></svg></button>';
  document.body.appendChild(root);

  var panel = root.querySelector(".itl-panel"), msgs = root.querySelector(".itl-msgs"),
      chips = root.querySelector(".itl-chips"), form = root.querySelector(".itl-form"),
      input = form.querySelector("input"), fab = root.querySelector(".itl-fab");

  var contact = 'Call <a href="tel:' + PHONE + '">' + PHONE_TXT + '</a>, chat on <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>, or email <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.';
  var MAIN = ["Our services", "Web development", "Zoho solutions", "Get a quote", "Contact us"];

  var KB = [
    { k: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"], a: "Hello! 👋 I’m the iTechLink assistant. Ask me about our services, pricing, or how to reach the team.", c: MAIN },
    { k: ["service", "offer", "what do you do", "what you do", "provide"], a: "We offer Web Design &amp; Development, UI/UX Design, Zoho Implementation, SEO, IT Infrastructure, Cybersecurity, Cloud Solutions &amp; Migration, and Graphics &amp; Branding. Which one would you like to know more about?", c: ["Web development", "Zoho solutions", "SEO", "Cybersecurity", "Cloud solutions"] },
    { k: ["web", "website", "app", "application", "development", "developer", "landing page", "e-commerce", "ecommerce"], a: 'We build custom websites and web applications engineered for performance, conversion and brand impact. <a href="web-development.html">See Web Development →</a>', c: ["Get a quote", "UI/UX design", "Our services"] },
    { k: ["ui", "ux", "design", "interface", "user experience"], a: 'Our UI/UX team creates user-centred interfaces that reduce friction and make complex workflows intuitive. <a href="ux.html">Learn more →</a>', c: ["Web development", "Get a quote"] },
    { k: ["seo", "search", "google", "ranking", "traffic", "visibility"], a: 'Our data-driven SEO strategies build sustainable organic visibility and measurable growth. <a href="seo.html">Learn more →</a>', c: ["Get a quote", "Our services"] },
    { k: ["cyber", "security", "hack", "protect", "risk", "breach"], a: 'We deliver proactive security solutions that protect your systems, data and operations from evolving threats. <a href="cyber.html">Learn more →</a>', c: ["Get a quote", "Contact us"] },
    { k: ["cloud", "migration", "migrate", "hosting"], a: 'We handle secure cloud adoption, migration and optimisation for scalable, reliable operations. <a href="cloud-solutions.html">Learn more →</a>', c: ["Get a quote", "Contact us"] },
    { k: ["infrastructure", "network", "server", "hardware", "procurement", "it support", "support"], a: 'From network architecture to servers and endpoint management, we design and deploy complete IT environments, with 24/7 support available. <a href="it.html">Learn more →</a>', c: ["Get a quote", "Contact us"] },
    { k: ["brand", "logo", "graphic", "flyer", "identity"], a: 'Our Graphics &amp; Branding team creates brand identities and creative graphics that communicate your value clearly. <a href="branding.html">Learn more →</a>', c: ["Get a quote", "Our services"] },
    { k: ["price", "pricing", "cost", "quote", "how much", "budget", "charge", "rate", "estimate"], a: "Pricing depends on the scope of your project, so we give a tailored quote after a free, no-obligation consultation. " + contact, c: ["Our services", "Contact us"] },
    { k: ["contact", "reach", "call", "phone", "email", "whatsapp", "talk", "speak", "consult", "meeting", "human", "agent"], a: "We’d love to hear from you! " + contact, c: ["Where are you located?", "Our services"] },
    { k: ["where", "location", "address", "office", "located", "lagos", "visit"], a: "We’re at 25, Oju Olobun Close, Victoria Island, Lagos, Nigeria. 📍 " + contact, c: ["Contact us", "Our services"] },
    { k: ["certif", "partner", "microsoft", "comptia", "trust", "experience", "years"], a: "We’re a Microsoft Certified Partner, CompTIA Authorized and a Zoho Authorized Partner, with 5+ years of experience and 200+ projects delivered at a 99% client satisfaction rate.", c: ["Our services", "Get a quote"] },
    { k: ["thank", "thanks", "great", "awesome", "cool"], a: "You’re welcome! 😊 Anything else I can help with?", c: MAIN },
    { k: ["bye", "goodbye"], a: "Thanks for stopping by! Reach us any time on " + PHONE_TXT + ".", c: [] }
  ];
  var CHIP_MAP = { "our services": "services", "get a quote": "quote", "contact us": "contact", "web development": "website", "zoho solutions": "zoho", "ui/ux design": "ux", "cloud solutions": "cloud", "where are you located?": "where" };

  function add(cls, html) {
    var d = document.createElement("div"); d.className = "itl-m " + cls; d.innerHTML = html;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d;
  }
  function setChips(list) {
    chips.innerHTML = "";
    (list || []).forEach(function (t) {
      var b = document.createElement("button"); b.type = "button"; b.className = "itl-chip"; b.textContent = t;
      b.onclick = function () { send(t); }; chips.appendChild(b);
    });
  }
  function esc(s) { return s.replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  /* ---------- ZOHO KNOWLEDGE ---------- */
  // a:1 = ambiguous word, only matched when the visitor also says "zoho"
  var CATS = {
    sales: "Sales & CRM", marketing: "Marketing & Web", finance: "Finance & Operations",
    hr: "HR & People", support: "Customer Support", work: "Collaboration & Build"
  };
  var Z = [
    { n: "CRM", c: "sales", k: /\bcrm\b/, u: "Manages leads, contacts and deals in one pipeline, automates follow-ups and forecasts sales so your team closes more business." },
    { n: "Bigin", c: "sales", k: /\bbigin\b/, u: "A simple, lightweight CRM for small teams that want to track customers and deals without the complexity." },
    { n: "SalesIQ", c: "sales", k: /\bsalesiq\b|live chat/, u: "Live chat and visitor tracking on your website, so you can engage visitors and capture leads in real time." },
    { n: "Bookings", c: "sales", k: /\bbookings?\b|appointment/, u: "Online appointment scheduling with automatic reminders and calendar sync, so clients can book without back-and-forth." },
    { n: "Sign", c: "sales", a: 1, k: /\bsign\b|e-?signature/, u: "Send, sign and track contracts and documents digitally, securely and without printing." },
    { n: "Campaigns", c: "marketing", k: /\bcampaigns?\b|email marketing|newsletter/, u: "Create, send and track email campaigns and newsletters, with segmentation and automation." },
    { n: "Social", c: "marketing", a: 1, k: /\bsocial\b/, u: "Schedule posts, monitor mentions and measure engagement across your social media channels." },
    { n: "Forms", c: "marketing", a: 1, k: /\bforms?\b/, u: "Build online forms for enquiries, registrations or orders, with responses flowing straight into your other apps." },
    { n: "Survey", c: "marketing", k: /\bsurveys?\b/, u: "Create surveys to collect customer or staff feedback, with reports to analyse the results." },
    { n: "Sites", c: "marketing", a: 1, k: /\bsites?\b/, u: "Build and publish business websites with a drag-and-drop editor." },
    { n: "Commerce", c: "marketing", a: 1, k: /\bcommerce\b|online store|e-?shop/, u: "Run an online store: products, orders, payments and shipping in one place." },
    { n: "Books", c: "finance", k: /\bbooks\b|accounting/, u: "Online accounting: invoicing, expenses, bank reconciliation, taxes and financial reports." },
    { n: "Invoice", c: "finance", k: /\binvoic(e|es|ing)\b/, u: "Create professional invoices, send payment reminders and track what clients owe you." },
    { n: "Expense", c: "finance", k: /\bexpenses?\b/, u: "Capture receipts, submit and approve employee expense claims, and keep spending under control." },
    { n: "Inventory", c: "finance", k: /\binventory\b|\bstock\b/, u: "Track stock levels, orders, warehouses and shipments across your sales channels to avoid stock-outs and discrepancies." },
    { n: "Subscriptions", c: "finance", k: /\bsubscriptions?\b|recurring billing/, u: "Automate recurring billing and manage subscription customers and renewals." },
    { n: "People", c: "hr", a: 1, k: /\bpeople\b|\bhr\b/, u: "Core HR: employee records, attendance, leave, timesheets and performance reviews." },
    { n: "Recruit", c: "hr", k: /\brecruit(ment|ing)?\b/, u: "Post jobs, track candidates and manage your hiring pipeline from application to offer." },
    { n: "Desk", c: "support", k: /\bdesk\b|helpdesk|help desk|\btickets?\b/, u: "Customer support ticketing across email, chat, phone and social, with SLAs, automation and satisfaction tracking." },
    { n: "Assist", c: "support", a: 1, k: /\bassist\b|remote support/, u: "Remote support and unattended access, so your team can fix customers’ computer issues from anywhere." },
    { n: "Projects", c: "work", a: 1, k: /\bprojects?\b/, u: "Plan tasks, assign work, track time and milestones, and keep project teams on schedule." },
    { n: "Mail", c: "work", a: 1, k: /\bmail\b|business email/, u: "Professional, ad-free business email on your own domain, with calendar and contacts." },
    { n: "WorkDrive", c: "work", k: /\bworkdrive\b|file storage|cloud storage/, u: "Secure team file storage, sharing and collaboration, so everyone works from the latest version." },
    { n: "Cliq", c: "work", k: /\bcliq\b|team chat/, u: "Team messaging with channels, video calls and chatbots to keep communication in one place." },
    { n: "Meeting", c: "work", a: 1, k: /\bmeetings?\b|\bwebinars?\b/, u: "Online meetings and webinars with screen sharing and recording." },
    { n: "Flow", c: "work", a: 1, k: /\bflow\b/, u: "Connect your apps and automate multi-step workflows without writing code." },
    { n: "Vault", c: "work", a: 1, k: /\bvault\b|password manager/, u: "A secure password manager that lets teams share credentials safely." },
    { n: "Analytics", c: "work", k: /\banalytics\b|dashboards?/, u: "Pulls data from all your apps into live dashboards and reports so you can see what’s really happening in the business." },
    { n: "Creator", c: "work", a: 1, k: /\bcreator\b|low-?code/, u: "A low-code platform for building custom business apps that fit your exact process." }
  ];
  var ONE = /zoho\s*(one|1)\b|\b54\b|bundle|all[\s-]*in[\s-]*one|all (the )?(zoho )?(apps|services)|what apps|how many apps|one subscription/;
  var CAT_BY_LABEL = {};
  Object.keys(CATS).forEach(function (k) { CAT_BY_LABEL[CATS[k].toLowerCase()] = k; });
  var CAT_CHIPS = Object.keys(CATS).map(function (k) { return CATS[k]; });

  function zohoAnswer(t) {
    if (ONE.test(t)) {
      return {
        a: "<b>Zoho One</b> is Zoho’s all-in-one suite: a single subscription that covers all <b>" + ZOHO_APPS + " Zoho apps</b>, from sales and marketing to finance, HR, support and collaboration. " +
          "You get one login, one bill and one admin panel, and every app shares the same data, so nothing is re-entered or stitched together.<br><br>" +
          "As an Authorized Zoho Partner, we set up the apps you need, connect them, and train your team, then switch on more as you grow. A few region-specific or advanced components can carry separate fees, and we’ll confirm what applies to you.",
        c: ["Sales & CRM", "Finance & Operations", "HR & People", "Get a quote"]
      };
    }

    window.ITL_FAQ = [
  {
    k: ["opening hours", "open on", "working hours", "what time"],   // words people might type
    a: "We’re open Monday to Friday, 9am to 6pm. You can also reach us on WhatsApp any time.",  // the reply
    c: ["Contact us", "Our services"]                                 // optional buttons shown after the reply
  },
  {
    k: ["portfolio", "past work", "previous projects", "examples"],
    a: 'You can see our work on the <a href="about.html">About page</a>. Want a quote for something similar?',
    c: ["Get a quote"]
  },
  {
    k: ["training", "learn zoho", "teach"],
    a: "Yes, we train your team on every Zoho app we set up, so they can use it with confidence."
  }
];
    var cat = CAT_BY_LABEL[t];
    if (cat) {
      var apps = Z.filter(function (x) { return x.c === cat; });
      return {
        a: "<b>" + esc(CATS[cat]) + "</b><br>" + apps.map(function (x) { return "• <b>Zoho " + x.n + "</b>: " + x.u; }).join("<br>") +
          "<br><br>All of these are included in Zoho One.",
        c: apps.slice(0, 5).map(function (x) { return "Zoho " + x.n; }).concat(["What is Zoho One?"])
      };
    }
    var hasZ = t.indexOf("zoho") > -1, hit = null;
    for (var i = 0; i < Z.length; i++) {
      if (Z[i].k.test(t) && (!Z[i].a || hasZ)) { hit = Z[i]; break; }
    }
    if (hit) {
      return {
        a: "<b>Zoho " + hit.n + "</b><br>" + hit.u + "<br><br>It’s one of the " + ZOHO_APPS + " apps included in Zoho One, and we can implement and customise it for your business.",
        c: ["What is Zoho One?", CATS[hit.c], "Get a quote"]
      };
    }
    if (hasZ) {
      return {
        a: "Zoho is a suite of business apps, each built for a specific job, from CRM and accounting to HR and customer support. Pick an area below to see what each app is used for, or ask about one directly, like <b>Zoho CRM</b> or <b>Zoho Books</b>.<br><br>Even better, <b>Zoho One</b> bundles all " + ZOHO_APPS + " apps in a single subscription.",
        c: ["What is Zoho One?"].concat(CAT_CHIPS)
      };
    }
    return null;
  }

  function answer(q) {
    var t = q.toLowerCase(), key = CHIP_MAP[t] || t, best = null, score = 0;
    var z = zohoAnswer(t); if (z) return z;
    KB.forEach(function (e) {
      var s = 0; e.k.forEach(function (w) { if (key.indexOf(w) > -1) s += w.length > 3 ? 2 : 1; });
      if (s > score) { score = s; best = e; }
    });
    return best || { a: "I’m not sure I caught that, but our team can help directly. " + contact, c: MAIN };
  }
  function send(text) {
    text = (text || "").trim(); if (!text) return;
    add("me", esc(text)); input.value = ""; setChips([]);
    var r = answer(text), typing = add("bot itl-typing", "<i></i><i></i><i></i>");
    setTimeout(function () { typing.remove(); add("bot", r.a); setChips(r.c); }, 600 + Math.min(r.a.length * 4, 700));
  }
  function toggle(open) {
    var o = typeof open === "boolean" ? open : !root.classList.contains("open");
    root.classList.toggle("open", o); fab.setAttribute("aria-expanded", o);
    if (o) { if (!msgs.children.length) { add("bot", "Hi there! 👋 Welcome to <b>iTechLink</b>. How can I help you today?"); setChips(MAIN); } setTimeout(function () { input.focus(); }, 250); }
  }

  fab.onclick = function () { toggle(); };
  root.querySelector(".itl-x").onclick = function () { toggle(false); };
  form.onsubmit = function (e) { e.preventDefault(); send(input.value); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
})();