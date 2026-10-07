/* =========================================================
   SMART TASK MANAGER
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskModal =
    document.getElementById("taskModal");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const saveTaskBtn =
    document.getElementById("saveTaskBtn");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById("taskDescription");

const taskDate =
    document.getElementById("taskDate");

const taskPriority =
    document.getElementById("taskPriority");

const arrivalTime =
    document.getElementById("arrivalTime");

const burstTime =
    document.getElementById("burstTime");

const taskList =
    document.getElementById("taskList");

const searchTask =
    document.getElementById("searchTask");

const filterTask =
    document.getElementById("filterTask");

const totalTasks =
    document.getElementById("totalTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const completedTasks =
    document.getElementById("completedTasks");

const highTasks =
    document.getElementById("highTasks");

const themeBtn =
    document.getElementById("themeBtn");

const algorithmSelect =
    document.getElementById("algorithm");

const runSchedulerBtn =
    document.getElementById("runSchedulerBtn");

const quantumControl =
    document.getElementById("quantumControl");

const timeQuantumInput =
    document.getElementById("timeQuantum");

const runningTask =
    document.getElementById("runningTask");

const taskQueue =
    document.getElementById("taskQueue");

const scheduleResult =
    document.getElementById("scheduleResult");

const ganttChart =
    document.getElementById("ganttChart");

const calculationResult =
    document.getElementById("calculationResult");

const compareAlgorithmsBtn =
    document.getElementById("compareAlgorithmsBtn");

const comparisonResult =
    document.getElementById("comparisonResult");

const cpuUtilization =
    document.getElementById("cpuUtilization");

const throughput =
    document.getElementById("throughput");

const avgWaitingPerformance =
    document.getElementById(
        "avgWaitingPerformance"
    );

const avgTurnaroundPerformance =
    document.getElementById(
        "avgTurnaroundPerformance"
    );

const clearHistoryBtn =
    document.getElementById(
        "clearHistoryBtn"
    );

const historyResult =
    document.getElementById(
        "historyResult"
    );


/* =========================================================
   STORAGE
   ========================================================= */

const TASK_STORAGE =
    "smart_task_manager_tasks";

const HISTORY_STORAGE =
    "smart_task_manager_history";

const THEME_STORAGE =
    "smart_task_manager_theme";


let tasks = [];

let schedulingHistory = [];


/* =========================================================
   CONSTANTS
   ========================================================= */

const DEFAULT_QUANTUM = 2;


/* =========================================================
   SAFE STORAGE
   ========================================================= */

function loadStoredData() {

    try {

        const savedTasks =
            localStorage.getItem(
                TASK_STORAGE
            );

        if (savedTasks) {

            const parsed =
                JSON.parse(savedTasks);

            tasks =
                Array.isArray(parsed)
                    ? parsed
                    : [];
        }

    } catch (error) {

        console.error(
            "Could not load tasks:",
            error
        );

        tasks = [];

    }


    try {

        const savedHistory =
            localStorage.getItem(
                HISTORY_STORAGE
            );

        if (savedHistory) {

            const parsed =
                JSON.parse(savedHistory);

            schedulingHistory =
                Array.isArray(parsed)
                    ? parsed
                    : [];
        }

    } catch (error) {

        console.error(
            "Could not load history:",
            error
        );

        schedulingHistory = [];
    }
}


/* =========================================================
   SAVE TASKS
   ========================================================= */

function saveTasks() {

    localStorage.setItem(
        TASK_STORAGE,
        JSON.stringify(tasks)
    );
}


/* =========================================================
   SAVE HISTORY
   ========================================================= */

function saveHistory() {

    localStorage.setItem(
        HISTORY_STORAGE,
        JSON.stringify(
            schedulingHistory
        )
    );
}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   ID GENERATOR
   ========================================================= */

function generateId() {

    return (
        Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}


/* =========================================================
   PRIORITY
   ========================================================= */

function priorityValue(priority) {

    const value =
        String(priority)
            .toLowerCase();

    if (value === "high") {
        return 1;
    }

    if (value === "medium") {
        return 2;
    }

    return 3;
}


function priorityClass(priority) {

    const value =
        String(priority)
            .toLowerCase();

    return (
        value === "high"
            ? "priority-high"
            : value === "low"
                ? "priority-low"
                : "priority-medium"
    );
}


/* =========================================================
   THEME
   ========================================================= */

function loadTheme() {

    const theme =
        localStorage.getItem(
            THEME_STORAGE
        );


    if (theme === "dark") {

        document.body.classList.add(
            "dark"
        );

        if (themeBtn) {
            themeBtn.textContent =
                "Light Mode";
        }

    } else {

        document.body.classList.remove(
            "dark"
        );

        if (themeBtn) {
            themeBtn.textContent =
                "Dark Mode";
        }
    }
}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                THEME_STORAGE,
                dark
                    ? "dark"
                    : "light"
            );


            themeBtn.textContent =
                dark
                    ? "Light Mode"
                    : "Dark Mode";
        }
    );
}


/* =========================================================
   MODAL
   ========================================================= */

function clearTaskForm() {

    if (taskTitle) {
        taskTitle.value = "";
    }

    if (taskDescription) {
        taskDescription.value = "";
    }

    if (taskDate) {
        taskDate.value = "";
    }

    if (taskPriority) {
        taskPriority.value = "medium";
    }

    if (arrivalTime) {
        arrivalTime.value = 0;
    }

    if (burstTime) {
        burstTime.value = 1;
    }
}


function openModal() {

    if (!taskModal) {
        return;
    }

    taskModal.classList.add(
        "show"
    );


    if (taskTitle) {

        setTimeout(
            function () {
                taskTitle.focus();
            },
            50
        );
    }
}


