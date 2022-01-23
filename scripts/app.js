const firstNameEl = document.querySelector("#firstName");
const secondNameEl = document.querySelector("#secondName");
const countryEl = document.querySelector("#country");
const phoneNumberEl = document.querySelector("#phoneNumber");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirmPassword");
const emailEl = document.querySelector("#email");
const termsCondEl = document.querySelector("#custom");

const form = document.querySelector("#registrationForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword(),
    isSecondNameValid = checkSecondName(),
    isCountryNotEmpty = checkCountry(),
    isPhoneNumberValid = checkPhoneNumber(),
    isTermsCondValid = checkTermCond();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isSecondNameValid &&
    isCountryNotEmpty &&
    isPhoneNumberValid &&
    isTermsCondValid;

  if (isFormValid) {
  }
});

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
  setTimeout(() => {
    formField.classList.remove("error");
    error.textContent = "";
  }, 4000);
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");

  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkUsername = () => {
  let valid = false;
  const min = 2,
    max = 25;
  const username = firstNameEl.value.trim();

  if (!isRequired(username)) {
    showError(firstNameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      firstNameEl,
      `The name must be more than ${min} characters and less than ${max} characters.`
    );
  } else {
    showSuccess(firstNameEl);
    valid = true;
  }
  return valid;
};

const checkSecondName = () => {
  let valid = false;
  const min = 2,
    max = 25;
  const secondName = secondNameEl.value.trim();

  if (!isRequired(secondName)) {
    showError(secondNameEl, "Username cannot be blank.");
  } else if (!isBetween(secondName.length, min, max)) {
    showError(
      secondNameEl,
      `The second name must be more than ${min} characters and less than ${max} characters.`
    );
  } else {
    showSuccess(secondNameEl);
    valid = true;
  }
  return valid;
};

const checkCountry = () => {
  let valid = false;

  const country = countryEl.value;

  if (country == 0) {
    showError(countryEl, "Country is not selected.");
  } else {
    showSuccess(countryEl);
    valid = true;
  }
  return valid;
};

const checkPhoneNumber = () => {
  let valid = false;

  const phoneNumber = phoneNumberEl.value.trim();

  if (!isRequired(phoneNumber)) {
    showError(phoneNumberEl, "Phone number cannot be blank.");
  } else {
    showSuccess(phoneNumberEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;

  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "Confirm password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

const checkTermCond = () => {
  let valid = false;

  if (!termsCondEl.checked) {
    let styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = "#agreeLabel:before {background: #dc3545;}";
    setTimeout(() => {
      styleElem.innerHTML = "";
    }, 4000);
  } else {
    valid = true;
  }

  return valid;
};

$(".registrationBtn").click(function () {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#registration").offset().top,
    },
    300
  );
});

$("body")
  .find(".col-md-6")
  .each(function () {
    let formField = $(this).find(".formField");
    let formElement = formField.parent(".col-md-6");
    let formFieldPlaceholder = formField.attr("placeholder");
    formField.before(
      `<label class="form-label">${formFieldPlaceholder}</label>`
    );
    formField.focus(function () {
      formElement.addClass("has-val");
    });
    formField.blur(function () {
      $(this).val() != ""
        ? formElement.addClass("has-val")
        : formElement.removeClass("has-val");
    });
  });

function phoneMask() {
  let countryCode;
  switch (countryEl.value) {
    case "UA":
      countryCode = 38;
      break;
    case "AU":
      countryCode = 43;
      break;
    case "DE":
      countryCode = 49;
      break;
    case "PL":
      countryCode = 48;
      break;
  }
  let num = $(this).val().replace(/\D/g, "");
  $(this).val(
    "+" +
      countryCode +
      "(" +
      num.substring(2, 5) +
      (num.length > 5 ? ")" : "") +
      (num.length > 5 ? " " + num.substring(5, 8) : "") +
      (num.length > 8 ? " " + num.substring(8, 10) : "") +
      (num.length > 10 ? " " + num.substring(10, 12) : "")
  );
}
$('[type="tel"]').keyup(phoneMask);

AOS.init();
