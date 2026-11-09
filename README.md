# message-app

## Backend API routes

| Route                        | Method | Auth           | Description                   |
| ---------------------------- | ------ | -------------- | ----------------------------- |
| `/users`                     | POST   | Open to all    | Creates a user                |
| `/users/:id`                 | GET    | Only same user | Reads specfic user + messages |
| `/users/:id`                 | PUT    | Only same user | Update username/password      |
| `/users/:id`                 | DELETE | Only same user | Deletes a user + messages     |
| `/user/:userId/messages/:id` | Get    | Only `:userId` | Gets the chat with `:id`      |
