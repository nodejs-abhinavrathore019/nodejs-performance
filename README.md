# Different ways to avoid blocking event-loop

commonjs + ts

# Compatible Versions:

### Node

- v19.7.0

### Typescript

- 5.2.2

# 1-blocking-request

Showcases how long running task can block event loop.

### Install

```bash
npm run install-1
```

### run in dev mode

```bash
npm run dev-1
```

### Metrics

#### /cats

- Without long running task.
- all requests served.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 936            | 13.45      | 21                   | 2        | 1,042    | 20        | 0.00    |

#### /cats

- With long running task in api, server won’t be able to serve all requests and errors will increase.
- Every request for `/cats` is taking more than 10 seconds, because there is a added 10 second blocking JS task in it.
- There is a huge fall in number of requests served too.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 14             | 0.20       | 30,341               | 10,231   | 50,423   | 50,423    | 64.29   |

#### /cats/:id

- Without long running task.
- all requests served.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cat-by-id (Regular Implementation) | 983            | 13.87      | 6                    | 2        | 258      | 7         | 0.00    |

#### /cats and /cats/:id

- Without long running task.
- all requests served.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 931            | 13.71      | 11                   | 2        | 922      | 10        | 0.00    |
| GET cat-by-id (Regular Implementation) | 931            | 13.71      | 7                    | 2        | 436      | 8         | 0.00    |

#### /cats and /cats/:id

- With long running task in api, server won’t be able to serve all requests and errors will increase.
- Because `/cats` is blocking execution it failed `/cats/:id` requests too.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 20             | 0.29       | 30,203               | 10,085   | 50,174   | 50,174    | 75.00   |
| GET cat-by-id (Regular Implementation) | 3              | 0.04       | -                    | -        | -        | -         | 100.00  |

# 2-cluster

### Install

```bash
npm run install-2
```

### run in dev mode

```bash
npm run dev-2
```

### Metrics

#### /cats

- Without long running task.
- all requests served.
- more requests served with multiple processes created using cluster.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 936            | 13.45      | 21                   | 2        | 1,042    | 20        | 0.00    |
| GET cats                          | 1,077          | 15.62      | 7                    | 2        | 303      | 10        | 0.00    |

#### /cats

- With long running task in api, server won’t be able to serve all requests and errors will increase.
- Every request for `/cats` is taking more than 10 seconds, because there is a added 10 second blocking JS task in it.
- Total requests served increased because of 2 processes.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 14             | 0.20       | 30,341               | 10,231   | 50,423   | 50,423    | 64.29   |
| GET cats                          | 28             | 0.40       | 30,033               | 10,044   | 50,157   | 49,938    | 64.29   |

#### /cats/:id

- Without long running task.
- All requests served.
- Total requests served increased because of 2 processes.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cat-by-id (Regular Implementation) | 983            | 13.87      | 6                    | 2        | 258      | 7         | 0.00    |
| GET cat-by-id                          | 1,056          | 15.48      | 9                    | 2        | 385      | 9         | 0.00    |

#### /cats and /cats/:id

- Without long running task.
- All requests served.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 931            | 13.71      | 11                   | 2        | 922      | 10        | 0.00    |
| GET cat-by-id (Regular Implementation) | 931            | 13.71      | 7                    | 2        | 436      | 8         | 0.00    |
| GET cats                               | 989            | 14.89      | 9                    | 2        | 305      | 10        | 0.00    |
| GET cat-by-id                          | 988            | 14.88      | 5                    | 2        | 206      | 9         | 0.00    |

#### /cats and /cats/:id

- With long running task in api, server won’t be able to serve all requests and errors will increase.
- Because `/cats` is blocking execution it failed `/cats/:id` requests too.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 20             | 0.29       | 30,203               | 10,085   | 50,174   | 50,174    | 75.00   |
| GET cat-by-id (Regular Implementation) | 3              | 0.04       | -                    | -        | -        | -         | 100.00  |
| GET cats                               | 22             | 0.32       | 29,847               | 10,059   | 49,753   | 49,387    | 54.55   |
| GET cat-by-id                          | 9              | 0.13       | 22                   | 12       | 29       | 29        | 66.67   |

# 3-pm2

### Install

```bash
npm run install-3
```

### start pm2

```bash
npm run pm2:start
```

### start all pm2 processes

```bash
npm run pm2:start:all
```

### stop all pm2 processes

```bash
npm run pm2:stop:all
```

### check logs

```bash
npm run pm2:logs
```

### Metrics

#### /cats

- Without long running task.
- all requests served.
- more requests served with multiple processes created using cluster.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 936            | 13.45      | 21                   | 2        | 1,042    | 20        | 0.00    |
| GET cats                          | 1,097          | 15.97      | 7                    | 2        | 461      | 7         | 0.00    |

#### /cats

- With long running task in api, server won’t be able to serve all requests and errors will increase.
- Every request for `/cats` is taking more than 10 seconds, because there is a added 10 second blocking JS task in it.
- Avg. response time reduced due to multiple processes created by pm2.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 14             | 0.20       | 30,341               | 10,231   | 50,423   | 50,423    | 64.29   |
| GET cats                          | 38             | 0.56       | 27,919               | 10,077   | 49,908   | 39,892    | 47.37   |

#### /cats/:id

- Without long running task.
- All requests served.
- Average response time is almost same.
- As there is no blocking task happening in this api, same process is used to serve all requests.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cat-by-id (Regular Implementation) | 983            | 13.87      | 6                    | 2        | 258      | 7         | 0.00    |
| GET cat-by-id                          | 1,121          | 16.55      | 7                    | 2        | 293      | 7         | 0.00    |

### /cats and /cats/:id

