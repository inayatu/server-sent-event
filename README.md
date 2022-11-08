
# Server Sent Events (SSE)

Server-Sent Events (SSE) is a technology based on HTTP. On the client-side, it provides an API called EventSource (part of the HTML5 standard) that allows us to connect to the server and receive updates from it.

Before using SSE keeps these points in mind:
```
1. It only allows data reception from the server (unidirectional)
2. Events are limited to UTF-8 (no binary data)
```
## Get Events
```
http://localhost:3000/events

```

## Create Info

```
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"info": "Hello world from person.", "source": "https://en.wikipedia.org/wiki/person"}'\
 -s http://localhost:3000/info
}
```
