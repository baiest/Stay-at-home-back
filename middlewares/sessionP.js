//AUTENTICACIO PARA INGRESAR A RUTAS
module.exports = (req, res, next, tipo) => {
    try {
        if (!req.header.token) {
            res.json({
                session: false,
                msj: 'Inicie sesion antes'
            })
        } else {
            if (req.header.user.tipo == 'P') {
                next();
            } else {
                res.json({ msj: 'No autorizado' });
            }
        }
    } catch (err) {
        console.log(err)
    }
}