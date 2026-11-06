// Load saved data
let portfolios = JSON.parse(
    localStorage.getItem("portfolios") || "[]"
);

// Save data
function saveData() {
    localStorage.setItem(
        "portfolios",
        JSON.stringify(portfolios)
    );
}

// Create Portfolio
document.querySelector("#portfolio-form")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const data = new FormData(this);

    const portfolio = {
        id: "user" + Date.now(),

        name: data.get("name"),

        whatIEnjoy: data.get("whatIEnjoy"),

        whatIveTried: data.get("whatIveTried"),

        whatImCuriousAbout: data.get("whatImCuriousAbout"),

        items: []
    };

    portfolios.push(portfolio);

    saveData();

    this.reset();

    renderPortfolios();

    alert("Portfolio Created!");
});


// Add Portfolio Item
document.querySelector("#item-form")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const data = new FormData(this);

    const portfolioId = data.get("portfolioId");

    const portfolio = portfolios.find(
        p => p.id === portfolioId
    );

    if (!portfolio) {
        alert("Please select a Portfolio");
        return;
    }

    const evidence = data.get("evidence");

    // Validate URL
    try {
        const url = new URL(evidence);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Invalid URL");
        }

    } catch {
        alert("Please enter a valid URL");
        return;
    }

    // Create Item Object
    const item = {

        id: "item" + Date.now(),

        title: data.get("title"),

        type: data.get("type"),

        date: data.get("date"),

        role: data.get("role"),

        description: data.get("description"),

        skills: data.get("skills")
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== ""),

        reflection: {

            whatIDid: data.get("whatIDid"),

            whatILearned: data.get("whatILearned"),

            challenge: data.get("challenge"),

            nextStep: data.get("nextStep")
        },

        evidence: [evidence]
    };

    // Add item to selected Portfolio
    portfolio.items.push(item);

    saveData();

    this.reset();

    renderPortfolios();

    alert("Portfolio Item Saved!");
});


// Display Portfolio
function renderPortfolios() {

    const list = document.querySelector("#portfolio-list");

    const select = document.querySelector(
        '[name="portfolioId"]'
    );

    list.innerHTML = "";

    select.innerHTML =
        '<option value="">Select Portfolio</option>';

    portfolios.forEach(portfolio => {

        // Add option to select
        const option = document.createElement("option");

        option.value = portfolio.id;
        option.textContent = portfolio.name;

        select.appendChild(option);

        // Display Portfolio
        const card = document.createElement("div");

        card.className = "card p-3 mb-3";

        const heading = document.createElement("h4");
        heading.textContent = portfolio.name;

        const enjoy = document.createElement("p");
        enjoy.textContent =
            "Enjoy: " + portfolio.whatIEnjoy;

        const tried = document.createElement("p");
        tried.textContent =
            "Tried: " + portfolio.whatIveTried;

        const curious = document.createElement("p");
        curious.textContent =
            "Curious: " + portfolio.whatImCuriousAbout;

        card.append(heading, enjoy, tried, curious);

        portfolio.items.forEach(item => {

            
portfolio.items.forEach(item => {

    const itemCard = document.createElement("div");
    itemCard.className = "border rounded p-3 mb-3";

    // Title
    const title = document.createElement("h5");
    title.innerHTML = '<i class="fa-solid fa-folder-open"></i> ';
    title.append(document.createTextNode(item.title));

    // Type
    const type = document.createElement("p");
    type.innerHTML = "<strong>Type:</strong> ";
    type.append(document.createTextNode(item.type));

    // Date
    const date = document.createElement("p");
    date.innerHTML = "<strong>Date:</strong> ";
    date.append(document.createTextNode(item.date));

    // Role
    const role = document.createElement("p");
    role.innerHTML = "<strong>Role:</strong> ";
    role.append(document.createTextNode(item.role));

    // Description
    const description = document.createElement("p");
    description.innerHTML = "<strong>Description:</strong> ";
    description.append(document.createTextNode(item.description));

    // Skills
    const skills = document.createElement("p");
    skills.innerHTML = "<strong>Skills:</strong> ";
    skills.append(document.createTextNode(item.skills.join(", ")));

    // Reflection
    const reflectionTitle = document.createElement("h6");
    reflectionTitle.innerHTML =
        '<i class="fa-solid fa-lightbulb"></i> Reflection';

    const reflection = document.createElement("div");
    reflection.innerHTML = `
        <p><strong>What I did:</strong> ${escapeHTML(item.reflection.whatIDid)}</p>
        <p><strong>What I learned:</strong> ${escapeHTML(item.reflection.whatILearned)}</p>
        <p><strong>Challenge:</strong> ${escapeHTML(item.reflection.challenge)}</p>
        <p><strong>Next step:</strong> ${escapeHTML(item.reflection.nextStep)}</p>
    `;

   
    const evidenceTitle = document.createElement("p");
    evidenceTitle.innerHTML = "<strong>Evidence:</strong> ";

    const evidence = document.createElement("a");
    evidence.href = item.evidence[0];
    evidence.textContent = "View Evidence";
    evidence.target = "_blank";
    evidence.rel = "noopener noreferrer";

    evidenceTitle.appendChild(evidence);

   
    itemCard.append(
        title,
        type,
        date,
        role,
        description,
        skills,
        reflectionTitle,
        reflection,
        evidenceTitle
    );

    card.appendChild(itemCard);
});

        });

        list.appendChild(card);
    });
}


// Show data when page opens
renderPortfolios();
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


