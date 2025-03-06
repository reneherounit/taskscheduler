# API Endpoints
### Create a New Task
```sh
POST /api/tasks
```
**Example Request :**
```json
{
  "name": "Demo Task",
  "executionTime": "2025-03-05T14:00:00Z"
}
```

### Get Scheduled Tasks
```sh
GET /api/tasks
```

### Get Executed Task Log
```sh
GET /api/tasks/log
```
