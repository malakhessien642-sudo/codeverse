/* =====================================
   CODEVERSE
   CENTRAL LEARNING SYSTEM
===================================== */

"use strict";

// =====================================
// COURSE DATABASE
// =====================================

const CODEVERSE_COURSES = {

    java: {
        id: "java",
        title: "Java Programming",
        icon: "☕",
        level: "Beginner to Advanced",
        description: "Master Java programming from the fundamentals to advanced development.",
        language: "Java",
        file: "java.js"
    },

    javascript: {
        id: "javascript",
        title: "JavaScript",
        icon: "🟨",
        level: "Beginner to Advanced",
        description: "Learn modern JavaScript and build interactive applications.",
        language: "JavaScript",
        file: "javascript.js"
    },

    html: {
        id: "html",
        title: "HTML5",
        icon: "🌐",
        level: "Beginner to Advanced",
        description: "Learn how to structure professional and accessible websites.",
        language: "HTML",
        file: "html.js"
    },

    css: {
        id: "css",
        title: "CSS3",
        icon: "🎨",
        level: "Beginner to Advanced",
        description: "Master modern web styling, layouts, animations, and responsive design.",
        language: "CSS",
        file: "css.js"
    },

    php: {
        id: "php",
        title: "PHP Development",
        icon: "🐘",
        level: "Beginner to Advanced",
        description: "Learn server-side programming and dynamic web development.",
        language: "PHP",
        file: "php.js"
    },

    dart: {
        id: "dart",
        title: "Dart Programming",
        icon: "🎯",
        level: "Beginner to Advanced",
        description: "Learn Dart programming and prepare for Flutter development.",
        language: "Dart",
        file: "dart.js"
    }

};

// =====================================
// GLOBAL APPLICATION STATE
// =====================================

const CODEVERSE_STATE = {

    currentCourse: null,

    currentUnit: 0,

    currentLesson: 0,

    currentLanguage: "en",

    theme: "dark",

    courses: CODEVERSE_COURSES

};

// =====================================
// STORAGE SYSTEM
// =====================================

const CODEVERSE_STORAGE = {

    get(key, fallback = null) {

        try {

            const value = localStorage.getItem(
                "codeverse-" + key
            );

            return value === null
                ? fallback
                : JSON.parse(value);

        } catch (error) {

            return fallback;

        }

    },

    set(key, value) {

        try {

            localStorage.setItem(
                "codeverse-" + key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error("Storage error:", error);

            return false;

        }

    }

};// =====================================
// RENDER COURSE CARDS
// =====================================

function renderCourses() {

    const container = document.getElementById("coursesGrid");

    if (!container) return;

    container.innerHTML = "";

    Object.values(CODEVERSE_COURSES).forEach(course => {

        const card = document.createElement("article");

        card.className = "course-card";
        card.dataset.course = course.id;
        card.tabIndex = 0;
        card.setAttribute("role", "button");

        card.innerHTML = `
            <div class="course-icon">
                ${course.icon}
            </div>

            <h3>${course.title}</h3>

            <p>${course.description}</p>

            <div class="course-meta">
                <span>${course.level}</span>
                <span>${course.language}</span>
            </div>

            <div class="course-start">
                <span>Start Learning</span>
                <span>→</span>
            </div>
        `;

        card.addEventListener("click", () => {
            openCourse(course.id);
        });

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCourse(course.id);
            }

        });

        container.appendChild(card);

    });

}// =====================================
// LOAD COURSE DATA
// =====================================

async function loadCourseData(courseId) {

    const course = CODEVERSE_COURSES[courseId];

    if (!course) {
        console.error("Course not found:", courseId);
        return null;
    }

    try {

        const response = await fetch(course.file);

        if (!response.ok) {
            throw new Error("Course file could not be loaded");
        }

        const module = await response.text();

        const script = document.createElement("script");

        script.textContent = module;

        document.body.appendChild(script);

        return window.CODEVERSE_LESSONS?.[courseId] || null;

    } catch (error) {

        console.error("Course loading error:", error);

        return null;

    }

}// =====================================
// OPEN COURSE VIEWER
// =====================================

function loadCourseScript(course) {

    return new Promise((resolve, reject) => {

        const script = document.createElement("script");

        script.src = course.file;

        script.onload = () => resolve(true);

        script.onerror = () => reject(
            new Error("Failed to load " + course.file)
        );

        document.body.appendChild(script);

    });

}

