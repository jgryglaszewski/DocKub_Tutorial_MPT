const API = "http://localhost:8000"; // backend port has to match

async function loadNames() {
    const response = await fetch(`${API}/names`);
    if (!response.ok) throw new Error("Could not load names");

    const names = await response.json();
    const list = document.getElementById("list");
    list.replaceChildren();

    for (const name of names) {
        const item = document.createElement("li");
        item.textContent = `${name.name} (ID: ${name.id})`;
        list.append(item);
    }
}

async function loadCounts() {
    const response = await fetch(`${API}/names/count`);
    if (!response.ok) throw new Error("Could not load name counts");

    const counts = await response.json();
    const list = document.getElementById("count-list");
    list.replaceChildren();

    for (const entry of counts) {
        const item = document.createElement("li");
        item.textContent = `${entry.name}: ${entry.count}`;
        list.append(item);
    }
}

const checkbox = document.getElementById("show-count");
const countSection = document.getElementById("count-section");
const message = document.getElementById("message");

checkbox.addEventListener("change", async () => {
    countSection.hidden = !checkbox.checked;
    if (!checkbox.checked) return;

    try {
        await loadCounts();
        message.textContent = "";
    } catch (error) {
        message.textContent = error.message;
    }
});

document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = document.getElementById("name");
    const name = input.value.trim();
    if (!name) return;

    try {
        const response = await fetch(`${API}/greeting`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) throw new Error("Could not add name");

        const greeting = await response.json();
        message.textContent = greeting.content;
        input.value = "";

        await loadNames();
        if (checkbox.checked) await loadCounts();
    } catch (error) {
        message.textContent = error.message;
    }
});

loadNames().catch((error) => {
    message.textContent = error.message;
});