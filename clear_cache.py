#!/usr/bin/env python3
import subprocess
import sys

SSH_HOST = "145.79.25.215"
SSH_USER = "u881038410"
SSH_PORT = "65002"
SSH_PASSWORD = "Mvm@168$"
REMOTE_PATH = "domains/mvmlogistics.asia/public_html"

def run_command(command):
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True)
    if result.returncode != 0:
        print(f"Command failed with exit code {result.returncode}")
        sys.exit(1)

def main():
    print("Clearing caches and updating remotely...")
    clear_cmd = (
        f"sshpass -p '{SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no -p {SSH_PORT} {SSH_USER}@{SSH_HOST} 'cd {REMOTE_PATH} && "
        f"rm -f default.php && "
        f"rm -f public/hot && "
        f"rm -rf bootstrap/cache/*.php && "
        f"sed -i \"s/^# DB_HOST/DB_HOST/\" .env && "
        f"sed -i \"s/^# DB_PORT/DB_PORT/\" .env && "
        f"sed -i \"s/^# DB_DATABASE/DB_DATABASE/\" .env && "
        f"sed -i \"s/^# DB_USERNAME/DB_USERNAME/\" .env && "
        f"sed -i \"s/^# DB_PASSWORD/DB_PASSWORD/\" .env && "
        f"sed -i \"s|^APP_URL=.*|APP_URL=https://mvmlogistics.asia|\" .env && "
        f"sed -i \"s/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/\" .env && "
        f"sed -i \"s|^FIREBASE_CREDENTIALS=.*|FIREBASE_CREDENTIALS=storage/app/firebase-credentials.json|\" .env && "
        f"sed -i \"s|^GOOGLE_APPLICATION_CREDENTIALS=.*|GOOGLE_APPLICATION_CREDENTIALS=storage/app/firebase-credentials.json|\" .env && "
        f"sed -i \"/TELEGRAM_BOT_TOKEN/d\" .env && "
        f"sed -i \"/TELEGRAM_BOT_USERNAME/d\" .env && "
        f"sed -i \"/TELEGRAM_WEBHOOK_SECRET/d\" .env && "
        f"grep -q \"TELEGRAM_BOT_TOKEN\" .env || (echo \"\" >> .env && echo \"TELEGRAM_BOT_TOKEN=\\\"8802174746:AAEmm_E2sLEqB6X7ZULnnSbgky91ZB1dT5o\\\"\" >> .env) && "
        f"grep -q \"TELEGRAM_BOT_USERNAME\" .env || echo \"TELEGRAM_BOT_USERNAME=\\\"mvmlogisticskhbot\\\"\" >> .env && "
        f"grep -q \"TELEGRAM_WEBHOOK_SECRET\" .env || echo \"TELEGRAM_WEBHOOK_SECRET=\\\"mvm_nheww_dara_nvmvm_ngawwy_grape\\\"\" >> .env && "
        f"rm -f public/storage && "
        f"cd public && ln -s ../storage/app/public storage && cd .. && "
        f"php artisan optimize:clear && "
        f"php artisan view:clear && "
        f"php artisan cache:clear && "
        f"php artisan config:clear && "
        f"composer install --optimize-autoloader --no-dev --ignore-platform-reqs --no-scripts && "
        f"php artisan package:discover --ansi && "
        f"php artisan migrate --force && "
        f"php artisan tinker seed_faqs.php && "
        f"php scripts/setup-telegram-webhook.php && "
        f"php scripts/setup-telegram-commands.php && "
        f"php artisan optimize'"
    )
    run_command(clear_cmd)
    print("\n✅ Caches Cleared Successfully!")

if __name__ == "__main__":
    main()
