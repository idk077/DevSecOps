const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/utilidad/ping', (req, res) => {
    // SOURCE: La entrada no confiable entra a través del parámetro de consulta (query)
    const ipAddress = req.query.ip;
    
    if (!ipAddress) {
        return res.status(400).send("Proporciona una IP.");
    }

    // VULNERABILIDAD CRÍTICA: Concatenación directa sin sanitización
    const comando = "ping -c 2 " + ipAddress;

    // SINK: El comando se ejecuta directamente en el sistema operativo
    exec(comando, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`<pre>Error ejecutando ping:\n${stderr}</pre>`);
        }
        res.send(`<pre>Resultados:\n${stdout}</pre>`);
    });
});

app.listen(3000, () => {
    console.log('Laboratorio vulnerable ejecutándose en el puerto 3000');
});
