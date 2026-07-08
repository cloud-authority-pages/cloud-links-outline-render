FROM node:20-alpine

# Install a simple wiki/docs app that works standalone
RUN npm install -g @slab/quill-delta-to-html

# Create a simple Express-based knowledge base
WORKDIR /app
RUN npm init -y && npm install express marked

COPY server.js /app/server.js
COPY public /app/public

EXPOSE 3000
CMD ["node", "server.js"]
