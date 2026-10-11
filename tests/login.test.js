import http from 'k6/http'
import { sleep,check  } from 'k6'
const postLogin = JSON.parse(open('../fixtures\postLogin.json'))


export const options = {
  stages: [
    {duration:'5s',target:10 },
    {duration:'20s',target:10 },
    {duration:'10s',target:0 }
  
  ],
   
  thresholds: {
   // http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(90)<3000','max<5000'], // 95% of requests should be below 200ms
     http_req_failed:['rate<0.01']
  },
}

export default function () {
    //teste
     const url = 'http://localhost:3000/login';
     
     const payload = JSON.stringify(postLogin);

     const params = {
     headers: {
      'Content-Type': 'application/json',
    },
  };

  const res =  http.post(url, payload, params);
  
  check (res, {
    'Validar que o Status é 200': (r) => r.status ===200,
    'Validar que o o Token é string': (r) => typeof (r.json ().token) =='string'

    

  })

  sleep(1)

}

