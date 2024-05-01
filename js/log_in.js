/**
 * Starts the animation of the opening logo.
 */
async function initLogIn() {
    animateStartLogo();
    renderLogIn();
}


/**
 * Animates the big Join logo at the start of the log in page.
 */
function animateStartLogo() {
    setTimeout(function(){
        toggleClass('start-logo', 'animated-start-logo');
        toggleClass('form-wrapper', 'fade-in-content')
    }, 600);
}


/**
 * Renders the form for logging in.
 */
function renderLogIn() {
    let dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.innerHTML = logInFormTemplate();
}


/**
 * HTML template for better readability.
 * @returns HTML template of the log in form.
 */
function logInFormTemplate() {
    return /*html*/`
        <div class="sign-up-wrapper">
            <span>Not a Join user?</span>
            <button class="dark-button" onclick="renderSignUp()">Sign up</button>
        </div>
        <div id="form-wrapper">
            <div class="log-in-box">
                <h1>Log in</h1>
                <div class="log-in-border"></div>
                <form id="log-in-form" onsubmit="logIn(); return false;">
                    <div class="input-wrapper">
                        <input type="email" id="email" required placeholder="Email" autofocus>
                        <img id="email-image" src="/join/assets/img/email-icon.png">
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="password" required placeholder="Password" oninput="checkIfEmpty()">
                        <img id="password-image" src="/join/assets/img/password-icon.png" onclick="togglePasswordVisibility()" onload="checkIfEmpty()">
                    </div>
                    <div class="remember-me-box">
                        <input type="checkbox" id="remember-me">
                        <span>Remember me</span>
                    </div>
                    <div class="entry-buttons">
                        <button class="dark-button" type="submit">Log in</button>
                        <button class="light-button" onclick="setUpGuestLogIn()">Guest Log in</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}


/**
 * Checks if input field for password is empty.
 */
function checkIfEmpty() {
    let passwordInput = document.getElementById('password');
    let passwordImage = document.getElementById('password-image');
    if (passwordInput.value !== '') {
        changeImageSource('password-image', '/join/assets/img/password-hidden.png');
        passwordImage.style.pointerEvents = 'all';
    } else {
        changeImageSource('password-image', '/join/assets/img/password-icon.png');
        passwordImage.style.pointerEvents = 'none';
        passwordInput.type = 'password';
    }
}


/**
 * Toggles visibility of password in its input field.
 */
function togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        changeImageSource('password-image', '/join/assets/img/password-shown.png');
    } else {
        passwordInput.type = 'password';
        changeImageSource('password-image', '/join/assets/img/password-hidden.png');
    }
}


/**
 * Desides whether or not to fetch user information depending if a log in or a guest log in occured.
 */
async function logIn() {
    if (await checkValidation() === true) {
        /*fetch user information*/
        window.location.href = 'summary.html'
    } else {
        window.location.href = 'summary.html'
    }
}


/**
 * Sets up log in for guest user by disabling the form validation.
 */
function setUpGuestLogIn() {
    let logInForm = document.getElementById('log-in-form');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    emailInput.removeAttribute('required');
    passwordInput.removeAttribute('required');
    logInForm.submit();
}


/**
 * Checks whether or not the form validtion is on.
 * @returns True if form validation is on and false if form validation is off.
 */
async function checkValidation() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    if (emailInput.hasAttribute('required') === true && passwordInput.hasAttribute('required') === true) {
        return true
    } else {
        return false
    }
}