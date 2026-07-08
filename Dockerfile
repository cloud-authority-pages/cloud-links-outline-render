FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PLATFORM_NAME="Cloud Links Outline"
ENV PLATFORM_COLOR="#1a1a2e"
ENV PLATFORM_ACCENT="#0f3460"
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
