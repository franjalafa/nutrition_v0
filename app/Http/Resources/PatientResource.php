<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'surname_father' => $this->surname_father,
            'surname_mother' => $this->surname_mother,
            'age' => $this->age,
            'gender' => $this->gender,
            'created_at' => (new Carbon($this->created_at))->format('d-m-Y')
        ];
    }
}
