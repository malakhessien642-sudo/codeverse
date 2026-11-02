// ==============================
// CODEVERSE THEME SYSTEM
// ==============================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("codeverse-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeBtn.textContent = "☾";
} else {
    document.body.classList.remove("light-mode");
    themeBtn.textContent = "☀";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    if (isLight) {
        themeBtn.textContent = "☾";
        localStorage.setItem("codeverse-theme", "light");
    } else {
        themeBtn.textContent = "☀";
        localStorage.setItem("codeverse-theme", "dark");
    }

});// ==============================
// CODEVERSE LANGUAGE SYSTEM
// ==============================

const languageBtn = document.getElementById("languageBtn");

let currentLanguage =
    localStorage.getItem("codeverse-language") || "en";

const translations = {
    en: {
        home: "Home",
        courses: "Courses",
        about: "About",
        explore: "Explore Courses",
        heroTitle: "Explore Code. Build Your Future.",
        heroDescription: "Start your programming journey with structured courses, practical lessons, and real projects.",
        coursesTitle: "Explore Our Courses",
        coursesDescription: "Choose your path and start building your future.",
        aboutTitle: "Why CODEVERSE?",
        dashboardTitle: "Your Learning Dashboard"
    },

    ar: {
        home: "الرئيسية",
        courses: "الكورسات",
        about: "عن المنصة",
        explore: "استكشف الكورسات",
        heroTitle: "اكتشف البرمجة. وابنِ مستقبلك.",
        heroDescription: "ابدأ رحلتك في البرمجة من خلال مسارات تعليمية منظمة ودروس عملية ومشروعات حقيقية.",
        coursesTitle: "استكشف الكورسات",
        coursesDescription: "اختار مسارك وابدأ في بناء مستقبلك.",
        aboutTitle: "لماذا CODEVERSE؟",
        dashboardTitle: "لوحة تقدمك التعليمية"
    }
};

function updateLanguage() {

    const lang = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks[0].textContent = lang.home;
    navLinks[1].textContent = lang.courses;
    navLinks[2].textContent = lang.about;

    languageBtn.textContent =
        currentLanguage === "en" ? "EN / AR" : "AR / EN";

    document.querySelector(".explore-btn").textContent = lang.explore;

    document.querySelector(".hero h1").textContent = lang.heroTitle;

    document.querySelector(".hero-description").textContent =
        lang.heroDescription;

    document.querySelector(".courses-section h2").textContent =
        lang.coursesTitle;

    document.querySelector(".features-section h2").textContent =
        lang.aboutTitle;

    document.querySelector(".dashboard-heading h2").textContent =
        lang.dashboardTitle;

    localStorage.setItem("codeverse-language", currentLanguage);
}

languageBtn.addEventListener("click", () => {

    currentLanguage = currentLanguage === "en" ? "ar" : "en";

    updateLanguage();

});

updateLanguage();// ==============================
// COURSE NAVIGATION SYSTEM
// ==============================

const courseCards = document.querySelectorAll(".course-card");

const courseNames = {
    java: "Java",
    javascript: "JavaScript",
    html: "HTML",
    css: "CSS",
    php: "PHP",
    dart: "Dart"
};

courseCards.forEach((card, index) => {

    const courseKeys = [
        "java",
        "javascript",
        "html",
        "css",
        "php",
        "dart"
    ];

    const courseKey = courseKeys[index];

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

        localStorage.setItem(
            "codeverse-current-course",
            courseKey
        );

        openCourse(courseKey);

    });

});

function openCourse(courseKey) {

    const courseName = courseNames[courseKey];

    if (!courseName) return;

    alert(
        currentLanguage === "ar"
        ? "تم اختيار كورس " + courseName +
          ". جاري تجهيز صفحة الدروس!"
        : courseName +
          " course selected. Lesson viewer is being prepared!"
    );

}// ==============================
// COURSE VIEWER NAVIGATION
// ==============================

const courseViewer = document.getElementById("courseViewer");
const backToCourses = document.getElementById("backToCourses");

const courseDescriptions = {
    java: "Master Java programming step by step.",
    javascript: "Build interactive websites with JavaScript.",
    html: "Learn how to structure modern websites.",
    css: "Create beautiful and responsive designs.",
    php: "Learn server-side web development.",
    dart: "Start programming with Dart."
};

