const isLogin = (req, res, next) => {
    // console.log(req.session)
    if(!req.session || !req.session.user || !req.session.user.id){ //sebelumnya salah kondisi
        const error = 'Please Login First'
        res.redirect(`/login?error=${error}`)
    } else{
        next() //kalo ngga ada next() bakal loading di browser, karena ngga bisa lanjut
    }
};

const isAdmin = (req, res, next) => {
    if(req.session.user.role !== 'admin'){ //sebelumnya salah kondisi
        const error = 'You have no access'
        res.redirect(`/login?error=${error}`)
    } else{
        next() //kalo ngga ada next() bakal loading di browser, karena ngga bisa lanjut
    }
}

const isSeller = (req, res, next) => {
    if(req.session.user.role !== 'seller'){ //sebelumnya salah kondisi
        const error = 'You have no access, please use your seller account'
        res.redirect(`/login?error=${error}`)
    } else{
        next() //kalo ngga ada next() bakal loading di browser, karena ngga bisa lanjut
    }
}


module.exports = {isAdmin, isLogin, isSeller}