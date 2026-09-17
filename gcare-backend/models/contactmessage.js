// module.exports = (sequelize, DataTypes) => {
//   const ContactMessage = sequelize.define(
//     "ContactMessage",
//     {
//       fullName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       mobile: {
//         type: DataTypes.STRING(10),
//         allowNull: false
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       address: {
//         type: DataTypes.TEXT,
//         allowNull: false
//       },
//       city: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       message: {
//         type: DataTypes.TEXT,
//         allowNull: false
//       }
//     },
//     {
//       tableName: "contact_messages",
//       timestamps: true,
//       freezeTableName: true
//     }
//   );

//   return ContactMessage;
// };




module.exports = (sequelize, DataTypes) => {
  const ContactMessage = sequelize.define(
    "ContactMessage",
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      // course: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      // enquiryType: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // }
    },
    {
      tableName: "contact_messages",
      timestamps: true,
      freezeTableName: true
    }
  );

  return ContactMessage;
};