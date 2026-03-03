import http from "k6/http";
import { check, sleep } from "k6";
import {
  generateContactData,
  generateRechnerData,
  BASE_URL,
  defaultHeaders,
  MARKETING_PAGES,
} from "../helpers/data-generators.js";

export const options = {
  scenarios: {
    page_readers: {
      executor: "constant-vus",
      vus: 100,
      duration: "2m",
      exec: "browsePages",
    },
    contact_submitters: {
      executor: "constant-arrival-rate",
      rate: 2,
      timeUnit: "1s",
      duration: "2m",
      preAllocatedVUs: 10,
      exec: "submitContact",
    },
    rechner_submitters: {
      executor: "constant-arrival-rate",
      rate: 1,
      timeUnit: "1s",
      duration: "2m",
      preAllocatedVUs: 5,
      exec: "submitRechner",
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.01"],
    "http_req_duration{scenario:contact_submitters}": ["p(95)<5000"],
    "http_req_duration{scenario:rechner_submitters}": ["p(95)<5000"],
  },
};

export function browsePages() {
  const page = MARKETING_PAGES[Math.floor(Math.random() * MARKETING_PAGES.length)];
  const res = http.get(`${BASE_URL}${page}`);

  check(res, {
    "page status 200": (r) => r.status === 200,
    "page load < 2s": (r) => r.timings.duration < 2000,
  });

  sleep(Math.random() * 3 + 1);
}

export function submitContact() {
  const data = generateContactData(Date.now());
  const res = http.post(`${BASE_URL}/api/loadtest/contact`, JSON.stringify(data), {
    headers: defaultHeaders,
  });

  check(res, {
    "contact submit 200": (r) => r.status === 200,
    "contact success": (r) => {
      try { return JSON.parse(r.body).success === true; } catch { return false; }
    },
  });
}

export function submitRechner() {
  const data = generateRechnerData(Date.now());
  const res = http.post(`${BASE_URL}/api/loadtest/rechner`, JSON.stringify(data), {
    headers: defaultHeaders,
  });

  check(res, {
    "rechner submit 200": (r) => r.status === 200,
    "rechner success": (r) => {
      try { return JSON.parse(r.body).success === true; } catch { return false; }
    },
  });
}
