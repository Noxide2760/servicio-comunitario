const response = ({status = null, msg = null, data = null}) => {
    return {
        status: status,
        msg: msg,
        data: data,
    };
}

module.exports = response;