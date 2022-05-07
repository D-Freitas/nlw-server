# nlw server
## Receive feedback requests, store in the PostgreSQL database and send to mailtrap email

Use DATABASE_URL environment variable with the string containing the connection to PostgreSQL
<br><br>

## Connection string example
> DATABASE_URL="postgresql://username:password@host:port/postgres_database
<br>

## Do you want to use Docker?
### docker-compose.yml example file:
<pre>
version: '3.1'

services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: 1234
    ports:
      - "5432:5432"
    volumes:
      - postgresql/db:/var/lib/postgresql/data
</pre>
<br>

## Where is the deploy?
https://nlw-server-production.up.railway.app/
