<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Ejecutar en desarrollo

1. Clonar el repositorio

2. Ejecutar
```
yarn install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```

6. Llenar variables de entorno definidias en el ``` .env```

7. Ejecutar la aplicación en dev:
```
yarn start:dev
```

8. Reconstruir base de datos con semilla
```
http://localhost:3000/api/v2/seed
```

# Build de producción
1. Crear archivo ````.env.prod```
2. Llenar variables de entorno de producción
3. Crear nueva imagen
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
# docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```


# Stack usado
* MongoDB
* Nest