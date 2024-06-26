import http from 'k6/http';
import { check, sleep } from 'k6';

// Function to handle user login and get session cookie
function login(username, password) {
  let res = http.post('http://localhost:3000/api/login', { // Replace with actual login endpoint
    username: username,
    password: password,
  });

  check(res, {
    'login status is 200': (r) => r.status === 200,
  });

  return res.cookies; // Return session cookie
}

export let options = {
  stages: [
    { duration: '1m', target: 20 }, // Ramp-up to 20 virtual users over 1 minute
    { duration: '5m', target: 20 }, // Stay at 20 virtual users for 5 minutes
    { duration: '1m', target: 0 },  // Ramp-down to 0 virtual users over 1 minute
  ],
};

export default function () {
  // Login and get session cookie
  let cookies = login('testuser', 'password');

  // Use the session cookie in subsequent requests
  let headers = {
    'Cookie': cookies,
  };

  // Simulate fetching student results
  let resultsRes = http.get('http://localhost:3000/api/results', { headers: headers }); // Replace with actual API endpoint

  check(resultsRes, {
    'results status is 200': (r) => r.status === 200,
  });

  sleep(1); // Sleep for 1 second between iterations
}
