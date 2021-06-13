import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class ScheduleCategory {
  readonly id: string;
  readonly name?: string;
  readonly Schedules?: (Schedule | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ScheduleCategory>);
  static copyOf(source: ScheduleCategory, mutator: (draft: MutableModel<ScheduleCategory>) => MutableModel<ScheduleCategory> | void): ScheduleCategory;
}

export declare class Schedule {
  readonly id: string;
  readonly start?: string;
  readonly end?: string;
  readonly data?: string;
  readonly schedulecategoryID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Schedule>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule>) => MutableModel<Schedule> | void): Schedule;
}

export declare class UserRelationship {
  readonly id: string;
  readonly User?: User;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserRelationship>);
  static copyOf(source: UserRelationship, mutator: (draft: MutableModel<UserRelationship>) => MutableModel<UserRelationship> | void): UserRelationship;
}

export declare class User {
  readonly id: string;
  readonly usertypeID?: string;
  readonly customers?: (CustomerUser | null)[];
  readonly ChildUser?: (UserRelationship | null)[];
  readonly Profile?: Profile;
  readonly UserRelationships?: (UserRelationship | null)[];
  readonly Icon?: S3Object;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class CustomerUser {
  readonly id: string;
  readonly customer: Customer;
  readonly user: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CustomerUser>);
  static copyOf(source: CustomerUser, mutator: (draft: MutableModel<CustomerUser>) => MutableModel<CustomerUser> | void): CustomerUser;
}

export declare class Customer {
  readonly id: string;
  readonly lastName?: string;
  readonly firstName?: string;
  readonly Conversation?: Conversation;
  readonly Timelines?: (Timeline | null)[];
  readonly Memos?: (Memo | null)[];
  readonly CustomerCustomerLabels?: (CustomerCustomerLabel | null)[];
  readonly lastNameKanji?: string;
  readonly firstNameKanji?: string;
  readonly lineID?: string;
  readonly gender?: string;
  readonly birthday?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly S3Objects?: (S3Object | null)[];
  readonly Officers?: (CustomerUser | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Customer>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}

export declare class Conversation {
  readonly id: string;
  readonly Comments?: (Comment | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Conversation>);
  static copyOf(source: Conversation, mutator: (draft: MutableModel<Conversation>) => MutableModel<Conversation> | void): Conversation;
}

export declare class Comment {
  readonly id: string;
  readonly comment?: string;
  readonly conversationID?: string;
  readonly S3Objects?: (S3Object | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

export declare class S3Object {
  readonly id: string;
  readonly bucket?: string;
  readonly region?: string;
  readonly key?: string;
  readonly customerID?: string;
  readonly commentID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<S3Object>);
  static copyOf(source: S3Object, mutator: (draft: MutableModel<S3Object>) => MutableModel<S3Object> | void): S3Object;
}

export declare class Timeline {
  readonly id: string;
  readonly title?: string;
  readonly customerID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Timeline>);
  static copyOf(source: Timeline, mutator: (draft: MutableModel<Timeline>) => MutableModel<Timeline> | void): Timeline;
}

export declare class Memo {
  readonly id: string;
  readonly memo?: string;
  readonly customerID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Memo>);
  static copyOf(source: Memo, mutator: (draft: MutableModel<Memo>) => MutableModel<Memo> | void): Memo;
}

export declare class CustomerCustomerLabel {
  readonly id: string;
  readonly customer: Customer;
  readonly customerlabel: CustomerLabel;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CustomerCustomerLabel>);
  static copyOf(source: CustomerCustomerLabel, mutator: (draft: MutableModel<CustomerCustomerLabel>) => MutableModel<CustomerCustomerLabel> | void): CustomerCustomerLabel;
}

export declare class CustomerLabel {
  readonly id: string;
  readonly name?: string;
  readonly customers?: (CustomerCustomerLabel | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CustomerLabel>);
  static copyOf(source: CustomerLabel, mutator: (draft: MutableModel<CustomerLabel>) => MutableModel<CustomerLabel> | void): CustomerLabel;
}

export declare class Profile {
  readonly id: string;
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Profile>);
  static copyOf(source: Profile, mutator: (draft: MutableModel<Profile>) => MutableModel<Profile> | void): Profile;
}

export declare class CustomerStatus {
  readonly id: string;
  readonly name?: string;
  readonly color?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CustomerStatus>);
  static copyOf(source: CustomerStatus, mutator: (draft: MutableModel<CustomerStatus>) => MutableModel<CustomerStatus> | void): CustomerStatus;
}

export declare class UserType {
  readonly id: string;
  readonly name?: string;
  readonly Users?: (User | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserType>);
  static copyOf(source: UserType, mutator: (draft: MutableModel<UserType>) => MutableModel<UserType> | void): UserType;
}