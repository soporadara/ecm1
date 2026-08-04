#!/usr/bin/env python3
import subprocess
import sys
import os

# Configuration variables
SSH_HOST = "145.79.25.215"
SSH_USER = "u881038410"
SSH_PORT = "65002"  # Note: Hostinger Shared Hosting often uses port 65002 for SSH
SSH_PASSWORD = "Mvm@168$"  # We will use sshpass to pass this
REMOTE_PATH = "domains/mvmlogistics.asia/public_html"
DB_USERNAME = "u881038410_store1"
DB_PASSWORD = "Mvm@168$"
DB_NAME = "u881038410_store1"

def print_step(step_name):
    print(f"\n{'='*50}\n[STEP] {step_name}\n{'='*50}")

def run_command(command, cwd=None):
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, cwd=cwd)
    if result.returncode != 0:
        print(f"Command failed with exit code {result.returncode}")
        sys.exit(1)

def main():
    print_step("Initial Deployment to Hostinger")
    
    # 1. Build frontend assets locally
    print_step("Building frontend assets")
    run_command("npm install")
    run_command("npm run build")
    
    # 2. Upload files via rsync
    print_step("Uploading files to server (rsync)")
    rsync_cmd = (
        f"sshpass -p '{SSH_PASSWORD}' rsync -avz -e 'ssh -o StrictHostKeyChecking=no -p {SSH_PORT}' "
        f"--exclude 'node_modules' "
        f"--exclude 'vendor' "
        f"--exclude '.git' "
        f"--exclude '.env' "
        f"--exclude 'storage/logs' "
        f"--exclude 'bootstrap/cache' "
        f"./ {SSH_USER}@{SSH_HOST}:{REMOTE_PATH}"
    )
    print("NOTE: We are using sshpass to authenticate.")
    run_command(rsync_cmd)
    
    # 3. Install Composer dependencies on server
    print_step("Installing composer dependencies remotely")
    composer_cmd = f"sshpass -p '{SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no -p {SSH_PORT} {SSH_USER}@{SSH_HOST} 'cd {REMOTE_PATH} && rm -rf bootstrap/cache/*.php && composer install --optimize-autoloader --no-dev --ignore-platform-reqs --no-scripts && php artisan package:discover --ansi'"
    run_command(composer_cmd)
    
    # 4. Setup .env on server
    print_step("Setting up .env on server")
    env_setup_cmd = (
        f"sshpass -p '{SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no -p {SSH_PORT} {SSH_USER}@{SSH_HOST} 'cd {REMOTE_PATH} && "
        f"cp .env.example .env && "
        f"sed -i \"s/^# DB_HOST/DB_HOST/\" .env && "
        f"sed -i \"s/^# DB_PORT/DB_PORT/\" .env && "
        f"sed -i \"s/^# DB_DATABASE/DB_DATABASE/\" .env && "
        f"sed -i \"s/^# DB_USERNAME/DB_USERNAME/\" .env && "
        f"sed -i \"s/^# DB_PASSWORD/DB_PASSWORD/\" .env && "
        f"sed -i \"s/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/\" .env && "
        f"sed -i \"s/DB_DATABASE=.*/DB_DATABASE={DB_NAME}/\" .env && "
        f"sed -i \"s/DB_USERNAME=.*/DB_USERNAME={DB_USERNAME}/\" .env && "
        f"sed -i \"s/DB_PASSWORD=.*/DB_PASSWORD={DB_PASSWORD}/\" .env && "
        f"php artisan key:generate'"
    )
    run_command(env_setup_cmd)
    
    # 5. Skip Migrations (so you can manually import your SQL dump)
    print_step("Skipping migrations so you can import your SQL dump")
    # migrate_cmd = f"sshpass -p '{SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no -p {SSH_PORT} {SSH_USER}@{SSH_HOST} 'cd {REMOTE_PATH} && php artisan migrate --force'"
    # run_command(migrate_cmd)
    
    # 6. Optimize Laravel
    print_step("Optimizing Laravel remotely")
    optimize_cmd = f"sshpass -p '{SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no -p {SSH_PORT} {SSH_USER}@{SSH_HOST} 'cd {REMOTE_PATH} && php artisan optimize'"
    run_command(optimize_cmd)
    
    print("\n✅ Deployment Completed Successfully!")

if __name__ == "__main__":
    main()
