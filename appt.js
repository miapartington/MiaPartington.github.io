document.addEventListener('DOMContentLoaded', function() {
    // get appt
    var modal = document.getElementById('appointmentForm');
    var calendarEl = document.getElementById('calendar');
    var selectedDate; 
    // when calendar is pressed
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function(info) {
            selectedDate = info.dateStr; 
            modal.style.display = 'block'; 
        }
    });
    calendar.render();
    // close modal
    var closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // validations
    var form = document.getElementById('appointmentFormContent');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // required fileds
        var requiredFields = ['time', 'doctor', 'service', 'name', 'email'];
        var isValid = true;
        var formData = new FormData(form);
        var appointmentDetails = {};

        for (var field of requiredFields) {
            var value = formData.get(field);
            if (!value) {
                isValid = false;
                alert('Please fill out the ' + field + ' field.');
                break;
            }
            appointmentDetails[field] = value;
        }

        if (!isValid) return;

        
        var timeValue = appointmentDetails.time;
        var timeParts = timeValue.split(':');
        var hours = parseInt(timeParts[0], 10);
        var minutes = parseInt(timeParts[1], 10);

        // check if time is valid
        var appointmentDateTime = new Date(selectedDate + 'T' + timeValue + ':00');

        
        if (hours < 9 || (hours === 17 && minutes > 0) || hours > 17) {
            alert('Appointments can only be booked between 9 AM and 5 PM.');
            return;
        }

        bookAppointment(appointmentDetails, appointmentDateTime);
    });

    doctorSelect.addEventListener('change', updateServices);
    updateServices(); 

    // to book appts
    function bookAppointment(appointmentDetails, appointmentDateTime) {
       
        calendar.addEvent({
            title: appointmentDetails.service + ' with Dr. ' + appointmentDetails.doctor,
            start: appointmentDateTime,
            allDay: false 
        });

        
        modal.style.display = 'none';

        // display appt info
        var confirmationModalBody = document.getElementById('confirmationModalBody');
        confirmationModalBody.innerHTML = 'Appointment booked for ' + appointmentDateTime.toLocaleString() +
            '<br>Name: ' + appointmentDetails.name +
            '<br>Email: ' + appointmentDetails.email +
            '<br>Doctor: ' + appointmentDetails.doctor +
            '<br>Service: ' + appointmentDetails.service;
        var confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        confirmationModal.show();

        // close confirmation modal
        var confirmationCloseBtn = document.querySelector('#confirmationModal .btn-close');
        confirmationCloseBtn.addEventListener('click', function() {
            confirmationModal.hide();
        });

        var confirmationCloseFooterBtn = document.querySelector('#confirmationModal .btn-secondary');
        confirmationCloseFooterBtn.addEventListener('click', function() {
            confirmationModal.hide();
        });
    }
});
