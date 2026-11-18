(function () {
  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  var filterButtons = document.querySelectorAll(".filter-button");
  var projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      filterButtons.forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      projectCards.forEach(function (card) {
        card.hidden = filter !== "all" && card.getAttribute("data-category") !== filter;
      });
    });
  });

  document.querySelectorAll("[data-project-type]").forEach(function (link) {
    link.addEventListener("click", function () {
      var projectName = link.getAttribute("data-project-type");
      link.href = "quote.html?project=" + encodeURIComponent(projectName);
    });
  });

  var quoteForm = document.getElementById("quote-form");
  if (!quoteForm) return;

  var projectType = document.getElementById("project-type");
  var requestedProject = new URLSearchParams(window.location.search).get("project");
  if (projectType && requestedProject && Array.from(projectType.options).some(function (option) {
    return option.value === requestedProject;
  })) {
    projectType.value = requestedProject;
  }

  var purchaseType = document.getElementById("purchase-type");
  var rentalDurationField = document.getElementById("rental-duration-field");
  var rentalDuration = document.getElementById("rental-duration");
  if (purchaseType && rentalDurationField && rentalDuration) {
    purchaseType.addEventListener("change", function () {
      var isRental = purchaseType.value.indexOf("Rent") === 0;
      rentalDurationField.hidden = !isRental;
      rentalDuration.required = isRental;
      if (!isRental) rentalDuration.value = "";
    });
  }

  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    var formData = new FormData(quoteForm);
    var message = Array.from(formData.entries()).map(function (entry) {
      return entry[0] + ": " + entry[1];
    }).join("\n");
    var subject = encodeURIComponent("Container project enquiry - " + formData.get("Name"));
    var body = encodeURIComponent(message);
    var status = document.getElementById("form-status");
    if (status) {
      status.textContent = "Your email app should open with the project details. Please review and send the message to complete your enquiry.";
    }
    window.location.href = "mailto:Dhehwa@gmail.com?subject=" + subject + "&body=" + body;
  });
}());
