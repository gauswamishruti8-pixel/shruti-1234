const recipes = {
    tomato: {
        name: "Tomato Curry",
        ingredients: "Tomato, Onion, Oil, Salt",
        spices: "Turmeric, Chilli, Cumin",
        time: "20 Minutes",
        steps: "Cook onion in oil. Add tomato, spices and salt. Cook until soft."
    },
    potato: {
        name: "Potato Sabzi",
        ingredients: "Potato, Oil, Salt",
        spices: "Turmeric, Chilli, Cumin",
        time: "25 Minutes",
        steps: "Cut potatoes and cook with oil, spices and a little water until soft."
    },
    onion: {
        name: "Onion Masala",
        ingredients: "Onion, Tomato, Oil, Salt",
        spices: "Turmeric, Chilli, Cumin",
        time: "15 Minutes",
        steps: "Cook onion in oil. Add tomato and spices, then cook well."
    },
    carrot: {
        name: "Carrot Sabzi",
        ingredients: "Carrot, Oil, Salt",
        spices: "Cumin, Turmeric, Coriander Powder",
        time: "20 Minutes",
        steps: "Cut carrots and cook with oil, cumin and spices until soft."
    },
    spinach: {
        name: "Palak Sabzi",
        ingredients: "Spinach, Garlic, Oil, Salt",
        spices: "Cumin, Turmeric",
        time: "20 Minutes",
        steps: "Wash and chop spinach. Cook with garlic, oil and spices."
    },
    capsicum: {
        name: "Capsicum Sabzi",
        ingredients: "Capsicum, Onion, Oil, Salt",
        spices: "Turmeric, Chilli, Coriander Powder",
        time: "20 Minutes",
        steps: "Cut capsicum and onion. Cook with oil and spices until tender."
    },
    cauliflower: {
        name: "Aloo Gobi",
        ingredients: "Cauliflower, Potato, Oil, Salt",
        spices: "Turmeric, Chilli, Cumin",
        time: "30 Minutes",
        steps: "Cut cauliflower and potato. Cook with oil and spices until tender."
    },
    peas: {
        name: "Matar Masala",
        ingredients: "Green Peas, Onion, Tomato, Oil",
        spices: "Turmeric, Chilli, Garam Masala",
        time: "25 Minutes",
        steps: "Cook onion and tomato with spices. Add peas and cook until soft."
    },
    brinjal: {
        name: "Baingan Sabzi",
        ingredients: "Brinjal, Oil, Salt",
        spices: "Turmeric, Chilli, Cumin",
        time: "25 Minutes",
        steps: "Cut brinjal. Cook with oil and spices until soft."
    },
    cucumber: {
        name: "Cucumber Salad",
        ingredients: "Cucumber, Lemon, Salt",
        spices: "Black Pepper, Roasted Cumin",
        time: "10 Minutes",
        steps: "Slice cucumber and mix with lemon juice, salt and spices."
    },
    cabbage: {
        name: "Cabbage Sabzi",
        ingredients: "Cabbage, Oil, Salt",
        spices: "Mustard Seeds, Turmeric, Chilli",
        time: "20 Minutes",
        steps: "Shred cabbage and cook with oil, mustard seeds and spices."
    },
    okra: {
        name: "Bhindi Masala",
        ingredients: "Okra, Oil, Salt",
        spices: "Turmeric, Chilli, Coriander Powder",
        time: "25 Minutes",
        steps: "Wash and dry okra. Cut and cook with oil and spices."
    },
    pumpkin: {
        name: "Pumpkin Sabzi",
        ingredients: "Pumpkin, Oil, Salt",
        spices: "Cumin, Turmeric, Chilli",
        time: "25 Minutes",
        steps: "Cut pumpkin and cook with spices and a little water until soft."
    },
    beans: {
        name: "Green Beans Sabzi",
        ingredients: "Green Beans, Oil, Salt",
        spices: "Cumin, Turmeric, Coriander Powder",
        time: "25 Minutes",
        steps: "Cut beans and cook with oil, spices and a little water."
    },
    garlic: {
        name: "Garlic Jeera Sabzi",
        ingredients: "Garlic, Oil, Salt",
        spices: "Cumin, Turmeric, Chilli",
        time: "15 Minutes",
        steps: "Cook peeled garlic with cumin, oil and spices until tender."
    }
};

const aliases = {
    tomato: ["tomato", "tamatar"],
    potato: ["potato", "aloo", "batata"],
    onion: ["onion", "pyaz", "dungli"],
    carrot: ["carrot", "gajar"],
    spinach: ["spinach", "palak"],
    capsicum: ["capsicum", "shimla"],
    cauliflower: ["cauliflower", "gobi"],
    peas: ["peas", "matar"],
    brinjal: ["brinjal", "eggplant", "baingan"],
    cucumber: ["cucumber", "kakdi"],
    cabbage: ["cabbage", "patta"],
    okra: ["okra", "bhindi"],
    pumpkin: ["pumpkin", "kaddu"],
    beans: ["beans", "fansi"],
    garlic: ["garlic", "lahsun"]
};

function showPage(pageId) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("mainWebsite").classList.add("hidden");
    document.getElementById(pageId).classList.remove("hidden");
}

