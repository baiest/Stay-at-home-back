module.exports = (req, res, next) => {
    console.log(req.header.token)
    if (!req.header.token) {
        res.json({
            session: false,
            msj: 'Inicie sesion antes'
        })
    } else {
        next();
    }
}