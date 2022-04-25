"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../utils/db"));

var _constants = require("../constants/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const selectBonusSql = `select *, bonus_status as bonus_status_id,
       coalesce((select count(*) from bonus_requests where request_status = $1 and bonus_id = bonuses.id group by bonus_id),0) as approval_count,
        (select status_name as bonus_status from bonus_status where status_id = bonuses.bonus_status) from bonuses`;

const addBonus = async (text, content, status) => {
  await _db.default.executeQuery('insert into bonuses (bonus_text,bonus_content,bonus_status) VALUES ($1,$2,$3)', [text, content, status]);
};

const updateBonus = async (id, text, content, status) => {
  await _db.default.executeQuery('update bonuses set bonus_text = $1, bonus_content = $2, bonus_status = $3 where id = $4', [text, content, status, id]);
};

const getList = async () => {
  const {
    rows
  } = await _db.default.executeQuery(`${selectBonusSql}`, [_constants.BonusRequestStatus.ACCEPTED]);
  return rows;
};

const getActiveList = async () => {
  const {
    rows
  } = await _db.default.executeQuery(`select id, bonus_text, bonus_content from bonuses where bonus_status = $1`, [_constants.BonusStatus.ACTIVE]);
  return rows;
};

const getBonusById = async id => {
  const {
    rows: [result]
  } = await _db.default.executeQuery(`${selectBonusSql} where id = $2`, [_constants.BonusRequestStatus.ACCEPTED, id]);
  return result;
};

const getBonusPermissionsByUserId = async userId => {
  const {
    rows
  } = await _db.default.executeQuery('select bonus_id as id from user_bonus_permissions where user_id = $1', [userId]);
  return rows.map(e => e.id);
};

const Bonus = {
  addBonus,
  updateBonus,
  getList,
  getActiveList,
  getBonusById,
  getBonusPermissionsByUserId
};
var _default = Bonus;
exports.default = _default;