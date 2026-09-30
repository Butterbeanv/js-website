console.warn("Teachers just so you know everything runs on the serverside of the database meaning you cant change anything. but nice try !");

// Get signup elements
let username = document.getElementById("Username");
let signup = document.getElementById("signup");
let password = document.getElementById("Passwordbox");
let email = document.getElementById("Emailbox");

// Supabase connection
const supabaseUrl = "https://axfoxztoirkvxdbajami.supabase.co";
const supabaseKey = "sb_publishable_IrVC4asLMgAeGLjoo8DD3w__W2Wyl7i";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase connected!");

// SIGN UP
signup.onclick = async function(event) {

    event.preventDefault();

    if (
        username.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value === ""
    ) {
        alert("Please fill in all the boxes.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email: email.value.trim(),
        password: password.value,
        options: {
            data: {
                username: username.value.trim()
            }
        }
    });

    if (error) {
        console.error("Signup error:", error);
        alert(error.message);
        return;
    }

    console.log("Account created!");
    console.log(data);

    alert("Account created successfully!");

    window.location.href = "portal.html";
};


// DISCORD LOGIN
async function discordLogin() {

    const { data, error } =
        await supabaseClient.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: window.location.origin + "/portal.html"
            }
        });

    if (error) {
        console.error("Discord login error:", error);
        alert(error.message);
    }
}