async function openCourse(courseId) {

    const course = CODEVERSE_COURSES[courseId];

    if (!course) return;

    CODEVERSE_STATE.currentCourse = courseId;

    const viewer = document.getElementById("courseViewer");

    if (!viewer) return;

    viewer.hidden = false;

    document.getElementById("viewerCourseTitle").textContent =
        course.title;

    document.getElementById("viewerCourseDescription").textContent =
        course.description;

    document.getElementById("viewerCourseLevel").textContent =
        course.level;

    document.getElementById("lessonsList").textContent =
        "Loading lessons...";

    document.getElementById("lessonDetails").textContent =
        "Select a lesson to begin.";

    document.getElementById("courses").scrollIntoView();

    try {

        await loadCourseScript(course);

        console.log("Course loaded:", courseId);

    } catch (error) {

        document.getElementById("lessonsList").textContent =
            "Unable to load this course yet.";

        console.error(error);

    }

}// =====================================
// BACK TO COURSES
// =====================================

function backToCourses() {

    const viewer = document.getElementById("courseViewer");

    const courses = document.getElementById("courses");

    if (!viewer || !courses) return;

    viewer.hidden = true;

    CODEVERSE_STATE.currentCourse = null;

    CODEVERSE_STATE.currentUnit = 0;

    CODEVERSE_STATE.currentLesson = 0;

    courses.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// =====================================
// BACK BUTTON EVENT
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const backButton = document.getElementById("backToCourses");

    if (backButton) {
        backButton.addEventListener("click", backToCourses);
    }

});// =====================================
// RENDER COURSE LESSONS
// =====================================

function renderLessons(courseId) {

    const container = document.getElementById("lessonsList");

    const units = window.CODEVERSE_LESSONS?.[courseId];

    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(units) || units.length === 0) {
        container.textContent = "No lessons available yet.";
        return;
    }

    units.forEach((unit, unitIndex) => {

        const unitBox = document.createElement("div");
        unitBox.className = "lesson-unit";

        const heading = document.createElement("h3");
        heading.textContent = unit.title;

        unitBox.appendChild(heading);

        unit.lessons.forEach((lesson, lessonIndex) => {

            const button = document.createElement("button");

            button.className = "lesson-item";
            button.textContent = lesson.title;

            button.addEventListener("click", () => {
                selectLesson(courseId, unitIndex, lessonIndex);
            });

            unitBox.appendChild(button);

        });

        container.appendChild(unitBox);

    });

}// =====================================
// SELECT AND DISPLAY LESSON
// =====================================

