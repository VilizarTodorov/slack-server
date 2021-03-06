import { requireAuth } from "../session/permissions";

export default {
  Message: {
    user: ({ userId }, args, { models }) => models.user.findOne({ where: { id: userId } }, { raw: true }),
  },
  Query: {
    messages: requireAuth.createResolver(async (parent, { channelId }, { models, user }, info) => {
      const res = await models.message.findAll({ where: { channelId } }, { raw: true });
      return res;
    }),
  },
  Mutation: {
    createMessage: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      try {
        await models.message.create({ ...args, userId: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }),
  },
};
