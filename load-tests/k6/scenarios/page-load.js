import http from "k6/http";
import { check, sleep } from "k6";
import { BASE_URL, MARKETING_PAGES } from "../helpers/data-generators.js";

export const options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 200 },
    { duration: "30s", target: 200 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000", "p(99)<5000"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const page = MARKETING_PAGES[Math.floor(Math.random() * MARKETING_PAGES.length)];
  const res = http.get(`${BASE_URL}${page}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 2s": (r) => r.timings.duration < 2000,
    "body is not empty": (r) => r.body && r.body.length > 0,
  });

  sleep(Math.random() * 2 + 0.5);
}
