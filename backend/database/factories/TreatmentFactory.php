<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Price;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Treatment>
 */
class TreatmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public static $counter = -1;
    public static $counter2 = 3;

    public function definition(): array
    {
        $names = [
            'Manicura y pedicura',
            'Depilaciones',
            'Micro pigmentación',
            'Cambio de look',
            'Extensiones',
            'Lifting',
            'Tinte',
            'Tratamiento de ácido hialurónico',
            'Tratamiento antiedad',
            'Mesoterapia facial',
            'Peeling químico',
            'Aumento de labios',
            'Masajes',
            'Carboxiterapia corporal',
            'Mesoterapia corporal',
            'Presoterapia',
            'Tratamiento anticelulítico',
        ];

		$i = $this::$counter += 1;
        $x = $this::$counter2 += 1;
        return [
            'name' => $names[$i],
            'description' => $this->faker->realText(1000),
            'sessions' => $this->faker->numberBetween(1, 6),
            'duration' => $this->faker->numberBetween(15, 60),
            'price_id' => function () {
                Price::factory(1)->create();
                return Price::orderBy('id', 'desc')->first()->id;
            },
            'category_id' => (string)$x
        ];
    }
}
