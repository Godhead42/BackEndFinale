function showForm(tour) {
    document.getElementById("bookingForm").style.display = "block";

    var tourObject = JSON.parse(tour);
    document.getElementById("tourIdEdit").value = tourObject._id;
    document.getElementById("cityNameEdit").value = tourObject.cityName;
    document.getElementById("adultsEdit").value = tourObject.adults;
    document.getElementById("childrenEdit").value = tourObject.children;
    document.getElementById("phoneEdit").value = tourObject.phone;
    document.getElementById("hotelRatingEdit").value = tourObject.hotelRating;
    document.getElementById("dateArrivalEdit").value = tourObject.dateArrival.split('T')[0];
    document.getElementById("dateDepartureEdit").value = tourObject.dateDeparture.split('T')[0];
}
function hideForm() {
    document.getElementById("bookingForm").style.display = "none";
    console.log("Form is hidden");
}
async function increasePrices() {
    const increaseAmount = document.getElementById("increaseAmount").value;

    // Validate increaseAmount
    if (isNaN(increaseAmount)) {
        alert('Invalid increaseAmount. Please enter a valid number.');
        return;
    }

    // Make an asynchronous request to increase prices for all tours
    try {
        const response = await fetch('/admin', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ increaseAmount }),
        });
        window.location.reload();

    } catch (error) {
        console.error('Error during increase price request:', error.message);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', async function (event) {
        if (event.target.classList.contains('btn-update')) {
            var tour = event.target.parentNode.getAttribute('data-tour');
            showForm(tour);
        }

        if (event.target.classList.contains('btn-close')) {
            hideForm();
        }

        if (event.target.classList.contains('btn-delete')) {
            var tourId = event.target.parentNode.getAttribute('data-tour-id');
            if (confirm(`Are you sure you want to delete tour with ID ${tourId}?`)) {
                try {
                    let url = `/admin/${tourId}`;
                    const response = await fetch(url, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        console.error('Error during form submission:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error during delete request:', error.message);
                }
            }
        }

        if (event.target.classList.contains('btn-increase')) {
            await increasePrices();
        }

        if (event.target.classList.contains('btn-submit')) {
            await submitForm();
        }
    });
});

async function submitForm() {
    const tourId = document.getElementById("tourIdEdit").value;
    const updatedFields = {
        adults: document.getElementById("adultsEdit").value,
        children: document.getElementById("childrenEdit").value,
        phone: document.getElementById("phoneEdit").value,
        hotelRating: document.getElementById("hotelRatingEdit").value,
        dateArrival: document.getElementById("dateArrivalEdit").value,
        dateDeparture: document.getElementById("dateDepartureEdit").value,
    };

    try {
        const response = await fetch(`/admin/${tourId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        });

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Error during form submission:', response.statusText);
        }
    } catch (error) {
        console.error('Error during form submission:', error.message);
    }
}