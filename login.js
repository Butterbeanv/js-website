// Get the login elements
let username = document.getElementById("Username");
let password = document.getElementById("Passwordbox");
let login = document.getElementById("Login");

// Supabase connection
const supabaseUrl = "https://axfoxztoirkvxdbajami.supabase.co";
const supabaseKey = "sb_publishable_IrVC4asLMgAeGLjoo8DD3w__W2Wyl7i";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase connected!");

// LOGIN
login.onclick = async function(event) {

    event.preventDefault();

    // Make sure username and password are filled in
    if (
        username.value.trim() === "" ||
        password.value === ""
    ) {
        alert("Please enter your username and password.");
        return;
    }

    // Find the email connected to the username
    const { data: email, error: usernameError } =
        await supabaseClient.rpc(
            "get_email_for_username",
            {
                p_username: username.value.trim()
            }
        );

    // Check username lookup
    if (usernameError) {
        console.error("Username lookup error:", usernameError);
        alert("Username lookup error: " + usernameError.message);
        return;
    }

    // Username doesn't exist
    if (!email) {
        alert("Username not found.");
        return;
    }

    console.log("Username found!");

    // Sign in using the email/password behind the scenes
    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password.value
        });

    // Check login
    if (error) {
        console.error("Login error:", error);

        if (error.message === "Email not confirmed") {
            alert("Your email has not been verified. Please open your inbox. If you do not see it, check your spam folder.");
        } else {
            alert("Login error: " + error.message);
        }

        return;
    }

    // Login successful
    console.log("Login successful!");
    console.log(data);

    alert("Login successful!");

    // Send user to portal
    window.location.href = "portal.html";
};