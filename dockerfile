# Use an official Nginx image to serve the static files
FROM nginx:alpine

# Copy static files to the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]