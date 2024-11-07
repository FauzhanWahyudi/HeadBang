const toIDR = (salary) => {
    let IDR = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    return IDR.format(salary)
};

module.exports = toIDR;