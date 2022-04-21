# Docker & SQL Practice #3

## Prerequisites

Create `.env` file and add to it:

```sh
POSTGRES_USER=local_admin
POSTGRES_PASSWORD=unsafeLocalPassword0!
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=main
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@pgsql:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
```
