# Usar Ubuntu como imagen base
FROM ubuntu:25.04

# Evitar interacciones durante la instalación de paquetes
ENV DEBIAN_FRONTEND=noninteractive

# Actualizar e instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_23.x | bash - \
    && apt-get install -y \
    nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

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
