<?php

namespace App\Http\Requests;

use App\Models\ContactUsMessage;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreContactUsMessageRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('contact_us_message_create');
    }

    public function rules()
    {
        return [
            'name' => [
                'string',
                'required',
            ],
            'message' => [
                'required',
            ],
        ];
    }
}
