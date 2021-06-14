// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Invoice, ScheduleCategory, Schedule, UserRelationship, User, CustomerUser, Customer, Conversation, Comment, S3Object, Timeline, Memo, CustomerCustomerLabel, CustomerLabel, Profile, CustomerStatus, UserType } = initSchema(schema);

export {
  Invoice,
  ScheduleCategory,
  Schedule,
  UserRelationship,
  User,
  CustomerUser,
  Customer,
  Conversation,
  Comment,
  S3Object,
  Timeline,
  Memo,
  CustomerCustomerLabel,
  CustomerLabel,
  Profile,
  CustomerStatus,
  UserType
};