- Without long running task.
- All requests served.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 931            | 13.71      | 11                   | 2        | 922      | 10        | 0.00    |
| GET cat-by-id (Regular Implementation) | 931            | 13.71      | 7                    | 2        | 436      | 8         | 0.00    |
| GET cats                               | 950            | 14.34      | 12                   | 2        | 382      | 11        | 0.00    |
| GET cat-by-id                          | 950            | 14.34      | 8                    | 2        | 396      | 10        | 0.00    |

#### /cats and /cats/:id

- multiple processes created by pm2.
- more number of requests served in same duration.
- Avg response time also reduced.
- Errors due to timeout also reduced.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 20             | 0.29       | 30,203               | 10,085   | 50,174   | 50,174    | 75.00   |
| GET cat-by-id (Regular Implementation) | 3              | 0.04       | -                    | -        | -        | -         | 100.00  |
| GET cats                               | 23             | 0.34       | 29,938               | 10,045   | 49,977   | 49,865    | 13.04   |
| GET cat-by-id                          | 16             | 0.24       | 19                   | 7        | 27       | 27        | 81.25   |

# 4-child-process

### Install

```bash
npm run install-4
```

### run in dev mode

```bash
npm run dev-4
```

### Metrics

- Number of requests served dropped drastically, Need to figure out why?

# /cats

- Without long running task.
- all requests served.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 936            | 13.45      | 21                   | 2        | 1,042    | 20        | 0.00    |
| GET cats                          | 21             | 0.29       | 34,311               | 24,605   | 35,589   | 35,409    | 0.00    |

# /cats

- With long running task in api.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 14             | 0.20       | 30,341               | 10,231   | 50,423   | 50,423    | 64.29   |
| GET cats                          | 20             | 0.29       | 45,975               | 43,780   | 47,213   | 46,885    | 0.00    |

# /cats/:id

- Without long running task.
- All requests served.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cat-by-id (Regular Implementation) | 983            | 13.87      | 6                    | 2        | 258      | 7         | 0.00    |
| GET cat-by-id                          | 1,113          | 16.27      | 6                    | 2        | 177      | 6         | 0.00    |

# /cats and /cats/:id

- Without long running task.
- All requests served.
- As creating process is a costly task, it decreased number of requests served for nonblocking tasks too.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 931            | 13.71      | 11                   | 2        | 922      | 10        | 0.00    |
| GET cat-by-id (Regular Implementation) | 931            | 13.71      | 7                    | 2        | 436      | 8         | 0.00    |
| GET cats                               | 21             | 0.29       | 37,390               | 25,091   | 39,158   | 39,022    | 0.00    |
| GET cat-by-id                          | 21             | 0.29       | 68                   | 2        | 920      | 50        | 0.00    |

# /cats and /cats/:id

- With long running task in api.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 20             | 0.29       | 30,203               | 10,085   | 50,174   | 50,174    | 75.00   |
| GET cat-by-id (Regular Implementation) | 3              | 0.04       | -                    | -        | -        | -         | 100.00  |
| GET cats                               | 20             | 0.29       | 43,973               | 38,941   | 45,210   | 44,835    | 0.00    |
| GET cat-by-id                          | 20             | 0.29       | 24                   | 2        | 274      | 36        | 0.00    |

# 5-worker-threads

### Install

```bash
npm run install-5
```

### run in dev mode

```bash
npm run dev-5
```

### Metrics

- Number of requests served dropped drastically, Need to figure out why?

#### /cats

- Without long running task.
- all requests served.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 936            | 13.45      | 21                   | 2        | 1,042    | 20        | 0.00    |
| GET cats                          | 20             | 0.30       | 42,344               | 37,334   | 47,591   | 45,095    | 0.00    |

#### /cats

- With long running task in api.

| Request                           | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| --------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation) | 14             | 0.20       | 30,341               | 10,231   | 50,423   | 50,423    | 64.29   |
| GET cats                          | 20             | 0.29       | 43,949               | 38,493   | 46,579   | 45,667    | 0.00    |

#### /cats/:id

- Without long running task.
- All requests served.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cat-by-id (Regular Implementation) | 983            | 13.87      | 6                    | 2        | 258      | 7         | 0.00    |
| GET cat-by-id                          | 1,139          | 16.70      | 6                    | 2        | 134      | 7         | 0.00    |

#### /cats and /cats/:id

- Without long running task.
- All requests served.
- As creating process is a costly task, it decreased number of requests served for nonblocking tasks too.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 931            | 13.71      | 11                   | 2        | 922      | 10        | 0.00    |
| GET cat-by-id (Regular Implementation) | 931            | 13.71      | 7                    | 2        | 436      | 8         | 0.00    |
| GET cats                               | 20             | 0.29       | 35,339               | 26,519   | 39,453   | 38,146    | 0.00    |
| GET cat-by-id                          | 20             | 0.29       | 26                   | 3        | 364      | 17        | 0.00    |

#### /cats and /cats/:id

- With long running task in api.

| Request                                | Total requests | Requests/s | Resp. time (Avg. ms) | Min (ms) | Max (ms) | 90th (ms) | Error % |
| -------------------------------------- | -------------- | ---------- | -------------------- | -------- | -------- | --------- | ------- |
| GET cats (Regular Implementation)      | 20             | 0.29       | 30,203               | 10,085   | 50,174   | 50,174    | 75.00   |
| GET cat-by-id (Regular Implementation) | 3              | 0.04       | -                    | -        | -        | -         | 100.00  |
| GET cats                               | 20             | 0.30       | 43,965               | 38,898   | 45,963   | 45,539    | 0.00    |
| GET cat-by-id                          | 20             | 0.30       | 28                   | 3        | 276      | 50        | 0.00    |
