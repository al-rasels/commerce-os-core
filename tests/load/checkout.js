import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 }, // ramp up to 50 users
    { duration: '1m', target: 50 }, // stay at 50 users
    { duration: '30s', target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 300ms
  },
};

export default function () {
  // Simulate fetching products
  let res = http.get('http://localhost:3000/v1/commerce/catalog/products', {
    headers: { 'Host': 'tenant1.commerceos.local' }
  });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
