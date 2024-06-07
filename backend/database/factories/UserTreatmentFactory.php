<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserTreatment>
 */
class UserTreatmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public static $counter = 0;

    public function definition(): array
    {
        $i = $this::$counter += 1;

        return [
            'user_id' => rand(2,7),
            'state' => $this->faker->randomElement(['En proceso', 'Finalizado', 'No realizado']),
            'sessions' => rand(1, 5),
            'treatment_id' => (string)rand(1, 17)
        ];
    }
}
