console.warn("Teachers just so you know everything runs on the serverside of the database meaning you cant change anything. but nice try !");

let username = document.getElementById("Username");
let login = document.getElementById("signup");
let password = document.getElementById("Passwordbox");
let email = document.getElementById("Emailbox");

const supabaseUrl = "https://axfoxztoirkvxdbajami.supabase.co";
const supabaseKey = "sb_publishable_IrVC4asLMgAeGLjoo8DD3w__W2Wyl7i";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase connected!");


// SIGN UP
login.onclick = async function(event) {

    event.preventDefault();

    const { data, error } = await supabaseClient.auth.signUp({
        email: email.value,
        password: password.value,

        options: {
            data: {
                username: username.value
            }
        }
    });

    if (error) {
        console.error("Signup error:", error);
        alert(error.message);
        return;
    }

    console.log("Account created!");
    console.log(data.user);

    alert("Account created successfully!");
};


// GOOGLE SIGN IN
async function googleLogin() {

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin
        }
    });

    if (error) {
        console.error("Google login error:", error);
        alert(error.message);
    }
}