function closeModal() {

    if (!taskModal) {
        return;
    }

    taskModal.classList.remove(
        "show"
    );

    clearTaskForm();
}


if (addTaskBtn) {

    addTaskBtn.addEventListener(
        "click",
        openModal
    );
}


if (cancelBtn) {

    cancelBtn.addEventListener(
        "click",
        closeModal
    );
}


if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        closeModal
    );
}


if (taskModal) {

    taskModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                taskModal
            ) {

                closeModal();
            }
        }
    );
}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            taskModal &&
            taskModal.classList.contains(
                "show"
            )
        ) {

            closeModal();
        }
    }
);


/* =========================================================
   ADD TASK
   ========================================================= */

function addTask() {

    if (!taskTitle) {
        return;
    }


    const title =
        taskTitle.value.trim();


    const description =
        taskDescription
            ? taskDescription.value.trim()
            : "";


    const date =
        taskDate
            ? taskDate.value
            : "";


    const priority =
        taskPriority
            ? taskPriority.value
            : "medium";


    let arrival =
        arrivalTime
            ? Number(
                arrivalTime.value
            )
            : 0;


    let burst =
        burstTime
            ? Number(
                burstTime.value
            )
            : 1;


    if (!title) {

        alert(
            "Please enter a task title."
        );

        taskTitle.focus();

        return;
    }


    if (
        !Number.isFinite(arrival) ||
        arrival < 0
    ) {

        arrival = 0;
    }


    if (
        !Number.isFinite(burst) ||
        burst <= 0
    ) {

        burst = 1;
    }


    const newTask = {

        id:
            generateId(),

        title:
            title,

        description:
            description ||
            "No description",

        date:
            date ||
            "No due date",

        priority:
            priority,

        arrivalTime:
            arrival,

        burstTime:
            burst,

        completed:
            false,

        createdAt:
            new Date().toISOString()
    };


    tasks.push(
        newTask
    );


    saveTasks();

    displayTasks();

    updateStatistics();

    closeModal();
}


if (saveTaskBtn) {

    saveTaskBtn.addEventListener(
        "click",
        addTask
    );
}


/* =========================================================
   DISPLAY TASKS
   ========================================================= */

function displayTasks() {

    if (!taskList) {
        return;
    }


    const search =
        searchTask
            ? searchTask.value
                .trim()
                .toLowerCase()
            : "";


    const filter =
        filterTask
            ? filterTask.value
            : "all";


    const filtered =
        tasks.filter(
            function (task) {

                const title =
                    String(
                        task.title || ""
                    ).toLowerCase();


                const description =
                    String(
                        task.description || ""
                    ).toLowerCase();


                const matchesSearch =
                    title.includes(search) ||
                    description.includes(search);


                let matchesFilter =
                    true;


                if (
                    filter ===
                    "pending"
                ) {

                    matchesFilter =
                        !task.completed;
                }


                if (
                    filter ===
                    "completed"
                ) {

                    matchesFilter =
                        task.completed;
                }


                if (
                    filter ===
                    "high"
                ) {

                    matchesFilter =
                        String(
                            task.priority
                        ).toLowerCase()
                        === "high";
                }


                if (
                    filter ===
                    "medium"
                ) {

                    matchesFilter =
                        String(
                            task.priority
                        ).toLowerCase()
                        === "medium";
                }


                if (
                    filter ===
                    "low"
                ) {

                    matchesFilter =
                        String(
                            task.priority
                        ).toLowerCase()
                        === "low";
                }


                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );


    if (
        filtered.length === 0
    ) {

        taskList.innerHTML = `
            <div class="empty-box">
                No tasks found.
            </div>
        `;

        return;
    }


    taskList.innerHTML =
        filtered
            .map(
                function (task) {

                    return `
                        <div
                            class="task-card ${
                                task.completed
                                    ? "completed"
                                    : ""
                            }"
                        >

                            <div class="task-left">

                                <input
                                    type="checkbox"
                                    class="task-check"
                                    data-id="${
                                        task.id
                                    }"
                                    ${
                                        task.completed
                                            ? "checked"
                                            : ""
                                    }
                                >

                                <div class="task-details">

                                    <div class="task-title">
                                        ${
                                            escapeHTML(
                                                task.title
                                            )
                                        }
                                    </div>

                                    <div class="task-description">
                                        ${
                                            escapeHTML(
                                                task.description ||
                                                "No description"
                                            )
                                        }
                                    </div>

                                    <div class="task-meta">

                                        <span>
                                            Due:
                                            ${
                                                escapeHTML(
                                                    task.date ||
                                                    "Not set"
                                                )
                                            }
                                        </span>

                                        <span>
                                            Arrival:
                                            ${
                                                Number(
                                                    task.arrivalTime ||
                                                    0
                                                )
                                            }
                                        </span>

                                        <span>
                                            Burst:
                                            ${
                                                Number(
                                                    task.burstTime ||
                                                    1
                                                )
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div class="task-actions">

                                <span
                                    class="priority-badge ${
                                        priorityClass(
                                            task.priority
                                        )
                                    }"
                                >
                                    ${
                                        escapeHTML(
                                            task.priority ||
                                            "medium"
                                        )
                                    }
                                </span>


                                <button
                                    type="button"
                                    class="delete-btn"
                                    data-delete-id="${
                                        task.id
                                    }"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    `;
                }
            )
            .join("");
}


/* =========================================================
   TASK CLICK EVENTS
   ========================================================= */

if (taskList) {

    taskList.addEventListener(
        "change",
        function (event) {

            if (
                !event.target.classList.contains(
                    "task-check"
                )
            ) {
                return;
            }


            const id =
                String(
                    event.target.dataset.id
                );


            const task =
                tasks.find(
                    function (item) {

                        return (
                            String(
                                item.id
                            ) === id
                        );
                    }
                );


            if (!task) {
                return;
            }


            task.completed =
                event.target.checked;


            saveTasks();

            displayTasks();

            updateStatistics();
        }
    );


    taskList.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".delete-btn"
                );


            if (!button) {
                return;
            }


            const id =
                String(
                    button.dataset.deleteId
                );


            const confirmed =
                confirm(
                    "Are you sure you want to delete this task?"
                );


            if (!confirmed) {
                return;
            }


            tasks =
                tasks.filter(
                    function (task) {

                        return (
                            String(
                                task.id
                            ) !== id
                        );
                    }
                );


            saveTasks();

            displayTasks();

            updateStatistics();
        }
    );
}


