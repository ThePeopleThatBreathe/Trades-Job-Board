$(document).ready(function () {
  $("#jobs-table").DataTable({
    responsive: true
  });

  function closeModal() {
    $("#job-modal").prop("hidden", true);
  }

  $("#jobs-table tbody").on("click", "tr", function () {
    const row = $(this);

    $("#modal-title").text(row.attr("data-title"));

    $("#modal-details").text(
      row.attr("data-company") +
        " | " +
        row.attr("data-trade") +
        " | " +
        row.attr("data-location") +
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

  // Close button
  $("#modal-close").on("click", closeModal);

  // Click on the dark background (but not inside the white box)
  $("#job-modal").on("click", function (event) {
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
