<?php

/* This script is run on demand to generate JS version of tr() */

require_once __DIR__ . '/base.php';

$selected = [
	'wifi.connected_ip_is',
	'wifi.not_conn',
	'wifi.enter_passwd',
	'term_nav.fullscreen',
	'term_conn.connecting',
	'term_conn.waiting_content',
	'term_conn.disconnected',
	'term_conn.waiting_server',
	'term_conn.reconnecting'
];

$out = [];
foreach ($selected as $key) {
	$out[$key] = tr($key);
}

file_put_contents(__DIR__. '/js/lang.js',
	"// Generated from PHP locale file\n" .
	'let _tr = ' . json_encode($out, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE) . ";\n\n" .
	"module.exports = function tr (key) { return _tr[key] || '?' + key + '?' }\n"
);