/* =========================================================
   SEARCH / FILTER
   ========================================================= */

if (searchTask) {

    searchTask.addEventListener(
        "input",
        displayTasks
    );
}


if (filterTask) {

    filterTask.addEventListener(
        "change",
        displayTasks
    );
}


/* =========================================================
   STATISTICS
   ========================================================= */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function (task) {
                return task.completed;
            }
        ).length;


    const pending =
        total - completed;


    const high =
        tasks.filter(
            function (task) {

                return (
                    String(
                        task.priority
                    ).toLowerCase()
                    === "high" &&
                    !task.completed
                );
            }
        ).length;


    if (totalTasks) {
        totalTasks.textContent =
            total;
    }


    if (pendingTasks) {
        pendingTasks.textContent =
            pending;
    }


    if (completedTasks) {
        completedTasks.textContent =
            completed;
    }


    if (highTasks) {
        highTasks.textContent =
            high;
    }
}


/* =========================================================
   SCHEDULING TASKS
   ========================================================= */

function getSchedulingTasks() {

    return tasks
        .filter(
            function (task) {

                return !task.completed;
            }
        )
        .map(
            function (task) {

                return {

                    ...task,

                    arrivalTime:
                        Math.max(
                            0,
                            Number(
                                task.arrivalTime
                            ) || 0
                        ),

                    burstTime:
                        Math.max(
                            1,
                            Number(
                                task.burstTime
                            ) || 1
                        ),

                    priorityValue:
                        priorityValue(
                            task.priority
                        )
                };
            }
        );
}


/* =========================================================
   EMPTY SCHEDULE
   ========================================================= */

function emptySchedule() {

    return {

        segments: [],

        metrics: [],

        finishTime: 0,

        busyTime: 0
    };
}


/* =========================================================
   FCFS
   ========================================================= */

function scheduleFCFS(
    inputTasks
) {

    const ordered =
        [...inputTasks].sort(
            function (a, b) {

                if (
                    a.arrivalTime !==
                    b.arrivalTime
                ) {

                    return (
                        a.arrivalTime -
                        b.arrivalTime
                    );
                }


                return String(
                    a.id
                ).localeCompare(
                    String(b.id)
                );
            }
        );


    return createNonPreemptiveSchedule(
        ordered
    );
}


/* =========================================================
   NON-PREEMPTIVE SCHEDULER
   ========================================================= */

function createNonPreemptiveSchedule(
    orderedTasks
) {

    if (
        orderedTasks.length === 0
    ) {

        return emptySchedule();
    }


    const remaining =
        [...orderedTasks];


    const segments = [];

    const metrics = [];


    let currentTime = 0;

    let busyTime = 0;


    while (
        remaining.length > 0
    ) {

        const available =
            remaining.filter(
                function (task) {

                    return (
                        task.arrivalTime <=
                        currentTime
                    );
                }
            );


        if (
            available.length === 0
        ) {

            const nextArrival =
                Math.min.apply(
                    null,
                    remaining.map(
                        function (task) {
                            return task.arrivalTime;
                        }
                    )
                );


            if (
                nextArrival >
                currentTime
            ) {

                segments.push({

                    task: null,

                    startTime:
                        currentTime,

                    endTime:
                        nextArrival,

                    duration:
                        nextArrival -
                        currentTime
                });


                currentTime =
                    nextArrival;
            }


            continue;
        }


        const task =
            available[0];


        const index =
            remaining.indexOf(
                task
            );


        remaining.splice(
            index,
            1
        );


        const startTime =
            currentTime;


        const completionTime =
            startTime +
            task.burstTime;


        const turnaroundTime =
            completionTime -
            task.arrivalTime;


        const waitingTime =
            Math.max(
                0,
                turnaroundTime -
                task.burstTime
            );


        const responseTime =
            startTime -
            task.arrivalTime;


        segments.push({

            task: task,

            startTime:
                startTime,

            endTime:
                completionTime,

            duration:
                task.burstTime
        });


        metrics.push({

            task: task,

            startTime:
                startTime,

            completionTime:
                completionTime,

            waitingTime:
                waitingTime,

            turnaroundTime:
                turnaroundTime,

            responseTime:
                responseTime
        });


        currentTime =
            completionTime;


        busyTime +=
            task.burstTime;
    }


    return {

        segments:
            segments,

        metrics:
            metrics,

        finishTime:
            currentTime,

        busyTime:
            busyTime
    };
}


/* =========================================================
   SJF
   ========================================================= */

