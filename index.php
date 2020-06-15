<?php
    require_once "src/config.php";
    $edit = false;
    isset($_GET['startSession']) && $_GET['startSession'] == 1 ? $edit = true : $edit = false;
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Habbo Home System</title>
    <link rel="stylesheet" href="css/modal.css">
    <link rel="stylesheet" href="css/default.css?t=<?= time() ?>">
</head>
<body>
    <div class="container">
        <div class="box-top">
            <div class="name">
                iNicollas
            </div>
            <div class="buttons">
                <?php if($edit) { ?>
                <button class="save" onclick="Home.toSave()"><i class="save"></i>Salvar</button>
                <a href="/">
                <button class="cancel"><i class="cancel"></i>Cancelar</button>
                </a>
                <button class="inventory" onclick="Modal.Target('#Inventory')"><i class="inventory"></i>Inventário</button>
                <?php } else { ?>
                <a href="?startSession=1">
                <button class="edit"><i class="edit"></i>Editar</button>
                </a>
                <?php } ?>
            </div>
        </div>
        <div class="draggable stickie n_skin_goldenskin-c" style="left: 57px; top: 229px;" id="stickie-36267">
	<div class="n_skin_metalskin">
		<div class="stickie-header">
			<h3>
			
<img src="https://cdn.classichabbo.com/web-gallery/images/myhabbo/icon_edit.gif" width="19" height="18" class="edit-button" id="stickie-36267-edit">

			</h3>
			<div class="clear"></div>
		</div>
		<div class="stickie-body">
			<div class="stickie-content">
				<div class="stickie-markup">Welcome to a brand new Habbo Home page!<br>This is the place where you can express yourself with a wild and unique variety of stickers, hoot yo<br>trap off with colourful notes and showcase your Habbo rooms! To<br>start editing just click the edit button.<br></div>
				<div class="stickie-footer">
				</div>
			</div>
		</div>
    </div>
</div>
    </div>
    <div class="iNicollasoffset"></div>
    <script src="js/jquery.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/modal.js"></script>
    <script src="js/default.js?t=<?= time() ?>"></script>
    <?php if($edit) { ?> <script>Home.draggable(); Home.methodzIndex();</script><?php } ?>
</body>
</html>

<?php if($edit) { ?>
<div class="Modal" id="Inventory">
	<div class="ModalBox">
		<button class="ModalExit" onclick="Modal.Hide()"><i class="fas fa-times"></i></button>
		<div class="ModalTitle">INVENTÁRIO HOME</div>
        <div class="menu">
            <button class="inventory active" onclick="Home.setContent(1)">Inventário</button>
            <button class="shop" onclick="Home.setContent(2)">Catálogo</button>
        </div>
        <div class="content">
            <div class="categories">
                <div class="title">
                    Categorias:
                </div>
                <?php
                    $c = $pdo->query("SELECT * FROM widgets_cat ORDER BY id ASC")->fetchAll(PDO::FETCH_ASSOC);
                    foreach($c as $category):
                ?>
                <div onclick="Home.ajaxInventory(<?= $category['id'] ?>);Home.setActive(this)" class="category"><?= $category['name'] ?></div>
                <?php endforeach; ?>
            </div>
            <div class="items">
                <div class="title">Selecione um item clicando sobre ele</div>
                <div class="welcome">
                    
                </div>
            </div>
            <div class="box-market">
                <div class="box-preview">
                    <div class="img-preview">
                        <p class="preview">Demonstração</p>
                    </div>
                </div>
                <div class="price">
                    
                </div>
            </div>
        </div>
	</div>
</div>
<?php } ?>