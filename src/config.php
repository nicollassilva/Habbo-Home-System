<?php

    define('N', 'localhost');
    define('I', 'root');
    define('C', '');
    define('K', 'homesystem');
    try {

        $pdo = new PDO('mysql:host='.N.';charset=utf8;dbname='.K, I, C);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    } catch(PDOException $e) {
        echo "Erro ao conectar com o banco de dados: ".$e->getMessage();
        exit();
    }
?>