function scheduleSJF(
    inputTasks
) {

    const remaining =
        [...inputTasks];


    const segments = [];

    const metrics = [];


    let currentTime = 0;

    let busyTime = 0;


    while (
        remaining.length > 0
    ) {

        const available =
            remaining.filter(
                function (task) {

                    return (
                        task.arrivalTime <=
                        currentTime
                    );
                }
            );


        if (
            available.length === 0
        ) {

            const nextArrival =
                Math.min.apply(
                    null,
                    remaining.map(
                        function (task) {
                            return task.arrivalTime;
                        }
                    )
                );


            segments.push({

                task: null,

                startTime:
                    currentTime,

                endTime:
                    nextArrival,

                duration:
                    nextArrival -
                    currentTime
            });


            currentTime =
                nextArrival;

            continue;
        }


        available.sort(
            function (a, b) {

                if (
                    a.burstTime !==
                    b.burstTime
                ) {

                    return (
                        a.burstTime -
                        b.burstTime
                    );
                }


                if (
                    a.arrivalTime !==
                    b.arrivalTime
                ) {

                    return (
                        a.arrivalTime -
                        b.arrivalTime
                    );
                }


                return String(
                    a.id
                ).localeCompare(
                    String(b.id)
                );
            }
        );


        const task =
            available[0];


        const index =
            remaining.indexOf(
                task
            );


        remaining.splice(
            index,
            1
        );


        const startTime =
            currentTime;


        const completionTime =
            startTime +
            task.burstTime;


        const turnaroundTime =
            completionTime -
            task.arrivalTime;


        const waitingTime =
            Math.max(
                0,
                turnaroundTime -
                task.burstTime
            );


        const responseTime =
            startTime -
            task.arrivalTime;


        segments.push({

            task: task,

            startTime:
                startTime,

            endTime:
                completionTime,

            duration:
                task.burstTime
        });


        metrics.push({

            task: task,

            startTime:
                startTime,

            completionTime:
                completionTime,

            waitingTime:
                waitingTime,

            turnaroundTime:
                turnaroundTime,

            responseTime:
                responseTime
        });


        currentTime =
            completionTime;


        busyTime +=
            task.burstTime;
    }


    return {

        segments:
            segments,

        metrics:
            metrics,

        finishTime:
            currentTime,

        busyTime:
            busyTime
    };
}


/* =========================================================
   PRIORITY
   ========================================================= */

function schedulePriority(
    inputTasks
) {

    const remaining =
        [...inputTasks];


    const segments = [];

    const metrics = [];


    let currentTime = 0;

    let busyTime = 0;


    while (
        remaining.length > 0
    ) {

        const available =
            remaining.filter(
                function (task) {

                    return (
                        task.arrivalTime <=
                        currentTime
                    );
                }
            );


        if (
            available.length === 0
        ) {

            const nextArrival =
                Math.min.apply(
                    null,
                    remaining.map(
                        function (task) {
                            return task.arrivalTime;
                        }
                    )
                );


            segments.push({

                task: null,

                startTime:
                    currentTime,

                endTime:
                    nextArrival,

                duration:
                    nextArrival -
                    currentTime
            });


            currentTime =
                nextArrival;

            continue;
        }


        available.sort(
            function (a, b) {

                if (
                    a.priorityValue !==
                    b.priorityValue
                ) {

                    return (
                        a.priorityValue -
                        b.priorityValue
                    );
                }


                if (
                    a.arrivalTime !==
                    b.arrivalTime
                ) {

                    return (
                        a.arrivalTime -
                        b.arrivalTime
                    );
                }


                return String(
                    a.id
                ).localeCompare(
                    String(b.id)
                );
            }
        );


        const task =
            available[0];


        const index =
            remaining.indexOf(
                task
            );


        remaining.splice(
            index,
            1
        );


        const startTime =
            currentTime;


        const completionTime =
            startTime +
            task.burstTime;


        const turnaroundTime =
            completionTime -
            task.arrivalTime;


        const waitingTime =
            Math.max(
                0,
                turnaroundTime -
                task.burstTime
            );


        const responseTime =
            startTime -
            task.arrivalTime;


        segments.push({

            task: task,

            startTime:
                startTime,

            endTime:
                completionTime,

            duration:
                task.burstTime
        });


        metrics.push({

            task: task,

            startTime:
                startTime,

            completionTime:
                completionTime,

            waitingTime:
                waitingTime,

            turnaroundTime:
                turnaroundTime,

            responseTime:
                responseTime
        });


        currentTime =
            completionTime;


        busyTime +=
            task.burstTime;
    }


    return {

        segments:
            segments,

        metrics:
            metrics,

        finishTime:
            currentTime,

        busyTime:
            busyTime
    };
}


/* =========================================================
   ROUND ROBIN
   ========================================================= */

