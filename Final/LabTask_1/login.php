<?php
session_start();

// config
$validEmail = "admin@example.com";
$hashedPassword = password_hash("123456", PASSWORD_DEFAULT);

$error = "";

// login
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    if ($email === "" || $password === "") {
        $error = "Email and password required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } elseif ($email !== $validEmail || !password_verify($password, $hashedPassword)) {
        $error = "Wrong email or password.";
    } else {
        session_regenerate_id(true);
        $_SESSION["user"] = $email;
        header("Location: login.php");
        exit;
    }
}

// logout
if (isset($_GET["logout"])) {
    session_destroy();
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forest Login</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>

<div class="background-image"></div>

<?php if (isset($_SESSION["user"])): ?>

    <div class="login-wrapper">
        <h2>Welcome</h2>
        <p><?= htmlspecialchars($_SESSION["user"]) ?></p>
        <a href="?logout=1" class="login-button">Logout</a>
    </div>

<?php else: ?>

<div class="login-wrapper">
    <form class="login-form" method="POST" action="login.php">

        <div class="header-section">
            <h2>Login</h2>
        </div>

        <div class="input-group">
            <input type="email" id="email" name="email" required>
            <label for="email">Email</label>
        </div>

        <div class="input-group">
            <input type="password" id="password" name="password" required>
            <label for="password">Password</label>
        </div>

        <?php if ($error): ?>
            <p class="error"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>

        <button type="submit" class="login-button">Login</button>

    </form>
</div>

<?php endif; ?>

</body>
</html>