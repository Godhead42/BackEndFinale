// script.js
function showForm(cityname) {
    document.getElementById("bookingForm").style.display = "block";
    document.getElementById("cityName").value = cityname;
    console.log("Form is shown");
}

function hideForm() {
    document.getElementById("bookingForm").style.display = "none";
    console.log("Form is hidden");
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('book-now-btn')) {
            var cityName = event.target.getAttribute('data-city');
            showForm(cityName);
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-close')) {
            hideForm()
        }
    });
});
