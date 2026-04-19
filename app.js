const profile = {
  name: "Shufan Wang",
  role: "Product Manager",
  summary:
    "I build product direction by connecting user research, systems thinking, and polished execution. This portfolio brings together work across AI product development, data analysis, interface design, and hardware-focused exploration.",
  footer:
    "Built from the existing project folders in this workspace, using the original visuals and direct links to each brief.",
  principles: [
    {
      title: "Research-led framing",
      description:
        "Start with the user problem, map the decision space, and turn ambiguity into a concrete product direction."
    },
    {
      title: "Clear product narratives",
      description:
        "Translate complex ideas into simple stories that help teams align on scope, value, and next steps."
    },
    {
      title: "Hands-on prototyping",
      description:
        "Use prototypes, flows, and structured artifacts to make tradeoffs visible before execution starts."
    }
  ]
};

const projects = [
  {
    slug: "cue",
    title: "Cue",
    category: "AI Product Development",
    summary:
      "An AI product development case study centered on shaping the experience, defining the problem space, and packaging the concept into a concise product story.",
    focus: ["Product vision", "AI workflows", "Prototype framing"],
    pdf: "AI Product Development/Cue/Content.pdf",
    images: ["AI Product Development/Cue/img 1.png"]
  },
  {
    slug: "influence-of-experts",
    title: "Influence of Experts",
    category: "Data Analysis",
    summary:
      "A data analysis project focused on examining how expert influence appears in decision patterns and how insights can be communicated clearly.",
    focus: ["Research synthesis", "Data storytelling", "Insight communication"],
    pdf: "Data Analysis/Influence of Experts/Content.pdf",
    images: [
      "Data Analysis/Influence of Experts/img 1.png",
      "Data Analysis/Influence of Experts/img 2.png"
    ]
  },
  {
    slug: "nltk-sentiment-analysis",
    title: "NLTK Sentiment Analysis",
    category: "Data Analysis",
    summary:
      "Applied analytics work using natural language processing to turn text data into structured sentiment signals and actionable observations.",
    focus: ["Text analysis", "Signal extraction", "Insight framing"],
    pdf: "Data Analysis/NLTK Sentiment Analysis/Content.pdf",
    images: [
      "Data Analysis/NLTK Sentiment Analysis/img 1.png",
      "Data Analysis/NLTK Sentiment Analysis/img 2.png",
      "Data Analysis/NLTK Sentiment Analysis/img 3.png"
    ]
  },
  {
    slug: "punch-line",
    title: "Punch Line",
    category: "HCI & IoT",
    summary:
      "An HCI and IoT concept exploring how digital interactions extend into physical touchpoints, with attention to the full user flow and system behavior.",
    focus: ["Connected experiences", "Interaction design", "System thinking"],
    pdf: "HCI & IoT/Punch Line/Content.pdf",
    images: [
      "HCI & IoT/Punch Line/Screenshot 2026-04-19 at 4.46.20 PM.png",
      "HCI & IoT/Punch Line/Screenshot 2026-04-19 at 4.47.15 PM.png"
    ]
  },
  {
    slug: "icoffee",
    title: "iCoffee",
    category: "UI/UX Design",
    summary:
      "A UI and UX design exploration focused on flow clarity, interface presentation, and creating a product experience that feels coherent end to end.",
    focus: ["Interface flows", "Experience design", "Visual polish"],
    pdf: "UIUX Design/iCoffee/Content.pdf",
    images: ["UIUX Design/iCoffee/Screenshot 2026-04-19 at 4.49.04 PM.png"]
  },
  {
    slug: "glide",
    title: "Glide",
    category: "User Research & Hardware",
    summary:
      "A user research and hardware study focused on physical interaction, experience mapping, and translating observed needs into product directions.",
    focus: ["User research", "Physical product thinking", "Experience mapping"],
    pdf: "User Research & Hardware/Glide/Content.pdf",
    images: ["User Research & Hardware/Glide/img 1.png"]
  },
  {
    slug: "soda",
    title: "Soda",
    category: "User Research & Hardware",
    summary:
      "A hardware-oriented portfolio piece spanning concept framing, hands-on exploration, and multiple visual artifacts from the development process.",
    focus: ["Concept development", "Artifact exploration", "Hardware experimentation"],
    pdf: "User Research & Hardware/Soda/Content.pdf",
    images: [
      "User Research & Hardware/Soda/img 1.png",
      "User Research & Hardware/Soda/img 2.png",
      "User Research & Hardware/Soda/img 3.png"
    ]
  }
];