function openCourse(courseKey) {

    const courseName = courseNames[courseKey];

    if (!courseName) return;

    document.querySelectorAll(
        ".hero, .courses-section, .features-section, .dashboard-section, .footer"
    ).forEach(section => {
        section.hidden = true;
    });

    courseViewer.hidden = false;

    document.getElementById("viewerCourseTitle").textContent =
        courseName;

    document.getElementById("viewerCourseDescription").textContent =
        courseDescriptions[courseKey];

    const lessonsList = document.getElementById("lessonsList");

    lessonsList.innerHTML = "";

    const lessonButton = document.createElement("button");

    lessonButton.className = "secondary-btn";
    lessonButton.textContent =
        currentLanguage === "ar"
        ? "مقدمة الكورس"
        : "Course Introduction";

    lessonButton.addEventListener("click", () => {

        document.getElementById("lessonDetails").innerHTML = `
            <h2>${courseName} - Introduction</h2>
            <p>Welcome to ${courseName} in CODEVERSE.</p>
            <p>Your learning journey starts here.</p>
            <p>Detailed lessons and practical examples will be added next.</p>
        `;

    });

    lessonsList.appendChild(lessonButton);

    lessonButton.click();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

backToCourses.addEventListener("click", () => {

    courseViewer.hidden = true;

    document.querySelectorAll(
        ".hero, .courses-section, .features-section, .dashboard-section, .footer"
    ).forEach(section => {
        section.hidden = false;
    });

    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });

});// ==============================
// LOAD REAL COURSE CONTENT
// ==============================

function openCourse(courseKey) {

    const courseViewer = document.getElementById("courseViewer");

    document.querySelectorAll(
        ".hero, .courses-section, .features-section, .dashboard-section, .footer"
    ).forEach(section => {
        section.hidden = true;
    });

    courseViewer.hidden = false;

    const title = document.getElementById("viewerCourseTitle");
    const description = document.getElementById("viewerCourseDescription");
    const lessonsList = document.getElementById("lessonsList");
    const lessonDetails = document.getElementById("lessonDetails");

    title.textContent = "Loading...";
    lessonsList.innerHTML = "";
    lessonDetails.innerHTML = "<h2>Loading course lessons...</h2>";

    function displayCourse() {

        const course = window.courseData?.[courseKey];

        if (!course) {
            lessonDetails.innerHTML =
                "<h2>Course content not found.</h2>";
            return;
        }

        title.textContent = course.title;
        description.textContent = course.description;

        lessonsList.innerHTML = "";

        course.units.forEach((unit, unitIndex) => {

            const unitTitle = document.createElement("h3");
            unitTitle.textContent = unit.title;
            lessonsList.appendChild(unitTitle);

            unit.lessons.forEach((lesson, lessonIndex) => {

                const button = document.createElement("button");

                button.className = "secondary-btn";
                button.textContent = lesson.title;
                button.style.width = "100%";
                button.style.textAlign = "left";

                button.addEventListener("click", () => {
                    lessonDetails.innerHTML = lesson.content;
                });

                lessonsList.appendChild(button);

                if (unitIndex === 0 && lessonIndex === 0) {
                    button.click();
                }

            });

        });

    }

    if (window.courseData?.[courseKey]) {
        displayCourse();
    } else {

        const script = document.createElement("script");

        script.src = courseKey + ".js";

        script.onload = displayCourse;

        script.onerror = () => {
            lessonDetails.innerHTML =
                "<h2>Unable to load course content.</h2>";
        };

        document.body.appendChild(script);

    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}// ==============================
// CODEVERSE COURSE FIX
// ==============================

function openRealCourse(courseKey) {

    const viewer = document.getElementById("courseViewer");
    const title = document.getElementById("viewerCourseTitle");
    const description = document.getElementById("viewerCourseDescription");
    const lessons = document.getElementById("lessonsList");
    const details = document.getElementById("lessonDetails");

    document.querySelectorAll(
        ".hero, .courses-section, .features-section, .dashboard-section, .footer"
    ).forEach(section => section.hidden = true);

    viewer.hidden = false;
    title.textContent = courseNames[courseKey];
    description.textContent = "Your learning journey starts here.";
    lessons.innerHTML = "";
    details.innerHTML = "<h2>Loading lessons...</h2>";

    function showLessons() {

        const course = window.courseData?.[courseKey];

        if (!course) {
            details.innerHTML = "<h2>Course content not found.</h2>";
            return;
        }

        title.textContent = course.title;
        description.textContent = course.description;

        course.units.forEach(unit => {

            const heading = document.createElement("h3");
            heading.textContent = unit.title;
            lessons.appendChild(heading);

            unit.lessons.forEach(lesson => {

                const button = document.createElement("button");
                button.className = "secondary-btn";
                button.textContent = lesson.title;
                button.style.width = "100%";

                button.addEventListener("click", () => {
                    details.innerHTML = lesson.content;
                });

                lessons.appendChild(button);

            });

        });

        const firstLesson = lessons.querySelector("button");
        if (firstLesson) firstLesson.click();
    }

    if (window.courseData?.[courseKey]) {
        showLessons();
    } else {
        const script = document.createElement("script");
        script.src = courseKey + ".js";

        script.onload = showLessons;

        script.onerror = () => {
            details.innerHTML = "<h2>Could not load this course.</h2>";
        };

        document.body.appendChild(script);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Intercept course clicks before the old handlers

document.addEventListener("click", function(event) {

    const card = event.target.closest(".course-card");

    if (!card) return;

    const cards = Array.from(
        document.querySelectorAll(".course-card")
    );

    const index = cards.indexOf(card);

    const keys = ["java", "javascript", "html", "css", "php", "dart"];

    if (!keys[index]) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    localStorage.setItem("codeverse-current-course", keys[index]);

    openRealCourse(keys[index]);

}, true);