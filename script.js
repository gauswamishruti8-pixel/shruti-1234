const recipes = {
    tomato: {
        name: "Tomato Curry",
        ingredients: "Tomato, Onion, Oil, Salt, Spices",
        time: "20 Minutes",
        steps: "Chop tomatoes and onions. Heat oil, add spices, add vegetables and cook until soft."
    },

    potato: {
        name: "Potato Sabzi",
        ingredients: "Potato, Oil, Salt, Turmeric, Chilli",
        time: "25 Minutes",
        steps: "Cut potatoes. Heat oil, add spices and potatoes. Cook until soft."
    },

    onion: {
        name: "Onion Masala",
        ingredients: "Onion, Tomato, Oil, Salt, Spices",
        time: "15 Minutes",
        steps: "Slice onions, cook with oil and spices, add tomato and cook well."
    },

    carrot: {
        name: "Carrot Sabzi",
          ingredients: "Carrot, Oil, Salt, Cumin",
        time: "20 Minutes",
        steps: "Cut carrots, heat oil, add cumin and carrots. Cook until soft."
    },

    spinach: {
        name: "Palak Sabzi",
        ingredients: "Spinach, Garlic, Oil, Salt",
        time: "20 Minutes",
        steps: "Wash spinach, chop it and cook with garlic, oil and salt."
    }
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

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm) {
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

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("smartRecipeUser"));

    if(user && user.email === email && user.password === password) {
        alert("Login Successful! Welcome " + user.name);
        showPage("mainWebsite");
        document.getElementById("loginForm").reset();
    } else {
        alert("Invalid Email or Password. Please Sign Up first.");
    }
});

// LOGOUT
function logout() {
    showPage("loginPage");
    alert("You have logged out successfully!");
}

// IMAGE PREVIEW
const imageInput = document.getElementById("vegetableImage");

imageInput.addEventListener("change", function() {
    const file = this.files[0];

    if(file) {
        if(!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
            const preview = document.getElementById("preview");
            preview.src = e.target.result;
            preview.classList.remove("hidden");
        };

        reader.readAsDataURL(file);
    }
});

// FIND RECIPE
function findRecipe() {
    const file = imageInput.files[0];

    if(!file) {
        alert("Please upload a vegetable image first!");
        return;
    }

    const fileName = file.name.toLowerCase();
    const result = document.getElementById("recipeResult");

    let found = [];

    for(let vegetable in recipes) {
        if(fileName.includes(vegetable)) {
              found.push(recipes[vegetable]);
        }
    }

    if(found.length === 0) {
        result.innerHTML = `
        <div class="result-card">
            <h2>Recipe Suggestions</h2>
            <p>Image uploaded successfully!</p>
            <p>Demo version: rename the image using a vegetable name
            like tomato.jpg, potato.jpg, onion.jpg, carrot.jpg or spinach.jpg
            to see its sample recipe.</p>
            <p>Automatic vegetable recognition requires an AI image recognition service.</p>
        </div>`;
        return;
    }

    result.innerHTML = found.map(recipe => `
        <div class="result-card">
            <h2>${recipe.name}</h2>
            <p><b>Ingredients:</b> ${recipe.ingredients}</p>
            <p><b>Cooking Time:</b> ${recipe.time}</p>
            <p><b>Preparation:</b> ${recipe.steps}</p>
        </div>
    `).join("");
}

// POPULAR RECIPES
const popularRecipes = {
    salad: ["Vegetable Salad", "Cucumber, Tomato, Carrot, Lemon", "Cut all vegetables, mix with lemon juice and salt."],
    soup: ["Vegetable Soup", "Carrot, Tomato, Onion, Water, Salt", "Boil vegetables, add seasoning and cook until soft."],
    bowl: ["Healthy Bowl", "Mixed vegetables, Rice, Lemon", "Cook vegetables and serve with rice."],
    pasta: ["Vegetable Pasta", "Pasta, Tomato, Onion, Capsicum", "Boil pasta, prepare vegetable sauce and mix."]
};

function showPopularRecipe(type) {
    const recipe = popularRecipes[type];

    document.getElementById("popularResult").innerHTML = `
        <div class="result-card">
            <h2>${recipe[0]}</h2>
            <p><b>Ingredients:</b> ${recipe[1]}</p>
            <p><b>Preparation:</b> ${recipe[2]}</p>
        </div>
    `;
}

// CONTACT
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("contactMessage").innerText =
    "Thank you! Your message has been submitted successfully.";

    this.reset();
});
