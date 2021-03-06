<div class="Box">
	<a href="<?= e(url('reset_screen')) ?>"><?= tr('term.reset_screen') ?></a>
</div>

<!-- Theme -->
<form class="Box mobcol str" action="<?= e(url('term_set')) ?>" method="GET" id='form-scheme'>
	<h2><?= tr('term.color_scheme') ?></h2>

	<div class="Row explain">
		<?= tr('term.explain_scheme') ?>
	</div>

	<div class="Row">
		<label for="theme"><?= tr("term.theme") ?></label>
		<select name="theme" id="theme">
			<option value="0">Tango</option>
			<option value="1">Linux (CGA)</option>
			<option value="2">XTerm</option>
			<option value="3">Rxvt</option>
			<option value="4">Ambience</option>
			<option value="5">Solarized Dark</option>
			<option value="11">Solarized Dark, high contrast</option>
			<option value="10">Solarized Light</option>
			<option value="6">CGA NTSC</option>
			<option value="7">ZX Spectrum</option>
			<option value="8">Apple II</option>
			<option value="9">Commodore</option>
		</select>
		<span onclick="TermConf.prevTheme()" class="mq-no-phone theme-nav-btn">◀</span>
		<span onclick="TermConf.nextTheme()" class="mq-no-phone theme-nav-btn">▶</span>
	</div>

	<div class="Row color-preview">
		<label><?= tr("term.color_bg_prev") ?></label>
		<div>
			<div class="colorprev bg">
				<span data-bg=0 data-fg=15>0</span><!--
				--><span data-bg=1 data-fg=15>1</span><!--
				--><span data-bg=2 data-fg=15>2</span><!--
				--><span data-bg=3 data-fg=0>3</span><!--
				--><span data-bg=4 data-fg=15>4</span><!--
				--><span data-bg=5 data-fg=15>5</span><!--
				--><span data-bg=6 data-fg=15>6</span><!--
				--><span data-bg=7 data-fg=0>7</span>
			</div>

			<div class="colorprev bg">
				<span data-bg=8 data-fg=15>8</span><!--
				--><span data-bg=9 data-fg=0>9</span><!--
				--><span data-bg=10 data-fg=0>10</span><!--
				--><span data-bg=11 data-fg=0>11</span><!--
				--><span data-bg=12 data-fg=0>12</span><!--
				--><span data-bg=13 data-fg=0>13</span><!--
				--><span data-bg=14 data-fg=0>14</span><!--
				--><span data-bg=15 data-fg=0>15</span>
			</div>
		</div>
	</div>

	<div class="Row color-preview">
		<label><?= tr("term.color_fg_prev") ?></label>
		<div>
			<div class="colorprev fg">
				<span data-fg=0>0</span><!--
				--><span data-fg=1>1</span><!--
				--><span data-fg=2>2</span><!--
				--><span data-fg=3>3</span><!--
				--><span data-fg=4>4</span><!--
				--><span data-fg=5>5</span><!--
				--><span data-fg=6>6</span><!--
				--><span data-fg=7>7</span>
			</div>

			<div class="colorprev fg">
				<span data-fg=8>8</span><!--
				--><span data-fg=9>9</span><!--
				--><span data-fg=10>10</span><!--
				--><span data-fg=11>11</span><!--
				--><span data-fg=12>12</span><!--
				--><span data-fg=13>13</span><!--
				--><span data-fg=14>14</span><!--
				--><span data-fg=15>15</span>
			</div>
		</div>
	</div>

	<div class="Row color-preview">
		<label><?= tr("term.colors_preview") ?></label>
		<div class="color-example" data-fg="" data-bg="">
			<?= tr("term.example") ?>
		</div>
	</div>

	<div class="Row color-preview">
		<label><?= tr("term.fgbg_presets") ?></label>
		<div id="fgbg_presets"></div>
	</div>

	<div class="Row">
		<div class="SubRow">
			<label for="default_fg"><?= tr("term.color_fg") ?></label>
			<input type="text" name="default_fg" id="default_fg" class="short" value="%default_fg%">
		</div>
		<div class="SubRow">
			<label for="default_bg"><?= tr("term.color_bg") ?></label>
			<input type="text" name="default_bg" id="default_bg" class="short" value="%default_bg%">
		</div>
	</div>

	<div class="Row">
		<label><?= tr("term.cursor_shape") ?></label>
		<select name="cursor_shape" id="cursor_shape">
			<option value="0"><?= tr("cursor.block_blink") ?></option>
			<option value="2"><?= tr("cursor.block_steady") ?></option>
			<option value="3"><?= tr("cursor.underline_blink") ?></option>
			<option value="4"><?= tr("cursor.underline_steady") ?></option>
			<option value="5"><?= tr("cursor.bar_blink") ?></option>
			<option value="6"><?= tr("cursor.bar_steady") ?></option>
		</select>
	</div>

	<div class="Row buttons">
		<a class="button icn-ok" href="#" onclick="qs('#form-scheme').submit()"><?= tr('apply') ?></a>
	</div>
