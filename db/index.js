const Sequelize = require("sequelize");
require("dotenv").config();
const { UUID, UUIDV4, STRING, INTEGER, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL);
//postgres://database-name
//postgres://rwadtudswxxriu:34e9501d167c77bcba4e3bca63a5a1885f7331b5cc35f8b0f8c32241eb307083@ec2-52-4-87-74.compute-1.amazonaws.com:5432/d1506j8lcvq4j4


//add .env to .gitignore
//const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/vercel-demo-db')
//doesn't work on deployment because this is only locally connecting


const Patient = conn.define("patient", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  age: {
    type: INTEGER,
  },
  HPI: {
    type: TEXT,
  },
  hx: {
    type: TEXT,
  },
});

const Provider = conn.define("provider", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  specialty: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  about: {
    type: TEXT,
  },
});

module.exports = {
  conn,
  Patient,
  Provider,
};
