<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PatientCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'max:50'],
            "surname_father" => ['required', 'max:50'],
            "surname_mother" => ['required', 'max:50'],
            "age" => ['required', 'integer'],
            "gender" => ['required', Rule::in(['F', 'M'])],
        ];
    }
}
