module.exports = (req, res, next) => {
    if (!req.session.user_id) {
        res.json({
            session: false,
            msj: 'Inicie sesion antes'
        })
    } else {
        next();
    }
}