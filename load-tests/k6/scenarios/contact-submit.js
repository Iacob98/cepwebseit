import http from "k6/http";
import { check } from "k6";
import { Counter } from "k6/metrics";
import { generateContactData, BASE_URL, defaultHeaders } from "../helpers/data-generators.js";

const successCount = new Counter("successful_submissions");
const failCount = new Counter("failed_submissions");

export const options = {
  scenarios: {
    concurrent_submissions: {
      executor: "shared-iterations",
      vus: 50,
      iterations: 50,
      maxDuration: "60s",
    },
  },
  thresholds: {
    successful_submissions: ["count>=50"],
    failed_submissions: ["count==0"],
    http_req_duration: ["p(95)<5000"],
  },
};

export default function () {
  const data = generateContactData(__VU * 1000 + __ITER);
  const res = http.post(`${BASE_URL}/api/loadtest/contact`, JSON.stringify(data), {
    headers: defaultHeaders,
  });

  const ok = check(res, {
    "status is 200": (r) => r.status === 200,
    "response has success": (r) => {
      try {
        return JSON.parse(r.body).success === true;
      } catch {
        return false;
      }
    },
    "response has id": (r) => {
      try {
        return typeof JSON.parse(r.body).id === "string";
      } catch {
        return false;
      }
    },
  });

  if (ok) {
    successCount.add(1);
  } else {
    failCount.add(1);
    console.error(`FAIL VU=${__VU} iter=${__ITER} status=${res.status} body=${res.body}`);
  }
}
