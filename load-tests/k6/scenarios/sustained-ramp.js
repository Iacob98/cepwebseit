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
    ramp_readers: {
      executor: "ramping-arrival-rate",
      startRate: 1,
      timeUnit: "1s",
      preAllocatedVUs: 200,
      stages: [
        { duration: "30s", target: 50 },
        { duration: "1m", target: 100 },
        { duration: "1m", target: 200 },
        { duration: "1m", target: 200 },
        { duration: "30s", target: 0 },
      ],
      exec: "browsePages",
    },
    ramp_submitters: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1s",
      preAllocatedVUs: 30,
      stages: [
        { duration: "30s", target: 1 },
        { duration: "1m", target: 3 },
        { duration: "1m", target: 5 },
        { duration: "1m", target: 5 },
        { duration: "30s", target: 0 },
      ],
      exec: "submitForm",
    },
  },
  thresholds: {
    http_req_duration: ["p(50)<500", "p(95)<3000", "p(99)<5000"],
    http_req_failed: ["rate<0.05"],
  },
};

export function browsePages() {
  const page = MARKETING_PAGES[Math.floor(Math.random() * MARKETING_PAGES.length)];
  const res = http.get(`${BASE_URL}${page}`);

  check(res, {
    "page status 200": (r) => r.status === 200,
    "response < 3s": (r) => r.timings.duration < 3000,
  });

  sleep(Math.random() * 0.5);
}

export function submitForm() {
  const isContact = Math.random() > 0.5;
  const endpoint = isContact ? "/api/loadtest/contact" : "/api/loadtest/rechner";
  const data = isContact
    ? generateContactData(Date.now())
    : generateRechnerData(Date.now());

  const res = http.post(`${BASE_URL}${endpoint}`, JSON.stringify(data), {
    headers: defaultHeaders,
  });

  check(res, {
    "submit status 200": (r) => r.status === 200,
    "submit success": (r) => {
      try { return JSON.parse(r.body).success === true; } catch { return false; }
    },
  });
}
