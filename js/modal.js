Modal = {
	Show: function(title, content, button, alert){
		var alertId = Math.round(Math.random()*10000);
		html = '';
		html += '<div class="Modal alert alert'+alertId+'">';
		if(alert !== undefined){ 
		html += '	<div class="ModalBox ModalBoxSmall alert">';
		}else{
		html += '	<div class="ModalBox">';
		}
		if(button == undefined || button !== false){
		html += '			<button class="ModalExit" onclick="Modal.Hide('+alertId+')"><i class="fas fa-times"></i></button>';
		}
		html += '		<div class="ModalTitle">'+title+'</div>';
		html += '		<div class="ModalContent">'+content+'</div>';
		html += '	</div>';
		html += '</div>';
		$('body').append(html).css('overflow-y', 'hidden');

		var modal = $('.Modal.alert'+alertId),
			box = modal.find('.ModalBox');
		if(box.innerHeight() <= modal.height() && $(window).width() > 870){
			var top = ($(window).height() / 2) - (box.innerHeight() / 2) - ((modal.innerHeight() - modal.height()) / 2);
			box.css('top', top);
		}else{
			box.css('top', '0');
		}
		setTimeout(function(){ modal.addClass('active'); }, 10);
	},

	Target: function(selector){
		var modal = $('.Modal'+selector),
			box = modal.find('.ModalBox'),
			exist = $('.Modal.active').length;
		if(modal.length){
			$('.Modal').not(modal).removeClass('active');
			if(box.innerHeight() <= modal.height() && $(window).width() > 870){
				var top = ($(window).height() / 2) - (box.innerHeight() / 2) - ((modal.innerHeight() - modal.height()) / 2);
				box.css('top', top);
			}else{
				box.css('top', '0');
			}
			if(exist > 0){ setTimeout(function(){ modal.addClass('active'); }, 200); }else{ modal.addClass('active'); }
			$('body').css('overflow-y','hidden');
			setTimeout(function(){ $('.GHmodalRemove').removeClass('active'); }, 500);
		}
	},

	Hide: function(alertId){
		if(alertId == undefined){
			$('.Modal:not(.alert)').removeClass('active');
			setTimeout(function(){ $('body').css('overflow-y','auto'); }, 200);
		}else{
			$('.Modal.alert'+alertId).removeClass('active');
			setTimeout(function(){ $('body').css('overflow-y','auto'); }, 200);
		}
	},

	Confirm: function(func, vars){
		var alertId = Math.round(Math.random()*10000);
		html = '';
		html += '<div class="Modal alert'+alertId+'" id="alert">';
		html += '	<div class="ModalBox ModalBoxSmall">';
		html += '		<div class="ModalTitle">Tem certeza de que quer comprar este produto?</div>';
		html += '		<div class="ModalContent">';
		html += '			<center>';
		html += '				<button onclick="Modal.AlertRemove(\'all\', false); '+func+'">SIM</button>';
		html += '				<button onclick="Modal.AlertRemove('+alertId+', false);">NÃO</button>';
		html += '			</center>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		$('body').append(html).css('overflow-y', 'hidden');

		var modal = $('.Modal.alert'+alertId),
			box = modal.find('.ModalBox');
		if(box.innerHeight() <= modal.height() && $(window).width() > 870){
			var top = ($(window).height() / 2) - (box.innerHeight() / 2) - ((modal.innerHeight() - modal.height()) / 2);
			box.css('top', top);
		}else{
			box.css('top', '0');
		}
		setTimeout(function(){ modal.addClass('active'); }, 200);
		setTimeout(function(){ $('.GHmodalRemove').removeClass('active'); }, 500);
	},

	AlertRemove: function(a, b){
		if(a == 'all'){ $('.Modal').removeClass('active'); }else{ $('#alert.alert'+a).removeClass('active'); }
		if(b !== undefined){ $('body').css('overflow-y', 'auto'); }
	}
}