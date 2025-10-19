// Initialize Supabase
let SUPABASE_URL = "";
let SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudHJmbmRmc3piYmh5Y2FyZmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MjQ1MDMsImV4cCI6MjA3MjEwMDUwM30.qrr-rlmqvBgoa76u5rXl8vMqpJozQkqpGyzXSwNfMzo";
let supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let authSect = document.getElementById("authSect")
let mainSect = document.getElementById("mainSect")

// -----------<<< Authentication [Signup & Login] Section >>>--------------

// Elements
let userEmail = document.getElementById("userEmail")
let userPassword = document.getElementById("userPassword")
let forgetPassw = document.getElementById("forgetPassw")

let signupBtn = document.getElementById("signupBtn")
let loginBtn = document.getElementById("loginBtn")
let logoutBtn = document.getElementById("logoutBtn")


// Show & Hide Password Handling
changIcon.addEventListener("click" , () => {

    if (changIcon.classList.contains("fa-eye")) {
        changIcon.className = "fa-regular fa-eye-slash absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        userPassword.type = "password"
    }
    else {
        userPassword.type = "text"
        changIcon.className = "fa-regular fa-eye absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
    }
    
})

// Sigup User Handling
signupBtn.addEventListener("click" , async () => {

    const { data, error } = await supabase.auth.signUp({
        email: userEmail.value,
        password: userPassword.value
    })

    if (error) {
        error.message
    }
    else {
        showToast("Confirm Your Email!" , "A confirmation link has been sent to your email address. Please check your inbox to verify your account before logging in." , "purple-500")
        console.log(data);
    }

    userEmail.value = ""
    userPassword.value = ""
})

// Login User Handling
loginBtn.addEventListener("click" , async () => {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail.value,
        password: userPassword.value
    })

    if (error) {
        showToast("Invalid Credentials!" , "The email or password you entered is incorrect. Please double-check your details and try again." , "red-500")
    }
    else {
        showToast("Login Successful!" , "You have successfully logged in to your account. Welcome back!" , "emerald-600")
        
        authSect.classList.add("hidden")
        mainSect.classList.remove("hidden")

        console.log(data);
    }

    userEmail.value = ""
    userPassword.value = ""
})

// Logout User Handling
logoutBtn.addEventListener("click" , async () => {

    await supabase.auth.signOut()

    authSect.classList.remove("hidden")
    mainSect.classList.add("hidden")

})

// -----------<<< Check User Session on Page Load >>>--------------

window.addEventListener("DOMContentLoaded", async () => {

    // start with loading
    authSect.classList.add("hidden")
    mainSect.classList.remove("hidden")
    
    const { data } = await supabase.auth.getSession()
    console.log(data);
    
    if (data.session) {
        currentUser = data.session.user.id
        authSect.classList.add("hidden")
        mainSect.classList.remove("hidden")
    }
    else {
        authSect.classList.remove("hidden")
        mainSect.classList.add("hidden")
    }

})

// -----------<<< Popup Notification Handling >>>--------------

// Elements
let toastDiv = document.getElementById("toastDiv")
let signinGoogle = document.getElementById("signinGoogle")

// user show Notification
function showToast(message , descrp , color) {

    toastDiv.innerHTML +=
    `
    <div class="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
        <div role="alert" class="mb-6 mx-auto max-w-lg rounded-lg bg-stone-100 p-4 shadow-lg sm:p-6 lg:p-8">
        
            <div class="flex items-center gap-4">
                <span class="shrink-0 rounded-full bg-${color} p-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                    <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd"></path>
                </svg>
                </span>
                <p class="font-medium sm:text-lg text-${color}">${message}</p>
            </div>

            <p class="mt-4 text-gray-600">${descrp}</p>

            <div class="mt-6 sm:flex sm:gap-4">
                <a href="#" onclick="console.log(this.parentElement.parentElement.parentElement.remove())" class="inline-block w-full rounded-lg bg-${color} px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto">
                ok</a>
                <a href="#" onclick="console.log(this.parentElement.parentElement.parentElement.remove())" class="mt-2 inline-block w-full rounded-lg bg-stone-200 px-5 py-3 text-center text-sm font-semibold text-gray-800 sm:mt-0 sm:w-auto hover:bg-stone-300">
                Dismiss</a>
            </div>

        </div>
    </div>
    `

}

signinGoogle.addEventListener("click" , () => {
    showToast("Feature Locked!" , "This feature is currently locked — it will be unlocked in a future update!" , "purple-700")
})