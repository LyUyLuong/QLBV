const Sequelize = require("../config/database");
const { Op } = require('sequelize');


module.exports = (query) => {
  let objectSearch = {
    keyword: "",
    valueSelected:""
  }

  if (query.keyword && query.valueSelected) {
    objectSearch.keyword = query.keyword.toLowerCase();
    objectSearch.valueSelected = query.valueSelected;

    objectSearch[Op.or] = [
      Sequelize.where(Sequelize.fn('LOWER', Sequelize.col(`${objectSearch.valueSelected}`)), 'LIKE', `%${objectSearch.keyword}%`)
    ];
  }

  return objectSearch;
}