#!/bin/bash
# Car Balance - Deploy script pro VPS s ISPConfig
# Spustit jako root na serveru

set -e

WEB_DIR="/var/www/clients/client0/web8"
REPO_DIR="/opt/carbalance-astro"
NODE_VERSION="20"

echo "=== 1. Instalace Node.js (pokud chybí) ==="
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 18 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
    echo "Node.js $(node -v) nainstalován"
else
    echo "Node.js $(node -v) již nainstalován"
fi

echo ""
echo "=== 2. Klonování repozitáře ==="
if [ -d "$REPO_DIR" ]; then
    cd "$REPO_DIR"
    git pull origin main
    echo "Repo aktualizováno"
else
    git clone https://github.com/Thominho/carbalance-web.git "$REPO_DIR"
    cd "$REPO_DIR"
    echo "Repo naklonováno"
fi

echo ""
echo "=== 3. Nastavení .env ==="
cat > "$REPO_DIR/.env" << 'ENVEOF'
TINA_CLIENT_ID=6697fb48-c599-4bcc-bc6b-c1f37915ed52
TINA_TOKEN=796a25f6cab32bff810d9b364819f65e7844ab5b
TINA_SEARCH_TOKEN=6e8f285363d8dbd0a951363a53b8f8e4d82e8991
ENVEOF
echo ".env vytvořen"

echo ""
echo "=== 4. Instalace závislostí a build ==="
cd "$REPO_DIR"
npm install --legacy-peer-deps
npx astro build

echo ""
echo "=== 5. Kopírování buildu do web adresáře ==="
# Záloha původního webu
if [ ! -d "${WEB_DIR}/web_backup" ]; then
    mkdir -p "${WEB_DIR}/web_backup"
    cp -r ${WEB_DIR}/web/* "${WEB_DIR}/web_backup/" 2>/dev/null || true
    echo "Záloha původního webu vytvořena"
fi

# Vyčistit web adresář (kromě zálohy a speciálních souborů)
find ${WEB_DIR}/web/ -mindepth 1 -not -name '.htaccess' -delete 2>/dev/null || true

# Kopírovat nový build
cp -r ${REPO_DIR}/dist/* ${WEB_DIR}/web/

# Nastavit správná práva (ISPConfig)
chown -R web8:client0 ${WEB_DIR}/web/
chmod -R 755 ${WEB_DIR}/web/

echo ""
echo "=== 6. Vytvoření update skriptu ==="
cat > /opt/carbalance-update.sh << 'UPDATEEOF'
#!/bin/bash
cd /opt/carbalance-astro
git pull origin main
npm install --legacy-peer-deps
npx astro build
rm -rf /var/www/clients/client0/web8/web/*
cp -r dist/* /var/www/clients/client0/web8/web/
chown -R web8:client0 /var/www/clients/client0/web8/web/
chmod -R 755 /var/www/clients/client0/web8/web/
echo "Web aktualizován: $(date)"
UPDATEEOF
chmod +x /opt/carbalance-update.sh
echo "Update skript vytvořen: /opt/carbalance-update.sh"

echo ""
echo "========================================="
echo "✅ DEPLOY DOKONČEN!"
echo "========================================="
echo "Web: https://www.carbalance.cz"
echo "Admin: https://www.carbalance.cz/admin/"
echo ""
echo "Pro budoucí aktualizace spusť:"
echo "  /opt/carbalance-update.sh"
echo "========================================="
