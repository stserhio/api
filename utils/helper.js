const BlackList = require("../models").BlackList;

module.exports.BanToken = (obj) => {

    const { userId, tokenId, exp } = obj;

    if (!userId || !tokenId || !exp) throw new Error('Obj не содержит необходимых свойств');
    
    return BlackList.create({id: tokenId, userId, timeLive: exp});
}