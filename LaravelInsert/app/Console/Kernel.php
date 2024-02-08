<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        \App\Console\Commands\GenerarDatosMunicipio::class,
        \App\Console\Commands\ConsultarApiExterna::class
        // ... otros comandos
    ];
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {     //->everyFifteenMinutes() everyTenMinutes();;
        $schedule->exec('php artisan app:consultar-api-externa')->everyFifteenMinutes();
        $schedule->exec('php artisan app:generar-datos-municipio')->everyFiveSeconds();
        $schedule->exec('php artisan app:consultar-api-mediciones')->everyFiveSeconds();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
