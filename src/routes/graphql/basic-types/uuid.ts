import { GraphQLScalarType, Kind } from 'graphql';
import { Message, NameType } from '../constants.js';

const isUUID = (value: unknown): value is string =>
  typeof value === 'string' &&
  new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$').test(
    value,
  );

export const UUIDType = new GraphQLScalarType({
  name: NameType.UUID,
  serialize(value) {
    if (!isUUID(value)) {
      throw new TypeError(Message.INVALID_UUID);
    }

    return value;
  },
  parseValue(value) {
    if (!isUUID(value)) {
      throw new TypeError(Message.INVALID_UUID);
    }

    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (isUUID(ast.value)) {
        return ast.value;
      }
    }

    return undefined;
  },
});
