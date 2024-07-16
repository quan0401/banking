import { omit } from 'lodash';
import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize
import { sequelize } from '~/database';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';

class AuthService {
  public async createNewUser(data: IAuthDocument): Promise<IAuthDocument> {
    const createdUser: Model<IAuthDocument> = (await AuthModel.create(data)) as Model<IAuthDocument>; // No need to cast to Model<IAuthDocument>

    const result: IAuthDocument = omit(createdUser.toJSON(), ['password']); // Use toJSON() to convert Sequelize model instance to plain JSON object
    return result;
  }

  public async updateAuthInfo(authId: Required<IAuthDocument>['id'], data: Partial<IAuthDocument>): Promise<IAuthDocument | undefined> {
    const user: Model | null = await AuthModel.findOne({
      where: {
        id: authId
      }
    });
    if (user) {
      await user.update(data);
      await user.save();
    }
    return user?.dataValues;
  }

  public async findUserById(id: string): Promise<IAuthDocument | undefined> {
    // const user: Model | null = await AuthModel.scope('withAdmin').findOne({
    const user: Model | null = await AuthModel.scope('withAdmin').findByPk(id);
    return user?.dataValues;
  }

  public async findUserByEmailOrPhone(phone: string, email: string): Promise<IAuthDocument | undefined> {
    // const user: Model | null = await AuthModel.scope('withAdmin').findOne({
    const user: Model | null = await AuthModel.scope('withAdmin').findOne({
      where: {
        [Op.or]: [{ email: email ? email : '' }, { phone: phone ? phone : '' }]
      }
    });
    return user?.dataValues;
  }

  public async findUserByEmailToken(token: string): Promise<IAuthDocument | undefined> {
    const user: Model | null = await AuthModel.findOne({
      where: {
        emailVerificationToken: token
      }
    });
    return user?.dataValues;
  }

  async updatePasswordToken(authId: string, passwordResetToken: string, passwordResetExpires: Date): Promise<void> {
    await AuthModel.update(
      {
        passwordResetToken,
        passwordResetExpires
      },
      {
        where: {
          id: authId
        }
      }
    );
  }

  async getAuthUserByPasswordToken(passwordResetToken: string): Promise<IAuthDocument | undefined> {
    const result: Model<IAuthDocument> = (await AuthModel.findOne({
      where: {
        [Op.and]: [
          { passwordResetToken },
          {
            passwordResetExpires: { [Op.gt]: new Date() }
          }
        ]
      },
      attributes: {
        exclude: ['password']
      }
    })) as Model<IAuthDocument>;
    return result?.dataValues;
  }

  public async updatePassword(authId: Required<IAuthDocument>['id'], password: string): Promise<void> {
    const result = await AuthModel.update(
      {
        password: await AuthModel.prototype.hashPassword(password),
        passwordResetToken: '',
        passwordResetExpires: new Date()
      },
      { where: { id: authId } }
    );
  }

  public async updateVerifyEmail(authId: Required<IAuthDocument>['id'], isVerified: 0 | 1): Promise<IAuthDocument | undefined> {
    const user: Model | null = await AuthModel.findOne({
      where: {
        id: authId
      }
    });
    if (user) {
      await user.update({ emailVerified: isVerified });
      await user.save();
    }
    return user?.dataValues;
  }

  public async isAdmin(authId: Required<IAuthDocument>['id']): Promise<boolean> {
    const user: Model | null = await AuthModel.scope('withAdmin').findOne({
      where: {
        id: authId
      }
    });
    return user?.dataValues.isAdmin === 1;
  }

  // public async getUsersPagination(limit: number, offset: number): Promise<IAuthDocument[]> {
  //   const usersWithTransactions = await AuthModel.findAll({
  //     attributes: [
  //       'id',
  //       'username',
  //       'email',
  //       [Sequelize.fn('COUNT', Sequelize.col('transactions.id')), 'transactionCount'],
  //       [Sequelize.literal(`SUM(CASE WHEN transactions.transactionType = 1 THEN transactions.amount ELSE 0 END)`), 'totalTopUpAmount'],
  //       [Sequelize.literal(`SUM(CASE WHEN transactions.transactionType = -1 THEN transactions.amount ELSE 0 END)`), 'totalWithdrawalAmount']
  //     ],
  //     include: [
  //       {
  //         model: TransactionModel,
  //         as: 'transactions',
  //         attributes: [] // Do not include any attributes from the transactions table in the final output
  //       }
  //     ],
  //     group: ['auths.id'], // Grouping by AuthModel entries
  //     order: [
  //       ['totalTopUpAmount', 'DESC'] // Ordering AuthModel entries
  //     ],
  //     limit,
  //     offset
  //   });
  //   const result = usersWithTransactions.map((user: Model) => user.toJSON());

  //   return result;
  // }

  public async getUsersPagination(
    limit: number,
    offset: number
  ): Promise<{
    total: number;
    users: IAuthDocument[];
  }> {
    const query = `
    SELECT
      auths.id,
      auths.username,
      auths.email,
      COUNT(transactions.id) AS transactionCount,
      SUM(CASE WHEN transactions.transactionType = 1 THEN transactions.amount ELSE 0 END) AS totalTopUpAmount,
      SUM(CASE WHEN transactions.transactionType = -1 THEN transactions.amount ELSE 0 END) AS totalWithdrawalAmount
    FROM
      auths
    LEFT JOIN
      transactions ON auths.id = transactions.userId
    GROUP BY
      auths.id, auths.username, auths.email
    ORDER BY
      totalTopUpAmount DESC
    LIMIT
      :limit OFFSET :offset;
  `;

    const usersWithTransactions = await sequelize.query(query, {
      replacements: { limit, offset },
      model: AuthModel,
      mapToModel: true // Maps the results to models. Ensure this matches your actual model and query structure.
    });
    const total = await AuthModel.count();
    const users = usersWithTransactions.map((user: Model) => user.toJSON());

    return {
      total,
      users
    };
  }
}
export const authService: AuthService = new AuthService();
