<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->nullable();
            $table->string('surname_father', 25)->nullable();
            $table->string('surname_mother', 25)->nullable();
            $table->integer('age')->unsigned()->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('marital_status', 25)->nullable();
            $table->string('occupation', 60)->nullable();
            $table->string('address', 60)->nullable();
            $table->string('outside', 20)->nullable();
            $table->string('inside', 30)->nullable();
            $table->string('colony', 40)->nullable();
            $table->integer('zip_code')->unsigned()->nullable();
            $table->string('state', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('curp', 20)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('cellphone', 20)->nullable();
            $table->string('picture', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
