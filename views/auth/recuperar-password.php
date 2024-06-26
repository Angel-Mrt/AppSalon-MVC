<h1 class="nombre-pagina">Reestablecer Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo password a continuacion</p>
<?php include_once __DIR__ . '/../templates/alertas.php'; ?>

<?php if ($error) return; ?>
<form method="POST" class="formulario">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Tu Password">
        <img src="build/img/esconderPass.png" alt="ver/ocultar Password" id="esconder-pass" onclick="verPass()">
    </div>
    <input type="submit" class="boton" value="Reestablecer Password">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes cuenta? Inicia Sesion</a>
    <a href="/crear-cuenta">¿Aun no tienes cuenta? Crea Una</a>
</div>

<?php
$script = "<script src= 'build/js/verPass.js'></script>"
?>