function scheduleRoundRobin(
    inputTasks,
    quantum
) {

    if (
        inputTasks.length === 0
    ) {

        return emptySchedule();
    }


    quantum =
        Math.max(
            1,
            Number(quantum) ||
            DEFAULT_QUANTUM
        );


    const data =
        inputTasks
            .map(
                function (task) {

                    return {

                        ...task,

                        remaining:
                            task.burstTime,

                        firstStart:
                            null,

                        completion:
                            null
                    };
                }
            )
            .sort(
                function (a, b) {

                    if (
                        a.arrivalTime !==
                        b.arrivalTime
                    ) {

                        return (
                            a.arrivalTime -
                            b.arrivalTime
                        );
                    }


                    return String(
                        a.id
                    ).localeCompare(
                        String(b.id)
                    );
                }
            );


    const queue = [];

    const segments = [];


    let currentTime =
        data.length > 0
            ? data[0].arrivalTime
            : 0;


    let nextIndex = 0;

    let completed = 0;

    let busyTime = 0;


    while (
        completed <
        data.length
    ) {

        while (
            nextIndex <
            data.length &&
            data[nextIndex].arrivalTime <=
            currentTime
        ) {

            queue.push(
                data[nextIndex]
            );

            nextIndex++;
        }


        if (
            queue.length === 0
        ) {

            if (
                nextIndex <
                data.length
            ) {

                const nextArrival =
                    data[nextIndex]
                        .arrivalTime;


                if (
                    nextArrival >
                    currentTime
                ) {

                    segments.push({

                        task: null,

                        startTime:
                            currentTime,

                        endTime:
                            nextArrival,

                        duration:
                            nextArrival -
                            currentTime
                    });


                    currentTime =
                        nextArrival;
                }


                continue;
            }
        }


        const task =
            queue.shift();


        if (
            task.firstStart === null
        ) {

            task.firstStart =
                currentTime;
        }


        const runTime =
            Math.min(
                quantum,
                task.remaining
            );


        const startTime =
            currentTime;


        const endTime =
            currentTime +
            runTime;


        segments.push({

            task:
                task,

            startTime:
                startTime,

            endTime:
                endTime,

            duration:
                runTime
        });


        currentTime =
            endTime;


        task.remaining -=
            runTime;


        busyTime +=
            runTime;


        while (
            nextIndex <
            data.length &&
            data[nextIndex].arrivalTime <=
            currentTime
        ) {

            queue.push(
                data[nextIndex]
            );

            nextIndex++;
        }


        if (
            task.remaining > 0
        ) {

            queue.push(
                task
            );

        } else {

            task.completion =
                currentTime;

            completed++;
        }
    }


    const metrics =
        data.map(
            function (task) {

                const turnaroundTime =
                    task.completion -
                    task.arrivalTime;


                const waitingTime =
                    Math.max(
                        0,
                        turnaroundTime -
                        task.burstTime
                    );


                const responseTime =
                    task.firstStart -
                    task.arrivalTime;


                return {

                    task:
                        task,

                    startTime:
                        task.firstStart,

                    completionTime:
                        task.completion,

                    waitingTime:
                        waitingTime,

                    turnaroundTime:
                        turnaroundTime,

                    responseTime:
                        responseTime
                };
            }
        );


    return {

        segments:
            segments,

        metrics:
            metrics,

        finishTime:
            currentTime,

        busyTime:
            busyTime
    };
}


/* =========================================================
   CREATE SCHEDULE
   ========================================================= */

function createSchedule(
    algorithm,
    inputTasks,
    quantum
) {

    switch (algorithm) {

        case "fcfs":

            return scheduleFCFS(
                inputTasks
            );


        case "sjf":

            return scheduleSJF(
                inputTasks
            );


        case "priority":

            return schedulePriority(
                inputTasks
            );


        case "rr":

            return scheduleRoundRobin(
                inputTasks,
                quantum
            );


        default:

            return emptySchedule();
    }
}


/* =========================================================
   ALGORITHM NAME
   ========================================================= */

function algorithmName(
    algorithm
) {

    const names = {

        fcfs:
            "FCFS",

        sjf:
            "SJF",

        priority:
            "Priority",

        rr:
            "Round Robin"
    };


    return (
        names[algorithm] ||
        algorithm
    );
}


/* =========================================================
   RUN SCHEDULER
   ========================================================= */

function runScheduler() {

    const schedulingTasks =
        getSchedulingTasks();


    if (
        schedulingTasks.length === 0
    ) {

        alert(
            "Please add at least one pending task first."
        );

        return;
    }


    const algorithm =
        algorithmSelect
            ? algorithmSelect.value
            : "fcfs";


    let quantum =
        DEFAULT_QUANTUM;


    if (
        algorithm === "rr"
    ) {

        quantum =
            timeQuantumInput
                ? Number(
                    timeQuantumInput.value
                )
                : DEFAULT_QUANTUM;


        if (
            !Number.isFinite(quantum) ||
            quantum <= 0
        ) {

            alert(
                "Please enter a valid time quantum."
            );

            return;
        }
    }


    const schedule =
        createSchedule(
            algorithm,
            schedulingTasks,
            quantum
        );


    displayRunningTask(
        schedule
    );


    displayQueue(
        schedule
    );


    displayScheduleTable(
        schedule,
        algorithm
    );


    displayGantt(
        schedule
    );


    displayCalculations(
        schedule
    );


    updatePerformance(
        schedule
    );


    addHistory(
        schedule,
        algorithm
    );
}


/* =========================================================
   SCHEDULER BUTTON
   ========================================================= */

if (runSchedulerBtn) {

    runSchedulerBtn.addEventListener(
        "click",
        runScheduler
    );
}


/* =========================================================
   QUANTUM
   ========================================================= */

function updateQuantumVisibility() {

    if (
        !algorithmSelect ||
        !quantumControl
    ) {
        return;
    }


    if (
        algorithmSelect.value ===
        "rr"
    ) {

        quantumControl.hidden =
            false;

    } else {

        quantumControl.hidden =
            true;
    }
}


if (algorithmSelect) {

    algorithmSelect.addEventListener(
        "change",
        updateQuantumVisibility
    );
}


updateQuantumVisibility();


/* =========================================================
   RUNNING TASK
   ========================================================= */

function displayRunningTask(
    schedule
) {

    if (!runningTask) {
        return;
    }


    if (
        !schedule.metrics ||
        schedule.metrics.length === 0
    ) {

        runningTask.innerHTML = `
            <div class="empty-box">
                No scheduling run yet.
            </div>
        `;

        return;
    }


    const first =
        schedule.metrics[0];


    runningTask.innerHTML = `

        <div class="running-task">

            ${escapeHTML(
                first.task.title
            )}

            <div
                style="
                    margin-top:5px;
                    font-size:11px;
                    font-weight:500;
                "
            >
                First task selected by the scheduler
            </div>

        </div>
    `;
}


