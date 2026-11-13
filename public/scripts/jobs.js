$(document).ready(function () {
  $("#jobs-table").DataTable({
    responsive: true,
    order: [],
  });

  // Swap Login for Add Jobs
  function showAdmin() {
    $("#login-btn").prop("hidden", true);
    $("#add-job-link").prop("hidden", false);
  }

  // Closes whichever modal is open
  function closeModal() {
    $(".modal").prop("hidden", true);
  }

  // Job modal
  $("#jobs-table tbody").on("click", "tr", function () {
    const row = $(this);

    $("#modal-title").text(row.attr("data-title"));

    $("#modal-details").text(
      row.attr("data-company") +
        " | " +
        row.attr("data-trade") +
        " | " +
        row.attr("data-location") +
        " | Internship: " +
        row.attr("data-internship") +
        " | " +
        row.attr("data-hours") +
        " | Posted " +
        row.attr("data-posted") +
        " | Expires " +
        row.attr("data-expires"),
    );

    $("#modal-description").text(
      row.attr("data-description") || "No description provided.",
    );

    const url = row.attr("data-url");
    if (url.startsWith("http://") || url.startsWith("https://")) {
      $("#modal-apply").attr("href", url).show();
    } else {
      $("#modal-apply").hide();
    }

    $("#job-modal").prop("hidden", false);
  });

  // Login modal
  $("#login-btn").on("click", function () {
    $("#login-form")[0].reset();
    $("#login-error").prop("hidden", true);
    $("#login-modal").prop("hidden", false);
    $("#username").trigger("focus");
  });

  $("#login-form").on("submit", function (event) {
    event.preventDefault();

    if ($("#username").val() === "admin" && $("#password").val() === "123") {
      showAdmin();
      closeModal();
    } else {
      $("#login-error").prop("hidden", false);
    }
  });

  // Close buttons
  $("#modal-close, #login-close").on("click", closeModal);

  // Click on the dark background (but not inside the white box)
  $(".modal").on("click", function (event) {
    if (event.target === this) {
      closeModal();
    }
  });

  // Escape key
  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
