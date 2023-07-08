<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetNoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * fullname 2 or 3 words with at least 2 char
     * phone begin with + and contains 10 or 11 digits
     * birth_date in rus format
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'fullName' => ['required', 'string', 'regex:/(^\w{2,} \w{2,}$)|(^\w{2,} \w{2,} \w{2,}$)/'],
            'company' => ['string'],
            'phone' => ['required', 'regex:/^\+\d{10,11}$/'],
            'email' => ['required', 'email'],
            'birth_date' => ['date_format:' . RUS_DATE_FORMAT],
            'photo' => ['file']
        ];
    }
}
