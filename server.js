const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Güvenlik ve performans middleware'leri
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "unpkg.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "unpkg.com", "fonts.googleapis.com"],
            fontSrc: ["'self'", "fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "images.unsplash.com"],
            connectSrc: ["'self'"]
        }
    }
}));
app.use(compression());

// Statik dosyalar için middleware
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa route'u
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 