document.getElementById("form").onsubmit = () => {
  let isFormValid = true;

  // Reset all errors
  resetAllErrors();

  const jobTitle = document.querySelector("#job-title");
  const companyName = document.querySelector("#company-name");
  const tradeArea = document.querySelector("#trade-area");
  const location = document.querySelector("#location");
  const workingHours = document.getElementsByName("working-hours");
  const postedDate = document.querySelector("#post-date");
  const expirDate = document.querySelector("#expiration-date");
  const applicationUrl = document.querySelector("#application-url");

  const errApplicationUrl = document.querySelector("#err-application-url");
  const errPostedDate = document.querySelector("#err-expiration-date");

  // An url must start with one of these
  const validUrlProtocol = ["https://", "http://"];

  // If job title is empty
  if (jobTitle.value.trim() === "") {
    document.querySelector("#err-job-title").style.display = "block";
    isFormValid = false;
  }

  // If company name is empty
  if (companyName.value.trim() === "") {
    document.querySelector("#err-company-name").style.display = "block";
    isFormValid = false;
  }

  // If trade area is empty
  if (tradeArea.value === "") {
    document.querySelector("#err-trade-area").style.display = "block";
    isFormValid = false;
  }

  // If location is empty
  if (location.value.trim() === "") {
    document.querySelector("#err-location").style.display = "block";
    isFormValid = false;
  }

  // If posted date is empty
  if (postedDate.value.trim() === "") {
    document.querySelector("#err-post-date").style.display = "block";
    isFormValid = false;
  }

  // If the expire date is not empty
  if (expirDate.value.trim() !== "") {
    // If the posted date is not empty and its higher that the expried date
    if (postedDate.value !== "" && expirDate.value < postedDate.value) {
      errPostedDate.textContent =
        "The expired date cannot be less than the posted date";
      errPostedDate.style.display = "block";
      isFormValid = false;
    }
  }
  // If empty
  else {
    errPostedDate.textContent = "Enter in the expiration date";
    errPostedDate.style.display = "block";
    isFormValid = false;
  }

  // If the url is not empty
  if (applicationUrl.value.trim() !== "") {
    // Loops through array and if the value starts with one of the values in the array, return true;
    const isUrlvalid = validUrlProtocol.some((protocol) =>
      applicationUrl.value.startsWith(protocol),
    );

    // If the url does not start with what is in the array
    if (!isUrlvalid) {
      errApplicationUrl.textContent =
        "The start of the link has to start with either https:// or http://";
      errApplicationUrl.style.display = "block";
      isFormValid = false;
    }
  }
  // If empty
  else {
    errApplicationUrl.textContent = "Enter the url for this job application";
    errApplicationUrl.style.display = "block";
    isFormValid = false;
  }

  // Used to check if a radio button is selected
  let workingHourButtonsCount = workingHours.length;
  workingHours.forEach((option) => {
    // If a button is selected, decrement the count by one
    if (option.checked) {
      workingHourButtonsCount -= 1;
    }
  });

  // If no buttons are selected, display error
  if (workingHourButtonsCount === workingHours.length) {
    document.querySelector("#err-working-hours").style.display = "block";
    isFormValid = false;
  }

  return isFormValid;
};

/**
 * Resets all errors on the form in the add-job.ejs file
 */
function resetAllErrors() {
  document.querySelectorAll(".err").forEach((err) => {
    err.style.display = "none";
  });
}
