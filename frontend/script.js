// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const attendanceRecordsDiv = document.getElementById('attendance-records');
    const addAttendanceForm = document.getElementById('add-attendance-form');
    const nameInput = document.getElementById('name-input');

    const apiUrl = 'http://127.0.0.1:5000/attendance';

    async function fetchAttendance() {
        try {
            const response = await fetch(apiUrl);
            const records = await response.json();
            renderAttendance(records);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            attendanceRecordsDiv.innerHTML = '<p>Error loading attendance records.</p>';
        }
    }

    function renderAttendance(records) {
        if (records.length === 0) {
            attendanceRecordsDiv.innerHTML = '<p>No attendance records found.</p>';
            return;
        }

        const ul = document.createElement('ul');
        records.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `${record.name} - ${new Date(record.timestamp).toLocaleString()}`;
            ul.appendChild(li);
        });
        attendanceRecordsDiv.innerHTML = '';
        attendanceRecordsDiv.appendChild(ul);
    }

    addAttendanceForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        if (!name) {
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                nameInput.value = '';
                fetchAttendance();
            } else {
                console.error('Error adding attendance:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding attendance:', error);
        }
    });

    fetchAttendance();
});
