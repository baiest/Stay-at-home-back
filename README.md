# Stay-at-home-back

Este proyecto es una API creada con `nodejs`, `express` y `PostgreSQL` que trabaja como back para el proyecto [Stay-at-home](https://github.com/anavictoria1994/Stay-at-home).

### Project setup
- `npm install`

Es necesario crear y cargar la base de datos, para lo cual usamos el ORM `sequelize`,en la carpeta */config* encontrara el archivo `config.json`, en el objeto deployment cambie los valores para conectar con la bd en postgres, luego realizar los siguientes comandos: 

- **Crear BD** \
`npx sequelize-cli db:create`
- **Migrar tablas** \
`npx sequelize-cli db:migrate`
- **Cargar registros preestablecidos** \
`npx sequelize-cli db:seed:all`

Despues de haber configurado todo, realizar el siguiente comando para desplegar el proyecto en `localhost:3000`:
- `npm start`
