module.exports = {
    isSameType: function (value1, value2) {
        var v1t = 'string'
        if (parseInt(value1) == value1) {
            v1t = 'number'
        }
        var v2t = 'string'
        if (parseInt(value2) == value2) {
            v2t = 'number'
        }
        if (v1t == v2t) { return v1t }
        return 'string'
    },
    isVar: function (value) {
        if (value.startsWith('"') && value.endsWith('"')) {
            return false
        }
        return true
    },
};