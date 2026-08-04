#!/usr/bin/env python3
import subprocess
import sys

# Configuration variables
SSH_HOST = "145.79.25.215"
SSH_USER = "u881038410"
SSH_PORT = "65002"  # Note: Hostinger Shared Hosting often uses port 65002 for SSH
SSH_PASSWORD = "Mvm@168$"  # We will use sshpass to pass this
REMOTE_PATH = "domains/mvmlogistics.asia/public_html"

def print_step(step_name):
    print(f"\n{'='*50}\n[STEP] {step_name}\n{'='*50}")

def run_command(command, cwd=None):
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, cwd=cwd)
    if result.returncode != 0:
        print(f"Command failed with exit code {result.returncode}")
        sys.exit(1)

def main():
    print_step("Update Code and Clear Cache")
    
    # 1. Build frontend assets locally
    print_step("Building frontend assets")
    run_command("npm run build")
    
    # 2. Upload only changed files via rsync
    print_step("Uploading updated files to server (rsync)")
    rsync_cmd = (
        f"sshpass -p '{SSH_PASSWORD}' rsync -avz -e 'ssh -o StrictHostKeyChecking=no -p {SSH_PORT}' "
        f"--exclude 'node_modules' "
        f"--exclude 'vendor' "
        f"--exclude '.git' "
        f"--exclude '.env' "
        f"--exclude 'storage/logs' "
        f"--exclude 'storage/framework' "
        f"--exclude 'bootstrap/cache' "
        f"./ {SSH_USER}@{SSH_HOST}:{REMOTE_PATH}"
    )
    print("NOTE: We are using sshpass to authenticate.")
    run_command(rsync_cmd)
    
    print_step("Uploading images to server (rsync)")
    rsync_images_cmd = (
        f"sshpass -p '{SSH_PASSWORD}' rsync -avz -e 'ssh -o StrictHostKeyChecking=no -p {SSH_PORT}' "
        f"./storage/app/public/ {SSH_USER}@{SSH_HOST}:{REMOTE_PATH}/storage/app/public/"
    )
    run_command(rsync_images_cmd)
    
    # 3. Clear Caches Remotely and Run Migrations
    print_step("Clearing caches and updating remotely")
    clear_cmd = (
        f"sshpass -p '{SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no -p {SSH_PORT} {SSH_USER}@{SSH_HOST} 'cd {REMOTE_PATH} && "
        f"rm -f default.php && "
        f"rm -rf bootstrap/cache/*.php && "
        f"sed -i \"s/^# DB_HOST/DB_HOST/\" .env && "
        f"sed -i \"s/^# DB_PORT/DB_PORT/\" .env && "
        f"sed -i \"s/^# DB_DATABASE/DB_DATABASE/\" .env && "
        f"sed -i \"s/^# DB_USERNAME/DB_USERNAME/\" .env && "
        f"sed -i \"s/^# DB_PASSWORD/DB_PASSWORD/\" .env && "
        f"sed -i \"s/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/\" .env && "
        f"rm -f public/storage && "
        f"cd public && ln -s ../storage/app/public storage && cd .. && "
        f"php artisan optimize:clear && "
        f"php artisan view:clear && "
        f"php artisan cache:clear && "
        f"php artisan config:clear && "
        f"composer install --optimize-autoloader --no-dev --ignore-platform-reqs --no-scripts && "
        f"php artisan package:discover --ansi && "
        f"php artisan migrate --force && "
        f"php artisan optimize'"
    )
    run_command(clear_cmd)
    
    print("\n✅ Upload and Clear Completed Successfully!")

if __name__ == "__main__":
    main()
