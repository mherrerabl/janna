<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserTreatment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {

        return [
            'date' => $this->faker->unique()->dateTimeInInterval($startDate = '-2 days', $interval = '+ 10 days', $timezone = null),
            'state' => $this->faker->randomElement(['Pendiente', 'Próxima sesión', 'Realizada', 'No realizada']),
            'user_treatment_id' => function () {
                UserTreatment::factory(1)->create();
                return UserTreatment::orderBy('id', 'desc')->first()->id;
            },
        ];
    }
}
