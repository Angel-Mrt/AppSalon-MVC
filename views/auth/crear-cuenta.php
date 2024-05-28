<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente Formulario para Crear una Cuenta </p>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<form action="/crear-cuenta" class="formulario" method="POST">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="<?php echo s($usuario->nombre); ?>" placeholder="Tu Nombre">
    </div>
    <div class="campo">
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" value="<?php echo s($usuario->apellido); ?>" placeholder="Tu Apellido">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" value="<?php echo s($usuario->telefono); ?>" placeholder="Tu Teléfono">
    </div>
    <div class="campo">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="<?php echo s($usuario->email); ?>" placeholder="Tu Email">
    </div>
    <div class="campo">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Tu Password">
        <img src="build/img/esconderPass.png" id="esconder-pass" onclick="verPass()">
    </div>

    <input type="submit" value="Crear Cuenta" class=" boton">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una Cuenta? Inicia Sesión</a>
    <a href="/olvide">¿Olvidaste Tu Password?</a>
</div>
<?php
$script = "<script src= 'build/js/verPass.js'></script>"
?>