function selectLesson(courseId, unitIndex, lessonIndex) {

    const units = window.CODEVERSE_LESSONS?.[courseId];

    if (!units || !units[unitIndex]) return;

    const lesson = units[unitIndex].lessons?.[lessonIndex];

    if (!lesson) return;

    CODEVERSE_STATE.currentCourse = courseId;
    CODEVERSE_STATE.currentUnit = unitIndex;
    CODEVERSE_STATE.currentLesson = lessonIndex;

    const details = document.getElementById("lessonDetails");

    if (!details) return;

    details.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = lesson.title;

    const duration = document.createElement("p");
    duration.textContent = lesson.duration || "Self-paced lesson";

    const description = document.createElement("p");
    description.textContent =
        lesson.description || "Start learning this lesson.";

    details.append(title, duration, description);

    details.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// =====================================
// UPDATED COURSE OPENING
// =====================================

async function openCourse(courseId) {

    const course = CODEVERSE_COURSES[courseId];

    if (!course) return;

    CODEVERSE_STATE.currentCourse = courseId;

    const viewer = document.getElementById("courseViewer");

    if (!viewer) return;

    viewer.hidden = false;

    document.getElementById("viewerCourseTitle").textContent =
        course.title;

    document.getElementById("viewerCourseDescription").textContent =
        course.description;

    document.getElementById("viewerCourseLevel").textContent =
        course.level;

    document.getElementById("lessonsList").textContent =
        "Loading lessons...";

    document.getElementById("lessonDetails").textContent =
        "Select a lesson to begin.";

    try {

        await loadCourseScript(course);

        renderLessons(courseId);

    } catch (error) {

        document.getElementById("lessonsList").textContent =
            "Unable to load this course yet.";

        console.error(error);

    }

}// =====================================
// LESSON CONTENT RENDERER
// =====================================

function createLessonElement(tag, className, content) {

    const element = document.createElement(tag);

    if (className) element.className = className;

    if (content !== undefined) {
        element.textContent = content;
    }

    return element;

}

function renderLessonContent(lesson) {

    const details = document.getElementById("lessonDetails");

    if (!details || !lesson) return;

    details.replaceChildren();

    const title = createLessonElement(
        "h2",
        "lesson-title",
        lesson.title
    );

    details.appendChild(title);

    if (lesson.duration) {
        details.appendChild(
            createLessonElement("p", "lesson-duration", lesson.duration)
        );
    }

    // Learning Objectives

    if (lesson.objectives?.length) {

        const section = createLessonElement(
            "section",
            "lesson-objectives"
        );

        section.appendChild(
            createLessonElement("h3", "", "Learning Objectives")
        );

        const list = document.createElement("ul");

        lesson.objectives.forEach(item => {
            list.appendChild(
                createLessonElement("li", "", item)
            );
        });

        section.appendChild(list);
        details.appendChild(section);

    }

}// =====================================
// LESSON SECTIONS RENDERER
// =====================================

function renderLessonSections(lesson, container) {

    if (!Array.isArray(lesson.sections)) return;

    lesson.sections.forEach(section => {

        const box = document.createElement("section");
        box.className = "lesson-section";

        const heading = document.createElement("h3");
        heading.textContent = section.title || "Lesson Content";

        box.appendChild(heading);

        if (section.type === "explanation") {

            const text = document.createElement("p");
            text.textContent = section.text || "";
            box.appendChild(text);

        }

        if (section.type === "code") {

            const code = document.createElement("pre");
            const codeText = document.createElement("code");

            codeText.textContent = section.code || "";
            code.appendChild(codeText);

            box.appendChild(code);

            if (section.output) {

                const output = document.createElement("p");
                output.className = "lesson-output";
                output.textContent = "Expected Output: " + section.output;

                box.appendChild(output);

            }

        }

        container.appendChild(box);

    });

}// =====================================
// UPDATE LESSON DISPLAY
// =====================================

function selectLesson(courseId, unitIndex, lessonIndex) {

    const units = window.CODEVERSE_LESSONS?.[courseId];

    const lesson = units?.[unitIndex]?.lessons?.[lessonIndex];

    if (!lesson) return;

    CODEVERSE_STATE.currentCourse = courseId;
    CODEVERSE_STATE.currentUnit = unitIndex;
    CODEVERSE_STATE.currentLesson = lessonIndex;

    const details = document.getElementById("lessonDetails");

    if (!details) return;

    details.replaceChildren();

    renderLessonContent(lesson);

    renderLessonSections(lesson, details);

    details.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}// =====================================
// LINE BY LINE CODE EXPLANATION
// =====================================

function renderCodeExplanation(section, container) {

    if (!section.explanation?.length) return;

    const box = document.createElement("div");
    box.className = "code-explanation";

    const heading = document.createElement("h4");
    heading.textContent = "Line-by-Line Explanation";

    box.appendChild(heading);

    const list = document.createElement("ol");

    section.explanation.forEach(item => {

        const line = document.createElement("li");

        line.textContent = item;

        list.appendChild(line);

    });

    box.appendChild(list);

    container.appendChild(box);

}// =====================================
// COMMON MISTAKES RENDERER
// =====================================

function renderCommonMistakes(section, container) {

    if (!section.items?.length) return;

    const box = document.createElement("section");
    box.className = "lesson-mistakes";

    const heading = document.createElement("h3");
    heading.textContent = "Common Mistakes";

    box.appendChild(heading);

    section.items.forEach(item => {

        const mistake = document.createElement("div");
        mistake.className = "mistake-item";

        const title = document.createElement("h4");
        title.textContent = item.title || "Common Mistake";

        const description = document.createElement("p");
        description.textContent = item.description || "";

        mistake.append(title, description);
        box.appendChild(mistake);

    });

    container.appendChild(box);

}// =====================================
// COMPLETE LESSON SECTIONS
// =====================================

function renderLessonSections(lesson, container) {

    if (!Array.isArray(lesson.sections)) return;

    lesson.sections.forEach(section => {

        const box = document.createElement("section");
        box.className = "lesson-section";

        const heading = document.createElement("h3");
        heading.textContent = section.title || "Lesson Content";

        box.appendChild(heading);

        if (section.type === "explanation") {

            const text = document.createElement("p");
            text.textContent = section.text || "";
            box.appendChild(text);

        }

        if (section.type === "code") {

            const pre = document.createElement("pre");
            const code = document.createElement("code");

            code.textContent = section.code || "";

            pre.appendChild(code);
            box.appendChild(pre);

            if (section.output) {
                const output = document.createElement("p");
                output.textContent = "Expected Output: " + section.output;
                box.appendChild(output);
            }

            renderCodeExplanation(section, box);

        }

        if (section.type === "mistakes") {
            renderCommonMistakes(section, box);
        }

        if (section.type === "practice") {

            const instructions = document.createElement("p");
            instructions.textContent = section.instructions || "";

            const editor = document.createElement("textarea");
            editor.className = "practice-editor";
            editor.value = section.starterCode || "";
            editor.placeholder = "Write your code here...";

            box.append(instructions, editor);

        }

        container.appendChild(box);

    });

}// =====================================
// LESSON QUIZ RENDERER
// =====================================

function renderLessonQuiz(section, container) {

    if (!section.questions?.length) return;

    const box = document.createElement("section");
    box.className = "lesson-quiz";

    const heading = document.createElement("h3");
    heading.textContent = "Knowledge Check";

    box.appendChild(heading);

    section.questions.forEach((question, index) => {

        const item = document.createElement("div");
        item.className = "quiz-question";

        const title = document.createElement("h4");
        title.textContent = `${index + 1}. ${question.question}`;

        item.appendChild(title);

        question.options.forEach((option, optionIndex) => {

            const label = document.createElement("label");
            const input = document.createElement("input");

            input.type = "radio";
            input.name = `quiz-${index}`;
            input.value = optionIndex;

            label.append(input, document.createTextNode(option));

            item.appendChild(label);

        });

        const result = document.createElement("p");
        result.className = "quiz-result";

        const check = document.createElement("button");
        check.type = "button";
        check.textContent = "Check Answer";

        check.addEventListener("click", () => {

            const selected = item.querySelector(
                `input[name="quiz-${index}"]:checked`
            );

            if (!selected) {
                result.textContent = "Choose an answer first.";
                return;
            }

            const correct = Number(selected.value) === question.answer;

            result.textContent = correct
                ? "Correct! " + (question.explanation || "")
                : "Not quite. Try again!";

        });

        item.append(check, result);
        box.appendChild(item);

    });

    container.appendChild(box);

}// =====================================
// CONNECT QUIZ TO LESSON VIEWER
// =====================================

function renderLessonSections(lesson, container) {

    if (!Array.isArray(lesson.sections)) return;

    lesson.sections.forEach(section => {

        const box = document.createElement("section");
        box.className = "lesson-section";

        const heading = document.createElement("h3");
        heading.textContent = section.title || "Lesson Content";

        box.appendChild(heading);

        if (section.type === "explanation") {

            const text = document.createElement("p");
            text.textContent = section.text || "";
            box.appendChild(text);

        }

        else if (section.type === "code") {

            const pre = document.createElement("pre");
            const code = document.createElement("code");

            code.textContent = section.code || "";

            pre.appendChild(code);
            box.appendChild(pre);

            if (section.output) {
                const output = document.createElement("p");
                output.textContent = "Expected Output: " + section.output;
                box.appendChild(output);
            }

            renderCodeExplanation(section, box);

        }

        else if (section.type === "mistakes") {
            renderCommonMistakes(section, box);
        }

        else if (section.type === "practice") {

            const instructions = document.createElement("p");
            instructions.textContent = section.instructions || "";

            const editor = document.createElement("textarea");
            editor.className = "practice-editor";
            editor.value = section.starterCode || "";

            box.append(instructions, editor);

        }

        else if (section.type === "quiz") {
            renderLessonQuiz(section, box);
        }

        container.appendChild(box);

    });

}// =====================================
// QUIZ SCORE SYSTEM
// =====================================

function renderLessonQuiz(section, container) {

    if (!section.questions?.length) return;

    const box = document.createElement("section");
    box.className = "lesson-quiz";

    const heading = document.createElement("h3");
    heading.textContent = "Knowledge Check";

    const scoreBox = document.createElement("p");
    scoreBox.className = "quiz-score";
    scoreBox.textContent = "Answer all questions to see your score.";

    const answers = {};

    section.questions.forEach((question, index) => {

        const item = document.createElement("div");
        item.className = "quiz-question";

        const title = document.createElement("h4");
        title.textContent = `${index + 1}. ${question.question}`;

        item.appendChild(title);

        question.options.forEach((option, optionIndex) => {

            const label = document.createElement("label");
            const input = document.createElement("input");

            input.type = "radio";
            input.name = `quiz-${index}`;
            input.value = optionIndex;

            input.addEventListener("change", () => {
                answers[index] = optionIndex;
            });

            label.append(input, document.createTextNode(option));
            item.appendChild(label);

        });

        box.appendChild(item);

    });

    const submit = document.createElement("button");
    submit.textContent = "Submit Quiz";

    submit.addEventListener("click", () => {

        if (Object.keys(answers).length !== section.questions.length) {
            scoreBox.textContent = "Answer all questions first.";
            return;
        }

        let score = 0;

        section.questions.forEach((question, index) => {
            if (answers[index] === question.answer) score++;
        });

        scoreBox.textContent =
            `Your Score: ${score} / ${section.questions.length}`;

    });

    box.append(submit, scoreBox);
    container.appendChild(box);

}// =====================================
// STUDENT PROGRESS SYSTEM
// =====================================

function getCourseProgress(courseId) {

    return CODEVERSE_STORAGE.get(
        "progress-" + courseId,
        []
    );

}

function saveLessonProgress(courseId, lessonId) {

    const progress = getCourseProgress(courseId);

    if (!progress.includes(lessonId)) {

        progress.push(lessonId);

        CODEVERSE_STORAGE.set(
            "progress-" + courseId,
            progress
        );

    }

    updateProgressDashboard();

}

function isLessonCompleted(courseId, lessonId) {

    return getCourseProgress(courseId).includes(lessonId);

}// =====================================
// LESSON COMPLETION BUTTON
// =====================================

function addCompletionButton(lesson, courseId, container) {

    const button = document.createElement("button");

    const lessonId = lesson.id;

    button.className = "complete-lesson-btn";

    function updateButton() {

        button.textContent = isLessonCompleted(courseId, lessonId)
            ? "✓ Lesson Completed"
            : "Mark as Completed";

    }

    updateButton();

    button.addEventListener("click", () => {

        saveLessonProgress(courseId, lessonId);

        updateButton();

    });

    container.appendChild(button);

}// =====================================
// CONNECT COMPLETION TO LESSON VIEWER
// =====================================

function selectLesson(courseId, unitIndex, lessonIndex) {

    const units = window.CODEVERSE_LESSONS?.[courseId];

    const lesson = units?.[unitIndex]?.lessons?.[lessonIndex];

    if (!lesson) return;

    CODEVERSE_STATE.currentCourse = courseId;
    CODEVERSE_STATE.currentUnit = unitIndex;
    CODEVERSE_STATE.currentLesson = lessonIndex;

    const details = document.getElementById("lessonDetails");

    if (!details) return;

    details.replaceChildren();

    renderLessonContent(lesson);
    renderLessonSections(lesson, details);

    addCompletionButton(
        lesson,
        courseId,
        details
    );

    details.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}// =====================================
// COURSE PROGRESS CALCULATION
// =====================================

function calculateCourseProgress(courseId) {

    const units = window.CODEVERSE_LESSONS?.[courseId];

    if (!Array.isArray(units)) {
        return {
            completed: 0,
            total: 0,
            percentage: 0
        };
    }

    const total = units.reduce((sum, unit) => {
        return sum + (unit.lessons?.length || 0);
    }, 0);

    const completed = getCourseProgress(courseId).filter(id =>
        units.some(unit =>
            unit.lessons?.some(lesson => lesson.id === id)
        )
    ).length;

    return {
        completed,
        total,
        percentage: total
            ? Math.round((completed / total) * 100)
            : 0
    };

}// =====================================
// PROGRESS DASHBOARD
// =====================================

function updateProgressDashboard() {

    const dashboard = document.getElementById(
        "progressDashboard"
    );

    if (!dashboard) return;

    dashboard.replaceChildren();

    Object.values(CODEVERSE_COURSES).forEach(course => {

        const progress = calculateCourseProgress(course.id);

        const card = document.createElement("div");
        card.className = "progress-card";

        const title = document.createElement("h3");
        title.textContent = course.title;

        const count = document.createElement("p");
        count.textContent =
            `${progress.completed} / ${progress.total} Lessons`;

        const percentage = document.createElement("p");
        percentage.textContent = progress.percentage + "%";

        const bar = document.createElement("div");
        bar.className = "progress-bar";

        const fill = document.createElement("div");
        fill.className = "progress-fill";

        fill.style.width = progress.percentage + "%";

        bar.appendChild(fill);

        card.append(title, count, percentage, bar);

        dashboard.appendChild(card);

    });

}// =====================================
// THEME SYSTEM
// =====================================

function applyTheme(theme) {

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    CODEVERSE_STATE.theme = theme;

    CODEVERSE_STORAGE.set("theme", theme);

    const button = document.getElementById("themeBtn");

    if (button) {
        button.textContent =
            theme === "dark" ? "☀️" : "🌙";
    }

}

function toggleTheme() {

    const nextTheme =
        CODEVERSE_STATE.theme === "dark"
            ? "light"
            : "dark";

    applyTheme(nextTheme);

}

// =====================================
// THEME INITIALIZATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const savedTheme = CODEVERSE_STORAGE.get(
        "theme",
        "dark"
    );

    applyTheme(savedTheme);

    const themeButton = document.getElementById("themeBtn");

    if (themeButton) {
        themeButton.addEventListener("click", toggleTheme);
    }

});// =====================================
// LANGUAGE SYSTEM
// =====================================