const state = {
  activeFilter: "All"
};

const categories = ["All", ...new Set(projects.map((project) => project.category))];

const encodeAsset = (path) => encodeURI(path);

const statItems = [
  {
    value: projects.length,
    label: "Projects"
  },
  {
    value: new Set(projects.map((project) => project.category)).size,
    label: "Disciplines"
  },
  {
    value: projects.reduce((total, project) => total + project.images.length, 0),
    label: "Visual artifacts"
  }
];

const heroName = document.querySelector("#hero-name");
const heroRole = document.querySelector("#hero-role");
const heroSummary = document.querySelector("#hero-summary");
const stats = document.querySelector("#stats");
const filters = document.querySelector("#filters");
const projectGrid = document.querySelector("#project-grid");
const approachGrid = document.querySelector("#approach-grid");
const caseStudyList = document.querySelector("#case-study-list");
const footerNote = document.querySelector("#footer-note");

function renderProfile() {
  heroName.textContent = profile.name;
  heroRole.textContent = profile.role;
  heroSummary.textContent = profile.summary;
  footerNote.textContent = profile.footer;

  stats.innerHTML = statItems
    .map(
      (item) => `
        <div class="stat">
          <span class="stat-value">${item.value}</span>
          <span class="stat-label">${item.label}</span>
        </div>
      `
    )
    .join("");

  approachGrid.innerHTML = profile.principles
    .map(
      (principle) => `
        <article class="approach-card reveal">
          <p class="section-label">Practice</p>
          <h3>${principle.title}</h3>
          <p>${principle.description}</p>
        </article>
      `
    )
    .join("");
}

function renderFilters() {
  filters.innerHTML = categories
    .map(
      (category) => `
        <button
          class="filter-chip ${category === state.activeFilter ? "is-active" : ""}"
          type="button"
          data-filter="${category}"
          aria-pressed="${category === state.activeFilter}"
        >
          ${category}
        </button>
      `
    )
    .join("");

  filters.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFilter = button.dataset.filter;
      renderFilters();
      renderProjects();
      renderCaseStudies();
      observeReveals();
    });
  });
}

function projectVisible(project) {
  return state.activeFilter === "All" || state.activeFilter === project.category;
}

function renderProjects() {
  projectGrid.innerHTML = projects
    .map((project) => {
      const visible = projectVisible(project);
      return `
        <article class="project-card reveal ${visible ? "" : "is-hidden"}">
          <div class="project-image">
            <img src="${encodeAsset(project.images[0])}" alt="${project.title} preview" loading="lazy" />
          </div>
          <div class="project-copy">
            <div class="project-header">
              <div>
                <p class="project-category">${project.category}</p>
                <h3>${project.title}</h3>
              </div>
              <span class="artifact-label">${project.images.length + 1} assets</span>
            </div>
            <p>${project.summary}</p>
            <div class="project-actions">
              <a class="text-link" href="#${project.slug}">View Details</a>
              <a class="text-link" href="${encodeAsset(project.pdf)}" target="_blank" rel="noreferrer">Open Brief</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCaseStudies() {
  caseStudyList.innerHTML = projects
    .map((project) => {
      const visible = projectVisible(project);
      return `
        <article class="case-study reveal ${visible ? "" : "is-hidden"}" id="${project.slug}">
          <div class="case-copy">
            <div>
              <div class="case-header">
                <div>
                  <p class="project-category">${project.category}</p>
                  <h3>${project.title}</h3>
                </div>
                <span class="artifact-label">${project.images.length} visuals</span>
              </div>
              <p>${project.summary}</p>
            </div>
            <div class="focus-row">
              ${project.focus.map((item) => `<span class="focus-pill">${item}</span>`).join("")}
            </div>
            <div class="case-actions">
              <a class="text-link" href="${encodeAsset(project.pdf)}" target="_blank" rel="noreferrer">Open Original Brief</a>
            </div>
          </div>
          <div class="gallery" data-count="${project.images.length}">
            ${project.images
              .map(
                (image, index) => `
                  <figure>
                    <img src="${encodeAsset(image)}" alt="${project.title} visual ${index + 1}" loading="lazy" />
                  </figure>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function observeReveals() {
  const revealed = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealed.forEach((element) => {
    if (!element.classList.contains("is-visible")) {
      observer.observe(element);
    }
  });
}

renderProfile();
renderFilters();
renderProjects();
renderCaseStudies();
observeReveals();
