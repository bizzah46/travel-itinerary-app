const { ipcRenderer } = require('electron');

function saveItinerary(itinerary) {
    ipcRenderer.send("save-itinerary", itinerary);
}
// GLOBAL VARIABLES
let selectedDestination = "";
let selectedActivities = [];

// RECEIVE COUNTRY AND ACTIVITIES
ipcRenderer.on("country-selected", (event, data) => {
    selectedDestination =
        typeof data === "string"
            ? data
            : data.country;

    selectedActivities =
        typeof data === "string"
            ? []
            : (data.activities || []);

    document.getElementById("title").textContent =
        `Travel Planner - ${selectedDestination}`;

    const container = document.getElementById("activityInput");

    container.replaceChildren();

    selectedActivities.forEach(activity => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.value = activity;
        checkbox.checked = true;
        checkbox.disabled = true;

        label.appendChild(checkbox);
        label.appendChild(
            document.createTextNode(" " + activity)
        );

        container.appendChild(label);
    });
});

function calculateTravelCost(destination, days) {

    const costPerDay = {
        "Kelantan": 80,
        "Perlis": 90,
        "Penang": 150,
        "Perak": 120,
        "Selangor": 180,
        "Johor": 170,
        "Melaka": 130
    };

    const dailyCost =
        costPerDay[destination] || 100;

    return dailyCost * days;
}

// SAVE ACTIVITY
document.getElementById("saveBtn")
    .addEventListener("click", async () => {

        const date =
            document.getElementById("dateInput").value;

        if (!date) {
            alert("Please select date.");
            return;
        }

        // Ambil checkbox yang ditick sahaja
        const checkedActivities = Array.from(
            document.querySelectorAll(
                "#activityInput input[type='checkbox']:checked"
            )
        ).map(cb => cb.value);

        if (checkedActivities.length === 0) {
            alert("Please select at least one activity.");
            return;
        }


        const itinerary = {
            destination: selectedDestination,
            date: date,
            activity: checkedActivities.join(", ")
        };

        try {
            const result = await ipcRenderer.invoke(
                "create-itinerary",
                itinerary
            );

            if (!result.success) {
                throw new Error("Save failed");
            }

            await loadActivities();

            alert("Activity saved successfully!");

        } catch (error) {
            console.error("Save error:", error);
            alert("Failed to save activity.");
        }
    });

// VIEW
document.getElementById(
    "viewItinerariesBtn"
).addEventListener(
    "click",
    loadActivities
);


// LOAD

async function loadActivities() {

    const list = document.getElementById("itineraryList");

    if (!list) return;

    try {

        // Read directly from JSON via Electron
        const records = await ipcRenderer.invoke(
            "load-itineraries"
        );

        list.replaceChildren();

        if (records.length === 0) {
            list.textContent = "No activities saved.";
            return;
        }

        records.forEach(record => {

            const container = document.createElement("div");

            const destination = document.createElement("strong");
            destination.textContent =
                record.destination || record.location || "";

            const date = document.createElement("p");
            date.textContent = `Date: ${record.date || ""}`;

            const activity = document.createElement("p");
            activity.textContent =
                `Recommended Activity: ${record.activity || ""}`;

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";

            editBtn.onclick = () => {
                window.editActivity(record.id);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            deleteBtn.onclick = () => {
                window.deleteActivity(record.id);
            };

            container.appendChild(destination);
            container.appendChild(date);
            container.appendChild(activity);
            container.appendChild(editBtn);
            container.appendChild(
                document.createTextNode(" ")
            );
            container.appendChild(deleteBtn);
            container.appendChild(document.createElement("hr"));

            list.appendChild(container);
        });

    } catch (error) {

        console.error("Failed to load itineraries:", error);
        list.textContent = "Failed to load activities.";

    }
}




window.editActivity = async function (id) {

    try {
        const records = await ipcRenderer.invoke(
            "load-itineraries"
        );

        const record = records.find(
            item => String(item.id) === String(id)
        );

        if (!record) {
            console.error("Activity not found! ID:", id);
            return;
        }

        const dialog = document.getElementById("editDialog");
        const input = document.getElementById("editActivityInput");
        const dateInput = document.getElementById("editDateInput");
        const saveBtn = document.getElementById("confirmEditBtn");

        if (!dialog || !input || !dateInput || !saveBtn) {
            console.error("Edit dialog elements not found!");
            return;
        }

        input.value = record.activity || "";
        dateInput.value = record.date || "";

        saveBtn.onclick = async function () {

            const activity = input.value.trim();
            const date = dateInput.value;

            if (!activity || !date) {
                alert("Please enter an activity and date.");
                return;
            }

            const updatedItem = {
                ...record,
                activity,
                date
            };

            try {
                const result = await ipcRenderer.invoke(
                    "update-itinerary",
                    updatedItem
                );

                if (!result) {
                    throw new Error("Update failed");
                }

                dialog.close();
                await loadActivities();

                alert("Activity updated successfully!");

            } catch (error) {
                console.error("Update error:", error);
                alert("Failed to update activity.");
            }
        };

        dialog.showModal();

    } catch (error) {
        console.error("Edit error:", error);
    }
};





// DELETE

window.deleteActivity = async function (id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this activity? This action cannot be undone."
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const result = await ipcRenderer.invoke(
            "delete-itinerary",
            id
        );

        if (!result) {
            throw new Error("Failed to delete activity.");
        }

        await loadActivities();

        alert("Activity deleted successfully!");

    } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete activity.");
    }
};

document.getElementById("recipeCalculatorBtn")
    .addEventListener("click", () => {
        ipcRenderer.send("open-recipe-calculator");
    });

loadActivities();

