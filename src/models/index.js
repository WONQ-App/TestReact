// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ScheduleCategory, Schedule, UserRelationship, User, CustomerUser, Customer, Conversation, Comment, S3Object, Timeline, Memo, CustomerCustomerLabel, CustomerLabel, Profile, CustomerStatus, UserType } = initSchema(schema);

export {
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