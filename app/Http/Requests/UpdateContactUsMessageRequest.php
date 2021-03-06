<?php

namespace App\Http\Requests;

use App\Models\ContactUsMessage;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class UpdateContactUsMessageRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('contact_us_message_edit');
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
