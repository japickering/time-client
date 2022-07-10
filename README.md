# Server Time Client Specification

The frontend application requires one page, split into two sections horizontally.
On the left-hand side of the application, display:
- The most recently-fetched value for server time (retrieved by hitting endpoint /time),
displayed in epoch seconds.
- The difference between current client machine time and the most recently-fetched value for server time in epoch seconds, formatted in stopwatch format (i.e. HH:mm:ss; a difference of 32 seconds would be 00:00:32, a difference of 0 seconds would be 00:00:00).
- The displayed difference should update once per second. Eg. An initial difference of 00:00:00 would change after one second to 00:00:01.

On the right-hand side of the application, display:
- A HTML preformatted code block containing the most recently-fetched value of all Prometheus metrics (retrieved by hitting endpoint /metrics).

On loading the application for the first time, begin an API request to endpoints /time and /metrics to load current data values. 
Every 30 seconds, the frontend application should make API requests to endpoints /time and /metrics to load the latest data.

While a network request is occurring, the relevant half of the screen should indicate this (eg. a div covering it entirely with text ‘Loading’, or a spinner of some kind below the content).

All API requests made by the frontend should include header ‘Authorization’ with value ‘mysecrettoken’ to ensure requests do not receive a 403 response.