/* =========================================================
   QUEUE
   ========================================================= */

function displayQueue(
    schedule
) {

    if (!taskQueue) {
        return;
    }


    if (
        !schedule.metrics ||
        schedule.metrics.length === 0
    ) {

        taskQueue.innerHTML = `
            <div class="empty-box">
                Queue is empty.
            </div>
        `;

        return;
    }


    taskQueue.innerHTML = `

        <div class="queue-list">

            ${
                schedule.metrics
                    .map(
                        function (
                            item,
                            index
                        ) {

                            return `

                                <div
                                    class="queue-item"
                                >

                                    <div>

                                        <span
                                            class="queue-number"
                                        >
                                            ${
                                                index + 1
                                            }
                                        </span>

                                    </div>

                                    <strong>
                                        ${
                                            escapeHTML(
                                                item.task.title
                                            )
                                        }
                                    </strong>

                                    <span>
                                        BT:
                                        ${
                                            item.task.burstTime
                                        }
                                    </span>

                                </div>
                            `;
                        }
                    )
                    .join("")
            }

        </div>
    `;
}


/* =========================================================
   SCHEDULE TABLE
   ========================================================= */

function displayScheduleTable(
    schedule,
    algorithm
) {

    if (!scheduleResult) {
        return;
    }


    const rows =
        schedule.metrics
            .map(
                function (item) {

                    return `

                        <tr>

                            <td>
                                ${escapeHTML(
                                    item.task.title
                                )}
                            </td>

                            <td>
                                ${
                                    item.task.arrivalTime
                                }
                            </td>

                            <td>
                                ${
                                    item.task.burstTime
                                }
                            </td>

                            <td>
                                ${
                                    item.startTime
                                }
                            </td>

                            <td>
                                ${
                                    item.completionTime
                                }
                            </td>

                            <td>
                                ${
                                    item.waitingTime
                                }
                            </td>

                            <td>
                                ${
                                    item.turnaroundTime
                                }
                            </td>

                            <td>
                                ${
                                    item.responseTime
                                }
                            </td>

                        </tr>
                    `;
                }
            )
            .join("");


    scheduleResult.innerHTML = `

        <table class="data-table">

            <thead>

                <tr>

                    <th>Task</th>

                    <th>Arrival</th>

                    <th>Burst</th>

                    <th>Start</th>

                    <th>Completion</th>

                    <th>Waiting</th>

                    <th>Turnaround</th>

                    <th>Response</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

        <div class="average-grid">

            <div class="average-card">

                <span>
                    Algorithm
                </span>

                <strong>
                    ${algorithmName(
                        algorithm
                    )}
                </strong>

            </div>

            <div class="average-card">

                <span>
                    Completion Time
                </span>

                <strong>
                    ${
                        schedule.finishTime
                    }
                </strong>

            </div>

        </div>
    `;
}


/* =========================================================
   GANTT
   ========================================================= */

function displayGantt(
    schedule
) {

    if (!ganttChart) {
        return;
    }


    if (
        !schedule.segments ||
        schedule.segments.length === 0
    ) {

        ganttChart.innerHTML = `
            <div class="empty-box">
                Gantt chart is empty.
            </div>
        `;

        return;
    }


    const total =
        Math.max(
            schedule.finishTime,
            1
        );


    ganttChart.innerHTML = `

        <div class="gantt">

            ${
                schedule.segments
                    .map(
                        function (
                            segment
                        ) {

                            const width =
                                Math.max(
                                    (
                                        segment.duration /
                                        total
                                    ) * 100,
                                    4
                                );


                            const title =
                                segment.task
                                    ? segment.task.title
                                    : "CPU Idle";


                            return `

                                <div
                                    class="gantt-block"
                                    style="
                                        width:${width}%;
                                    "
                                >

                                    <span>
                                        ${
                                            escapeHTML(
                                                title
                                            )
                                        }
                                    </span>

                                    <small>
                                        ${
                                            segment.startTime
                                        }
                                        -
                                        ${
                                            segment.endTime
                                        }
                                    </small>

                                </div>
                            `;
                        }
                    )
                    .join("")
            }

        </div>
    `;
}


/* =========================================================
   CALCULATIONS
   ========================================================= */

function calculateAverages(
    schedule
) {

    if (
        !schedule.metrics ||
        schedule.metrics.length === 0
    ) {

        return {

            waiting:
                0,

            turnaround:
                0
        };
    }


    const waiting =
        schedule.metrics.reduce(
            function (
                total,
                item
            ) {

                return (
                    total +
                    item.waitingTime
                );
            },
            0
        );


    const turnaround =
        schedule.metrics.reduce(
            function (
                total,
                item
            ) {

                return (
                    total +
                    item.turnaroundTime
                );
            },
            0
        );


    return {

        waiting:
            waiting /
            schedule.metrics.length,

        turnaround:
            turnaround /
            schedule.metrics.length
    };
}


/* =========================================================
   DISPLAY CALCULATIONS
   ========================================================= */

