document.addEventListener('DOMContentLoaded', function() {
    // to book appt
    document.getElementById('bookNowBtn').addEventListener('click', function() {
        // to get info
        var name = prompt("Enter your name:");
        var email = prompt("Enter your email address:");
        var time = prompt("Enter appointment time (HH:MM):");

        // show info
        alert('Appointment booked!\n\n' +
              'Name: ' + name + '\n' +
              'Email: ' + email + '\n' +
              'Time: ' + time + '\n' +
              'Service: Emergency' + '\n' +
              'Doctor: Dr. Jane Doe');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // for call button
    document.getElementById('callNowBtn').addEventListener('click', function() {
        alert('Call the number 61311111111');
    });
});
