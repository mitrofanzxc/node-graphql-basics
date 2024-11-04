export const enum NameType {
  MEMBER_TYPE_ID = 'MemberTypeId',
  MEMBER_TYPE = 'MemberType',
  POST = 'Post',
  PROFILE = 'Profile',
  QUERY = 'Query',
  MUTATION = 'Mutation',
  USER = 'User',
  UUID = 'UUID',
  CREATE_POST_INPUT = 'CreatePostInput',
  CHANGE_POST_INPUT = 'ChangePostInput',
  CREATE_PROFILE_INPUT = 'CreateProfileInput',
  CHANGE_PROFILE_INPUT = 'ChangeProfileInput',
  CREATE_USER_INPUT = 'CreateUserInput',
  CHANGE_USER_INPUT = 'ChangeUserInput',
}

export const enum Message {
  POST_DELETE_SUCCESS = 'Post deleted successfully',
  PROFILE_DELETE_SUCCESS = 'Profile deleted successfully',
  PROFILE_DELETE_FAIL = "Could not delete profile, possibly it doesn't exist.",
  POST_DELETE_FAIL = "Could not delete post, possibly it doesn't exist.",
  USER_DELETE_FAIL = "Could not delete user, possibly it doesn't exist",
  SUBSCRIBE_SUCCESS = 'Subscribed successfully',
  SUBSCRIBE_FAIL = 'Could not subscribe',
  UNSUBSCRIBE_SUCCESS = 'Unsubscribed successfully',
  USER_DELETE_SUCCESS = 'User deleted successfully',
}
