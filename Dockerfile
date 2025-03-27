# Usar una imagen base de Node.js
FROM node:23-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar los archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
# RUN pnpm build

# Exponer el puerto (Vite usa 5173 por defecto)
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["pnpm", "dev", "--host"]
