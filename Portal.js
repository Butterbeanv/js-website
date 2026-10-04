
const supabaseUrl = "https://axfoxztoirkvxdbajami.supabase.co"; 
const supabaseKey = "sb_publishable_IrVC4asLMgAeGLjoo8DD3w__W2Wyl7i"; 
 
const supabaseClient = window.supabase.createClient( 
    supabaseUrl, 
    supabaseKey 
); 
 
 
async function loadProfile() { 
 
    const { data: { user }, error } = 
        await supabaseClient.auth.getUser(); 
 
    if (error) { 
        console.error(error); 
        return; 
    } 
 
    if (!user) { 
        return; 
    } 
 
    // Send login notification to Discord
    if (!sessionStorage.getItem("discordLoginSent")) {
 
        const username = 
            user.user_metadata.username || 
            user.user_metadata.full_name || 
            user.email || 
            "Unknown user"; 
 
        fetch("/api/discord-login", { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json" 
            }, 
            body: JSON.stringify({ 
                username: username 
            }) 
        }) 
        .then(response => { 
            if (response.ok) { 
                sessionStorage.setItem("discordLoginSent", "true"); 
            } 
        }) 
        .catch(error => { 
            console.error("Discord notification error:", error); 
        }); 
    } 
 
 
    const discordAvatar = user.user_metadata.avatar_url; 
    const customAvatar = user.user_metadata.custom_avatar; 
 
    const avatar = customAvatar || discordAvatar || "default-profile.png"; 
 
    document.getElementById("Profile").innerHTML = ` 
        <img  
            src="${avatar}"  
            alt="Profile picture" 
            id="ProfilePicture" 
        > 
    `; 
 
    // Email users can change their picture 
    if (!discordAvatar) { 
        document.getElementById("ProfilePicture").onclick = changeProfilePicture; 
    } 
} 
 
 
async function changeProfilePicture() { 
 
    const newAvatar = prompt( 
        "Paste the URL of the image you want to use:" 
    ); 
 
    if (!newAvatar) { 
        return; 
    } 
 
    const { error } = await supabaseClient.auth.updateUser({ 
        data: { 
            custom_avatar: newAvatar 
        } 
    }); 
 
    if (error) { 
        console.error(error); 
        alert("Could not change profile picture."); 
        return; 
    } 
 
    loadProfile(); 
} 
 
 
async function logout() { 
 
    const { error } = await supabaseClient.auth.signOut(); 
 
    if (error) { 
        console.error("Logout error:", error); 
        alert("Could not log out."); 
        return; 
    } 
 
    window.location.href = "index.html"; 
} 
 
 
loadProfile();

