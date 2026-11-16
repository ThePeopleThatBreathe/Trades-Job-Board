let userType = null;

$(document).ready(function () {
  const table = $("#jobs-table").DataTable({
    responsive: {
      details: false,
    },
    columnDefs: [
      { className: "all", targets: [0, 1, 2] },
    ],
    order: [],
  });

  table.on("draw", function () {
    table.responsive.recalc();
  });

  function formatDate(value) {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Swap Login button based on the signed in user
  function swapLoginButton(userType) {
    $("#login-btn").prop("hidden", true);
    if (userType === "admin") {
      $("#add-job-link").prop("hidden", false);
    } else if (userType === "basic") {
      $("#saved-jobs-link").prop("hidden", false);
    }
  }

  // Closes whichever modal is open
  function closeModal() {
    $(".modal").prop("hidden", true);
  }

  // Job modal
  $("#jobs-table tbody").on("click", "tr", function () {
    const row = $(this);

    $("#modal-title").text(row.attr("data-title"));
    $("#modal-company").text(row.attr("data-company"));
    $("#modal-trade").text(row.attr("data-trade"));
    $("#modal-location").text(row.attr("data-location"));
    $("#modal-hours").text(row.attr("data-hours"));
    $("#modal-internship").text(row.attr("data-internship"));
    $("#modal-posted").text(formatDate(row.attr("data-posted")));
    $("#modal-expires").text(formatDate(row.attr("data-expires")));

    $("#modal-description").text(
      row.attr("data-description") || "No description provided.",
    );

    const url = row.attr("data-url") || "";
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
      userType = "admin";
      swapLoginButton(userType);
      closeModal();
    } else if (
      $("#username").val() === "testUser" &&
      $("#password").val() === "456"
    ) {
      userType = "basic";
      swapLoginButton(userType);
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
