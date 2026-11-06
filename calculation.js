const foodData = {

    Indonesia: {
        currency: "IDR",

        recipes: {

            nasiGoreng: {
                name: "Nasi Goreng",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Rice",
                        quantity: 300,
                        unit: "g",
                        cost: 6000
                    },
                    {
                        name: "Eggs",
                        quantity: 2,
                        unit: "pcs",
                        cost: 6000
                    },
                    {
                        name: "Chicken",
                        quantity: 150,
                        unit: "g",
                        cost: 9000
                    },
                    {
                        name: "Sweet Soy Sauce",
                        quantity: 30,
                        unit: "ml",
                        cost: 3000
                    }
                ]
            },

            mieGoreng: {
                name: "Mie Goreng",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Noodles",
                        quantity: 250,
                        unit: "g",
                        cost: 7000
                    },
                    {
                        name: "Eggs",
                        quantity: 2,
                        unit: "pcs",
                        cost: 6000
                    },
                    {
                        name: "Vegetables",
                        quantity: 150,
                        unit: "g",
                        cost: 5000
                    },
                    {
                        name: "Soy Sauce",
                        quantity: 30,
                        unit: "ml",
                        cost: 3000
                    }
                ]
            },

            satay: {
                name: "Chicken Satay",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Chicken",
                        quantity: 300,
                        unit: "g",
                        cost: 18000
                    },
                    {
                        name: "Peanut Sauce",
                        quantity: 150,
                        unit: "g",
                        cost: 8000
                    },
                    {
                        name: "Sweet Soy Sauce",
                        quantity: 30,
                        unit: "ml",
                        cost: 3000
                    },
                    {
                        name: "Spices",
                        quantity: 30,
                        unit: "g",
                        cost: 4000
                    }
                ]
            }
        }
    },

    Malaysia: {
        currency: "MYR",

        recipes: {

            nasiLemak: {
                name: "Nasi Lemak",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Rice",
                        quantity: 200,
                        unit: "g",
                        cost: 1.00
                    },
                    {
                        name: "Coconut Milk",
                        quantity: 200,
                        unit: "ml",
                        cost: 2.50
                    },
                    {
                        name: "Eggs",
                        quantity: 2,
                        unit: "pcs",
                        cost: 1.20
                    },
                    {
                        name: "Sambal",
                        quantity: 100,
                        unit: "g",
                        cost: 1.00
                    }
                ]
            },

            nasiKerabu: {
                name: "Nasi Kerabu",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Rice",
                        quantity: 200,
                        unit: "g",
                        cost: 1.00
                    },
                    {
                        name: "Chicken",
                        quantity: 300,
                        unit: "g",
                        cost: 4.50
                    },
                    {
                        name: "Vegetables",
                        quantity: 150,
                        unit: "g",
                        cost: 1.50
                    },
                    {
                        name: "Sambal",
                        quantity: 100,
                        unit: "g",
                        cost: 1.00
                    }
                ]
            },

            rotiCanai: {
                name: "Roti Canai",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Flour",
                        quantity: 300,
                        unit: "g",
                        cost: 1.20
                    },
                    {
                        name: "Cooking Oil",
                        quantity: 50,
                        unit: "ml",
                        cost: 0.50
                    },
                    {
                        name: "Salt",
                        quantity: 5,
                        unit: "g",
                        cost: 0.10
                    },
                    {
                        name: "Curry",
                        quantity: 200,
                        unit: "ml",
                        cost: 2.00
                    }
                ]
            }
        }
    },

    London: {
        currency: "GBP",

        recipes: {

            fishAndChips: {
                name: "Fish and Chips",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Fish",
                        quantity: 400,
                        unit: "g",
                        cost: 5.00
                    },
                    {
                        name: "Potatoes",
                        quantity: 500,
                        unit: "g",
                        cost: 1.50
                    },
                    {
                        name: "Flour",
                        quantity: 150,
                        unit: "g",
                        cost: 0.50
                    },
                    {
                        name: "Cooking Oil",
                        quantity: 200,
                        unit: "ml",
                        cost: 1.00
                    }
                ]
            },

            englishBreakfast: {
                name: "Full English Breakfast",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Eggs",
                        quantity: 4,
                        unit: "pcs",
                        cost: 1.20
                    },
                    {
                        name: "Sausages",
                        quantity: 4,
                        unit: "pcs",
                        cost: 2.50
                    },
                    {
                        name: "Baked Beans",
                        quantity: 200,
                        unit: "g",
                        cost: 1.00
                    },
                    {
                        name: "Bread",
                        quantity: 4,
                        unit: "slices",
                        cost: 0.80
                    }
                ]
            },

            shepherdsPie: {
                name: "Shepherd's Pie",
                baseServings: 2,

                ingredients: [
                    {
                        name: "Minced Lamb",
                        quantity: 300,
                        unit: "g",
                        cost: 4.50
                    },
                    {
                        name: "Potatoes",
                        quantity: 500,
                        unit: "g",
                        cost: 1.50
                    },
                    {
                        name: "Carrots",
                        quantity: 150,
                        unit: "g",
                        cost: 0.60
                    },
                    {
                        name: "Onions",
                        quantity: 100,
                        unit: "g",
                        cost: 0.40
                    }
                ]
            }
        }
    }
};

