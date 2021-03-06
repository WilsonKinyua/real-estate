<?php

namespace App\Http\Requests;

use App\Models\PropoertyInquiry;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Response;

class MassDestroyPropoertyInquiryRequest extends FormRequest
{
    public function authorize()
    {
        abort_if(Gate::denies('propoerty_inquiry_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return true;
    }

    public function rules()
    {
        return [
            'ids'   => 'required|array',
            'ids.*' => 'exists:propoerty_inquiries,id',
        ];
    }
}
