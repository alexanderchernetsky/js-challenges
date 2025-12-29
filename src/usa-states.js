/*
 * Aurora Technical Exercise
 *
 * Instructions:
 *
 * During the Aurora Solar frontend technical interview, you will be
 * writing code within this editor using vanilla JavaScript and no additional libraries.
 *
 * Before coming to your interview, there are a few tasks we would like you
 * to finish to familiarize yourself with the editor, the debug console,
 * and the type of questions that will be asked.
 *
 * The Jasmine unit testing library is being loaded with a dummy test,
 * which will be used during the onsite.
 * If you wish to use it before, that's fine too.
 *
 * Requirements before the interview:
 * - Make a query to retrieve information on U.S. states and territories from
 *   https://kza8bshvff.execute-api.us-east-1.amazonaws.com/default/frontendTechnicalChallenge
 * - Parse the response and generate a sorted list of states which exclude
 *   territories and "northeast" states.
 * - Display this list on the page.
 * - Save your files, and save your codesandbox URL to bring with you
 *   to the interview to continue the exercise in person.
 */

// Real technical challenge https://codesandbox.io/p/devbox/sunshine-2013-forked-qnykwx?file=%2Fsrc%2Findex.js%3A17%2C25&workspaceId=ws_QUxpE8koiJr395aWgHxe1v

// -------------------
// Debounce utility
// -------------------
function debounce(func, delay) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId); // cancel previous call
        timeoutId = setTimeout(() => {
            func.apply(this, arguments); // call with proper context and arguments
        }, delay);
    }
}

// -------------------
// todo: implement this function yourself Virtual scroll function
// -------------------
function virtualScroll(container, data, rowHeight = 30, buffer = 5) {
    const list = container.querySelector("#states-list");
    const totalHeight = data.length * rowHeight;
    list.style.height = totalHeight + "px"; // total scrollable height

    function render() {
        const scrollTop = container.scrollTop;
        const startIndex = Math.floor(scrollTop / rowHeight);
        const visibleCount = Math.ceil(container.clientHeight / rowHeight);
        const endIndex = Math.min(startIndex + visibleCount + buffer, data.length);

        list.innerHTML = ''; // clear old items

        const fragment = document.createDocumentFragment();
        for (let i = startIndex; i < endIndex; i++) {
            const li = document.createElement("li");
            li.textContent = data[i];
            li.style.position = "absolute";
            li.style.top = i * rowHeight + "px";
            li.style.height = rowHeight + "px";
            li.style.lineHeight = rowHeight + "px";
            fragment.appendChild(li);
        }
        list.appendChild(fragment);
    }

    container.addEventListener("scroll", render);
    render(); // initial render
}

(async () => {
    // fetch data
    let statesData;
    try {
        const response = await fetch(
            "https://kza8bshvff.execute-api.us-east-1.amazonaws.com/default/frontendTechnicalChallenge"
        );
        if (!response.ok) {
            console.error("Network response is not OK");
            return;
        }
        statesData = await response.json();
    } catch (error) {
        console.error("Failed to load states data", error);
    }

    if (!statesData?.data) {
        return;
    }

    // prepare data
    const states = statesData.data
        .reduce((acc, curr) => {
            if (curr.region !== "territories" && curr.region !== "northeast") {
                acc.push(...curr.states);
            }
            return acc;
        }, [])
        .sort((a, b) => a.localeCompare(b));

    // display
    const listContainer = document.getElementById("states-list");
    const fragment = document.createDocumentFragment();
    states.forEach((state) => {
        const li = document.createElement("li");
        li.textContent = state;
        fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);

    // Render virtual scroll for filtered data
    function renderList() {
        const scrollContainer = document.getElementById("scroll-container");
        let filteredStates = [...states]; // initial full dataset
        virtualScroll(scrollContainer, filteredStates);
    }

    renderList(); // initial render

    // -------------------
    // Search functionality with debounce
    // -------------------
    const searchInput = document.getElementById("search-states");

    function handleSearch(e) {
        e.preventDefault();

        setTimeout(() => {
            const value = e.target.value;
            console.log('value', value);
            // reset state
            listContainer.innerHTML = '';
            const fragment = document.createDocumentFragment();
            states.forEach((state) => {
                if (!value || state.toLowerCase().includes(value.toLowerCase())) {
                    const li = document.createElement("li");
                    li.textContent = state;
                    fragment.appendChild(li);
                }
            });
            listContainer.appendChild(fragment);
        }, 1000);
    }

    searchInput.addEventListener("input", debounce(handleSearch, 500));
})();
