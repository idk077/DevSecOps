const { exec } = require('child_process');
const usuario = req.query.username;

// Vulnerabilidad: El atacante puede encadenar comandos de la terminal
// Un atacante puede enviar: ?username=admin; cat /etc/passwd
exec("echo Usuario conectado: " + usuario, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error de ejecución: ${error}`);
        return;
    }
    console.log(stdout);
});