const CODEVERSE_TRANSLATIONS = {

    en: {
        home: "Home",
        courses: "Courses",
        progress: "My Progress",
        start: "Start Learning",
        back: "Back to Courses",
        completed: "Mark as Completed",
        objectives: "Learning Objectives",
        quiz: "Knowledge Check"
    },

    ar: {
        home: "الرئيسية",
        courses: "الكورسات",
        progress: "تقدمي",
        start: "ابدأ التعلم",
        back: "العودة للكورسات",
        completed: "تم إكمال الدرس",
        objectives: "أهداف التعلم",
        quiz: "اختبر معلوماتك"
    }

};

function applyLanguage(language) {

    const selected = language === "ar" ? "ar" : "en";

    CODEVERSE_STATE.currentLanguage = selected;

    document.documentElement.lang = selected;

    document.documentElement.dir =
        selected === "ar" ? "rtl" : "ltr";

    CODEVERSE_STORAGE.set("language", selected);

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        const translation = CODEVERSE_TRANSLATIONS[selected][key];

        if (translation) {
            element.textContent = translation;
        }

    });

    const button = document.getElementById("languageBtn");

    if (button) {
        button.textContent = selected === "ar" ? "English" : "العربية";
    }

}

function toggleLanguage() {

    const next =
        CODEVERSE_STATE.currentLanguage === "en" ? "ar" : "en";

    applyLanguage(next);

}

document.addEventListener("DOMContentLoaded", () => {

    applyLanguage(
        CODEVERSE_STORAGE.get("language", "en")
    );

    const button = document.getElementById("languageBtn");

    if (button) {
        button.addEventListener("click", toggleLanguage);
    }

});// =====================================
// SAVED CODE SNIPPETS
// =====================================

function saveCodeSnippet(courseId, lessonId, code) {

    const key = "snippets-" + courseId;

    const snippets = CODEVERSE_STORAGE.get(key, []);

    const existingIndex = snippets.findIndex(
        item => item.lessonId === lessonId
    );

    const snippet = {
        lessonId: lessonId,
        code: code,
        savedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        snippets[existingIndex] = snippet;
    } else {
        snippets.push(snippet);
    }

    return CODEVERSE_STORAGE.set(key, snippets);

}

function getSavedCodeSnippets(courseId) {

    return CODEVERSE_STORAGE.get(
        "snippets-" + courseId,
        []
    );

}