</form>

<!-- Initials -->
<form class="Box mobcol str" action="<?= e(url('term_set')) ?>" method="GET" id='form-initial'>
	<h2><?= tr('term.defaults') ?></h2>

	<div class="Row explain">
		<?= tr('term.explain_initials') ?>
	</div>

	<div class="Row">
		<div class="SubRow">
			<label for="width"><?= tr('term.term_width') ?></label>
			<input type="number" step=1 min=1 max=255 name="width" id="width" value="%width%" required>
		</div>
		<div class="SubRow">
			<label for="height"><?= tr('term.term_height') ?></label>
			<input type="number" step=1 min=1 max=255 name="height" id="height" value="%height%" required>
		</div>
	</div>

	<div class="Row">
		<label for="title"><?= tr('term.term_title') ?></label>
		<input type="text" name="title" id="title" value="%h:title%" required>
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.show_buttons') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="show_buttons" name="show_buttons" value="%show_buttons%">
	</div>

	<div class="Row">
		<label for="button_count"><?= tr('term.button_count') ?></label>
		<input type="number" step=1 min=0 max=5 name="button_count" id="button_count" value="%h:button_count%" required>
	</div>

	<div class="Row">
		<label><?= tr("term.buttons") ?></label>
		<input class="tiny" type="text" name="btn1" id="btn1" value="%h:btn1%">
		<input class="tiny" type="text" name="btn2" id="btn2" value="%h:btn2%">
		<input class="tiny" type="text" name="btn3" id="btn3" value="%h:btn3%">
		<input class="tiny" type="text" name="btn4" id="btn4" value="%h:btn4%">
		<input class="tiny" type="text" name="btn5" id="btn5" value="%h:btn5%">
	</div>

	<div class="Row">
		<label><?= tr("term.button_msgs") ?></label>
		<input class="tiny" type="text" name="bm1" id="bm1" value="%h:bm1%">
		<input class="tiny" type="text" name="bm2" id="bm2" value="%h:bm2%">
		<input class="tiny" type="text" name="bm3" id="bm3" value="%h:bm3%">
		<input class="tiny" type="text" name="bm4" id="bm4" value="%h:bm4%">
		<input class="tiny" type="text" name="bm5" id="bm5" value="%h:bm5%">
	</div>

	<div class="Row">
		<label><?= tr("term.button_colors") ?></label>
		<input class="tiny" type="text" name="bc1" id="bc1" value="%h:bc1%">
		<input class="tiny" type="text" name="bc2" id="bc2" value="%h:bc2%">
		<input class="tiny" type="text" name="bc3" id="bc3" value="%h:bc3%">
		<input class="tiny" type="text" name="bc4" id="bc4" value="%h:bc4%">
		<input class="tiny" type="text" name="bc5" id="bc5" value="%h:bc5%">
	</div>

	<div class="Row">
		<label for="backdrop"><?= tr('term.backdrop') ?></label>
		<input type="text" name="backdrop" id="backdrop" value="%h:backdrop%" required>
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.crlf_mode') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="crlf_mode" name="crlf_mode" value="%crlf_mode%">
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.loopback') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="loopback" name="loopback" value="%loopback%">
	</div>

	<div class="Row buttons">
		<a class="button icn-ok" href="#" onclick="qs('#form-initial').submit()"><?= tr('apply') ?></a>
	</div>
</form>

