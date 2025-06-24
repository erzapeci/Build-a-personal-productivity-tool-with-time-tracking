# Përdor imazhin zyrtar të Node.js
FROM node:18

# Krijo folderin e punës
WORKDIR /app

# Kopjo paketat dhe installoji
COPY package*.json ./
RUN npm install

# Kopjo gjithë pjesën tjetër të aplikacionit
COPY . .

# Defino portin që do të përdoret në container
EXPOSE 5003

# Komanda që do të ekzekutohet kur starton container-i
CMD ["npm", "start"]
