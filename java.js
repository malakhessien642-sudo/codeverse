// ==============================
// CODEVERSE JAVA COURSE
// UNIT 1: INTRODUCTION
// ==============================

window.courseData = window.courseData || {};

window.courseData.java = {

    title: "Java Programming",

    description: "From Beginner to Advanced",

    units: [

        {
            title: "Unit 1: Introduction to Java",

            lessons: [

                {
                    title: "Lesson 1: What is Java?",

                    content: `
                    <h2>What is Java?</h2>

                    <h3>1. Introduction</h3>

                    <p>
                    Java is a high-level, object-oriented,
                    general-purpose programming language.
                    It was developed by Sun Microsystems
                    and released in 1995.
                    </p>

                    <p dir="rtl">
                    جافا هي لغة برمجة عالية المستوى،
                    تعتمد على البرمجة كائنية التوجه،
                    وتُستخدم في تطوير تطبيقات وبرامج مختلفة.
                    </p>

                    <h3>2. Why Learn Java?</h3>

                    <ul>
                        <li>Object-Oriented Programming</li>
                        <li>Platform Independence</li>
                        <li>Strong Type System</li>
                        <li>Large Developer Community</li>
                        <li>Wide Range of Applications</li>
                    </ul>

                    <h3>3. Where is Java Used?</h3>

                    <ul>
                        <li>Enterprise Applications</li>
                        <li>Backend Development</li>
                        <li>Desktop Applications</li>
                        <li>Android Development</li>
                        <li>Financial Systems</li>
                    </ul>

                    <h3>4. First Java Program</h3>

                    <pre><code>
public class Main {

    public static void main(String[] args) {

        System.out.println("Hello, CODEVERSE!");

    }

}
                    </code></pre>

                    <h3>5. Expected Output</h3>

                    <pre><code>
Hello, CODEVERSE!
                    </code></pre>

                    <h3>6. Understanding the Program</h3>

                    <ul>
                        <li>
                        <b>public class Main:</b>
                        Defines a class named Main.
                        </li>

                        <li>
                        <b>main():</b>
                        The entry point of the program.
                        </li>

                        <li>
                        <b>System.out.println():</b>
                        Prints text and moves to a new line.
                        </li>

                        <li>
                        <b>Semicolon (;):</b>
                        Ends a Java statement.
                        </li>
                    </ul>

                    <h3>7. Common Mistakes</h3>

                    <ul>
                        <li>Forgetting the semicolon.</li>
                        <li>Writing Main with different capitalization.</li>
                        <li>Using incorrect quotation marks.</li>
                    </ul>

                    <h3>8. Practice</h3>

                    <p>
                    Write a Java program that prints your name
                    and your university.
                    </p>
                    `
                },

                {
                    title: "Lesson 2: JVM, JRE and JDK",

                    content: `
                    <h2>JVM, JRE and JDK</h2>

                    <h3>1. Introduction</h3>

                    <p>
                    Java uses a special environment to compile
                    and execute programs.
                    Three important concepts are JVM, JRE and JDK.
                    </p>

                    <h3>2. What is JVM?</h3>

                    <p>
                    JVM stands for Java Virtual Machine.
                    It executes Java bytecode.
                    </p>

                    <p dir="rtl">
                    الـ JVM هي الآلة الافتراضية المسؤولة
                    عن تشغيل الـ Bytecode الخاص بجافا.
                    </p>

                    <h3>3. What is JRE?</h3>

                    <p>
                    JRE stands for Java Runtime Environment.
                    It provides the environment and libraries
                    required to run Java applications.
                    </p>

                    <h3>4. What is JDK?</h3>

                    <p>
                    JDK stands for Java Development Kit.
                    It includes development tools such as
                    the Java compiler.
                    </p>

                    <h3>5. Main Differences</h3>

                    <ul>
                        <li>JVM: Executes bytecode.</li>
                        <li>JRE: Provides the runtime environment.</li>
                        <li>JDK: Provides tools to develop Java programs.</li>
                    </ul>

                    <h3>6. How Java Runs</h3>

                    <pre><code>
Java Source Code (.java)
          |
          v
Java Compiler (javac)
          |
          v
Bytecode (.class)
          |
          v
JVM
          |
          v
Program Execution
                    </code></pre>

                    <h3>7. Remember</h3>

                    <p>
                    The compiler converts source code into bytecode,
                    and the JVM executes that bytecode.
                    </p>

                    <h3>8. Practice Questions</h3>

                    <ol>
                        <li>What does JVM stand for?</li>
                        <li>What is the responsibility of JRE?</li>
                        <li>Which component contains the Java compiler?</li>
                        <li>What is bytecode?</li>
                    </ol>
                    `
                }

            ]
        }

    ]

};// ==============================
// JAVA LESSON 1 - PREMIUM CONTENT
// ==============================