<!-- UART -->
<form class="Box mobcol str" action="<?= e(url('term_set')) ?>" method="GET" id="form-uart">
	<h2 tabindex=0><?= tr('uart.title') ?></h2>

	<div class="Row explain">
		<?= tr('uart.explain') ?>
	</div>

	<div class="Row">
		<label for="uart_baudrate"><?= tr('uart.baud') ?><span class="mq-phone">&nbsp;(bps)</span></label>
		<select name="uart_baudrate" id="uart_baudrate" class="short">
			<?php
			foreach([
				300, 600, 1200, 2400, 4800, 9600, 19200, 38400,
				57600, 74880, 115200, 230400, 460800, 921600, 1843200, 3686400,
			] as $b):
				?><option value="<?=$b?>"><?= number_format($b, 0, ',', '.') ?></option>
			<?php endforeach; ?>
		</select>
		<span class="mq-no-phone">&nbsp;bps</span>
	</div>

	<div class="Row">
		<label for="uart_parity"><?= tr('uart.parity') ?></label>
		<select name="uart_parity" id="uart_parity" class="short">
			<?php
			foreach([
	           2 => tr('uart.parity.none'),
	           1 => tr('uart.parity.odd'),
	           0 => tr('uart.parity.even'),
	        ] as $k => $label):
				?><option value="<?=$k?>"><?=$label?></option>
			<?php endforeach; ?>
		</select>
	</div>

	<div class="Row">
		<label for="uart_stopbits"><?= tr('uart.stop_bits') ?></label>
		<select name="uart_stopbits" id="uart_stopbits" class="short">
			<?php
			foreach([
				1 => tr('uart.stop_bits.one'),
				2 => tr('uart.stop_bits.one_and_half'),
				3 => tr('uart.stop_bits.two'),
			] as $k => $label):
				?><option value="<?=$k?>"><?=$label?></option>
			<?php endforeach; ?>
		</select>
	</div>

	<div class="Row buttons">
		<a class="button icn-ok" href="#" onclick="qs('#form-uart').submit()"><?= tr('apply') ?></a>
	</div>
</form>

<!-- Expert terminal opts -->
<form class="Box mobcol str" action="<?= e(url('term_set')) ?>" method="GET" id='form-expert'>
	<h2><?= tr('term.expert') ?></h2>

	<div class="Row explain">
		<?= tr('term.explain_expert') ?>
	</div>

	<div class="Row">
		<label for="font_stack"><?= tr('term.font_stack') ?></label>
		<input type="text" name="font_stack" id="font_stack" value="%h:font_stack%" required>
	</div>

	<div class="Row">
		<label for="font_size"><?= tr('term.font_size') ?><span class="mq-phone">&nbsp;(px)</span></label>
		<input type="number" step=1 min=0 name="font_size" id="font_size" value="%font_size%" required>
		<span class="mq-no-phone">&nbsp;px</span>
	</div>

	<div class="Row">
		<label for="parser_tout_ms"><?= tr('term.parser_tout_ms') ?><span class="mq-phone">&nbsp;(ms)</span></label>
		<input type="number" step=1 min=0 name="parser_tout_ms" id="parser_tout_ms" value="%parser_tout_ms%" required>
		<span class="mq-no-phone">&nbsp;ms</span>
	</div>

	<div class="Row">
		<label for="display_tout_ms"><?= tr('term.display_tout_ms') ?><span class="mq-phone">&nbsp;(ms)</span></label>
		<input type="number" step=1 min=0 name="display_tout_ms" id="display_tout_ms" value="%display_tout_ms%" required>
		<span class="mq-no-phone">&nbsp;ms</span>
	</div>

	<div class="Row">
		<label for="display_cooldown_ms"><?= tr('term.display_cooldown_ms') ?><span class="mq-phone">&nbsp;(ms)</span></label>
		<input type="number" step=1 min=0 name="display_cooldown_ms" id="display_cooldown_ms" value="%display_cooldown_ms%" required>
		<span class="mq-no-phone">&nbsp;ms</span>
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.debugbar') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="debugbar" name="debugbar" value="%debugbar%">
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.ascii_debug') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="ascii_debug" name="ascii_debug" value="%ascii_debug%">
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.fn_alt_mode') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="fn_alt_mode" name="fn_alt_mode" value="%fn_alt_mode%">
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.want_all_fn') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="want_all_fn" name="want_all_fn" value="%want_all_fn%">
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.show_config_links') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="show_config_links" name="show_config_links" value="%show_config_links%">
	</div>

	<div class="Row checkbox" >
		<label><?= tr('term.allow_decopt_12') ?></label><!--
		--><span class="box" tabindex=0 role=checkbox></span>
		<input type="hidden" id="allow_decopt_12" name="allow_decopt_12" value="%allow_decopt_12%">
	</div>

	<div class="Row buttons">
		<a class="button icn-ok" href="#" onclick="qs('#form-expert').submit()"><?= tr('apply') ?></a>
	</div>
</form>

<script>
  $.ready(function () {
    $('#cursor_shape').val('%cursor_shape%');
    $('#theme').val('%theme%');
    $('#uart_baudrate').val('%uart_baudrate%');
    $('#uart_parity').val('%uart_parity%');
    $('#uart_stopbits').val('%uart_stopbits%');

    TermConf.init();
  });
</script>