// SIGN UP
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    const user = { name, email, password };
    localStorage.setItem("smartRecipeUser", JSON.stringify(user));

    alert("Account Created Successfully!");
    this.reset();
    showPage("loginPage");
});

// SIGN IN
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const saved = localStorage.getItem("smartRecipeUser");
    const user = saved ? JSON.parse(saved) : null;

    if (user && user.email === email && user.password === password) {
        alert("Welcome " + user.name + "!");
        showPage("mainWebsite");
        this.reset();
    } else {
        alert("Invalid email or password. Please create an account first.");
    }
});

function logout() {
    showPage("loginPage");
    alert("Logged out successfully!");
}

// MULTIPLE IMAGE UPLOAD
const imageInput = document.getElementById("vegetableImage");
const previewContainer = document.getElementById("previewContainer");

imageInput.addEventListener("change", function() {
    previewContainer.innerHTML = "";
    document.getElementById("recipeResult").innerHTML = "";

    const files = Array.from(this.files);

    if (files.some(file => !file.type.startsWith("image/"))) {
        alert("Please select image files only.");
        this.value = "";
        return;
    }

    files.forEach(file => {
        const reader = new FileReader();

        reader.onload = function(e) {
            const card = document.createElement("div");
            card.className = "preview-card";

            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = file.name;

            const caption = document.createElement("p");
            caption.textContent = file.name;

            card.append(img, caption);
            previewContainer.appendChild(card);
        };

        reader.readAsDataURL(file);
    });
});

// FIND RECIPES
function findRecipe() {
    const files = Array.from(imageInput.files);
    const result = document.getElementById("recipeResult");

    if (files.length === 0) {
        alert("Please upload vegetable photos first!");
        return;
    }

    const found = new Set();

    files.forEach(file => {
        const fileName = file.name.toLowerCase();

        Object.keys(aliases).forEach(vegetable => {
            if (aliases[vegetable].some(alias => fileName.includes(alias))) {
                found.add(vegetable);
            }
        });
    });

    const suggestions = [];

    if (found.has("potato") && found.has("cauliflower")) {
        suggestions.push({
            name: "Aloo Gobi",
            ingredients: "Potato, Cauliflower, Oil, Salt",
            spices: "Turmeric, Chilli, Cumin",
            time: "30 Minutes",
            steps: "Cut the vegetables and cook with oil and spices until tender."
        });
    }

    if (found.has("tomato") && found.has("onion")) {
        suggestions.push({
            name: "Tomato Onion Curry",
            ingredients: "Tomato, Onion, Oil, Salt",
            spices: "Turmeric, Chilli, Cumin",
            time: "20 Minutes",
            steps: "Cook onion in oil. Add tomato and spices. Cook until soft."
        });
    }

    found.forEach(vegetable => {
        suggestions.push(recipes[vegetable]);
    });

    if (suggestions.length === 0) {
        result.innerHTML = `
            <div class="result-card">
                <h2>No Demo Recipe Found</h2>
                <p>Rename photos using names like tomato.jpg, aloo.jpg,
                palak.jpg or bhindi.jpg.</p>
                <p>This demo checks filenames; it does not recognize vegetables
                directly from image contents.</p>
            </div>`;
        return;
    }

    result.innerHTML = `
        <h2>🥗 Your Recipe Suggestions</h2>
        <p>Vegetable types matched: ${found.size}</p>
        ${suggestions.map(recipe => `
            <div class="result-card">
                <h2>${recipe.name}</h2>
                <p><b>Ingredients:</b> ${recipe.ingredients}</p>
                <p><b>Masala:</b> ${recipe.spices}</p>
                <p><b>Cooking Time:</b> ${recipe.time}</p>
                <p><b>Preparation:</b> ${recipe.steps}</p>
            </div>
        `).join("")}
    `;
}

function clearPhotos() {
    imageInput.value = "";
    previewContainer.innerHTML = "";
    document.getElementById("recipeResult").innerHTML = "";
}

// POPULAR RECIPES
const popularTypes = [
    "tomato", "potato", "spinach", "capsicum",
    "cauliflower", "peas", "brinjal", "cucumber",
    "cabbage", "okra", "pumpkin", "beans"
];

const popularGrid = document.getElementById("popularGrid");

popularTypes.forEach(type => {
    const recipe = recipes[type];

    const card = document.createElement("div");
    card.className = "recipe-card";

    const title = document.createElement("h2");
    title.textContent = recipe.name;

    const description = document.createElement("p");
    description.textContent = recipe.time;

    const button = document.createElement("button");
    button.textContent = "View Recipe";
    button.addEventListener("click", () => showPopularRecipe(type));

    card.append(title, description, button);
    popularGrid.appendChild(card);
});

function showPopularRecipe(type) {
    const recipe = recipes[type];
    const result = document.getElementById("popularResult");

    result.innerHTML = `
        <div class="result-card">
            <h2>${recipe.name}</h2>
            <p><b>Ingredients:</b> ${recipe.ingredients}</p>
            <p><b>Masala:</b> ${recipe.spices}</p>
            <p><b>Cooking Time:</b> ${recipe.time}</p>
            <p><b>Preparation:</b> ${recipe.steps}</p>
        </div>
    `;
}

// CONTACT
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("contactMessage").textContent =
        "Thank you! Your message has been submitted successfully.";
    this.reset();
});
