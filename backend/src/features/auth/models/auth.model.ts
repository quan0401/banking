import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { DataTypes, Optional, ModelDefined, CreateOptions, Model, FindAttributeOptions } from 'sequelize';
import { compare, hash } from 'bcryptjs';
import { sequelize } from '~/database';
import { v4 as uuidv4 } from 'uuid';
import { TransactionModel } from '~transaction/models/transaction.model';

const SALT_ROUND = 10;
interface AuthModelInstanceMethods extends Model {
  prototype: {
    comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
  };
}

type AuthCreationAttributes = Optional<IAuthDocument, 'id' | 'createdAt' | 'password' | 'passwordResetToken' | 'passwordResetExpires'>;

export const AuthModel: ModelDefined<IAuthDocument, AuthCreationAttributes> & AuthModelInstanceMethods = sequelize.define(
  'auths',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4()
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    profilePublicId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cccd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    homeAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  },
  {
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ['isAdmin']
      }
    },
    scopes: {
      withAdmin: {
        attributes: {} as FindAttributeOptions
      }
    },
    indexes: [
      {
        unique: false,
        fields: ['username']
      },
      {
        unique: true,
        fields: ['phone']
      },
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: true,
        fields: ['emailVerificationToken']
      }
    ]
  }
) as ModelDefined<IAuthDocument, AuthCreationAttributes> & AuthModelInstanceMethods;

// Step 1: Define associations (if not already done)
AuthModel.hasMany(TransactionModel, { foreignKey: 'userId' });
TransactionModel.belongsTo(AuthModel, { foreignKey: 'userId' });

AuthModel.addHook('beforeCreate', async (auth: Model, options: CreateOptions) => {
  const hashedPassword = await hash(auth.dataValues.password, SALT_ROUND);
  auth.dataValues.password = hashedPassword;
});

AuthModel.prototype.comparePassword = async function (password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
};

AuthModel.prototype.hashPassword = async function (password: string): Promise<string> {
  return Promise.resolve(hash(password, SALT_ROUND));
};

AuthModel.sync({
  // force: true
  // alter: true
})
  .then(() => {
    // console.log('AuthModel synced');
  })
  .catch((err) => {
    console.error('AuthModel sync error: ', err);
  });