function displayCalculations(
    schedule
) {

    if (!calculationResult) {
        return;
    }


    const averages =
        calculateAverages(
            schedule
        );


    const rows =
        schedule.metrics
            .map(
                function (item) {

                    return `

                        <tr>

                            <td>
                                ${escapeHTML(
                                    item.task.title
                                )}
                            </td>

                            <td>
                                ${
                                    item.task.arrivalTime
                                }
                            </td>

                            <td>
                                ${
                                    item.task.burstTime
                                }
                            </td>

                            <td>
                                ${
                                    item.completionTime
                                }
                            </td>

                            <td>
                                ${
                                    item.waitingTime
                                }
                            </td>

                            <td>
                                ${
                                    item.turnaroundTime
                                }
                            </td>

                            <td>
                                ${
                                    item.responseTime
                                }
                            </td>

                        </tr>
                    `;
                }
            )
            .join("");


    calculationResult.innerHTML = `

        <table class="data-table">

            <thead>

                <tr>

                    <th>Task</th>

                    <th>Arrival</th>

                    <th>Burst</th>

                    <th>Completion</th>

                    <th>Waiting</th>

                    <th>Turnaround</th>

                    <th>Response</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>


        <div class="average-grid">

            <div class="average-card">

                <span>
                    Average Waiting Time
                </span>

                <strong>
                    ${
                        averages.waiting.toFixed(
                            2
                        )
                    }
                </strong>

            </div>


            <div class="average-card">

                <span>
                    Average Turnaround Time
                </span>

                <strong>
                    ${
                        averages.turnaround.toFixed(
                            2
                        )
                    }
                </strong>

            </div>

        </div>
    `;
}


/* =========================================================
   PERFORMANCE
   ========================================================= */

function getPerformance(
    schedule
) {

    const averages =
        calculateAverages(
            schedule
        );


    const finish =
        schedule.finishTime || 0;


    const start =
        schedule.segments.length > 0
            ? schedule.segments[0]
                .startTime
            : 0;


    const totalTime =
        Math.max(
            0,
            finish - start
        );


    let utilization = 0;


    if (
        totalTime > 0
    ) {

        utilization =
            (
                schedule.busyTime /
                totalTime
            ) *
            100;
    }


    let throughputValue =
        0;


    if (
        totalTime > 0
    ) {

        throughputValue =
            schedule.metrics.length /
            totalTime;
    }


    return {

        utilization:
            utilization,

        throughput:
            throughputValue,

        waiting:
            averages.waiting,

        turnaround:
            averages.turnaround
    };
}


/* =========================================================
   UPDATE PERFORMANCE
   ========================================================= */

function updatePerformance(
    schedule
) {

    const performance =
        getPerformance(
            schedule
        );


    if (cpuUtilization) {

        cpuUtilization.textContent =
            performance.utilization.toFixed(
                2
            ) +
            "%";
    }


    if (throughput) {

        throughput.textContent =
            performance.throughput.toFixed(
                3
            );
    }


    if (
        avgWaitingPerformance
    ) {

        avgWaitingPerformance.textContent =
            performance.waiting.toFixed(
                2
            );
    }


    if (
        avgTurnaroundPerformance
    ) {

        avgTurnaroundPerformance.textContent =
            performance.turnaround.toFixed(
                2
            );
    }
}


/* =========================================================
   ALGORITHM COMPARISON
   ========================================================= */

function compareAlgorithms() {

    const schedulingTasks =
        getSchedulingTasks();


    if (
        schedulingTasks.length === 0
    ) {

        alert(
            "Please add at least one pending task first."
        );

        return;
    }


    const algorithms = [

        "fcfs",

        "sjf",

        "priority",

        "rr"

    ];


    const quantum =
        timeQuantumInput
            ? Math.max(
                1,
                Number(
                    timeQuantumInput.value
                ) ||
                DEFAULT_QUANTUM
            )
            : DEFAULT_QUANTUM;


    const results =
        algorithms.map(
            function (algorithm) {

                const schedule =
                    createSchedule(
                        algorithm,
                        schedulingTasks,
                        quantum
                    );


                const performance =
                    getPerformance(
                        schedule
                    );


                return {

                    algorithm:
                        algorithm,

                    waiting:
                        performance.waiting,

                    turnaround:
                        performance.turnaround,

                    utilization:
                        performance.utilization,

                    throughput:
                        performance.throughput
                };
            }
        );


    const bestWaiting =
        results.reduce(
            function (best, current) {

                return (
                    current.waiting <
                    best.waiting
                )
                    ? current
                    : best;
            }
        );


    const bestTurnaround =
        results.reduce(
            function (best, current) {

                return (
                    current.turnaround <
                    best.turnaround
                )
                    ? current
                    : best;
            }
        );


    const bestUtilization =
        results.reduce(
            function (best, current) {

                return (
                    current.utilization >
                    best.utilization
                )
                    ? current
                    : best;
            }
        );


    const bestThroughput =
        results.reduce(
            function (best, current) {

                return (
                    current.throughput >
                    best.throughput
                )
                    ? current
                    : best;
            }
        );


    if (!comparisonResult) {
        return;
    }


    comparisonResult.innerHTML = `

        <div class="comparison-table-wrapper">

            <table class="comparison-table">

                <thead>

                    <tr>

                        <th>
                            Algorithm
                        </th>

                        <th>
                            Avg Waiting
                        </th>

                        <th>
                            Avg Turnaround
                        </th>

                        <th>
                            CPU Utilization
                        </th>

                        <th>
                            Throughput
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${
                        results
                            .map(
                                function (
                                    result
                                ) {

                                    return `

                                        <tr>

                                            <td>
                                                <strong>
                                                    ${
                                                        algorithmName(
                                                            result.algorithm
                                                        )
                                                    }
                                                </strong>
                                            </td>

                                            <td>
                                                ${
                                                    result.waiting.toFixed(
                                                        2
                                                    )
                                                }
                                            </td>

                                            <td>
                                                ${
                                                    result.turnaround.toFixed(
                                                        2
                                                    )
                                                }
                                            </td>

                                            <td>
                                                ${
                                                    result.utilization.toFixed(
                                                        2
                                                    )
                                                }%
                                            </td>

                                            <td>
                                                ${
                                                    result.throughput.toFixed(
                                                        3
                                                    )
                                                }
                                            </td>

                                        </tr>
                                    `;
                                }
                            )
                            .join("")
                    }

                </tbody>

            </table>

        </div>


        <div class="comparison-best">

            <div class="best-card">

                <span>
                    Best Waiting Time
                </span>

                <strong>
                    ${
                        algorithmName(
                            bestWaiting.algorithm
                        )
                    }
                </strong>

                <small>
                    ${
                        bestWaiting.waiting.toFixed(
                            2
                        )
                    }
                </small>

            </div>


            <div class="best-card">

                <span>
                    Best Turnaround Time
                </span>

                <strong>
                    ${
                        algorithmName(
                            bestTurnaround.algorithm
                        )
                    }
                </strong>

                <small>
                    ${
                        bestTurnaround.turnaround.toFixed(
                            2
                        )
                    }
                </small>

            </div>


            <div class="best-card">

                <span>
                    Best CPU Utilization
                </span>

                <strong>
                    ${
                        algorithmName(
                            bestUtilization.algorithm
                        )
                    }
                </strong>

                <small>
                    ${
                        bestUtilization.utilization.toFixed(
                            2
                        )
                    }%
                </small>

            </div>


            <div class="best-card">

                <span>
                    Best Throughput
                </span>

                <strong>
                    ${
                        algorithmName(
                            bestThroughput.algorithm
                        )
                    }
                </strong>

                <small>
                    ${
                        bestThroughput.throughput.toFixed(
                            3
                        )
                    }
                </small>

            </div>

        </div>
    `;
}


