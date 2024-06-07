<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Person;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $password = 'testtest';
        return [
            /*'name' => 'admin',
            'surname' => 'admin',
            'email' => 'admin@admin.com',
            'phone' => $this->faker->numberBetween(600000000, 799999999),
            'password' => static::$password ??= Hash::make('password'),
            'token' => Str::random(10),
            'type' => 'admin'
            
            'name' => 'user2',
            'surname' => 'user2',
            'email' => 'user2@uoc.com',
            'phone' => $this->faker->numberBetween(600000000, 799999999),
            'password' => static::$password ??= Hash::make('password'),
            'token' => Str::random(10),
            'type' => 'user'
*/
            'name' => $this->faker->name(),
            'surname' => $this->faker->lastname(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->numberBetween(600000000, 799999999),
            'password' => static::$password ??= Hash::make('password'),
            'token' => Str::random(10),
            'type' => 'user'
        ];
    }    
}