const title = document.getElementById("title");

const destinationSelect =
    document.getElementById("destinationSelect");

const recipeSelect =
    document.getElementById("recipeSelect");

const servingsInput =
    document.getElementById("servings");

const calculateBtn =
    document.getElementById("calculateBtn");

const ingredientList =
    document.getElementById("ingredientList");

const totalCost =
    document.getElementById("totalCost");

const costPerServing =
    document.getElementById("costPerServing");

const costHeader =
    document.getElementById("costHeader");


function formatCurrency(amount, currency) {

    const locale = {
        IDR: "id-ID",
        MYR: "ms-MY",
        GBP: "en-GB"
    };

    return new Intl.NumberFormat(
        locale[currency],
        {
            style: "currency",
            currency: currency,
            minimumFractionDigits:
                currency === "IDR" ? 0 : 2,
            maximumFractionDigits:
                currency === "IDR" ? 0 : 2
        }
    ).format(amount);
}

function formatQuantity(quantity) {

    return Number(quantity.toFixed(2)).toString();
}


function resetResults() {

    const destination = destinationSelect.value;

    const currency = foodData[destination].currency;

    ingredientList.innerHTML = "";

    totalCost.textContent =
        "Total Cost: " + formatCurrency(0, currency);

    costPerServing.textContent =
        "Cost per Serving: " +
        formatCurrency(0, currency);
}

function loadRecipes() {

    const destination = destinationSelect.value;

    const destinationData = foodData[destination];

    // Change title automatically
    title.textContent =
        `Local Food Cost Calculator - ${destination}`;

    // Clear old recipes
    recipeSelect.innerHTML = "";

    // Add recipes based on destination
    Object.entries(destinationData.recipes)
        .forEach(([recipeId, recipe]) => {

            const option =
                document.createElement("option");

            option.value = recipeId;
            option.textContent = recipe.name;

            recipeSelect.appendChild(option);
        });

    // Change currency heading
    costHeader.textContent =
        `Cost (${destinationData.currency})`;

    // Clear previous calculation
    resetResults();
}

// CALCULATE COST

function calculateCost() {

    const destination = destinationSelect.value;

    const recipeId = recipeSelect.value;

    const servings = Number(servingsInput.value);

    // Validate servings
    if (
        !Number.isInteger(servings) ||
        servings < 1 ||
        servings > 100
    ) {
        alert(
            "Please enter a valid number of servings (1-100)."
        );

        return;
    }

    const destinationData = foodData[destination];

    const recipe = destinationData.recipes[recipeId];

    if (!recipe) {
        alert("Please select a recipe.");
        return;
    }

    const currency = destinationData.currency;

    // Calculate multiplier
    const multiplier =
        servings / recipe.baseServings;

    let total = 0;

    // Clear ingredient table
    ingredientList.innerHTML = "";

    // Calculate each ingredient
    recipe.ingredients.forEach(ingredient => {

        const adjustedQuantity =
            ingredient.quantity * multiplier;

        const adjustedCost =
            ingredient.cost * multiplier;

        total += adjustedCost;

        // Create table row
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");

        const quantityCell = document.createElement("td");

        const costCell = document.createElement("td");

        nameCell.textContent = ingredient.name;

        quantityCell.textContent =
            `${formatQuantity(adjustedQuantity)} ${ingredient.unit}`;

        costCell.textContent =
            formatCurrency(adjustedCost, currency);

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(costCell);

        ingredientList.appendChild(row);
    });

    // Calculate cost per serving
    const perServing = total / servings;

    // Display total cost
    totalCost.textContent =
        "Total Cost: " +
        formatCurrency(total, currency);

    // Display cost per serving
    costPerServing.textContent =
        "Cost per Serving: " +
        formatCurrency(perServing, currency);
}


// Change destination
destinationSelect.addEventListener(
    "change",
    loadRecipes
);

// Change recipe
recipeSelect.addEventListener(
    "change",
    resetResults
);

// Change servings
servingsInput.addEventListener(
    "input",
    resetResults
);

// Calculate button
calculateBtn.addEventListener(
    "click",
    calculateCost
);

// RECEIVE DESTINATION FROM TRAVEL PLANNER
const params = new URLSearchParams(
    window.location.search
);

const selectedDestination =
    params.get("destination");

// Automatically select destination
if (
    selectedDestination &&
    foodData[selectedDestination]
) {
    destinationSelect.value = selectedDestination;
}

// INITIAL LOAD
loadRecipes();

