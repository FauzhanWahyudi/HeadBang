const QRCode = require('qrcode')

const generateQR = async text => {
    try {
      let qr = await QRCode.toString(text)      
      return qr;
    } catch (err) {
      console.error(err)
    }
  }

module.exports = generateQR