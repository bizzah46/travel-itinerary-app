const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
let itineraryWindow;

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "itineraries.json");

// Create data folder if not exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Create json file if not exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
}

// MAIN WINDOW 

function createMainWindow() {

    mainWindow = new BrowserWindow({

        width: 900,
        height: 700,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }

    });

    mainWindow.loadFile("renderer/index.html");

}

// ================= ITINERARY WINDOW =================

function createItineraryWindow(country) {

    itineraryWindow = new BrowserWindow({

        width: 800,
        height: 650,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }

    });

    itineraryWindow.loadFile(
        "renderer/travel-itinerary.html"
    );

    itineraryWindow.webContents.on(
        "did-finish-load",
        () => {

            itineraryWindow.webContents.send(
                "country-selected",
                country
            );

        }
    );

}

// ================= OPEN WINDOW =================

ipcMain.on(
    "open-itinerary-window",
    (event, country) => {

        createItineraryWindow(country);

    }
);


// const result = await ipcRenderer.invoke(
//     "create-itinerary",
//     itinerary
// );

// if (!result.success) {
//     throw new Error("Failed to save itinerary.");
// }

// console.log("Saved successfully:", result.data);


// ================= CREATE =================


ipcMain.handle("create-itinerary", async (event, itinerary) => {
    const records = JSON.parse(
        fs.readFileSync(DATA_FILE, "utf8")
    );

    const newItem = {
        ...itinerary,
        id: Date.now()
    };

    records.push(newItem);

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(records, null, 2),
        "utf8"
    );

    return { success: true, data: newItem };
});


// ================= READ =================

ipcMain.handle(
    "load-itineraries",
    () => {

        return JSON.parse(
            fs.readFileSync(DATA_FILE)
        );

    }
);

// ================= UPDATE =================


ipcMain.handle("update-itinerary", async (event, updatedItem) => {

    const records = JSON.parse(
        fs.readFileSync(DATA_FILE, "utf8")
    );

    const index = records.findIndex(
        item => String(item.id) === String(updatedItem.id)
    );

    if (index === -1) {
        console.error("Update failed: ID not found");
        return false;
    }

    records[index] = {
        ...records[index],
        ...updatedItem
    };

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(records, null, 2),
        "utf8"
    );

    return true;
});


// ================= DELETE =================

ipcMain.handle("delete-itinerary", async (event, id) => {

    try {
        const records = JSON.parse(
            fs.readFileSync(DATA_FILE, "utf8")
        );

        const updatedRecords = records.filter(
            item => String(item.id) !== String(id)
        );

        if (updatedRecords.length === records.length) {
            console.error("Activity ID not found:", id);
            return false;
        }

        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify(updatedRecords, null, 2),
            "utf8"
        );

        console.log("Activity deleted:", id);

        return true;

    } catch (error) {
        console.error("Delete error:", error);
        throw error;
    }
});

// ================= APP READY =================

app.whenReady().then(() => {

    createMainWindow();

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }

});

app.on("activate", () => {

    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }

});


function createRecipeWindow() {
    const recipeWindow = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    recipeWindow.loadFile(
        "renderer/calculation.html"
    );
}

ipcMain.on("open-recipe-calculator", () => {
    createRecipeWindow();
});
