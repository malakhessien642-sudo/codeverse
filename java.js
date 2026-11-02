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

};