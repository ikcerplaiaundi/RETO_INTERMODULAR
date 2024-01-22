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
    {
        $schedule->exec('php artisan app:consultar-api-externa')->everyFiveSeconds();

        $schedule->command('app:generar-datos-municipio')->everyMinute();
        $schedule->command('app:consultar-api-externa')->everyFifteenMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