if (
    compareAlgorithmsBtn
) {

    compareAlgorithmsBtn.addEventListener(
        "click",
        compareAlgorithms
    );
}


/* =========================================================
   HISTORY
   ========================================================= */

function addHistory(
    schedule,
    algorithm
) {

    const performance =
        getPerformance(
            schedule
        );


    const record = {

        id:
            generateId(),

        algorithm:
            algorithmName(
                algorithm
            ),

        taskCount:
            schedule.metrics.length,

        waiting:
            performance.waiting,

        turnaround:
            performance.turnaround,

        utilization:
            performance.utilization,

        throughput:
            performance.throughput,

        date:
            new Date()
                .toLocaleString()
    };


    schedulingHistory.unshift(
        record
    );


    if (
        schedulingHistory.length >
        10
    ) {

        schedulingHistory =
            schedulingHistory.slice(
                0,
                10
            );
    }


    saveHistory();

    displayHistory();
}


/* =========================================================
   DISPLAY HISTORY
   ========================================================= */

function displayHistory() {

    if (!historyResult) {
        return;
    }


    if (
        schedulingHistory.length === 0
    ) {

        historyResult.innerHTML = `
            <div class="empty-box">
                No scheduling history available.
            </div>
        `;

        return;
    }


    historyResult.innerHTML = `

        <div class="history-table-wrapper">

            <table class="history-table">

                <thead>

                    <tr>

                        <th>
                            #
                        </th>

                        <th>
                            Algorithm
                        </th>

                        <th>
                            Tasks
                        </th>

                        <th>
                            Avg Waiting
                        </th>

                        <th>
                            Avg Turnaround
                        </th>

                        <th>
                            CPU Utilization
                        </th>

                        <th>
                            Throughput
                        </th>

                        <th>
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${
                        schedulingHistory
                            .map(
                                function (
                                    item,
                                    index
                                ) {

                                    return `

                                        <tr>

                                            <td>
                                                ${
                                                    index + 1
                                                }
                                            </td>

                                            <td>
                                                <strong>
                                                    ${
                                                        escapeHTML(
                                                            item.algorithm
                                                        )
                                                    }
                                                </strong>
                                            </td>

                                            <td>
                                                ${
                                                    item.taskCount
                                                }
                                            </td>

                                            <td>
                                                ${
                                                    Number(
                                                        item.waiting
                                                    ).toFixed(
                                                        2
                                                    )
                                                }
                                            </td>

                                            <td>
                                                ${
                                                    Number(
                                                        item.turnaround
                                                    ).toFixed(
                                                        2
                                                    )
                                                }
                                            </td>

                                            <td>
                                                ${
                                                    Number(
                                                        item.utilization
                                                    ).toFixed(
                                                        2
                                                    )
                                                }%
                                            </td>

                                            <td>
                                                ${
                                                    Number(
                                                        item.throughput
                                                    ).toFixed(
                                                        3
                                                    )
                                                }
                                            </td>

                                            <td>
                                                ${
                                                    escapeHTML(
                                                        item.date
                                                    )
                                                }
                                            </td>

                                        </tr>
                                    `;
                                }
                            )
                            .join("")
                    }

                </tbody>

            </table>

        </div>
    `;
}


/* =========================================================
   CLEAR HISTORY
   ========================================================= */

if (
    clearHistoryBtn
) {

    clearHistoryBtn.addEventListener(
        "click",
        function () {

            if (
                schedulingHistory.length ===
                0
            ) {

                return;
            }


            const confirmed =
                confirm(
                    "Are you sure you want to clear all scheduling history?"
                );


            if (!confirmed) {
                return;
            }


            schedulingHistory = [];


            localStorage.removeItem(
                HISTORY_STORAGE
            );


            displayHistory();
        }
    );
}


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );
                    }
                );


                link.classList.add(
                    "active"
                );
            }
        );
    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initialize() {

    loadStoredData();

    loadTheme();

    displayTasks();

    updateStatistics();

    updateQuantumVisibility();

    displayHistory();


    console.log(
        "Smart Task Manager loaded successfully."
    );

    console.log(
        "Tasks:",
        tasks.length
    );
}


initialize();