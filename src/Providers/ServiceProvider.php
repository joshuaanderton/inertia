<?php

namespace PolarizeTech\Inertia\Providers;

use Illuminate\Support\BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    private string $path = __DIR__.'/../..';

    public function register()
    {
        //
    }

    public function boot()
    {
        $this->loadRoutes();
    }

    private function loadRoutes()
    {
        $this->loadRoutesFrom(
            "{$this->path}/routes/routes.php"
        );
    }
}