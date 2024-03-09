document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelector(".content .projects .card-container");
    const announcements = document.querySelector(".content .announcements .card");
    const trending = document.querySelector(".content .trending .card");

    generateProjects();
    generateAnnouncements();
    generateTrending();

    function generateProjects() {
        const projectTitles = [
            "Super Cool Project",
            "Less Cool Project",
            "Impossible App",
            "Easy Peasy App",
            "Ad Blocker",
            "Money Maker",
        ];

        for (const title of projectTitles) {
            projects.appendChild(createProjectCard(title));
        }
    }

    function createProjectCard(titleText) {
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const actions = document.createElement("div");

        title.innerText = titleText;
        description.innerText = generateLoremWords(30);
        actions.classList.add("project-actions");

        const icons = ["icons/star-plus-outline.svg", "icons/eye-plus-outline.svg", "icons/source-fork.svg"];

        for (const path of icons) {
            const img = document.createElement("img");
            img.classList.add("icon");
            img.setAttribute("src", path);
            actions.appendChild(img);
        }

        const projectCard = document.createElement("div");

        projectCard.classList.add("project", "card");
        projectCard.replaceChildren(title, description, actions);

        return projectCard;
    }

    function generateAnnouncements() {
        const titles = ["Site Maintenance", "Community Share Day", "Updated Privacy Policy"];

        for (const title of titles) {
            announcements.appendChild(createAnnouncement(title));
        }
    }

    function createAnnouncement(announcementTitle) {
        const card = document.createElement("div");
        const title = document.createElement("h3");
        const summary = document.createElement("p");

        title.textContent = announcementTitle;
        summary.textContent = generateLoremWords(10);

        card.classList.add("announcement-card");
        card.appendChild(title);
        card.appendChild(summary);

        return card;
    }

    function generateTrending() {
        const trendingProjects = [
            { user: "@tegan", title: "World Peace Builder" },
            { user: "@morgan", title: "Super Cool Project" },
            { user: "@kendall", title: "Life Changing Project" },
            { user: "@alex", title: "No Traffic Maker" },
        ];

        for (const project of trendingProjects) {
            trending.appendChild(createTrendingProject(project));
        }
    }

    function createTrendingProject({ user, title }) {
        const img = document.createElement("div");
        const userTag = document.createElement("p");
        const projectName = document.createElement("p");

        img.classList.add("profile-image");
        img.style.backgroundColor = `hsl(${randomHue()}, 80%, 60%)`;

        userTag.classList.add("user-tag");
        userTag.innerText = user;

        projectName.classList.add("project-name");
        projectName.innerText = title;

        const stack = document.createElement("div");
        stack.appendChild(userTag);
        stack.appendChild(projectName);

        const card = document.createElement("div");
        card.classList.add("trending-project");
        card.appendChild(img);
        card.appendChild(stack);

        return card;
    }

    function generateLoremWords(wordCount) {
        const lorem = loremGenerator();
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            words.push(lorem.next().value);
        }
        return words.join(" ");
    }

    function* loremGenerator() {
        const loremWords =
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dolore" +
            " voluptates iure aspernatur unde neque quas quibusdam, itaque odio quisquam" +
            " eaque. Nulla quasi saepe corporis illo veritatis adipisci voluptas a commodi" +
            " doloribus, numquam mollitia, inventore non laudantium? Est, ex voluptas" +
            " eveniet exercitationem enim assumenda eaque necessitatibus doloremque" +
            " perferendis voluptatum molestiae?";

        while (true) {
            for (const word of loremWords.split(" ")) {
                yield word;
            }
        }
    }

    function randomHue() {
        return Math.floor(Math.random() * 360);
    }
});
