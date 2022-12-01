## Hours counter

Helps with counting working hours formatted in very opinionated way.

## Prerequisites
- `deno` installed
- Deno extension for your code editor installed and enabled for this project

## Run
```shell
npm run start
```

## Example input

```txt
8h
7h
2h 30m<br>2h 30m<br>1h<br><br>1h


7h 30m<br>30m
3h<br>1h<br><br>5h 10m<br>30m

8h
8h 30m
```

## Example output

```txt
┌──────────────┬───────────┐
│ (idx)        │ Values    │
├──────────────┼───────────┤
│ Days         │ 7         │
│ Hours        │ 56.17     │
│ Pretty hours │ "56h 10m" │
└──────────────┴───────────┘
```
