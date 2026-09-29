<?php
// Configurações do site LocMaq.
// No XAMPP o padrão é usuário "root" e senha vazia.
// Na hospedagem, use os dados do banco criado no painel (cPanel/hPanel).

const DB_HOST    = 'localhost';
const DB_NOME    = 'locmaq';
const DB_USUARIO = 'root';
const DB_SENHA   = '';

// Número do WhatsApp (mesmo de js/dados.js)
const WHATSAPP = '5535998219921';

// Upload das imagens das promoções
const PASTA_UPLOAD     = __DIR__ . '/uploads/promocoes/';
const URL_UPLOAD       = 'uploads/promocoes/';
const UPLOAD_MAX_BYTES = 3 * 1024 * 1024; // 3 MB
