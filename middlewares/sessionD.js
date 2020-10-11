//AUTENTICACIO PARA INGRESAR A RUTAS
module.exports = (req, res, next) => {
    try {
        if (!req.header.token) {
            res.json({
                session: false,
                msj: 'Inicie sesion antes'
            })
        } else {
            if (req.header.user.tipo == 'D') {
                next();
            } else {
                res.json({ auth: false, msj: 'No autorizado' });
            }
        }
    } catch (err) {
        console.log(err)
    }
}