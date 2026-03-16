# POC: Tracking & Latency tests

But : guide to run PoC for telemetry latency, update frequency, battery impact.

## Tests to run
1. Telemetry latency test (WebSocket): measure end-to-end time from device telemetry send to server ack.
2. Update frequency test: test 1/s, 0.5/s, 2/s; measure ingestion and CPU/battery.
3. Battery impact: run 30 minute tracked session on a representative device and measure battery delta.

## Test environment
- Devices: Android 10+, iOS 14+
- Network: 4G cellular, Wi‑Fi (common conditions)
- Server: staging WebSocket endpoint (provide URL)

## Measurement format (store results)
- File: `info/poc_tracking/latency_results_{date}.md`
- Fields: test_id, device, network_type, update_rate, measured_median_latency_ms, p95_latency_ms, battery_start, battery_end, notes

## Example commands (pseudo)
- Run client emitter with timestamp; server returns ack with server timestamp; measure delta.
- Use adb / iOS instruments for battery.

## Expected thresholds
- Target median latency < 500 ms
- p95 < 1 s
- Battery: additional drain < 5% per 30 min (baseline)

-- Fin.