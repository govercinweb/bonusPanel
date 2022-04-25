"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserType = exports.UserStatus = exports.MessageStatus = exports.BonusStatus = exports.BonusRequestStatus = exports.BlockedUserStatus = void 0;
const UserType = {
  ADMIN: 10,
  EDITOR: 20
};
exports.UserType = UserType;
const UserStatus = {
  ACTIVE: 10,
  DEACTIVE: 20
};
exports.UserStatus = UserStatus;
const BonusRequestStatus = {
  WAITING: 10,
  ACCEPTED: 20,
  REJECTED: 30,
  OTHER: 40
};
exports.BonusRequestStatus = BonusRequestStatus;
const BlockedUserStatus = {
  ACTIVE: 10,
  DEACTIVE: 20
};
exports.BlockedUserStatus = BlockedUserStatus;
const MessageStatus = {
  ACTIVE: 10,
  DEACTIVE: 20
};
exports.MessageStatus = MessageStatus;
const BonusStatus = {
  ACTIVE: 10,
  DEACTIVE: 20
};
exports.BonusStatus = BonusStatus;