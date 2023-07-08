./vendor/bin/sail create
./vendor/bin/sail start
containerId=$(docker ps --latest --quiet)
docker exec "$containerId" composer install
docker exec "$containerId" php artisan migrate
docker exec "$containerId" php artisan db:seed