window.courseData.java.units[0].lessons[0].content = `

<div class="explanation-box">

    <h2>01. Introduction to Java</h2>

    <h3>What is Java?</h3>

    <p>
    Java is a high-level, object-oriented,
    general-purpose programming language.
    It was developed by Sun Microsystems
    and released in 1995.
    </p>

    <p dir="rtl">
    جافا لغة برمجة عالية المستوى،
    وتعتمد على مفهوم البرمجة كائنية التوجه.
    تُستخدم في بناء تطبيقات متنوعة،
    وتتميز بقابليتها للعمل على أنظمة تشغيل مختلفة.
    </p>

    <h3>Why Do We Learn Java?</h3>

    <ul>
        <li>Platform Independence</li>
        <li>Object-Oriented Programming</li>
        <li>Strong Type System</li>
        <li>Large Developer Community</li>
    </ul>

</div>

<div class="code-example-box">

    <h3>02. Your First Java Program</h3>

    <p>
    Let's write our first Java program.
    </p>

    <pre id="javaExample"><code>public class Main {

    public static void main(String[] args) {

        System.out.println("Hello, CODEVERSE!");

    }

}</code></pre>

    <button class="copy-code-btn"
    onclick="copyLessonCode('javaExample')">
    Copy Code
    </button>

</div>

<div class="output-box">

    <h3>03. Expected Output</h3>

    <pre><code>Hello, CODEVERSE!</code></pre>

</div>

<div class="explanation-box">

    <h3>04. Understand Every Line</h3>

    <p><b>public class Main</b></p>
    <p>
    Creates a class named Main.
    Every Java program needs a class structure.
    </p>

    <p><b>public static void main(String[] args)</b></p>
    <p>
    This is the main method where program execution begins.
    </p>

    <p><b>System.out.println()</b></p>
    <p>
    Prints information to the console and moves to a new line.
    </p>

    <p><b>;</b></p>
    <p>
    The semicolon marks the end of a Java statement.
    </p>

</div>

<div class="practice-box">

    <h3>05. Practice Zone</h3>

    <p><b>Your Task:</b></p>

    <p>
    Write a Java program that prints:
    </p>

    <pre><code>Your Name
Your University
Your Department</code></pre>

    <textarea id="javaPractice"
    rows="9"
    placeholder="Write your Java code here..."></textarea>

    <p>
    Try to write the program yourself before looking
    at the example above.
    </p>

</div>

<div class="mistakes-box">

    <h3>06. Common Mistakes</h3>

    <ul>
        <li>Forgetting the semicolon.</li>
        <li>Incorrect capitalization of Main.</li>
        <li>Missing quotation marks around text.</li>
        <li>Writing the main method incorrectly.</li>
    </ul>

</div>

<div class="note-box">

    <h3>07. Important Note</h3>

    <p>
    Java is case-sensitive.
    This means Main and main are different identifiers.
    </p>

</div>

`;
