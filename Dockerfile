FROM node:20-alpine AS builder  

WORKDIR /app  

# Install pnpm  
RUN npm install -g pnpm  

# Copy package files  
COPY package.json pnpm-lock.yaml ./  

# Install dependencies  
RUN pnpm install  

# Copy source code  
COPY . .  

# Build application  
RUN pnpm build  

FROM node:20-alpine  

WORKDIR /app  

# Install pnpm  
RUN npm install -g pnpm  

# Copy built application  
COPY --from=builder /app/dist ./dist  
COPY --from=builder /app/node_modules ./node_modules  
COPY --from=builder /app/package.json ./  
COPY --from=builder /app/.env ./env  

# Expose port  
EXPOSE 8081  

# Start application  
CMD ["pnpm", "start:prod"]